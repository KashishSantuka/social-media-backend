const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./routes/User");
const blogRouter = require("./routes/blog");
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDb is Connected");
  })
  .catch((e) => {
    // res.send({ error: e.message });
    console.log("Error occured in connecting MONGODB");
  });
// app.use("/");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Started At PORT:${PORT}`);
});
