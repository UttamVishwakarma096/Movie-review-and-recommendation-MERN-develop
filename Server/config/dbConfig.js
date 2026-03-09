const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});
connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
