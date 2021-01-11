const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");
const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));
//application/x-www-form-urlencoded를 분석해서 가져옴
app.use(bodyParser.json());
//application/json으로 된 파일을 분석해서 가져옴

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World! nodemon test2");
});

//register를 위한 라우트
app.post("/register", (req, res) => {
  //회원가입시 필요한 정보들을 client에서 가져온 후
  // 데이터 베이스에 넣어줌
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
  //save는 mongoDB
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
