// EJS Frameworkda Portfolio publishing qilamiz!
// BSSR (Backend Server-Side Rendering) & SPA (Single Page Application)

console.log("Web Serverni boshlanishi");

// MongoDB connection
const db = require("./server").db();

// 1 -> Kirish qismi
const express = require("express");
const app = express(); // function
const fs = require("fs"); // j.son formatdagi ma'lumotlarni to'g'ridan-to'g'ri olib kela olmaymiz; fileSystem (core package)
const { error } = require("console");

let user; // (obj.) fs orqali databasedagi user.json fileni o'qishga harakat qilyapmiz.
fs.readFile("database/user.json", "utf-8", (err, data) => {
  // utf-8 -> def.; JSONdagi text-related ma'lumotlarni barcha tillarda to'g'ri o'qish va buzmasdan uzatish uchun
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data); // json papkadagi fs o'qigan ma'lumotni .json formatdan objectga parse qilyapmiz  JSON -> "name": "Harry" vs. OBJECT -> name: "Harry"
  }
});

// Expressga kirib kelayotgan ma'lumotga bog'liq kodlar
app.use(express.static("public")); //clientlarga public folderni ochiq qilib beradi.
app.use(express.json()); // kirib kelayotgan json formatdagi datani objectga o'zgartirib beradi
app.use(express.urlencoded({ extended: true })); //HTMLdagi traditional request formdan nimadir post qilsak express qabul qilib serverga kiritadi

// 2 -> Session qismi: Sessionga bog'liq ma'lumotlar
// 3 -> Views qismi: Express uchun BSSR (Backendda view (Frontend) yasaymiz)
app.set("views", "views"); // agar folder nomini o'zgartirsak, 2-dagi "views"ni o'sha nomga o'zgartirishimiz kerak bo'ladi
app.set("view engine", "ejs"); //EJS - Backendda HTML frontendni yasaymiz

// 4 -> Routing qismi
app.post("/create-item", (req, res) => {
  console.log(req.body);
  res.json({ test: "success" });
});

// -----------  STEP 1 -----------
app.get("/author", (req, res) => {
  // get -> link; req & res
  res.render("author", { user: user }); // res.render -> author ejs page;  user -> publishing (page'imiz) uchun kerak bo'ladigan ma'lumot manbayi.
});

app.get("/", function (req, res) {
  res.render("reja");
});

module.exports = app;

// app.get("/", function (req, res) {
//   res.end(`<h1 style="background:red"> HELLO WORLD by hussein!</h1>`);
// });

// app.get("/hello", function (req, res) {
//   res.end(`<h1 style="background:blue"> Siz bo'limning birinchi qismidasiz</h1>`);
// });

// app.get("/gift", function (req, res) {
//   res.end(`<h1 style="background:green"> Siz sovg'alar bo'limidasiz</h1>`); // /hello; /gift - shu kabi bir nechta addresslarni shakllantira olaman
// });

