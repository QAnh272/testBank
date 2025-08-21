class Transaction {
  constructor(id, type, amount, fromAccount = null, toAccount = null) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.fromAccount = fromAccount;
    this.toAccount = toAccount;
    this.date = new Date();
  }
}
module.exports = Transaction;