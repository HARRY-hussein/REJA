console.log("FrontEnd JS ishga tushdi");

function itemTemplate(item) {
  return `<li
          class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
          <span class="item-text">${item.reja}</span>
          <div> 
            <button
              data-id="${item._id}"
              class="edit-me btn btn-secondary btn-sm mr-1">
              O'zgartirish
            </button>
            <button
              data-id="${item._id}"
              class="delete-me btn btn-danger btn-sm">
              O'chirish
            </button>
          </div>
        </li>`;
}

let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function (e) {
  // console.log(e); e.target.classList ichidagi aynan biz bosgan button classini korsatadi. line 44 da ishlatamiz
  e.preventDefault();
  axios
    .post("/create-item", { reja: createField.value })
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((error) => {
      console.log("Please try again!");
    });
});

// delete operation
document.addEventListener("click", function (e) {
  // parameter - aynan nima bosilganini aniqlash uchun
  console.log(e);
  if (e.target.classList.contains("delete-me")) {
    // 'e'dagi target ichidagi classList da delete-me classi bormi, bo'lsa alert
    alert("You pressed the button DELETE!");
    let itemName =
      e.target.parentElement.parentElement.querySelector(
        ".item-text",
      ).innerHTML; // o'chirilayotgan elementni aynan nomini olamiz
    if (confirm(`Are you really sure to delete ${itemName}?`)) {
      // confirm browserga tegishli javascript bn birga ishlaydi
      axios // Line 63: delete qilish uchun axios.post orqali serverga request yuboramiz
        .post("/delete-item", { id: e.target.getAttribute("data-id") }) // aynan qaysi id dagi elementni o'chirish kerak
        .then((response) => {
          console.log(response.data); // app.js dagi res.json ni console ga chiqaradi: state: "success"
          e.target.parentElement.parentElement.remove(); // DOM(Document Object Model) dan o'chirish.
          // nega ikkita parentElement? faqat yozuvni emas, balki butun qatorni o'chirish
        })
        .catch((error) => {
          console.log("Please try again!");
        });
    }
    //         {
    //     alert("Answered: YES!");
    //   } else {
    //     alert("Answered: NO!");
    //   }
  }

  // edit operation
  if (e.target.classList.contains("edit-me")) { // delete kabi
    alert("You pressed the EDIT button!");
    let userInput = prompt(
      // PROMPT browserga tegishli javascript bn birga ishlaydi
      "O'zgartirishni kiriting:",
      e.target.parentElement.parentElement.querySelector(".item-text") // o'zgartirayotganda eski qiymat input maydonida tursin
        .innerHTML, // aynan textni olamiz
    );
    if (userInput) {
      console.log(userInput); // test: user yangi o'zgartirgan input nomini console ga chiqaradi
      axios // axios orqali BACKENDGA yangi qiymatni yuboramiz
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"),
          new_input: userInput, // yangi qiymatni new_input nomi bilan yuboramiz
        })
        .then((response) => { 
          console.log(response.data);
          // (85-90) database - frontend
           e.target.parentElement.parentElement.querySelector(
            // FRONTENDDA ham o'zgartirib qo'yamiz
            ".item-text",
          ).innerHTML = userInput; // BACKENDGA yuborilgan yangi qiymatni FRONTENDDA ham o'zgartirib qo'yamiz
          //
        })
        .catch((error) => {
          console.log("Please try again later!");
        });
    }
  }
});

document.getElementById("clean-all").addEventListener("click", function () {
  // nega preventDefault ishlatilmayapti? chunki bu button form ichida emas. PreventDefault faqat form submit bo'lishini to'xtatadi
  axios.post("/delete-all", { delete_all: true }).then((response) => {
    // { delete_all: true }) - shunchaki bajararilayotgan amalni secure qildik
    alert(response.data.state); //
    document.location.reload(); // biz turgan page ni reload qiladi, shunda bo'sh list chiqadi
  });
});
