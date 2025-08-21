const CustomerService = require('../services/customerService');
const Customer = require('../models/customer');

describe('CustomerService', () => {
    let customer;

    beforeEach(() => {
        customer = CustomerService.createCustomer('cus-1', 'Nguyen Van A', 'a@email.com');
    });

    test('Tạo khách hàng có tài khoản mặc định', () => {
        expect(customer.accounts.length).toBe(1);
    });

    test('Nạp tiền vào tài khoản', () => {
        CustomerService.deposit(customer, 500);
        expect(CustomerService.getBalance(customer)).toBe(500);
    });

    test('Rút tiền đúng số dư', () => {
        CustomerService.deposit(customer, 1000);
        CustomerService.withdraw(customer, 400);
        expect(CustomerService.getBalance(customer)).toBe(600);
    });

    test('Không cho rút quá số dư', () => {
        CustomerService.deposit(customer, 200);
        expect(() => CustomerService.withdraw(customer, 300)).toThrow();
    });

    test('Xem giao dịch trả về đúng số lượng', () => {
        CustomerService.deposit(customer, 100);
        CustomerService.withdraw(customer, 50);
        const txs = CustomerService.getTransactions(customer);
        expect(txs.length).toBe(2);
    });

    test('Chuyển khoản nội bộ giữa hai khách hàng', () => {
        const customer2 = CustomerService.createCustomer('cus-2', 'Le Thi B', 'b@email.com');
        CustomerService.deposit(customer, 1000);
        CustomerService.transfer(customer, customer2, 300);
        expect(CustomerService.getBalance(customer)).toBe(700);
        expect(CustomerService.getBalance(customer2)).toBe(300);
    });
});
