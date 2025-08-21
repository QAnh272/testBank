const Account = require('../models/account');
const AccountService = require('../services/accountService');

describe('AccountService', () => {
    let account;

    beforeEach(() => {
        account = new Account('acc-1');
    });

    test('deposit tăng số dư', () => {
        AccountService.deposit(account, 1000);
        expect(account.getBalance()).toBe(1000);
    });

    test('withdraw giảm số dư', () => {
        AccountService.deposit(account, 1000);
        AccountService.withdraw(account, 400);
        expect(account.getBalance()).toBe(600);
    });

    test('không cho rút quá số dư', () => {
        AccountService.deposit(account, 500);
        expect(() => AccountService.withdraw(account, 600)).toThrow();
    });

    test('getTransactions trả về đúng số lượng giao dịch', () => {
        AccountService.deposit(account, 100);
        AccountService.withdraw(account, 50);
        const txs = AccountService.getTransactions(account);
        expect(txs.length).toBe(2);
    });

    test('transferTo chuyển tiền đúng', () => {
        const account2 = new Account('acc-2');
        AccountService.deposit(account, 1000);
        AccountService.transferTo(account, account2, 300);
        expect(account.getBalance()).toBe(700);
        expect(account2.getBalance()).toBe(300);
    });
});
