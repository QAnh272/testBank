const CustomerService = require('./services/customerService');
const BankService = require('./services/bankService');
const BankManagerService = require('./services/bankManagerService');
const Account = require('./models/account');

// Tạo hệ thống ngân hàng và bank manager
const bank = new BankService();
const manager = new BankManagerService(bank);

// Tạo khách hàng
const cus1 = CustomerService.createCustomer('cus-1', 'Nguyen Van A', 'a@email.com');
const cus2 = CustomerService.createCustomer('cus-2', 'Le Thi B', 'b@email.com');


// Tạo thêm tài khoản phụ cho cus1 và cus2 (gắn chủ sở hữu rõ ràng)
const acc1_extra = new Account('acc1-extra');
const acc2_extra = new Account('acc2-extra');
acc1_extra.customer = cus1;
acc2_extra.customer = cus2;
cus1.addAccount(acc1_extra);
cus2.addAccount(acc2_extra);

// Thêm khách hàng vào hệ thống
bank.addCustomer(cus1);
bank.addCustomer(cus2);




// Nạp tiền vào các tài khoản (tất cả giao dịch đều có from/to rõ ràng, không null)
try {
    CustomerService.deposit(cus1, 1500); // cus1-main
    CustomerService.deposit(cus2, 2500); // cus2-main
    acc1_extra.deposit(700); // cus1-extra
    acc2_extra.deposit(800); // cus2-extra
    // Thử nạp tiền âm (sẽ báo lỗi)
    acc1_extra.deposit(-100);
} catch (e) {
    console.log('Lỗi nạp tiền:', e.message);
}

// Rút tiền hợp lệ và rút quá số dư (không null)
try {
    CustomerService.withdraw(cus1, 300); // cus1-main
    acc1_extra.withdraw(200); // cus1-extra
    acc2_extra.withdraw(300); // cus2-extra
    CustomerService.withdraw(cus2, 600); // cus2-main
    acc2_extra.withdraw(1000); // rút quá số dư (sẽ báo lỗi)
} catch (e) {
    console.log('Lỗi rút tiền:', e.message);
}

// Chuyển khoản hợp lệ và chuyển khoản quá số dư (không null)
try {
    // Chuyển khoản hợp lệ giữa tài khoản chính của cus1 sang tài khoản chính của cus2
    cus1.accounts[0].transferTo(cus2.accounts[0], 200);
    // Chuyển khoản hợp lệ giữa tài khoản phụ cus2 sang tài khoản phụ cus1
    acc2_extra.transferTo(acc1_extra, 100);
    // Chuyển khoản hợp lệ giữa tài khoản phụ cus1 sang tài khoản chính cus2
    acc1_extra.transferTo(cus2.accounts[0], 150);
    // Chuyển khoản quá số dư
    acc1_extra.transferTo(cus2.accounts[0], 1000);
} catch (e) {
    console.log('Lỗi chuyển khoản:', e.message);
}


// In ra bảng số dư các tài khoản (không có giá trị null)
console.log('\nBẢNG SỐ DƯ CÁC TÀI KHOẢN:');
console.table([
    { owner: 'cus1-main', id: cus1.accounts[0].id, balance: cus1.accounts[0].getBalance() },
    { owner: 'cus1-extra', id: acc1_extra.id, balance: acc1_extra.getBalance() },
    { owner: 'cus2-main', id: cus2.accounts[0].id, balance: cus2.accounts[0].getBalance() },
    { owner: 'cus2-extra', id: acc2_extra.id, balance: acc2_extra.getBalance() },
]);


// In ra bảng giao dịch của từng tài khoản (không có transaction null)
console.log('\nGIAO DỊCH TÀI KHOẢN CHÍNH CUS1:');
console.table(cus1.accounts[0].getTransactions().filter(tx => tx != null));
console.log('\nGIAO DỊCH TÀI KHOẢN PHỤ CUS1:');
console.table(acc1_extra.getTransactions().filter(tx => tx != null));



// Bank manager xem tổng số dư, tất cả giao dịch, và quản lý thông tin account (không có giá trị null)
console.log('\nTỔNG SỐ DƯ TOÀN HỆ THỐNG:', manager.viewTotalBalance());
console.log('\nTẤT CẢ GIAO DỊCH TOÀN HỆ THỐNG:');
console.table(manager.viewAllTransactions().filter(tx => tx != null));

// Bank manager xem thông tin chi tiết các account
console.log('\nTHÔNG TIN TẤT CẢ ACCOUNT:');
manager.viewAllAccounts().forEach(acc => {
    const owner = acc.customer && acc.customer.name ? acc.customer.name : 'Không xác định';
    console.log(`Account ID: ${acc.id}, Balance: ${acc.getBalance()}, Owner: ${owner}`);
});