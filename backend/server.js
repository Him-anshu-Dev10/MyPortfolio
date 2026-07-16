const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, "messages.json");

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON request bodies

// Initialize local storage file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// POST endpoint to save contact messages
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newMessage = {
    id: Date.now(),
    name,
    email,
    message,
    date: new Date().toISOString(),
  };

  try {
    // Read existing messages
    const data = fs.readFileSync(DATA_FILE, "utf8");
    const messages = JSON.parse(data);

    // Add new message and save
    messages.push(newMessage);
    fs.writeFileSync(DATA_FILE, JSON.stringify(messages, null, 2));

    res
      .status(201)
      .json({ success: true, message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

// GET endpoint to view messages (optional, for testing)
app.get("/api/messages", (req, res) => {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});

module.exports = app;
