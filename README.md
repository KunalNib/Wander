# 🏕️ WanderLust

<div align="center">

![WanderLust Banner](https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

**A full-stack web application for exploring, creating, and managing travel destination listings.**

[![Node.js](https://img.shields.io/badge/Node.js-22.15.1-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Passport](https://img.shields.io/badge/Passport.js-0.7.0-34E27A?style=for-the-badge&logo=passport)](http://www.passportjs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Configuration](#-configuration) • [Usage](#-usage) • [API Routes](#-api-routes) • [Project Structure](#-project-structure)

</div>

---

## 📖 About

WanderLust is a feature-rich, full-stack web application that allows users to explore, create, edit, and delete property or travel destination listings. Built with a modular MVC architecture, the platform focuses on **listing management** with interactive maps, user authentication, and a review system.

> **Note:** This project focuses on listing management and does **not** include booking features.

---

## ✨ Features

### 🏠 Listing Management
- **Create Listings** — Add new travel destinations with title, description, price, location, and images
- **Edit & Update** — Modify existing listings with real-time geocoding updates
- **Delete Listings** — Remove listings with cascading deletion of associated reviews
- **Search Functionality** — Find listings by name, description, or location

### 🗺️ Interactive Maps
- **Leaflet.js Integration** — View listing locations on an interactive map
- **OpenStreetMap Geocoding** — Automatic coordinate generation using Nominatim API
- **GeoJSON Support** — Store and display location data with GeoJSON Point geometry

### 🔐 Authentication & Authorization
- **User Registration** — Secure signup with username, email, and password
- **Login/Logout** — Session-based authentication using Passport.js
- **Access Control** — Only listing owners can edit or delete their listings
- **Protected Routes** — Middleware-based route protection

### ⭐ Review System
- **Leave Reviews** — Users can rate (1-5 stars) and comment on listings
- **Author Attribution** — Reviews display the author's username
- **Review Authorization** — Only review authors can delete their reviews

### 🖼️ Image Management
- **Cloudinary Integration** — Cloud-based image storage and delivery
- **Image Optimization** — Automatic image resizing and format optimization
- **Multiple Formats** — Support for PNG, JPEG, and JPG formats

### 💾 Session Management
- **MongoDB Session Store** — Persistent sessions using connect-mongo
- **Cookie Configuration** — Secure, HTTP-only cookies with 3-day expiration
- **Flash Messages** — User feedback for actions (success/error notifications)

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js 5.1** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose 8.x** | MongoDB ODM |
| **Passport.js** | Authentication middleware |
| **passport-local-mongoose** | Passport plugin for Mongoose |

### Frontend
| Technology | Purpose |
|------------|---------|
| **EJS** | Templating engine |
| **ejs-mate** | Layout support for EJS |
| **Bootstrap** | CSS framework |
| **Leaflet.js** | Interactive maps |

### Integrations & Utilities
| Technology | Purpose |
|------------|---------|
| **Cloudinary** | Image storage and CDN |
| **Multer** | File upload handling |
| **multer-storage-cloudinary** | Cloudinary storage engine for Multer |
| **Joi** | Schema validation |
| **connect-flash** | Flash messages |
| **connect-mongo** | MongoDB session store |
| **method-override** | HTTP method override |
| **dotenv** | Environment variable management |

---

## 📦 Installation

### Prerequisites
- **Node.js** v22.15.1 or higher
- **MongoDB** (local instance or MongoDB Atlas)
- **Cloudinary Account** (for image storage)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/KunalNibrad/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Configuration](#-configuration))

4. **Initialize the database** (optional - for sample data)
   ```bash
   node init/index.js
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. **Open in browser**
   ```
   http://localhost:8080
   ```

---

## ⚙️ Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database
ATLAS_DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wanderlust

# Session Secret
SECRET=your-session-secret-key

# Cloudinary Configuration
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ATLAS_DB_URL` | MongoDB Atlas connection string |
| `SECRET` | Session encryption secret key |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |

---

## 🚀 Usage

### Creating a Listing
1. Sign up or log in to your account
2. Click "Create New Listing"
3. Fill in the listing details (title, description, price, location, country)
4. Upload an image
5. Submit to create your listing

### Searching Listings
- Use the search bar to find listings by name, description, or location
- Browse all listings on the homepage

### Leaving a Review
1. Navigate to a listing's detail page
2. Scroll to the review section
3. Select a star rating (1-5)
4. Write your comment
5. Submit your review

---

## 🔗 API Routes

### Listings

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| `GET` | `/listings` | Get all listings | ❌ |
| `GET` | `/listings/new` | New listing form | ✅ |
| `POST` | `/listings` | Create listing | ✅ |
| `GET` | `/listings/:id` | Get single listing | ❌ |
| `GET` | `/listings/:id/edit` | Edit listing form | ✅ (Owner) |
| `PUT` | `/listings/:id` | Update listing | ✅ (Owner) |
| `DELETE` | `/listings/:id` | Delete listing | ✅ (Owner) |
| `GET` | `/listings/search` | Search listings | ❌ |

### Reviews

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| `POST` | `/listings/:id/reviews` | Create review | ✅ |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete review | ✅ (Author) |

### Users

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| `GET` | `/signup` | Signup form | ❌ |
| `POST` | `/signup` | Create account | ❌ |
| `GET` | `/login` | Login form | ❌ |
| `POST` | `/login` | Authenticate | ❌ |
| `GET` | `/logout` | Logout | ✅ |

---

## 📁 Project Structure

```
wanderlust/
├── 📂 controllers/           # Route controllers (business logic)
│   ├── listing.js           # Listing CRUD operations
│   ├── review.js            # Review operations
│   └── user.js              # Authentication operations
│
├── 📂 models/                # Mongoose schemas
│   ├── listing.js           # Listing model with GeoJSON
│   ├── review.js            # Review model
│   └── user.js              # User model with Passport plugin
│
├── 📂 routes/                # Express route definitions
│   ├── listing.js           # Listing routes
│   ├── review.js            # Review routes
│   └── user.js              # Auth routes
│
├── 📂 views/                 # EJS templates
│   ├── 📂 includes/         # Partial templates
│   ├── 📂 layouts/          # Layout templates
│   ├── 📂 listings/         # Listing views
│   └── 📂 users/            # Auth views
│
├── 📂 public/                # Static assets
│   ├── 📂 css/              # Stylesheets
│   └── 📂 js/               # Client-side JavaScript
│
├── 📂 utils/                 # Utility functions
│   ├── ExpressError.js      # Custom error class
│   └── wrapAsync.js         # Async error handler wrapper
│
├── 📂 init/                  # Database initialization
│   ├── data.js              # Sample listing data
│   └── index.js             # Database seeder
│
├── app.js                    # Application entry point
├── cloudConfig.js            # Cloudinary configuration
├── middleware.js             # Custom middleware functions
├── schema.js                 # Joi validation schemas
├── package.json              # Dependencies and scripts
└── .env                      # Environment variables (not in repo)
```

---

## 🗄️ Data Models

### Listing Schema
```javascript
{
  title: String,          // Required
  description: String,
  image: {
    url: String,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  reviews: [ObjectId],    // Reference to Review
  owner: ObjectId,        // Reference to User
  geometry: {
    type: "Point",
    coordinates: [Number] // [longitude, latitude]
  }
}
```

### Review Schema
```javascript
{
  comment: String,
  rating: Number,         // 1-5
  createdAt: Date,
  author: ObjectId        // Reference to User
}
```

### User Schema
```javascript
{
  email: String,          // Required
  username: String,       // Managed by passport-local-mongoose
  hash: String,           // Password hash
  salt: String            // Password salt
}
```

---

## 🔒 Security Features

- **Password Hashing** — Automatic hashing with passport-local-mongoose
- **Session Security** — HTTP-only cookies with secure session storage
- **Input Validation** — Server-side validation using Joi schemas
- **Authorization Middleware** — Owner/author verification for protected actions
- **Error Handling** — Custom error classes with proper HTTP status codes

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the ISC License.

---

## 👤 Author

**Kunal Nibrad**

- GitHub: [@KunalNibrad](https://github.com/KunalNibrad)

---

<div align="center">

⭐ **Star this repository if you found it helpful!** ⭐

Made with ❤️ by Kunal Nibrad

</div>
