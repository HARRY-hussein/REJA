// ------------- B TASK -------------
/* Shart:
Shunday function tuzing, u 1ta string parametrga ega bolsin, hamda osha stringda qatnashgan raqamlarni sonini bizga return qilsin.
MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return qiladi.
*/
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

// ------------- TASK A -------------
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
