const Account = require('../models/account');

// Xử lý logic liên quan đến tài khoản
class AccountService {
    // Nạp tiền vào tài khoản
    static deposit(account, amount) {
        return account.deposit(amount);
    }

    // Rút tiền từ tài khoản
    static withdraw(account, amount) {
        return account.withdraw(amount);
    }

    // Kiểm tra số dư
    static getBalance(account) {
        return account.getBalance();
    }

    // Xem giao dịch
    static getTransactions(account) {
        return account.getTransactions();
    }

    // Chuyển khoản sang tài khoản khác
    static transferTo(accountFrom, accountTo, amount) {
        return accountFrom.transferTo(accountTo, amount);
    }
}

module.exports = AccountService;
