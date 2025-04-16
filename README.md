# Farmers Market E-commerce

A Next.js e-commerce application for a farmers market with MongoDB integration.

## Features

- Product browsing and search
- Shopping cart with persistent storage in MongoDB
- UPI payment integration
- Responsive design

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd farmers-market
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
MONGODB_URI=mongodb://localhost:27017/farmers-market
```

### Running the Application

#### Option 1: Using the provided MongoDB script

This option starts MongoDB locally using a script:

```bash
npm run dev:with-db
```

This will start both MongoDB and the Next.js development server.

#### Option 2: Using an existing MongoDB instance

If you already have MongoDB running, you can just start the Next.js development server:

```bash
npm run dev
```

Make sure to update the `MONGODB_URI` in your `.env` file to point to your MongoDB instance.

### Building for Production

```bash
npm run build
npm start
```

## MongoDB Integration

The application uses MongoDB to store cart data. The cart is associated with a user ID and persists between sessions.

### Data Structure

The cart data is stored in the following structure:

```json
{
  "userId": "string",
  "items": [
    {
      "id": "string",
      "name": "string",
      "price": "number",
      "unit": "string",
      "farmer": "string",
      "image": "string",
      "quantity": "number"
    }
  ],
  "total": "number",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## API Routes

- `GET /api/cart?userId=<userId>` - Get cart data for a user
- `POST /api/cart` - Save cart data for a user

## License

MIT 