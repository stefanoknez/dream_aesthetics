CREATE TABLE Cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    country VARCHAR(100)
);

CREATE TABLE Clinics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    city_id INT NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(100),
    website VARCHAR(255),
    FOREIGN KEY (city_id) REFERENCES Cities(id)
);

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'USER') NOT NULL
);     

CREATE TABLE AppointmentRequests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    clinic_id INT NOT NULL,
    datetime TIMESTAMP NOT NULL,
    status ENUM('pending', 'confirmed', 'declined') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (clinic_id) REFERENCES Clinics(id)
);

CREATE TABLE Photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE AnalysisResults (
    id INT PRIMARY KEY AUTO_INCREMENT,
    photo_id INT NOT NULL,
    ear_distance FLOAT,
    mole_count INT,
    acne_detected BOOLEAN,
    wrinkle_score FLOAT,
    botox_recommended BOOLEAN,
    face_symmetry FLOAT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (photo_id) REFERENCES Photos(id)
);

CREATE TABLE Treatments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE Recommendations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    analysis_result_id INT NOT NULL,
    treatment_id INT NOT NULL,
    relevance_score FLOAT,
    notes TEXT,
    FOREIGN KEY (analysis_result_id) REFERENCES AnalysisResults(id),
    FOREIGN KEY (treatment_id) REFERENCES Treatments(id)
);

CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    clinic_id INT NOT NULL,
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (clinic_id) REFERENCES Clinics(id)
);

CREATE TABLE Logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);