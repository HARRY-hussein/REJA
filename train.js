// ------------- MIT C TASK -------------
/* Shart:
Shunday class tuzing tuzing nomi Shop, va uni constructoriga 3 hil mahsulot pass bolsin, 
hamda classning 3ta methodi bolsin, biri qoldiq, biri sotish va biri qabul. 
Har bir method ishga tushgan vaqt ham log qilinsin.
MASALAN: 
const shop = new Shop(4, 5, 2); 
shop.qoldiq() return hozir 20:40da 4ta non, 5ta lagmon va 2ta sprite mavjud! 
shop.sotish('non', 3)
shop.qabul('sprite', 4)
shop.qoldiq() return hozir 20:50da 1ta non, 5ta lagmon va 6ta sprite mavjud!
*/
const moment = require("moment");

class Shop {
  non;
  somsa;
  sprite;

  constructor(non, somsa, sprite) {
    this.non = non;
    this.somsa = somsa;
    this.sprite = sprite;
  }
  qabul(product, amount) {
    const time = moment().format("HH:mm");
    if(product === "non") {
      this.non += amount;
      console.log(`Hozir ${time}da omborga ${amount} ta qo'shimcha non qabul qilindi`);
    } else if (product === "somsa") {
      this.somsa += amount;
      console.log(`Hozir ${time}da ${amount} somsa yangi partiya sifatida kelib tushdi`);
    } else if (product === "sprite") {
      this.sprite += amount;
      console.log(`Hozir ${time}da sizga ${amount} ta sprite rastaga muvaffaqiyatli joylandi`);
    }
    else {
      console.log(`Hozir ${time} da omborimizda bunday mahsulot mavjud emas!`)
    }
  }
  sotish(product, amount) {
    const time = moment().format("HH:mm");
    if(product === "non") {
      this.non -= amount;
      console.log(`Hozirgina ${time}da ${amount} ta non sotish jarayoni yakunlandi`);
    } else if(product === "somsa") {
      this.somsa -= amount;
      console.log(`Sizning do'koningizdan soat ${time} da ${amount} ta somsa sotildi`);
    } else if (product === "sprite") {
      this.sprite -= amount;
      console.log(`Hozir ${time}da do'koningizdan xaridorlar ${amount} ta sprite sotib olishdi`);
    } else {
      console.log(`Hozir ${time} da siz so'ragan mahsulot ro'yxatda topilmadi`)
    }
  }
  qoldiq() {
    const time = moment().format("HH:mm");
    console.log(
      `Hozir ${time}da omboringizda ${this.non} ta non, ${this.somsa} ta somsa hamda ${this.sprite} ta sprite mavjud`
    );
  }
}

const shop = new Shop(4, 5, 2);

shop.qoldiq();
shop.sotish("non", 3);
shop.qabul("sprite", 4);
shop.qoldiq();
// ------------- MIT B TASK -------------
/* Shart:
Shunday function tuzing, u 1ta string parametrga ega bolsin, hamda osha stringda qatnashgan raqamlarni sonini bizga return qilsin.
MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return qiladi.
*/
/*
function countDigits(string) {
  let count = 0;
  for (let char of string) {
    if (char >= 0 && char <= 9) {
      count++;
    }
  }
  return count;
}
console.log(countDigits("hfwu2nx92bd74jcs9"));
*/
// ------------- MIT A TASK -------------
/* Shart:
Shunday 2 parametrli function tuzing, hamda birinchi parametrdagi letterni
ikkinchi parametrdagi so'zdan qatnashgan sonini return qilishi kerak boladi.
*/
/*
function countLetters(letter, text, callback) {
  if (typeof letter !== "string" || typeof text !== "string") {
    callback("Insert string only", null);
    return;
  }
  let count = 0;
  for (let char of text) {
    if (char === letter) {
      count++;
    }
  }
  callback(null, count);
}
countLetters("s", "Mississippi", (err, data) => {
  if (err) console.log("ERROR:", err);
  else console.log("result:", data);
});
*/
