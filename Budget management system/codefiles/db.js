export class DB {
  dbname;
  constructor() {
    this.dbname = "budgetRecords";
    this.initDB();
  }
  addRecord(record) {
    let existingRecords = this.getRecords();
    let newId;
    if (existingRecords.length == 0) {
      newId = 0;
    } else {
      existingRecords.forEach((lastrecord, index) => {
        if (existingRecords.length - 1 == index) {
          newId = lastrecord.id + 1;
          // console.log(newId);
        }
      });
    }
    // console.log("i need to add" + newId);
    record.id = newId;

    existingRecords.push(record);
    localStorage.setItem(this.dbname, JSON.stringify(existingRecords));
    // return true;
  }

  deleteRecord(deletionId) {
    let existingRecords = this.getRecords();
    existingRecords.forEach((record, index) => {
      if (record.id == deletionId) {
        existingRecords.splice(index, 1);
      }
    });
    localStorage.setItem(this.dbname, JSON.stringify(existingRecords));
  }
  getRecords() {
    let records;
    records = localStorage.getItem(this.dbname);
    records = JSON.parse(records);
    return records;
  }
  initDB() {
    if (localStorage.getItem(this.dbname) == null) {
      localStorage.setItem(this.dbname, "[]");
    }
  }
  calculateSum() {
    let records = this.getRecords();
    let totalExpense = 0;
    let totalIncome = 0;
    let totalEx = document.getElementById("totalEx");
    let totalIn = document.getElementById("totalIn");
    let total = document.getElementById("total");
    total.innerHTML = "0.00$";
    totalEx.innerHTML = "0.00$";
    totalIn.innerHTML = "0.00$";
    records.forEach((record) => {
      if (record.type == "expense") {
        let sum = record.amount;
        let number = parseInt(sum);
        totalExpense = totalExpense + number;
        totalEx.innerText = totalExpense + "$";
      } else {
        let sumy = record.amount;
        let numbers = parseInt(sumy);
        totalIncome = totalIncome + numbers;
        totalIn.innerText = totalIncome + "$";
      }
      let totalInEx = totalIncome - totalExpense;
      total.innerText = totalInEx + "$";

      return total;
    });
  }
}
let newdb = new DB();
newdb.calculateSum();
