import { DB } from "./db.js";
import { Record } from "./record.js";
import { renderHTML } from "./render.js";
import { LoginPage } from "./login.js";

class runAddbudget {
  constructor() {
    this.render();
    this.printBudget = new renderHTML();
    let login = new LoginPage();
    login.printuser();
  }
  render() {
    let addbudgetbtn = document.getElementById("new-entry");
    addbudgetbtn.addEventListener("click", () => {
      let description = document.getElementById("input-description").value;
      let amount = document.getElementById("input-amount").value;

      if (!description || !amount) {
        document.getElementById("msg").innerText =
          "Please enter description and amount!";
        setTimeout(() => (document.getElementById("msg").innerHTML = ""), 8000);
      } else {
        this.addbudgetFromHTML();
        let db = new DB();
        let records = db.getRecords();
        this.printBudget.printBudget(records);
      }
    });
  }
  addbudgetFromHTML() {
    let newDB = new DB();
    let date = document.getElementById("input-date").value;
    let description = document.getElementById("input-description").value;
    let type = document.getElementById("input-type").value;
    let category = document.getElementById("input-category").value;
    let amount = document.getElementById("input-amount").value;
    let newRecord = new Record(date, description, type, category, amount);
    newDB.addRecord(newRecord);

    if (type == "expense") {
      document.getElementById("msg").innerText =
        "The expense has been successfully added";
      setTimeout(() => (document.getElementById("msg").innerHTML = ""), 8000);
    } else {
      document.getElementById("msg").innerText =
        "The income has been successfully added";
      setTimeout(() => (document.getElementById("msg").innerHTML = ""), 8000);
    }
  }
}

class runAllbudget {
  constructor() {
    this.render();
  }
  render() {
    let newRender = new renderHTML();
    let db = new DB();
    let records = db.getRecords();

    let htmlBlock = newRender.printBudget(records);
    document.getElementById("container").appendChild(htmlBlock);
  }
}

new runAllbudget();
new runAddbudget();

class chooseCategory {
  constructor() {
    this.category();
  }
  category() {
    let db = new DB();
    let btn = document.getElementById("chooseBtn");
    btn.addEventListener("click", () => {
      let records = db.getRecords();
      let newRenderHTML = new renderHTML();
      let select = document.getElementById("optionList");
      let value = select.selectedIndex;
      if (select[value].value == "All") {
        newRenderHTML.printBudget(records);
      } else {
        // console.log(select[value].value);
        newRenderHTML.printBudgetByCategory(select[value].value);
      }
    });
  }
}
new chooseCategory();

//sticky header
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});
