require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/user.routes");
const userRecordRoutes = require("./routes/userRecord.routes");
const userManagementRoutes = require("./routes/userManagement.routes");

connectDB();
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/records", userRecordRoutes);
app.use("/api/users", userManagementRoutes);

app.get("/work", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working",
  });
});

app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
