require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/user.routes");
const userRecordRoutes = require("./routes/userRecord.routes");
const userManagementRoutes = require("./routes/userManagement.routes");
const adminRoutes = require("./routes/admin.routes");
const dashBoardRoutes = require("./routes/dashBoard.routes");

connectDB();
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/records", userRecordRoutes);
app.use("/api/users", userManagementRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/dashboard", dashBoardRoutes);

app.get("/work", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working",
  });
});

app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
