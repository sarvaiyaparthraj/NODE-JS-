import express, { json } from "express";
import HtppError from "../middleware/HttpError";

const app = express();
app.use(express.json());
app.use("/employee",employyRouts);
app.get("/",(req,res)=>{
    res.json("hello from my server ");
});

app.use((req, res, next) => {
  return next(new HttpError("requested route not found", 404));
});
const port = 5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("failed to connect db");
    }

    app.listen(port, (err) => {
      if (err) {
        return console.log(err.message);
      }

      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

startServer();