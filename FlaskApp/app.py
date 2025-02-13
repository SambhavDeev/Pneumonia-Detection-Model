from flask import Flask, render_template, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import os

app = Flask(__name__)

# Load your trained model
MODEL_PATH = "model.h5"
model = load_model(MODEL_PATH)

# Define image size (same as used during training)
IMG_SIZE = 128

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    try:
        # Preprocess the image
        img = Image.open(file).convert("RGB")  # Convert to RGB format
        img = img.resize((IMG_SIZE, IMG_SIZE))  # Resize to match training input
        img_array = np.array(img) / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Make a prediction
        prediction = model.predict(img_array)
        predicted_class = np.argmax(prediction, axis=1)[0]
        confidence = float(np.max(prediction))

        # Map class index to label
        labels = ["NORMAL", "PNEUMONIA"]
        result = {
            "class": labels[predicted_class],
            "confidence": round(confidence * 100, 2)
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)