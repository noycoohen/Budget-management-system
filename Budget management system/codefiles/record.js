export class Record {
  id;
  date;
  description;
  type;
  category;
  amount;
  constructor(date, description, type, category, amount) {
    (this.id = null),
      (this.date = date),
      (this.description = description),
      (this.type = type),
      (this.category = category),
      (this.amount = amount);
  }
}
