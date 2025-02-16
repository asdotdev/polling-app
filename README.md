# Polling App

## Overview

A simple polling app where users can:

-   Create a poll with a question and multiple options.
-   Vote on a poll.
-   View poll results in real-time (auto-refresh every 5 seconds).
-   Delete a poll.

## Tech Stack

-   **Frontend:** Next.js 15 (with TypeScript, Tailwind CSS)
-   **Backend:** Next.js API routes (using Mongoose for MongoDB)
-   **Database:** MongoDB (Atlas or Local)

---

## Installation & Setup

### **1. Clone the Repository**

```sh
git clone https://github.com/yourusername/polling-app.git
cd polling-app
```

### **2. Install Dependencies**

```sh
npm install
```

### **3. Setup Environment Variables**

Create a `.env.local` file in the root directory and add:

```env
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### **4. Run the Development Server**

```sh
npm run dev
```

App will be available at `http://localhost:3000`

---

## API Endpoints

### **1. Get All Polls**

```http
GET /api/polls
```

**Response:**

```json
[
    {
        "_id": "12345",
        "question": "What's your favorite programming language?",
        "options": [
            { "text": "JavaScript", "votes": 10 },
            { "text": "Python", "votes": 8 }
        ]
    }
]
```

### **2. Get a Single Poll**

```http
GET /api/polls?id={pollId}
```

**Response:**

```json
{
    "_id": "12345",
    "question": "What's your favorite programming language?",
    "options": [
        { "text": "JavaScript", "votes": 10 },
        { "text": "Python", "votes": 8 }
    ]
}
```

### **3. Create a Poll**

```http
POST /api/polls
```

**Request Body:**

```json
{
    "question": "What's your favorite programming language?",
    "options": ["JavaScript", "Python", "C++"]
}
```

**Response:**

```json
{
    "_id": "12345",
    "question": "What's your favorite programming language?",
    "options": [
        { "text": "JavaScript", "votes": 0 },
        { "text": "Python", "votes": 0 },
        { "text": "C++", "votes": 0 }
    ]
}
```

### **4. Vote on a Poll**

```http
PUT /api/polls
```

**Request Body:**

```json
{
    "pollId": "12345",
    "optionIndex": 0
}
```

**Response:**

```json
{
    "_id": "12345",
    "question": "What's your favorite programming language?",
    "options": [
        { "text": "JavaScript", "votes": 11 },
        { "text": "Python", "votes": 8 }
    ]
}
```

### **5. Delete a Poll**

```http
DELETE /api/polls?id={pollId}
```

**Response:**

```json
{
    "message": "Poll deleted successfully"
}
```

---

## Database Schema

### **Poll Model (`Poll.ts`)**

```typescript
import mongoose, { Schema, Document } from "mongoose";

interface Option {
    text: string;
    votes: number;
}

export interface IPoll extends Document {
    question: string;
    options: Option[];
}

const PollSchema: Schema = new Schema({
    question: { type: String, required: true },
    options: [
        {
            text: { type: String, required: true },
            votes: { type: Number, default: 0 },
        },
    ],
});

export default mongoose.models.Poll ||
    mongoose.model<IPoll>("Poll", PollSchema);
```

---
