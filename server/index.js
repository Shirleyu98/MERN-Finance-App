import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const PORT = process.env.PORT;

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log(`server port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('debug', true);  // 启用 Mongoose 调试模式


// async function connectToMongoDB() {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 10000, // 增加超时时间
//     });
//     console.log('成功连接到 MongoDB');
//   } catch (error) {
//     console.error('MongoDB连接错误:', error);
    
//     // 详细错误诊断
//     if (error.code === 'ESERVFAIL') {
//       console.error('DNS解析失败，可能的原因：');
//       console.error('1. 网络连接问题');
//       console.error('2. DNS服务器配置错误');
//       console.error('3. MongoDB Atlas 集群配置问题');
//     }
    
//     process.exit(1);
//   }
// }

// connectToMongoDB();