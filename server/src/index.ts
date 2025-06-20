import dotenv from "dotenv";
import { connectDB } from "./db/index";
import { app } from "./app";

// Load environment variables
dotenv.config({
  path: "./.env",
});

// Start the app
connectDB()
  .then(() => {
    // Handle server errors before starting
    app.on("error", (error: any) => {
      console.error("Server Error:", error);
      throw error;
    });

    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("MongoDB Connection Failed:", error);
  });
