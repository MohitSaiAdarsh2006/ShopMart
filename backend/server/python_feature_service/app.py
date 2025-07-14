# Integrated from qwer/backend/python_feature_service/app.py
# This is a placeholder. Replace with the actual app.py content from qwer backend if not already present.

from flask import Flask, request, jsonify
app = Flask(__name__)

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import torch
import torchvision.transforms as transforms
import torchvision.models as models

app = Flask(__name__)
CORS(app)

# Use ResNet50 for feature extraction
model = models.resnet50(pretrained=True)
model.eval()

# Remove final classification layer
feature_extractor = torch.nn.Sequential(*list(model.children())[:-1])

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def extract_features(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img_t = transform(image).unsqueeze(0)
    with torch.no_grad():
        features = feature_extractor(img_t)
    features = features.squeeze().numpy().flatten()
    return features.tolist()

@app.route('/extract-features', methods=['POST'])
def extract_features_route():
    if 'file' in request.files:
        image_bytes = request.files['file'].read()
    else:
        image_bytes = request.get_data()
    try:
        features = extract_features(image_bytes)
        return jsonify({'features': features})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, host='0.0.0.0')


if __name__ == '__main__':
    app.run(port=5001)
