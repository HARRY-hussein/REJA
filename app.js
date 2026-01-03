// EJS Frameworkda Portfolio publishing qilamiz!
// BSSR (Backend Server-Side Rendering) & SPA (Single Page Application)

console.log("Web Serverni boshlanishi");

// MongoDB connection
const db = require("./server").db(); // dbdan foydalangan holda MongoDB bilan crud operatsiyani amalga oshiramiz
const mongodb = require("mongodb");

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
  console.log("User entered /create-item");
  // console.log(req.body); // requestni body qismini tekshirish
  const new_reja = req.body.reja; // req.body qismidan kelgan reja
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    console.log(data.ops);
    res.json(data.ops[0]);
    /* this was traditional method, but we changed to the modern method on browser.js, so both should combine 
    if (err) {
      console.log(err);
      res.end("Something went wrong!");
    } else {
      res.end("Successfully added");
    }
    */
  }); // reja yani user kiritadigan infoni databasega yozamiz. MongoDB documentationdan insertOne(ikkita parameterga ega) orqali
  // reja (fileName) : reja (req.bodyni ichida kelgan reja line 38)
  // res.end("success"); // test: server ma'lumotni kelishini kutib o'tirmaydi, userga tezda "success" ni yuboradi
  // res.json({ test: "success" });
});

app.post("/delete-item", (req, res) => {
  const id = req.body.id;
  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectId(id) },
    function (err, data) {
      res.json({ state: "success" });
    }
  );
  // console.log(id);
  // res.end("Done!");
});

// -----------  STEP 1 -----------
// app.get("/author", (req, res) => {
//   // get -> link; req & res
//   res.render("author", { user: user }); // res.render -> author ejs page;  user -> publishing (page'imiz) uchun kerak bo'ladigan ma'lumot manbayi.
// });

app.get("/", function (req, res) {
  console.log("User entered /");
  db.collection("plans") // saytimizdga kirsak shu yerga keladi va shu yerdagi infolarni o'qiydi   monggoDB documentation: collection, find, to array
    .find() // topadi
    .toArray((err, data) => {
      // 3 line: rejani databsega yozish kodi: plans ichidan info izlab array qilib ber. Array function 2 ta narsani qaytaradi
      // va ularni calback function orqali kirityapmiz
      if (err) {
        console.log(err);
        res.end("Something went wrong"); // Userga response: xato bo'lsa, kuttirmay tezda response jo'natsin
      } else {
        // console.log(data); // MongoDB o'qilganda callbackdan data kelgan paytini log orqali chiqarib olyapmiz
        res.render("reja", { items: data }); // o'sha datani ejs ichiga paste qilish: data olib kelayotganda reja fileda ma'lumotni olib kelsin
      }
    });
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
