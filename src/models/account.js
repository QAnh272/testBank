const Transaction = require('./transaction');

class Account {
    constructor(id, initialBalance = 0) {
        this.id = id;
        this.balance = initialBalance;
        this.transactions = [];
    }

    deposit(amount, fromAccount = null) {
        if (amount <= 0) throw new Error('Số tiền nạp phải lớn hơn 0');
        this.balance += amount;
        // fromAccount: nếu là chuyển khoản thì fromAccount là id tài khoản gửi, còn nạp tiền thì null hoặc chính id này
        const tx = new Transaction('deposit', amount, fromAccount, this.id);
        this.transactions.push(tx);
        return tx;
    }

    withdraw(amount, toAccount = null) {
        if (amount <= 0) throw new Error('Số tiền rút phải lớn hơn 0');
        if (amount > this.balance) throw new Error('Không đủ số dư');
        this.balance -= amount;
        // toAccount: nếu là chuyển khoản thì toAccount là id tài khoản nhận, còn rút tiền thì null hoặc chính id này
        const tx = new Transaction('withdraw', amount, this.id, toAccount);
        this.transactions.push(tx);
        return tx;
    }

    getBalance() {
        return this.balance;
    }

    getTransactions() {
        return this.transactions;
    }

    transferTo(targetAccount, amount) {
        if (amount <= 0) throw new Error('Số tiền chuyển phải lớn hơn 0');
        if (amount > this.balance) throw new Error('Không đủ số dư');
        // Trừ tiền tài khoản này, cộng tiền tài khoản nhận, tạo transaction đầy đủ from/to
        this.balance -= amount;
        targetAccount.balance += amount;
        const tx = new Transaction('transfer', amount, this.id, targetAccount.id);
        this.transactions.push(tx);
        // Đồng thời ghi nhận transaction vào tài khoản nhận (để lịch sử 2 chiều)
        const txReceive = new Transaction('receive', amount, this.id, targetAccount.id);
        targetAccount.transactions.push(txReceive);
        return tx;
    }
}

module.exports = Account;