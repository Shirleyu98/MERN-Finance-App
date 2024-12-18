import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/KPI.js";
import { kpis, products, transactions } from "./data/data.js";
import Product from "./models/PRODUCT.js";
import Transaction from "./models/Transaction.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);



/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    try{
        const existingKpis = await mongoose.connection.db.collection('kpis').find().toArray();
        console.log("existingKpis",existingKpis);
        const existingProducts = await mongoose.connection.db.collection('products').find().toArray();
        console.log("existingProducts",existingProducts);
        const existingTransactions = await mongoose.connection.db.collection('transactions').find().toArray();
        console.log("existingTransactions",existingTransactions);
        // /* ADD DATA ONE TIME ONLY OR AS NEEDED */
        // await mongoose.connection.db.dropDatabase()
          
        // await KPI.insertMany(kpis, { ordered: false });
        // await Product.insertMany(products, { ordered: false });
        // await Transaction.insertMany(transactions, { ordered: false });


    }catch(error){
      console.log(error);
    }

  })
  .catch((error) => console.log(`${error} did not connect`));
