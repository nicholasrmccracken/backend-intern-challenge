# Fetch Backend Intern Challenge

This project implements a REST API that manages user points per payer. Users can add points, spend points, and fetch their current point balance. The API ensures that the oldest points are spent first and that no payer's points go negative.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
  - [Add Points](#add-points)
  - [Spend Points](#spend-points)
  - [Get Balance](#get-balance)
- [Testing](#testing)

## Tech Stack

- **Language:** TypeScript
- **Framework:** Express (Node.js)
- **Testing Frameworks:** Jest, Supertest

## Setup Instructions

Follow these steps to get the project up and running locally:

1. **Clone the Repository:**  
First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-repo/points-api.git
   cd points-api
   ```

2. **Install Dependencies:**  
Install all required Node.js dependencies by running the following command:

    ```bash
    npm install
    ```

3. **Start the Server:**  
To run the API server locally, use the following command:

    ```bash
    npm start
    ```

    The server will run on port 8000 by default. You can visit the API endpoints using <http://localhost:8000>.

4. **Running in Test Mode:**  
Running in test mode: To run the app in test mode, the environment variable NODE_ENV is set to test. This prevents the server from starting when importing the app for tests.

    ```bash
    NODE_ENV=test npm start
    ```

## API Endpoints

### Add Points

**Route**: `/add`  
**Method**: `POST`  
**Description**: Adds points for a specific payer at a given timestamp. You can add positive or negative points.

**Request Body Example**:

```json
{
  "payer": "DANNON",
  "points": 1000,
  "timestamp": "2022-11-02T14:00:00Z"
}
```

**Response**:

- `200 OK` if the transaction is successfully added.
- `400 Bad Request` if the request is malformed or if the operation would result in a negative point balance for any payer.

### Spend Points

**Route**: `/spend`  
**Method**: `POST`  
**Description**: Spends points for the user, ensuring the oldest points are spent first. No payer's points should go negative.

**Request Body Example**:

```json
{
  "points": 5000
}
```

**Response Example**:

```json
[
  { "payer": "DANNON", "points": -100 },
  { "payer": "UNILEVER", "points": -200 },
  { "payer": "MILLER COORS", "points": -4700 }
]
```

### Get Balance

**Route**: `/balance`  
**Method**: `GET`  
**Description**: Retrieves the current balance of points for each payer.

**Response Example**:

```json
{
  "DANNON": 1000,
  "UNILEVER": 0,
  "MILLER COORS": 5300
}
```

## Testing

Tests are written using Jest and Supertest to verify both the logic and the API endpoints.

To run the tests, execute:

```bash
npm test
```
