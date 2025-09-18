import base64
import sys
from pathlib import Path

def image_to_base64(file_path: str) -> str:
    """
    Convert an image file to a base64 encoded string.
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    with open(path, "rb") as img_file:
        encoded = base64.b64encode(img_file.read()).decode("utf-8")
    return encoded


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python image_to_base64.py <path_to_image>")
        sys.exit(1)

    file_path = sys.argv[1]
    try:
        base64_str = image_to_base64(file_path)
        print("Base64 Encoded String:\n")
        print(base64_str)
    except Exception as e:
        print(f"Error: {e}")
