const Customer = require('../models/customer');
const Account = require('../models/account');

// Xử lý logic liên quan đến khách hàng
class CustomerService {
    // Tạo khách hàng mới và tạo luôn tài khoản mặc định
    static createCustomer(id, name, email) {
        const customer = new Customer(id, name, email);
        const account = new Account(`${id}-main`);
        customer.addAccount(account);
        return customer;
    }

    // Nạp tiền vào tài khoản (mặc định là tài khoản đầu tiên)
    static deposit(customer, amount, accountIndex = 0) {
        if (!customer.accounts.length)
            throw new Error('Khách hàng chưa có tài khoản');
        return customer.accounts[accountIndex].deposit(amount);
    }

    // Rút tiền từ tài khoản (mặc định là tài khoản đầu tiên)
    static withdraw(customer, amount, accountIndex = 0) {
        if (!customer.accounts.length)
            throw new Error('Khách hàng chưa có tài khoản');
        return customer.accounts[accountIndex].withdraw(amount);
    }

    // Kiểm tra số dư tài khoản (mặc định là tài khoản đầu tiên)
    static getBalance(customer, accountIndex = 0) {
        if (!customer.accounts.length)
            throw new Error('Khách hàng chưa có tài khoản');
        return customer.accounts[accountIndex].getBalance();
    }

    // Xem giao dịch của tài khoản (mặc định là tài khoản đầu tiên)
    static getTransactions(customer, accountIndex = 0) {
        if (!customer.accounts.length)
            throw new Error('Khách hàng chưa có tài khoản');
        return customer.accounts[accountIndex].getTransactions();
    }

    // Chuyển khoản nội bộ giữa hai khách hàng (mặc định là tài khoản đầu tiên của mỗi người)
    static transfer(customerFrom, customerTo, amount, fromAccountIndex = 0, toAccountIndex = 0) {
        if (!customerFrom.accounts.length || !customerTo.accounts.length)
            throw new Error('Một trong hai khách hàng chưa có tài khoản');
        return customerFrom.accounts[fromAccountIndex].transferTo(customerTo.accounts[toAccountIndex], amount);
    }
}

module.exports = CustomerService;
