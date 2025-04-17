import cv2
import numpy as np
import dlib

class FaceSymmetryTester:
    def __init__(self):
        self.detector = dlib.get_frontal_face_detector()
        self.predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

    def detect_landmarks(self, image):
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = self.detector(gray)

        if len(faces) == 0:
            return None

        landmarks = []
        for face in faces:
            shape = self.predictor(gray, face)
            for i in range(0, 68):
                landmarks.append((shape.part(i).x, shape.part(i).y))
        return landmarks

    def calculate_distance(self, landmarks, indices):
        if landmarks is None:
            return None

        points = np.array([landmarks[i] for i in indices])
        distance = np.mean(np.linalg.norm(points - np.flip(points, axis=0), axis=1))
        return distance

    def calculate_symmetry_ratios(self, original_landmarks, mirrored_landmarks):
        if original_landmarks is None or mirrored_landmarks is None:
            return None

        left_indices = [i for i in range(0, 17)]
        right_indices = [i for i in range(16, 0, -1)]
        forehead_indices = list(range(17, 27)) + list(range(17, 26))
        chin_to_ear_indices = left_indices + right_indices
        lip_corner_to_eye_and_ear_indices = left_indices + right_indices
        nose_to_ear_indices = left_indices + right_indices

        chin_to_ear_distance_original = self.calculate_distance(original_landmarks, chin_to_ear_indices)
        chin_to_ear_distance_mirrored = self.calculate_distance(mirrored_landmarks, chin_to_ear_indices)

        lip_corner_to_eye_and_ear_distance_original = self.calculate_distance(original_landmarks, lip_corner_to_eye_and_ear_indices)
        lip_corner_to_eye_and_ear_distance_mirrored = self.calculate_distance(mirrored_landmarks, lip_corner_to_eye_and_ear_indices)

        nose_to_ear_distance_original = self.calculate_distance(original_landmarks, nose_to_ear_indices)
        nose_to_ear_distance_mirrored = self.calculate_distance(mirrored_landmarks, nose_to_ear_indices)

        forehead_distance_original = self.calculate_distance(original_landmarks, forehead_indices)
        forehead_distance_mirrored = self.calculate_distance(mirrored_landmarks, forehead_indices)

        chin_to_ear_symmetry_ratio = chin_to_ear_distance_original / chin_to_ear_distance_mirrored
        lip_corner_to_eye_and_ear_symmetry_ratio = lip_corner_to_eye_and_ear_distance_original / lip_corner_to_eye_and_ear_distance_mirrored
        nose_to_ear_symmetry_ratio = nose_to_ear_distance_original / nose_to_ear_distance_mirrored
        forehead_symmetry_ratio = forehead_distance_original / forehead_distance_mirrored

        return chin_to_ear_symmetry_ratio, lip_corner_to_eye_and_ear_symmetry_ratio, nose_to_ear_symmetry_ratio, forehead_symmetry_ratio

    def test_symmetry_from_path(self, image_path):
        original_image = cv2.imread(image_path)
        if original_image is None:
            return None

        mirrored_image = cv2.flip(original_image, 1)

        original_landmarks = self.detect_landmarks(original_image)
        mirrored_landmarks = self.detect_landmarks(mirrored_image)

        symmetry_ratios = self.calculate_symmetry_ratios(original_landmarks, mirrored_landmarks)
        return symmetry_ratios