import GoldenFace


def analyze_golden_ratio(image_path):
    try:
        face = GoldenFace.goldenFace(image_path)

        golden_data = {
            "geometric_ratio": face.geometricRatio(),
            "similarity_ratio": face.similarityRatio(),
        }

        return golden_data

    except Exception as e:
        return {
            "geometric_ratio": None,
            "similarity_ratio": None,
            "error": str(e)
        }
