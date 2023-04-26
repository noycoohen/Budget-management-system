import { DB } from "./db.js";
export class renderHTML {
  constructor() {}
  printBudget(records) {
    document.getElementById("container").innerHTML = "";
    let db = new DB();
    db.calculateSum();

    let htmlBlock;
    htmlBlock = document.createElement("div");
    htmlBlock.setAttribute("class", "records");
    records.forEach((record) => {
      let newRecord = document.createElement("div");
      newRecord.setAttribute("class", "cardinner");
      newRecord.innerText = `
      date: ${record.date}
      description: ${record.description}
      type: ${record.type}
      category: ${record.category}
      amount: ${record.amount}$
      
      `;
      newRecord.style.marginBottom = "1rem";
      let deletebtn = document.createElement("button");
      deletebtn.setAttribute("class", "btn-1");
      deletebtn.innerText = "delete";
      deletebtn.addEventListener("click", () => {
        db.deleteRecord(record.id);
        newRecord.innerText = "The record has been successfully deleted";
        setTimeout(() => newRecord.remove(), 3000);
        db.calculateSum();
      });
      if (record.type == "expense") {
        newRecord.style.color = "#111";
        newRecord.style.border = "solid #b70d0d";
      } else {
        newRecord.style.color = "#111";
        newRecord.style.border = "solid #28b10c";
      }

      htmlBlock.appendChild(newRecord);
      newRecord.appendChild(deletebtn);
      document.getElementById("container").appendChild(htmlBlock);
    });

    return htmlBlock;
  }

  printBudgetByCategory(category) {
    let db = new DB();
    let records = db.getRecords();
    let newRecords = records.filter((x) => x.category === category);
    this.printBudget(newRecords);
  }
}

//sticky header
window.addEventListener("scroll", function () {
  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
});
