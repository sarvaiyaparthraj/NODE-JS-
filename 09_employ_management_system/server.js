import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employee.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/", employeeRoutes);

app.use((req, res, next) => next(new (class extends Error { constructor(){ super("Requested route not found"); this.statusCode=404; } })()));
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  if (req.path.startsWith("/api/")) return res.status(status).json({ message: err.message || "Internal server error" });
  res.status(status).render("error", { message: err.message || "Internal server error" });
});

async function startServer() {
  const connected = await connectDB();
  if (!connected) process.exit(1);
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
startServer();
