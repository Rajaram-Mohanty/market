# ☕ Market Backend - Spring Boot REST API

This directory contains the core backend services for the Market Multi-Vendor Marketplace, built with Spring Boot, Spring Security (JWT), Spring Data JPA, and MySQL.

---

## 🏗️ Architecture & Package Layout

The backend is structured using the Controller-Service-Repository pattern under the root package `org.projects.market`:

```
org.projects.market/
├── config/             # Spring Security, JWT, CORS, Cloudinary config definitions
├── controller/         # REST API Endpoints (receives HTTP requests, maps outputs)
├── domain/             # Enumeration schemas (USER_ROLE, OrderStatus, PaymentStatus, etc.)
├── exceptions/         # Global controller advise and custom exception handlers
├── model/              # JPA Database Entity classes (mapped tables and relations)
├── repository/         # Spring Data JPA Repository interfaces (db queries)
├── request/            # Data Transfer Objects (DTOs) for incoming payloads
├── response/           # Data Transfer Objects (DTOs) for outgoing responses
├── service/            # Core business logic Interfaces
│   └── impl/           # Service implementations
├── utils/              # Helper utilities (e.g., OTP generator)
└── MarketApplication   # Main Spring Boot launcher class
```

---

## 🔒 Security & Authentication

The application implements a stateless security session structure using Spring Security and JSON Web Tokens (JWT).

*   **Filter Pipeline:** All incoming requests (except public endpoints) pass through `JwtTokenValidator` (subclass of `OncePerRequestFilter`). This validator extracts the JWT from the `Authorization` header, parses the signing key, loads user authorities (e.g., `ROLE_CUSTOMER`, `ROLE_SELLER`, `ROLE_ADMIN`), and populates the `SecurityContext`.
*   **Password Hashing:** Passwords are encrypted during registration using `BCryptPasswordEncoder`.
*   **CORS Config:** Standardized cross-origin request configurations to support secure cross-origin headers, allowing cookie sharing and custom header exposures (`Authorization`).

---

## 🔗 Integrated Services & Integrations

The backend implements several external service connectors to support full e-commerce operations:

1.  **Resend API:** Integrated via `EmailService` to dispatch transactional emails and OTPs for seller onboarding and password recoveries.
2.  **Cloudinary:** Image hosting platform. Images uploaded by sellers/customers are uploaded directly to Cloudinary, and the return URLs are stored in the MySQL database.
3.  **Razorpay:** Integrated for payment link generation and payment callback validation.
4.  **Stripe:** Integrated as a secondary card payment method, utilizing the Stripe SDK to generate checkout session links.

---

## 📦 Database Schemas & Mappings

The entities are mapped to MySQL using Hibernate annotations. Key optimization features implemented:
*   **Lazy Loading:** Association collections are configured with `FetchType.LAZY` to optimize query performance and prevent unnecessary database roundtrips.
*   **JSON Serialization Controls:** `@JsonIgnoreProperties` and `@JsonIgnore` annotations are applied to prevent recursive serialization references and avoid `LazyInitializationExceptions`.
*   **Batching:** Collection lists (like product images) are annotated with `@BatchSize` to fetch items in batches, eliminating N+1 selection issues.

---

## 🚀 Setup & Local Execution

### Prerequisites
*   Java Development Kit (JDK) 21 installed.
*   Maven installed (or use the included wrapper `./mvnw`).
*   Running MySQL database instance.

### Configuration
1.  Open `src/main/resources/application.properties`.
2.  Configure your MySQL connection:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/market
    spring.datasource.username=root
    spring.datasource.password=yourpassword
    ```
3.  Add API keys for Resend, Cloudinary, Razorpay, and Stripe.

### Execution
Build and compile the dependencies:
```bash
./mvnw clean install
```

Run the application:
```bash
./mvnw spring-boot:run
```
The REST API server will run on `http://localhost:5454`. You can test endpoints via Postman or Swagger by sending requests to this base URL.
