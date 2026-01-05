const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString = // Qaysi serverga, qaysi database’ga, qaysi login bilan ulanaman” degan yo‘l xarita.
  "mongodb+srv://hussein:Grand2022@cluster0.dfpl5mv.mongodb.net/Reja?appName=Cluster0";

mongodb.connect(
  // Node.js ilovasini MongoDB serveriga ulash (connection ochish).
  connectionString,
  {
    useNewUrlParser: true, // Ulanish adresini to‘g‘ri o‘qisin
    useUnifiedTopology: true, // MongoDB bilan ulanish barqaror bo‘lsin
  },
  (err, client) => {
    if (err) console.log("ERROR on connection with MongoDB");
    else {
      console.log("Successfully connected to MongoDB");
      // module.exports = client; // yani client bu yerda databsedagi malumotlar, va ularni biz keyinchalik BOSHQA FILELARDA ham faol foydalana olishimiz uchun export qilib olyapmiz. Va endi qaysi fileda foydalanmoqchi bo'lsak require qilib ishlatsak bo'ladi.
      db = client.db(); // database’ga access beradi va collection’lar bilan ishlash imkonini ochadi
      module.exports = {
        // tashqariga uzatish va bu yerda db ni uzatyapmiz
        db: () => db, // Loyihaning boshqa fayllari ham shu database bilan ishlay olishi uchun.
      };
      /* ❌ client ≠ database ma’lumotlari
         ❌ db ≠ database ichidagi data
         ✅ client → MongoDB serverga ulanish
         ✅ db → database bilan ishlash uchun access 
            client — MongoDB server bilan ulanishni boshqaradi
            db — aynan bitta database bilan ishlash uchun access beradi */

      const app = require("./app");
      const server = http.createServer(app); // createServer - bu method bitta parameterni - app - qabul qiladi.
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
/*
Agar bu entire kod bo‘lmasa
❌ Backend ishlamaydi
❌ localhost:3000 ochilmaydi
❌ API’lar javob bermaydi
*/

/*
1️⃣ Server ishga tushadi -> server.listen() chaqirilganda backend ishga tushadi. 
2️⃣ MongoDB’ga ulaniladi -> "mongodb.connect...". MongoDB serverga aloqa o‘rnatiladi.
3️⃣ db = client.db() -> Database’ning o‘ziga access olinadi => collection’lar, ma’lumotlar bilan ishlash imkoniyati
4️⃣ module.exports
5️⃣ Express route’lar foydalanadi -> const db = require("../db").db(); db.collection("users").find()  
   Route’lar MongoDB bilan bemalol ishlaydi.
*/

// db — MongoDB’ga faqat backend kirishi uchun berilgan access obyekt.
