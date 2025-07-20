import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import { AuthRouter } from "./src/auth/auth.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api/v1/auth", AuthRouter);
