const BankService = require('../services/bankService');
const BankManagerService = require('../services/bankManagerService');
const CustomerService = require('../services/customerService');

describe('BankManagerService', () => {
    let bankService;
    let bankManagerService;
    let customer1, customer2;

    beforeEach(() => {
        bankService = new BankService();
        bankManagerService = new BankManagerService(bankService);
        customer1 = CustomerService.createCustomer('cus-1', 'Nguyen Van A', 'a@email.com');
        customer2 = CustomerService.createCustomer('cus-2', 'Le Thi B', 'b@email.com');
        CustomerService.deposit(customer1, 1000);
        CustomerService.deposit(customer2, 2000);
        bankService.addCustomer(customer1);
        bankService.addCustomer(customer2);
    });

    test('Xem tổng số dư toàn hệ thống', () => {
        expect(bankManagerService.viewTotalBalance()).toBe(3000);
    });

    test('Xem tất cả giao dịch toàn hệ thống', () => {
        const allTxs = bankManagerService.viewAllTransactions();
        expect(allTxs.length).toBe(2); // 2 lần nạp tiền
    });

    test('Xem danh sách khách hàng', () => {
        const customers = bankManagerService.viewAllCustomers();
        expect(customers.length).toBe(2);
    });

    test('Xem danh sách tài khoản', () => {
        const accounts = bankManagerService.viewAllAccounts();
        expect(accounts.length).toBe(2);
    });
});
