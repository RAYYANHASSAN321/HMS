const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Import Models
const Users = require("./models/user");
const Roles = require("./models/roles");
const Room = require("./models/room");
const Guest = require("./models/Guest");
const Reservation = require("./models/Reservation");



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS (important for frontend)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
  })
);

// Secure session setup
app.use(
  session({
    secret: "hello",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // secure: false for localhost
  })
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: "<your_cloud_name>",
  api_key: "<your_api_key>",
  api_secret: "<your_api_secret>",
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// MongoDB Connection
async function main() {
  try {
    await mongoose.connect(
      "<your_atlas_datbase_link>"
    );
    console.log("Connected to MongoDB Atlas!");
  } catch (err) {
    console.error("MongoDB connection error: ", err);
  }
}
main();


// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await Users.find().populate("role", "name");
    res.status(200).json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Add new user (Sign Up)
app.post("/users", upload.single("image"), async (req, res) => {
  try {
    const { username, useremail, contact, password, address, roles } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!username || !useremail || !contact || !password || !address || !roles) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      name: username,
      email: useremail,
      contact,
      password: hashedPassword,
      address,
      image: imageUrl,
      role: roles,
    });

    await newUser.save();
    res.status(201).json({ message: "User added successfully!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to register user" });
  }
});
//--To delete user data 

app.delete('/users/:id' , async (req, res) =>{

    await  Users.findByIdAndDelete(req.params.id);
    res.status(200).json({message : "User has been deleted!!"})
})


// ---------To update user data


app.put('/users/:id' ,  upload.single('image') , async (req , res) =>{

    const id = req.params.id
    const imageUrl = req.file ? req.file.path : null;
    const {username , useremail , contact , password , address} = req.body  // form 
    const updatedData = {name : username , email : useremail , contact , password , address, image : imageUrl}

    await Users.findByIdAndUpdate(id , updatedData)

    res.status(200).json({message : "User updated successfully"})


})


// Add new role
app.post("/roles", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Role name is required!" });

    const roleName = name.trim().toLowerCase();
    const existingRole = await Roles.findOne({ name: roleName });
    if (existingRole)
      return res.status(409).json({ message: "Role already exists!" });

    const newRole = new Roles({ name: roleName });
    await newRole.save();

    res.status(201).json(newRole);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create role" });
  }
});

// Get all roles
app.get("/roles", async (req, res) => {
  try {
    const roles = await Roles.find();
    res.json(roles);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch roles" });
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email }).populate("role", "name");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    req.session.userId = user._id;
    req.session.userName = user.name;
    req.session.userRole = user.role.name;

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        role: user.role.name,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Login failed" });
  }
});
// Get Current Logged-In User
app.get("/currentUser", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  res.status(200).json({
    id: req.session.userId,
    name: req.session.userName,
    role: req.session.userRole, 
  });
});


// logout api
app.post("/logout", (req, res) => {
  res.clearCookie("connect.sid"); 
  req.session?.destroy(() => {});
  res.status(200).json({ message: "Logged out successfully" });
});



// Fetch all rooms
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// Add new room
app.post("/rooms", upload.single("image"), async (req, res) => {
  try {
    const { roomNumber, roomType, price, description, status } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    if (!roomNumber || roomNumber.trim() === "" || !roomType || !price || !imageUrl) {
      return res.status(400).json({ error: "All required fields must be filled!" });
    }

    const newRoom = new Room({
      roomNumber,
      roomType,
      price,
      description,
      image: imageUrl,
      status: status || "available", // default if not provided
    });

    await newRoom.save();
    res.status(201).json({ message: "Room added successfully!" });
  } catch (e) {
    console.error(e);
    if (e.code === 11000) {
      return res.status(400).json({ error: "Room number already exists!" });
    }
    res.status(500).json({ error: "Failed to add room" });
  }
});

// Update room
app.put("/rooms/:id", upload.single("image"), async (req, res) => {
  try {
    const { roomNumber, roomType, price, description, status } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const updatedData = { roomNumber, roomType, price, description, status };
    if (imageUrl) updatedData.image = imageUrl;

    await Room.findByIdAndUpdate(req.params.id, updatedData);
    res.status(200).json({ message: "Room updated successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update room" });
  }
});

// Delete room
app.delete("/rooms/:id", async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Room deleted successfully!" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete room" });
  }
});

/* =======================
   Receptionist APIs
======================= */


// Add Guest
app.post("/guest", async (req, res) => {
  try {
    const { name, contact, email, address, idProof } = req.body;
    const guest = new Guest({ name, contact, email, address, idProof });
    await guest.save();
    res.status(201).json({ message: "Guest added successfully!", guest });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to add guest" });
  }
});

// Get All Guests (optional)
app.get("/guestlist", async (req, res) => {
  try {
    const guests = await Guest.find().sort({ created_at: -1 });
    res.status(200).json(guests);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch guests" });
  }
});

