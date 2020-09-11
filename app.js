const express = require("express");
const mongoose = require("mongoose"); // 載入 mongoose
mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection;
// 連線異常
db.on("error", () => {
  console.log("mongodb error!");
});
// 連線成功
db.once("open", () => {
  console.log("mongodb connected!");
});

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
