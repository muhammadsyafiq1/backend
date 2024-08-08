import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";
import db from "./config/Database.js";
import Product from "./models/ProductModel.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(ProductRoute);

try {
  await db.authenticate();
  console.log("Database Connected");
  // await Product.sync();
} catch (error) {
  console.error(error);
}

app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
