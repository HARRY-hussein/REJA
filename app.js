// EJS Frameworkda Portfolio publishing qilamiz!
// BSSR (Backend Server-Side Rendering) & SPA (Single Page Application)

console.log("Web Serverni boshlanishi");

// MongoDB connection db -> MongoDBni objecti va undan foydalangan holda CRUD operatsiyalar bajariladi
const db = require("./server").db(); // dbdan foydalangan holda MongoDB bilan crud operatsiyani amalga oshiramiz
const mongodb = require("mongodb"); // qalam o'chiradi yozadi o'qiydi

// 1 -> Kirish qismi
const express = require("express");
const app = express(); // function
const fs = require("fs"); // j.son formatdagi ma'lumotlarni to'g'ridan-to'g'ri olib kela olmaymiz; fileSystem (core package)

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
  console.log(req.body); // requestni body qismini tekshirish
  const new_reja = req.body.reja; // ya'ni yangi user kiritadigan malumot req.body qismidan kelgan rejaga tenglandi va "req.body qismidan kelgan rejaga" joylashadi
  // console.log(data.ops);
  // res.json(data.ops[0]);
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "DB error" });
    }
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
  }); // db.collection("plans").insertOne: MongoDB documentationdan insertOne(ikkita parameterga ega) orqali reja yani user kiritadigan infoni databasega yozamiz.
  // { reja: new_reja }: Nimani yozmoqchimiz? => reja nomi ostida req.bodyni ichida kelgan reja Databasega yozmoqchiman
  // res.end("success"); // test uchun: server ma'lumotni kelishini kutib o'tirmaydi, userga tezda "success" ni yuboradi
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
//  // get -> link; req & res
//   res.render("author", { user: user }); // res.render -> author ejs page;  user -> publishing (page'imiz) uchun kerak bo'ladigan ma'lumot manbayi.
// });

app.post("/edit-item", (req, res) => {
  const data = req.body;
  console.log(data);
  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) },
    { $set: { reja: data.new_input } },
    function (err, data) {
      res.json({ state: "success" });
    }
  );
});

app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "All plans are deleted" });
    });
  }
});

app.get("/", function (req, res) {
  console.log("User entered /");
  db.collection("plans") // saytimizdga kirsak shu yerga keladi va shu yerda databasedagi infolarni o'qiydi. MongoDB documentation: collection, find, to array
    .find() // topadi
    .toArray((err, data) => {
      // 3 line: rejani databsega yozish kodi: plans ichidan info izlab array qilib ber. Array function 2 ta narsani qaytaradi
      // va ularni calback function orqali kirityapmiz
      if (err) {
        console.log(err);
        res.end("Something went wrong"); // Userga response: xato bo'lsa, kuttirmay tezda response jo'natsin
      } else {
        // console.log(data); // User kiritgan malumotlarni mongodbda qanday formatda turganini terminalga chiqarib tekshirib olyapmiz
        res.render("reja", { items: data }); // Databasedagi ma'lumotlarni reja.ejs(html) filemiz ham ishlata olishi uchun ejs ichiga paste qilish: data olib kelayotganda reja fileda ma'lumotni olib kelsin
      }
    });
});
// UMUMIY XULOSA:
// Line 79: User sitega kiradi.
// Line 80-89: Databasedan ma'lumot olib(user kiritgan malumot)
// Line 90: Uni reja ejs.ga items orqali joylashtiryapmiz.
// Va uni reja.ejsda maxsus sintaksis(<% items.map(function(item) { %>) orqali

module.exports = app;
