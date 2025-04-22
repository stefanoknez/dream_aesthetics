from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
import cv2
from datetime import datetime

from utils.mole_detection import detect_moles
from utils.dynaface_analysis import analyze_symmetry_and_otapostazija
from utils.golden_ratio_analysis import analyze_golden_ratio

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/analyze-face", methods=["POST"])
def analyze_face():
    if "image" not in request.files:
        return jsonify({"error": "Image not found"}), 400

    image_file = request.files["image"]

    if image_file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    filename = f"{uuid.uuid4().hex}.jpg"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    image_file.save(filepath)

    # Učitavanje slike
    image = cv2.imread(filepath)
    if image is None:
        return jsonify({"error": "Unable to read image"}), 400

    height, width, channels = image.shape
    file_size = os.path.getsize(filepath)

    # Analize
    mole_count = detect_moles(image)
    dynaface_data = analyze_symmetry_and_otapostazija(filepath)
    golden_ratio_data = analyze_golden_ratio(filepath)

    result = {
        "filename": filename,
        "image_width": width,
        "image_height": height,
        "channels": channels,
        "file_size_bytes": file_size,
        "timestamp": datetime.now().isoformat(),
        "mole_count": mole_count,
        "face_symmetry": dynaface_data.get("symmetry_score"),
        "face_symmetry_details": dynaface_data.get("symmetry_details"),
        "has_otapostazija": dynaface_data.get("has_otapostazija"),
        "left_ear_distance": dynaface_data.get("left_ear_distance"),
        "right_ear_distance": dynaface_data.get("right_ear_distance"),
        "botox_recommended": dynaface_data.get("botox_recommended"),
        "acne_detected": dynaface_data.get("acne_detected"),
        "golden_ratio": golden_ratio_data.get("geometric_ratio"),
        "golden_similarity": golden_ratio_data.get("similarity_ratio"),
    }

    return jsonify(result)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)