from flask import Flask, request, jsonify, send_file
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
import io
from PIL import Image, ImageDraw
import os
import dotenv

dotenv.load_dotenv()


app = Flask(__name__)

class_labels = {'Glioma': 0, 'Meningioma': 1, 'Pituitary': 2, 'No Tumor': 3}
class_labels_reverse = {v: k for k, v in class_labels.items()}
CLASSIFICATION_IMAGE_SIZE = 224
SEGMENTATION_IMAGE_SIZE = 128
# Load the model
model_path = os.environ['MODEL_PATH']
classification_model = load_model(f'{model_path}/classification_model.h5')
segmentation_model = load_model(f'{model_path}/segmentation_model2.h5')

def test_image_classification(model, image):
    # Preprocess the input image
    img = image.resize((CLASSIFICATION_IMAGE_SIZE, CLASSIFICATION_IMAGE_SIZE))
    img = img.convert('RGB')  # Convert image to RGB
    img = np.array(img).astype('float32') / 255.0  # Normalize
    img = img.reshape(1, CLASSIFICATION_IMAGE_SIZE, CLASSIFICATION_IMAGE_SIZE, 3)  

    # Predict the class
    prediction = model.predict(img)
    predicted_class = np.argmax(prediction, axis=1)  # Get the class index with the highest probability

    # Return the predicted label
    predicted_label = class_labels_reverse[predicted_class[0]]  # Map the class index to label
    return predicted_label


# Preprocess the input image to match the model's requirements
def preprocess_image(image, target_size=(SEGMENTATION_IMAGE_SIZE, SEGMENTATION_IMAGE_SIZE)):
    # Resize image to the target size
    image = image.resize(target_size)
    image_np = np.array(image, dtype=np.float32)

    # Ensure the image has 3 channels
    if len(image_np.shape) == 2:  # Grayscale image
        image_np = np.stack([image_np] * 3, axis=-1)
    elif image_np.shape[-1] == 1:  # Single channel image
        image_np = np.repeat(image_np, 3, axis=-1)

    # Normalize and add batch dimension
    image_np = image_np / 255.0  # Normalize to [0, 1]
    image_np = np.expand_dims(image_np, axis=0)  # Add batch dimension

    return image_np

@app.route('/classification', methods=['POST'])
def classify_image():
    #print(request.files)
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No image file provided'}), 400

    try:
        # Read the image file and convert to PIL Image
        image = Image.open(io.BytesIO(image_file.read()))
        
        # Run classification
        predicted_label = test_image_classification(classification_model, image)
        
        # Return the result
        return jsonify({'prediction': predicted_label}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/segmentation', methods=['POST'])
def segment_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No image file provided'}), 400

    try:
        # Read the image file and convert to PIL Image
        image = Image.open(io.BytesIO(image_file.read()))

        # Ensure valid image dimensions
        if image.size[0] == 0 or image.size[1] == 0:
            return jsonify({'error': 'Uploaded image has invalid dimensions.'}), 400

        # Resize the original image to 256x256 if needed
        target_size = 256
        if image.size != (target_size, target_size):
            image_resized = image.resize((target_size, target_size))
        else:
            image_resized = image

        # Preprocess the resized image for the model
        image_segmentation = image.resize((SEGMENTATION_IMAGE_SIZE, SEGMENTATION_IMAGE_SIZE))
        image_np = np.array(image_segmentation, dtype=np.float32)

        # Ensure the image has 3 channels (in case the input image is grayscale)
        if len(image_np.shape) == 2:  # Grayscale image
            image_np = np.stack([image_np] * 3, axis=-1)
        elif image_np.shape[-1] == 1:  # Single channel image
            image_np = np.repeat(image_np, 3, axis=-1)

        # Normalize and add batch dimension
        image_np = image_np / 255.0  # Normalize to [0, 1]
        image_np = np.expand_dims(image_np, axis=0)  # Add batch dimension

        # Run segmentation model
        mask = segmentation_model.predict(image_np)[0]

        # Squeeze unnecessary dimensions and ensure proper shape
        mask = np.squeeze(mask)  # Remove any singleton dimensions
        if mask.ndim == 3 and mask.shape[-1] == 1:
            mask = mask[:, :, 0]  # Flatten the last dimension if it's just 1

        #print min and max values of mask
        print(mask.min(), mask.max())

        # Threshold to create binary mask
        #mask = mask > 0.002 

        # Convert mask to uint8 for resizing and visualization
        mask = (mask * 255).astype(np.uint8)

        # Resize the mask to the size of the original (or resized) image
        mask_image = Image.fromarray(mask).resize(image_resized.size, resample=Image.BILINEAR)
        mask_resized = np.array(mask_image, dtype=np.uint8)

        # Convert the original image to RGB if it isn't already
        if image_resized.mode != 'RGB':
            image_resized = image_resized.convert('RGB')

        # Overlay the mask onto the resized original image
        overlay = Image.fromarray(mask_resized).convert("L")
        image_resized.paste(overlay, (0, 0), mask=overlay)

        # Draw a bounding box around the mask if there are detected regions
        non_zero_indices = np.argwhere(mask_resized > 0)
        if non_zero_indices.size > 0:
            top_left = non_zero_indices.min(axis=0)
            bottom_right = non_zero_indices.max(axis=0)

            # Draw bounding box on the resized image
            draw = ImageDraw.Draw(image_resized)
            draw.rectangle([top_left[1], top_left[0], bottom_right[1], bottom_right[0]], outline="red", width=3)

        # Save the modified image to a BytesIO object
        img_io = io.BytesIO()
        image_resized.save(img_io, 'JPEG')
        img_io.seek(0)

        # Return the modified image
        return send_file(img_io, mimetype='image/jpeg')

    except Exception as e:
        print(f'Error: {e}')
        return jsonify({'error': str(e)}), 500

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443, debug=True, ssl_context=('ssl/server.cert', 'ssl/server.key'), threaded=True)
