# S-Bill (Invoice & Billing Management API)

A secure Spring Boot backend service for managing user onboarding, authentication, verification, and billing workflows. Features email verification, OAuth2 social authentication (Google & Facebook), and JPA integration with MySQL.

---

## Tech Stack

### Backend
- **Java**: 17
- **Framework**: Spring Boot 3 (Spring Security, Spring Data JPA, Spring Mail)
- **Security**: OAuth2 Client (Google & Facebook), BCrypt password hashing
- **Database**: MySQL / MariaDB with Hibernate
- **Build Tool**: Apache Maven (`mvnw` wrapper included)

### Frontend
- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Authentication Client**: Native Fetch API with session cookie management and Vite reverse proxy

---

## Key Features

- **User Registration & Security**:
  - Encrypted password storage using `BCryptPasswordEncoder`.
  - Unique account code generation (`<EMAIL_PREFIX>-<UUID_SUFFIX>`).
  - 6-digit email OTP verification on account creation.
- **Authentication**:
  - Secure local sign-in with verified account gating.
  - Social OAuth2 login via Google and Facebook.
- **Transactional Notifications**:
  - Integrated email service for time-sensitive verification codes.
- **Security-First Configuration**:
  - Fully externalized environment variables preventing credential leakage.

---

## Prerequisites

Ensure you have the following installed on your local development machine:

- **Java Development Kit (JDK)**: Version 17 or higher
- **MySQL Database Server**: Version 8.0 or higher
- **Maven**: (Optional; included Maven Wrapper `./mvnw` is recommended)
- **SMTP Provider**: e.g., Gmail with App Password generated

---

## Configuration & Environment Variables

Never commit secrets to version control. Set up your local environment variables in your shell or an untracked `.env` file based on `.env.example`:

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `DB_URL` | MySQL JDBC Connection URL | `jdbc:mysql://127.0.0.1:3306/invoicegenerator` |
| `DB_USERNAME` | MySQL database username | `root` |
| `DB_PASSWORD` | MySQL database password | *(secret)* |
| `GOOGLE_CLIENT_ID` | Google OAuth2 client ID | *(your Google OAuth client ID)* |
| `GOOGLE_CLIENT_SECRET` | Google OAuth2 client secret | *(your Google OAuth client secret)* |
| `FACEBOOK_CLIENT_ID` | Facebook OAuth2 client ID | *(your Facebook app ID)* |
| `FACEBOOK_CLIENT_SECRET`| Facebook OAuth2 client secret | *(your Facebook app secret)* |
| `GMAIL_USERNAME` | SMTP sender email address | `user@gmail.com` |
| `GMAIL_APP_PASSWORD` | SMTP application-specific password | *(16-character app password)* |

---

## Build & Run Instructions

### 1. Clone & Navigate
```bash
git clone https://github.com/Sarthak-chanda/S-Bill.git
cd S-Bill
```

### 2. Prepare Database
Create the MySQL database before launching the application:
```sql
CREATE DATABASE invoicegenerator;
```

### 3. Build the Application
```bash
./mvnw clean package -DskipTests
```

### 4. Run the Application
Export required environment variables and run:
```bash
export DB_PASSWORD="your_mysql_password"
export GMAIL_USERNAME="your_email@gmail.com"
export GMAIL_APP_PASSWORD="your_app_password"

./mvnw spring-boot:run
```
The server will start on default port `8080`.

### 5. Run the Frontend
In a separate terminal, navigate to `frontend` and start the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
The client will be accessible at `http://localhost:5173`.

---

## API Documentation

### Public Endpoints

#### 1. Sign Up
- **Method**: `POST`
- **URL**: `/api/invoice/signup`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password123!",
  "phoneNumber": "+1234567890",
  "address": "123 Main St",
  "businessName": "Acme Corp"
}
```
- **Response**: `201 Created` — Sends a 6-digit verification code to the registered email.

#### 2. Verify Email
- **Method**: `POST`
- **URL**: `/api/invoice/verify?email={email}&code={code}`
- **Response**: `200 OK` on valid OTP match.

#### 3. Sign In
- **Method**: `POST`
- **URL**: `/api/invoice/signin`
- **Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```
- **Response**: `200 OK` (requires account to be verified).

#### 4. OAuth2 Social Login
- **Google Login**: `/oauth2/authorization/google`
- **Facebook Login**: `/oauth2/authorization/facebook`
- **Success Callback**: `/api/invoice/oauth2/success`

---

## License
Proprietary / Private project.
