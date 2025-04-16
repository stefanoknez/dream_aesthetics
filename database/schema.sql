CREATE TABLE City (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    country VARCHAR(100)
);

CREATE TABLE Clinic (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    city_id INT NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(100),
    website VARCHAR(255),
    FOREIGN KEY (city_id) REFERENCES City(id)
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'USER', 'CLINIC_ADMIN') NOT NULL
);

CREATE TABLE AppointmentRequest (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    clinic_id INT NOT NULL,
    datetime TIMESTAMP NOT NULL,
    status ENUM('pending', 'confirmed', 'declined') DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (clinic_id) REFERENCES Clinic(id)
);

CREATE TABLE Photo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE AnalysisResult (
    id INT PRIMARY KEY AUTO_INCREMENT,
    photo_id INT NOT NULL,
    ear_distance FLOAT,
    mole_count INT,
    acne_detected BOOLEAN,
    wrinkle_score FLOAT,
    botox_recommended BOOLEAN,
    face_symmetry FLOAT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (photo_id) REFERENCES Photo(id)
);

CREATE TABLE Treatment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE Recommendation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    analysis_result_id INT NOT NULL,
    treatment_id INT NOT NULL,
    relevance_score FLOAT,
    notes TEXT,
    FOREIGN KEY (analysis_result_id) REFERENCES AnalysisResult(id),
    FOREIGN KEY (treatment_id) REFERENCES Treatment(id)
);

CREATE TABLE Comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    clinic_id INT NOT NULL,
    text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (clinic_id) REFERENCES Clinic(id)
);

CREATE TABLE Log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    action VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES User(id)
);