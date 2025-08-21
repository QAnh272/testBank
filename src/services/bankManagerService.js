const BankService = require('./bankService');

class BankManagerService {
    constructor(bankService) {
        this.bankService = bankService;
    }

    // Xem tổng số dư toàn hệ thống
    viewTotalBalance() {
        return this.bankService.getTotalBalance();
    }

    // Xem tất cả giao dịch toàn hệ thống
    viewAllTransactions() {
        return this.bankService.getAllTransactions();
    }

    // Xem danh sách khách hàng
    viewAllCustomers() {
        return this.bankService.getCustomers();
    }

    // Xem danh sách tài khoản
    viewAllAccounts() {
        return this.bankService.getAccounts();
    }
}

module.exports = BankManagerService;
