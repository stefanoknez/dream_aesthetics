from dynaface.analysis import AnalyzeFace
import dynaface.models as models
import cv2

def analyze_face_asymmetry(image_path):
    try:
        if not models.are_models_init():
            models.init_models()

        img = cv2.imread(image_path)
        if img is None:
            raise ValueError("Image could not be loaded.")

        face = AnalyzeFace()
        face.load_image(img)
        result = face.analyze()

        fai = result.get("FAI")
        oce = result.get("OCE")
        landmarks = face.landmarks

        return {
            "fai": round(fai, 2) if fai else None,
            "oce": round(oce, 2) if oce else None,
            "landmarks_detected": len(landmarks) if landmarks else 0
        }

    except Exception as e:
        return {
            "error": f"Failed to analyze with Dynaface: {str(e)}"
        }