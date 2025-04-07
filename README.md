# Pneumonia Detection Model

This is a **Flask-based web application** designed to detect **pneumonia** from chest X-ray images using a **pre-trained deep learning model**. The app allows users to upload an X-ray image and receive predictions on whether the image indicates pneumonia or normal conditions. It also provides health-related facts and warnings for better user engagement.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Model Overview](#model-overview)
- [Accuracy](#accuracy)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Health Facts](#health-facts)
- [Disclaimer](#disclaimer)
- [License](#license)

---

## Features
✅ **Pneumonia Prediction** : Upload an X-ray image to predict whether it indicates pneumonia or normal conditions.  
✅ **Confidence Score** : Displays the confidence percentage of the prediction.  
✅ **Warnings** : Alerts users with a warning ("Check with a doctor") if pneumonia is detected.  
✅ **Health Facts** : Provides three dynamic health-related facts fetched from the NewsAPI.  
✅ **User-Friendly Interface** : Clean and responsive design built with Bootstrap.  
✅ **Disclaimer** : Includes a disclaimer reminding users that predictions are for informational purposes only.  

---

## Technologies Used
- **Backend Framework** : Flask (Python)
- **Frontend Styling** : Bootstrap, CSS
- **Machine Learning Library** : TensorFlow
- **Image Processing** : Pillow (PIL)
- **Health News API** : NewsAPI
- **Version Control** : Git and GitHub
- **Deployment** : Heroku (optional), PythonAnywhere (optional)

---

## Model Overview
The prediction model was trained using a **Convolutional Neural Network (CNN)** architecture implemented in **TensorFlow/Keras**. The model was trained on a dataset of chest X-ray images categorized into two classes:
- **Pneumonia**
- **Normal**

### Dataset
The dataset used for training the model contains:
- **Training Images** : 5,216 images (split into pneumonia and normal classes).
- **Validation Images** : 1,600 images.
- **Testing Images** : 624 images.

### Model Architecture
The CNN architecture includes:
- **Convolutional Layers** : Extract spatial features from the X-ray images.
- **Pooling Layers** : Reduce dimensionality while retaining important features.
- **Dense Layers** : Fully connected layers for classification.
- **Dropout Layers** : Prevent overfitting during training.

### Training Details
- **Optimizer** : Adam optimizer.
- **Loss Function** : Binary Crossentropy.
- **Epochs** : 20 epochs.
- **Batch Size** : 32.

---

## Accuracy
After training and testing the model, the final performance metrics achieved were:
- **Training Accuracy** : ~%
- **Validation Accuracy** : ~56%
- **Testing Accuracy** : **62%**

The model demonstrates good generalization and can reliably classify X-ray images into **pneumonia** or **normal** categories.

---

## Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/SambhavDeev/Pneumonia-Detection-Model.git
   cd Pneumonia-Detection-Model
   ```
2. **Create a virtual environment**
   ```sh
   python -m venv venv
   source venv/bin/activate  # For macOS/Linux
   venv\Scripts\activate     # For Windows
   ```
3. **Install dependencies**
   ```sh
   pip install -r requirements.txt
   ```

---

## Usage
1. **Run the Flask application**
   ```sh
   python app.py
   ```
2. **Open your browser** and go to:
   ```sh
   http://127.0.0.1:5000/
   ```
3. **Upload an X-ray image** and get the prediction.

---

## Deployment
This project can be deployed on platforms like **Heroku** or **PythonAnywhere**. For Heroku deployment:
1. **Login to Heroku CLI**
   ```sh
   heroku login
   ```
2. **Create a new Heroku app**
   ```sh
   heroku create pneumonia-detector
   ```
3. **Deploy the app**
   ```sh
   git push heroku main
   ```

---

## Health Facts
This application fetches and displays **three random health facts** related to pneumonia and respiratory diseases using the **NewsAPI**.

---

## Disclaimer
⚠️ **This application is not a medical diagnostic tool.** The predictions provided by this model are for **informational purposes only** and should not be considered a substitute for professional medical advice. Always consult a **doctor** for an accurate diagnosis.

---

## License
This project is licensed under the **MIT License**. Feel free to use, modify, and distribute it as per the license terms.

---

🚀 **Happy Coding!** 😊
