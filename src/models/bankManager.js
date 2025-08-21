class BankManager {
    constructor(bank) {
        this.bank = bank;
    }

    getTotalBalance() {
        return this.bank.getTotalBalance();
    }

    getAllTransactions() {
        return this.bank.getAllTransactions();
    }
}
module.exports = BankManager;
