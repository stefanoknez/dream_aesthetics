import cv2
import numpy as np

def detect_moles(image):
    # Pretvaranje u HSV da bi se bolje razdvojile tamnije regije
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Maskiram tamno smedje do crne nijanse (u granicama mladeza)
    lower_brown = np.array([0, 20, 30])
    upper_brown = np.array([50, 255, 100])
    mask = cv2.inRange(hsv, lower_brown, upper_brown)

    #Uklanjanje suma
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    cleaned_mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=2)

    # Detekcija kontura
    contours, _ = cv2.findContours(cleaned_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # Filtriranje na osnovu veličine - ne racunam sad ovdje
    # previse male tačke
    mole_count = 0
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if 10 < area < 300:  # Podesavam prema rezoluciji slike
            mole_count += 1

    return mole_count
