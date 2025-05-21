from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import JSONResponse
import uuid
import os
import cv2
from datetime import datetime

from utils.mole_detection import detect_moles
from utils.golden_ratio_analysis import analyze_golden_ratio

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/analyze-face")
async def analyze_face(image: UploadFile = File(...)):
    try:
        if not image.filename:
            return JSONResponse(content={"error": "Empty filename"}, status_code=400)

        filename = f"{uuid.uuid4().hex}.jpg"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        
        with open(filepath, "wb") as f:
            f.write(await image.read())

        image_cv = cv2.imread(filepath)
        if image_cv is None:
            raise ValueError("Unable to read image with OpenCV")

        height, width, channels = image_cv.shape
        file_size = os.path.getsize(filepath)

        mole_count = detect_moles(image_cv)

        try:
            golden_ratio_data = analyze_golden_ratio(filepath)
        except Exception as e:
            golden_ratio_data = {
                "geometric_ratio": None,
                "similarity_ratio": None
            }
            print(f"[WARNING] Golden ratio analysis failed: {e}")

        acne_detected = mole_count > 10
        botox_recommended = (
            golden_ratio_data.get("geometric_ratio") is not None and
            golden_ratio_data.get("geometric_ratio") < 0.9
        )

        result = {
            "filename": filename,
            "image_width": width,
            "image_height": height,
            "channels": channels,
            "file_size_bytes": file_size,
            "timestamp": datetime.now().isoformat(),
            "mole_count": mole_count,
            "golden_ratio": golden_ratio_data.get("geometric_ratio"),
            "golden_similarity": golden_ratio_data.get("similarity_ratio"),
            "acne_detected": acne_detected,
            "botox_recommended": botox_recommended,
        }

        return JSONResponse(content=result, status_code=200)

    except Exception as e:
        print(f"[ERROR] analyze_face: {str(e)}")
        return JSONResponse(content={"error": str(e)}, status_code=500)