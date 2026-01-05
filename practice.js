// < ------------------- 21. Event Loop va Callback functions ------------------- >

console.log("Jack Ma maslahatlari");
const list = [
  "yaxshi talaba bo'ling", // 0-20
  "to'g'ri boshliq tanlang va ko'proq xato qiling", //20-30
  "o'z ustingizda ishlashni boshlang", // 30-40
  "o'zingiz kuchli bo'lgan ishlar bilan mashg'ul bo'ling", // 40-50
  "yoshlarga investitsiya qiling", // 50-60
  "endi esa dam oling, baribir foydasi yo'q", // 60
];

// =========================== Callback function ===========================

function maslahatBering(a, callback) {
  if (typeof a !== "number") callback("Insert number only", null);
  else if (a <= 20) callback(null, list[0]);
  else if (a > 20 && a <= 30) callback(null, list[1]);
  else if (a > 30 && a <= 40) callback(null, list[2]);
  else if (a > 40 && a <= 50) callback(null, list[3]);
  else if (a > 50 && a <= 60) callback(null, list[4]);
  else {
    setTimeout(function () {
      callback(null, list[5]);
    }, 5000);
    // callback(null, list[5]);
  }
}

console.log("Passed here 0");
maslahatBering(65, (err, data) => {
  // maslahatBering("salom", (err, data) => {
  if (err) console.log("ERROR", err);
  else {
    console.log("javob:", data);
  }
  // console.log("Maslahatim:", data);
});
console.log("Passed here 1");

// < ------------------- 22. Asynchronous functions ------------------- >
/*
console.log("Jack Ma maslahatlari");
const list = [
  "yaxshi talaba bo'ling", // 0-20
  "to'g'ri boshliq tanlang va ko'proq xato qiling", //20-30
  "o'z ustingizda ishlashni boshlang", // 30-40
  "o'zingiz kuchli bo'lgan ishlar bilan mashg'ul bo'ling", // 40-50
  "yoshlarga investitsiya qiling", // 50-60
  "endi esa dam oling, baribir foydasi yo'q", // 60
];

// DEFINE SECTION:
async function maslahatBering(a, callback) {
  if (typeof a !== "number") throw new Error("Insert number only");
  else if (a <= 20) return list[0];
  else if (a > 20 && a <= 30) return list[1];
  else if (a > 30 && a <= 40) return list[2];
  else if (a > 40 && a <= 50) return list[3];
  else if (a > 50 && a <= 60) return list[4];
  else {
    return list[5];
  }
}
*/
// CALL SECTION: then & catch orqali bajardik
/*
console.log("Passed here 0");
maslahatBering(25)
  .then((data) => {
    console.log("javob:", data);
  })
  .catch((err) => {
    console.log("ERROR:", err);
  });
console.log("Passed here 1");
*/

// CALL SECTION: async & await orqali build qildik (then & catch ning osonroq usuli)
/*
async function run() {
  let javob = await maslahatBering(20);
  console.log(javob);
  javob = await maslahatBering(32);
  console.log(javob);
  natija = await maslahatBering(45);
  console.log(natija);
}
run();
*/

// =========================== Promise function ===========================
/*
async function maslahatBering(a, callback) {
  if (typeof a !== "number") throw new Error("Insert number only");
  else if (a <= 20) return list[0];
  else if (a > 20 && a <= 30) return list[1];
  else if (a > 30 && a <= 40) return list[2];
  else if (a > 40 && a <= 50) return list[3];
  else if (a > 50 && a <= 60) return list[4];
  else {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(list[5]);
      }, 5000);
    });
  }
}

async function run() {
  // await -> birinchisi javob olgach, ikkinchisiga o'tadi, lekin ikkinchisi javob olmaguncha qolganiga o'tmay tiradi
  let javob = await maslahatBering(65);
  console.log(javob);
  javob = await maslahatBering(32); // (70)
  console.log(javob);
  natija = await maslahatBering(45);
  console.log(natija);
}
run();
*/
// =========================== setInterval ===========================
/*
// bitta natija olib so'ngra to'xtaydi
async function maslahatBering(a, callback) {
  if (typeof a !== "number") throw new Error("Insert number only");
  else if (a <= 20) return list[0];
  else if (a > 20 && a <= 30) return list[1];
  else if (a > 30 && a <= 40) return list[2];
  else if (a > 40 && a <= 50) return list[3];
  else if (a > 50 && a <= 60) return list[4];
  else {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        resolve(list[5]);
      }, 5000);
    });
  }
}

async function run() {
  let javob = await maslahatBering(65);
  console.log(javob);
}
run();
*/
// =========================== setInterval: callback bilan ===========================
// natija tinmay qaytaveradi
/*
function maslahatBering(a, callback) {
  if (typeof a !== "number") callback("Insert number only", null);
  else if (a <= 20) callback(null, list[0]);
  else if (a > 20 && a <= 30) callback(null, list[1]);
  else if (a > 30 && a <= 40) callback(null, list[2]);
  else if (a > 40 && a <= 50) callback(null, list[3]);
  else if (a > 50 && a <= 60) callback(null, list[4]);
  else {
    setInterval(function () {
      callback(null, list[5]);
    }, 1000);
    // callback(null, list[5]);
  }
}

console.log("Passed here 0");
maslahatBering(65, (err, data) => {
  if (err) console.log("ERROR", err);
  else {
    console.log("javob:", data);
  }
});
console.log("Passed here 1");
*/




/*
server.js vazifasi
server ishga tushadi
portni tinglaydi
backend start bo‘ladi

✔️ Express — request/response engine
Express req / res ni qabul qiladi
yo‘naltiradi (routing)
logika shu yerda ishlaydi

✔️ MongoDB server ishga tushganda ulanadi
mongodb.connect() server start vaqtida ishlaydi
MongoDB backend bilan bog‘lanadi

✔️ require("./app")
Express ilovasi serverga “olib kelinadi”
Express ichidagi route’lar ishlay boshlaydi

✔️ Express DB bilan ishlay oladi
Ya'ni backend db yani databaasega access ola olishi uchun ham 
birinchi mongodb ishga tushishi kerak. Avval mongodb ishga tushadi 
keyin backendga db bilan ishlash accessini beradi

Express route’lar db orqali
MongoDB’dagi data bilan ishlaydi
Backend MongoDB serverga tarmoq orqali ulanadi
Express → db obyektni require() orqali oladi

server.js serverni ishga tushiradi.
Express — so‘rovlarni boshqaradi.
MongoDB — alohida server.
Backend MongoDB’ga ulanadi va db orqali ishlaydi.
Express shu db dan foydalanib so‘rovlarga javob beradi.

*/
/*
data-id="<%=item._id%>" => app.jda items nomi ostida ma'lumotlarni yuborgandik, 
 ularni html o'qib ola olishi uchun shu sintaksisdan foydalanamiz
 <%= items[0].reja %> items ichida ko‘p ma’lumot bor. Lekin faqat birinchi element olinadi
Shu birinchi element ichidagi reja maydoni ekranga chiqariladi 
items = []
  { reja: "Bugun o‘qiyman" }
   aynan shu reja.ejs yuqoridagi kod orqali user kiritgan malumotni aynan statement qismini,
   idsini emas, sitega form korinishida chiqarib beradi
   = bor bo‘lsa → natija HTML’ga chiqariladi, shunga o'xshab: { reja: "Bugun o‘qiyman" }
   = bo‘lmasa → faqat JS kodi backgroundda ishlaydi, lekin natija interfacega chiqmasligi kerak.
   <% items.map(function(item)) { %>
*/
