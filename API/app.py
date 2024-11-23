from flask import Flask, request, jsonify
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.models import load_model
import io
from PIL import Image
import os
import dotenv

dotenv.load_dotenv()


app = Flask(__name__)

class_labels = {'Glioma': 0, 'Meningioma': 1, 'Pituitary': 2, 'No Tumor': 3}
class_labels_reverse = {v: k for k, v in class_labels.items()}
IMAGE_SIZE = 224

# Load the model
model_path = os.environ['MODEL_PATH']
classification_model = load_model(f'{model_path}/classification_model.h5')

def test_image_classification(model, image):
    # Preprocess the input image
    img = image.resize((IMAGE_SIZE, IMAGE_SIZE))
    img = img.convert('RGB')  # Convert image to RGB
    img = np.array(img).astype('float32') / 255.0  # Normalize
    img = img.reshape(1, IMAGE_SIZE, IMAGE_SIZE, 3)  # Add batch dimension
    
    # Predict the class
    prediction = model.predict(img)
    predicted_class = np.argmax(prediction, axis=1)  # Get the class index with the highest probability

    # Return the predicted label
    predicted_label = class_labels_reverse[predicted_class[0]]  # Map the class index to label
    return predicted_label

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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=443, debug=True, ssl_context=('ssl/server.cert', 'ssl/server.key'), threaded=True)
