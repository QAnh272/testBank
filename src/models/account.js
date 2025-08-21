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
        // Nếu fromAccount không truyền vào thì mặc định là chính tài khoản này (nạp tiền mặt)
        const tx = new Transaction('tx-' + Date.now() + '-' + Math.random(), 'deposit', amount, fromAccount || this.id, this.id);
        this.transactions.push(tx);
        return tx;
    }


    withdraw(amount, toAccount = null) {
        if (amount <= 0) throw new Error('Số tiền rút phải lớn hơn 0');
        if (amount > this.balance) throw new Error('Không đủ số dư');
        this.balance -= amount;
        // Nếu toAccount không truyền vào thì mặc định là chính tài khoản này (rút tiền mặt)
        const tx = new Transaction('tx-' + Date.now() + '-' + Math.random(), 'withdraw', amount, this.id, toAccount || this.id);
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
        const tx = new Transaction('tx-' + Date.now() + '-' + Math.random(), 'transfer', amount, this.id, targetAccount.id);
        this.transactions.push(tx);
        // Đồng thời ghi nhận transaction vào tài khoản nhận (để lịch sử 2 chiều, type là 'receive')
        const txReceive = new Transaction('tx-' + Date.now() + '-' + Math.random(), 'receive', amount, this.id, targetAccount.id);
        targetAccount.transactions.push(txReceive);
        return tx;
    }
}

module.exports = Account;