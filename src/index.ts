import express from "express";
import userRouter from "./routes/userRoute";
import postRouter from "./routes/postRoute";
import cookieParser from "cookie-parser";
import { getData } from "./controllers/getData";
import { sendData } from "./controllers/sendData";
import { userValidator } from "./middleware/userValidator";
import { upload } from "./config/multer/index";
import { imageURl } from "./controllers/imageURl";
import { fetchBlog } from "./controllers/fetchBlog";
import { likeOnPost } from "./controllers/likeOnPost";
import { getUserDetail } from "./controllers/getUserDetail";
import { GetAllUsers } from "./controllers/getAllUsers";
import { Conversation } from "./controllers/Conversation";
import { GetConversation } from "./controllers/Conversation";
import { Message } from "./controllers/Message";
import { GetMessage } from "./controllers/Message";
import cors from "cors";
import http from "http";
import { socketSetup } from "./socket";
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://blog-post-react-frontend-sigma.vercel.app"
];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cookieParser());
app.use(cors(corsOptions));

// Socket setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH"],
    credentials: true

  }
});

socketSetup(io);

// Routes
app.post('/conversation', Conversation);
app.get('/getConversation/:userId', GetConversation);
app.post('/message', Message);
app.get('/getMessage/:conversationId', GetMessage);
app.use(userRouter);
app.use(postRouter);

app.post('/sendData', upload.single('thumbnail'), userValidator, getData);
app.post('/imageURl', upload.single('image'), imageURl);
app.get('/getData', sendData);
app.get('/fetchBlog/:title', fetchBlog);
app.patch('/likeonpost', userValidator, likeOnPost);
app.get('/getUserDetail', userValidator, getUserDetail);
app.get('/getallusers', userValidator, GetAllUsers);

// Start server
const PORT = 9000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

export default app;
