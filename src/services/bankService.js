const Customer = require('../models/customer');
const Account = require('../models/account');

// Xử lý logic tổng thể cho ngân hàng (quản lý toàn bộ khách hàng, tài khoản, giao dịch)
class BankService {
    constructor() {
        this.customers = [];
        this.accounts = [];
    }

    // Thêm khách hàng mới vào hệ thống
    addCustomer(customer) {
        this.customers.push(customer);
        this.accounts.push(...customer.accounts);
    }

    // Lấy tổng số dư toàn hệ thống
    getTotalBalance() {
        return this.accounts.reduce((sum, acc) => sum + acc.getBalance(), 0);
    }

    // Lấy tất cả giao dịch của toàn hệ thống
    getAllTransactions() {
        return this.accounts.flatMap(acc => acc.getTransactions());
    }

    // Lấy danh sách khách hàng
    getCustomers() {
        return this.customers;
    }

    // Lấy danh sách tài khoản
    getAccounts() {
        return this.accounts;
    }
}

module.exports = BankService;
