import express, { response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import session from "express-session";
import UserAuth from './routes/userAuth.js';
import verifyUser from "./routes/VerifyUser.js";
import UserResponse from "./routes/userResponse.js";


const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());

app.use(
  session({
    secret: 'gradio',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);


app.get('/home', verifyUser, (req, res) => {
  return res.json({ Status: 'success', name: req.name });
  console.log
});



// =================================== User Auth ==================================

app.use(UserAuth);

// =================================== User Response ==============================


app.use(UserResponse);





app.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy()
    return res.json({ Status: "success" })
  }

  else {
    return res.redirect('/signin')
  }
})


app.listen(8081, () => {
  console.log("Running....");
})
