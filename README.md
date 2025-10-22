
# LuxuryStay Hotel Management System

A full-stack **Hotel Management System** built with **MERN stack** (MongoDB, Express, React, Node.js) for managing rooms, guests, bookings, check-ins, check-outs, and invoices. This project includes **PDF invoice generation** and **email notifications** for guest billing.

---

## 📌 Features

### Admin

* Add, update, delete, and view rooms.
* Manage room details and availability.

### Receptionist

* Add and manage guest profiles.
* Book rooms and check guests in.
* Checkout guests and generate PDF invoices.
* Email invoices automatically to guests.
* View all bookings with status and payment details.

### General

* Room availability management.
* Booking history and records.
* Integration with **NodeMailer** for sending emails.
* PDF invoice generation using **PDFKit**.

---

## 🛠 Technology Stack

| Layer        | Technology                    |
| ------------ | ----------------------------- |
| Frontend     | React.js, Bootstrap           |
| Backend      | Node.js, Express.js           |
| Database     | MongoDB, Mongoose             |
| Email        | Nodemailer                    |
| PDF          | PDFKit                        |
| Image Upload | Multer, Cloudinary (optional) |

---

## ⚡ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/luxurystay-hms.git
cd luxurystay-hms
```

2. **Backend setup**

```bash
cd backend
npm install
```

* Create a `.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

* Start backend server:

```bash
node index.js
# or
nodemon index.js
```

3. **Frontend setup**

```bash
cd frontend
npm install
npm run dev
```

* Open `http://localhost:5173` to view the app.

---

## 🔹 API Endpoints

| Method | Endpoint        | Description                       |
| ------ | --------------- | --------------------------------- |
| GET    | `/rooms`        | Get all rooms                     |
| POST   | `/rooms`        | Add a new room                    |
| PUT    | `/rooms/:id`    | Update room                       |
| DELETE | `/rooms/:id`    | Delete room                       |
| POST   | `/guest`        | Add guest                         |
| POST   | `/book`         | Book room                         |
| PUT    | `/checkout/:id` | Checkout guest & generate invoice |
| GET    | `/bookings`     | Get all bookings                  |

---

## 📂 Project Structure

```
backend/
 ├─ models/        # Mongoose schemas (Room, Guest, Reservation)
 ├─ routes/        # API routes
 ├─ server.js      # Express server
frontend/
 ├─ src/pages/     # React pages (Receptionist.jsx, Admin.jsx)
 ├─ src/components/ # Reusable components
 ├─ package.json
README.md
```

---

## 📝 Notes

* Ensure your backend and frontend ports match when using Axios.
* Use Gmail App Password for sending emails via Nodemailer.
* Rooms marked as “available” in DB are fetched for booking.
* PDF invoices are generated in backend and sent to guest email.

---

## 👨‍💻 Author

**Rayyan Hassan**
[GitHub](https://github.com/rayyanhassan321) | [Email](mailto:rayyanhassan1688@gmail.com)

---

I can also make a **shorter, visually appealing version with badges and screenshots** for GitHub if you want it to look more professional.

Do you want me to do that version too?
