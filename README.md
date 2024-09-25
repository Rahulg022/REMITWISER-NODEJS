REMITWISER is a remittance payment system that enables users to send money across borders. It provides a seamless process for registering, adding remitter and beneficiary information, and securely sending funds. The backend is developed using Node.js and MongoDB, ensuring efficient handling of user data, transactions, and security.

Features

User Registration & Authentication: Secure user registration and login using JWT authentication and bcrypt for password hashing.
Remitter Information: Users can provide personal information, bank details, and have the option to use registered information for remittance.
Beneficiary Management: Ability to add beneficiary personal and bank information for the transaction.
Send Money: Allows users to specify currency, amount, payment method, and additional remarks for the transaction.
Secure Transactions: Secure handling of sensitive data with environment variables and encryption mechanisms


API Endpoints

POST /register: Register a new user.
POST /login: Authenticate a user and return a JWT.
POST /remitter: Add or update remitter information.
POST /beneficiary: Add beneficiary information.
POST /send-money: Process a remittance transaction.



Technologies Used

Backend: Node.js, Express
Database: MongoDB, Mongoose
Authentication: JWT, bcrypt
Environment Management: dotenv