// Get Rooms
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 });
    res.status(200).json(rooms);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch rooms" });
  }
});

// Book Room
app.post("/book", async (req, res) => {
  try {
    const { guestId, roomId, checkInDate, checkOutDate, totalAmount } = req.body;

    const room = await Room.findById(roomId);
    if (!room || room.status !== "available")
      return res.status(400).json({ error: "Room not available!" });

    const booking = new Reservation({
      guest: guestId,
      room: roomId,
      checkInDate,
      checkOutDate,
      totalAmount,
    });

    await booking.save();
    room.status = "booked";
    await room.save();

    res.status(201).json({ message: "Room booked successfully!", booking });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Booking failed!" });
  }
});

// Get All Bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Reservation.find()
      .populate("guest")
      .populate("room")
      .sort({ created_at: -1 });
    res.status(200).json(bookings);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});
// Checkout + PDF + Email Invoice
app.put("/checkout/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("guest")
      .populate("room");

    if (!reservation) return res.status(404).json({ error: "Booking not found!" });

    reservation.bookingStatus = "checked-out";
    reservation.paymentStatus = "paid";
    await reservation.save();

    const room = await Room.findById(reservation.room._id);
    if (room) {
      room.status = "maintenance";
      await room.save();
    }

    // Generate Invoice PDF
    const pdfName = `invoice_${reservation._id}.pdf`;
    const pdfPath = path.join(__dirname, pdfName);
    const doc = new PDFDocument({ margin: 40 });
    doc.pipe(fs.createWriteStream(pdfPath));

    // ======== PREMIUM HEADER ========
    doc.rect(0, 0, doc.page.width, 100).fill("#1b1464"); // Royal blue header
    doc
      .fillColor("#FFD700") // Gold text
      .fontSize(26)
      .font("Helvetica-Bold")
      .text("LUXURY STAY", { align: "center", baseline: "middle" });
    doc.moveDown(0.5);
    doc
      .fontSize(14)
      .fillColor("#FFFFFF")
      .text("Hotel Invoice", { align: "center" });
    doc.moveDown(2);
    doc.fillColor("#000000");

    // ======== GUEST DETAILS ========
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor("#1b1464")
      .text("Guest Information", { underline: true });
    doc.moveDown(0.5);

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#000000")
      .text(`Name: ${reservation.guest.name}`)
      .text(`Contact: ${reservation.guest.contact}`)
      .text(`Email: ${reservation.guest.email || "N/A"}`)
      .text(`Address: ${reservation.guest.address || "N/A"}`);
    doc.moveDown(1.5);

    // ======== ROOM DETAILS ========
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor("#1b1464")
      .text("Room Details", { underline: true });
    doc.moveDown(0.5);

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#000000")
      .text(`Room Number: ${reservation.room.roomNumber}`)
      .text(`Room Type: ${reservation.room.roomType}`)
      .text(`Check-In: ${new Date(reservation.checkInDate).toLocaleDateString()}`)
      .text(`Check-Out: ${new Date(reservation.checkOutDate).toLocaleDateString()}`);
    doc.moveDown(1.5);

    // ======== BILL SUMMARY ========
    doc
      .font("Helvetica-Bold")
      .fontSize(18)
      .fillColor("#1b1464")
      .text("Billing Summary", { underline: true });
    doc.moveDown(0.5);

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("#000000")
      .text(`Total Amount: $${reservation.totalAmount}`, { continued: false })
      .text(`Payment Status: PAID`);
    doc.moveDown(2);

    // ======== FOOTER ========
    doc
      .font("Helvetica-Oblique")
      .fontSize(11)
      .fillColor("#555555")
      .text(
        "Thank you for choosing LUXURY STAY. We hope you had a wonderful experience!",
        { align: "center" }
      )
      .moveDown(0.5)
      .text("www.luxurystay.com | contact@luxurystay.com", {
        align: "center",
      });

    doc.end();

    // ======== EMAIL SENDING (unchanged) ========
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rayyanhassan1688@gmail.com",
        pass: "whkh bdmz ffjh ijoz",
      },
    });

    if (reservation.guest.email) {
      const mailOptions = {
        from: `LUXURY STAY <rayyanhassan1688@gmail.com>`,
        to: reservation.guest.email,
        subject: "Your Stay Invoice - LUXURY STAY",
        text: "Thank you for staying with us! Please find your invoice attached.",
        attachments: [{ filename: "invoice.pdf", path: pdfPath }],
      };

      await transporter.sendMail(mailOptions);
      fs.unlinkSync(pdfPath);
    } else {
      fs.unlinkSync(pdfPath);
    }

    res
      .status(200)
      .json({ message: "Checkout successful! Invoice sent via email.", reservation });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Checkout failed!" });
  }
});

// Start Server
app.listen(8000, () => {
  console.log("Server started on port 8000!");
});



