# dream_aesthetics

AI-powered facial analysis and aesthetic recommendation system (React + Node + Python + SQL)

## Opis

dream_aesthetics je full-stack aplikacija koja korisnicima omogućava da uploaduju fotografiju svog lica radi analize estetskih karakteristika pomoću veštačke inteligencije. Na osnovu analize sistema (otapostazija, bore, mladeži, simetrija, akne), korisniku se nude potencijalni estetski tretmani i preporuke klinika.

## Tehnologije

- Frontend: React
- Backend: Node.js + Express
- Baza podataka: MySQL ili PostgreSQL
- AI servis: Python (Flask ili FastAPI)
- ORM: Sequelize ili TypeORM
- Autentikacija: JWT
- Verzija koda: Git + GitHub

## Struktura projekta

dream_aesthetics/
├── backend/         # Node.js API server
├── frontend/        # React aplikacija
├── ai_service/      # Python AI servis za analizu slike
├── database/        # SQL skripte i dijagrami
├── README.md        # Dokumentacija

## Funkcionalnosti

- Registracija i login sa više tipova korisnika (korisnik, administrator)
- Upload fotografije lica
- AI analiza: klempavost (otapostazija), mladeži, akne, bore, simetrija
- Preporuka tretmana na osnovu rezultata
- Pretraga i filtriranje estetskih klinika
- Komentari korisnika na klinike
- Administrator upravlja klinikama i tretmanima
- Responsive dizajn

## Pokretanje projekta lokalno

### 1. Kloniranje repozitorijuma
git clone https://github.com/stefanoknez/dream_aesthetics.git
cd dream_aesthetics

### 2. Instalacija backend zavisnosti
cd backend
npm install

### 3. Instalacija frontend zavisnosti
cd ../frontend
npm install

### 4. Pokretanje AI servisa
cd ../ai_service
pip install -r requirements.txt
python app.py

## Kontakt
Autor: Stefan Knežević  
GitHub: https://github.com/stefanoknez