import cors from "cors";
import "dotenv/config";
import express from "express";
import "express-async-errors";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import Fuse from "fuse.js";
import NodeCache from "node-cache";
// connectDB

// error handler
const app = express();
app.use(
  rateLimiter({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 request per windowsMs
  })
);

app.use(helmet());
app.use(cors());

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
