class Transaction {
    constructor(id, type, amount, fromAccount = null, toAccount = null) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.date = new Date();
        
        if (type === 'transfer') {
            this.fromAccount = fromAccount;
            this.toAccount = toAccount;
        } else {
            this.fromAccount = null;
            this.toAccount = null;
        }
    }
}

module.exports = Transaction;