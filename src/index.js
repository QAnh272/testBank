const CustomerService = require('./services/customerService');
const BankService = require('./services/bankService');
const BankManagerService = require('./services/bankManagerService');
const Account = require('./models/account');

// Hàm hiển thị lỗi trong table đẹp
function displayError(errorType, errorMessage, details = {}) {
    console.table([{
        '🚨 Loại lỗi': errorType,
        '❌ Thông báo': errorMessage,
        '📍 Chi tiết': details.details || 'N/A',
        '💰 Số tiền': details.amount ? details.amount.toLocaleString() + ' VND' : 'N/A',
        '📱 Tài khoản': details.accountId || 'N/A',
        '⏰ Thời gian': new Date().toLocaleTimeString()
    }]);
}

// Mảng lưu trữ lịch sử giao dịch
const transactionLog = [];

// Hàm log giao dịch thành công
function logTransaction(type, from, to, amount, description) {
    transactionLog.push({
        '🔄 Loại': type,
        '📤 Từ': from,
        '📥 Đến': to,
        '💰 Số tiền': amount.toLocaleString() + ' VND',
        '📝 Mô tả': description,
        '⏰ Thời gian': new Date().toLocaleTimeString()
    });
}

// Hàm hiển thị table giao dịch
function showTransactionTable(title) {
    console.log(`\n📊 ${title}:`);
    if (transactionLog.length > 0) {
        console.table(transactionLog);
        transactionLog.length = 0; // Clear log sau khi hiển thị
    } else {
        console.log('Không có giao dịch nào được thực hiện.');
    }
}

// Tạo hệ thống ngân hàng và bank manager
const bank = new BankService();
const manager = new BankManagerService(bank);

// Tạo khách hàng 
const cus1 = CustomerService.createCustomer('cus-1', 'Nguyen Van An', 'an@gmail.com');
const cus2 = CustomerService.createCustomer('cus-2', 'Le Thi Binh', 'binh@gmail.com');
const cus3 = CustomerService.createCustomer('cus-3', 'Tran Minh Cuong', 'cuong@gmail.com');
const cus4 = CustomerService.createCustomer('cus-4', 'Pham Thi Dung', 'dung@gmail.com');

// Tạo thêm tài khoản phụ cho mỗi khách hàng
const acc1_saving = new Account('acc1-saving');
const acc1_business = new Account('acc1-business');
const acc2_saving = new Account('acc2-saving');
const acc3_saving = new Account('acc3-saving');
const acc4_business = new Account('acc4-business');

// Gắn chủ sở hữu cho các tài khoản phụ
acc1_saving.customer = cus1;
acc1_business.customer = cus1;
acc2_saving.customer = cus2;
acc3_saving.customer = cus3;
acc4_business.customer = cus4;

// Thêm tài khoản phụ vào khách hàng
cus1.addAccount(acc1_saving);
cus1.addAccount(acc1_business);
cus2.addAccount(acc2_saving);
cus3.addAccount(acc3_saving);
cus4.addAccount(acc4_business);

// Thêm khách hàng vào hệ thống
bank.addCustomer(cus1);
bank.addCustomer(cus2);
bank.addCustomer(cus3);
bank.addCustomer(cus4);




console.log('=== NẠP TIỀN KHỞI TẠO ===');
try {
    // Nạp tiền cho tài khoản chính của tất cả khách hàng
    CustomerService.deposit(cus1, 5000);
    logTransaction('DEPOSIT', 'External', 'An (Chính)', 5000, 'Nạp tiền khởi tạo');

    CustomerService.deposit(cus2, 3000);
    logTransaction('DEPOSIT', 'External', 'Binh (Chính)', 3000, 'Nạp tiền khởi tạo');

    CustomerService.deposit(cus3, 2000);
    logTransaction('DEPOSIT', 'External', 'Cuong (Chính)', 2000, 'Nạp tiền khởi tạo');

    CustomerService.deposit(cus4, 4000);
    logTransaction('DEPOSIT', 'External', 'Dung (Chính)', 4000, 'Nạp tiền khởi tạo');

    // Nạp tiền cho tài khoản phụ
    acc1_saving.deposit(10000);
    logTransaction('DEPOSIT', 'External', 'An (Tiết kiệm)', 10000, 'Nạp tiền tiết kiệm');

    acc1_business.deposit(15000);
    logTransaction('DEPOSIT', 'External', 'An (Thương mại)', 15000, 'Vốn kinh doanh');

    acc2_saving.deposit(7000);
    logTransaction('DEPOSIT', 'External', 'Binh (Tiết kiệm)', 7000, 'Nạp tiền tiết kiệm');

    acc3_saving.deposit(8000);
    logTransaction('DEPOSIT', 'External', 'Cuong (Tiết kiệm)', 8000, 'Nạp tiền tiết kiệm');

    acc4_business.deposit(12000);
    logTransaction('DEPOSIT', 'External', 'Dung (Thương mại)', 12000, 'Vốn kinh doanh');

    // Test lỗi: nạp số tiền âm
    acc1_saving.deposit(-500);
} catch (e) {
    displayError('LỖI NẠP TIỀN', e.message, {
        details: 'Không thể nạp số tiền âm',
        amount: -500,
        accountId: acc1_saving.id
    });
}
showTransactionTable('BẢNG GIAO DỊCH NẠP TIỀN KHỞI TẠO');

console.log('\nCÁC GIAO DỊCH RÚT TIỀN');
try {
    // Rút tiền bình thường
    CustomerService.withdraw(cus1, 1000);
    logTransaction('WITHDRAW', 'An (Chính)', 'ATM', 1000, 'Rút tiền mặt');

    acc1_saving.withdraw(2000);
    logTransaction('WITHDRAW', 'An (Tiết kiệm)', 'ATM', 2000, 'Rút tiền tiết kiệm');

    acc2_saving.withdraw(1500);
    logTransaction('WITHDRAW', 'Binh (Tiết kiệm)', 'ATM', 1500, 'Rút tiền mặt');

    CustomerService.withdraw(cus3, 500);
    logTransaction('WITHDRAW', 'Cuong (Chính)', 'ATM', 500, 'Rút tiền mặt');

    acc4_business.withdraw(3000);
    logTransaction('WITHDRAW', 'Dung (Thương mại)', 'Business', 3000, 'Chi phí kinh doanh');

    // Test lỗi: rút quá số dư
    CustomerService.withdraw(cus2, 5000);
} catch (e) {
    displayError('LỖI RÚT TIỀN', e.message, {
        details: 'Không đủ số dư để thực hiện giao dịch',
        amount: 5000,
        accountId: cus2.accounts[0].id
    });
}
showTransactionTable('BẢNG GIAO DỊCH RÚT TIỀN');

console.log('\n CHUYỂN KHOẢN GIỮA CÁC TÀI KHOẢN ');
try {
    // Chuyển khoản giữa tài khoản của cùng 1 người
    cus1.accounts[0].transferTo(acc1_saving, 500);
    logTransaction('TRANSFER', 'An (Chính)', 'An (Tiết kiệm)', 500, 'Chuyển tiền tiết kiệm');

    acc1_business.transferTo(cus1.accounts[0], 2000);
    logTransaction('TRANSFER', 'An (Thương mại)', 'An (Chính)', 2000, 'Rút lợi nhuận');

    // Chuyển khoản giữa các khách hàng khác nhau  
    cus1.accounts[0].transferTo(cus2.accounts[0], 800);
    logTransaction('TRANSFER', 'An (Chính)', 'Binh (Chính)', 800, 'Chuyển tiền bạn bè');

    acc1_saving.transferTo(acc2_saving, 1000);
    logTransaction('TRANSFER', 'An (Tiết kiệm)', 'Binh (Tiết kiệm)', 1000, 'Cho vay ngắn hạn');

    acc4_business.transferTo(cus3.accounts[0], 1500);
    logTransaction('TRANSFER', 'Dung (Thương mại)', 'Cuong (Chính)', 1500, 'Thanh toán dịch vụ');

    // Chuyển khoản nhiều người liên tiếp (chuỗi giao dịch)
    cus2.accounts[0].transferTo(cus3.accounts[0], 600);
    logTransaction('TRANSFER', 'Binh (Chính)', 'Cuong (Chính)', 600, 'Chuỗi giao dịch 1');

    cus3.accounts[0].transferTo(acc3_saving, 1000);
    logTransaction('TRANSFER', 'Cuong (Chính)', 'Cuong (Tiết kiệm)', 1000, 'Chuỗi giao dịch 2');

    acc3_saving.transferTo(cus4.accounts[0], 500);
    logTransaction('TRANSFER', 'Cuong (Tiết kiệm)', 'Dung (Chính)', 500, 'Chuỗi giao dịch 3');

    // Test lỗi: chuyển khoản quá số dư  
    acc2_saving.transferTo(acc4_business, 10000);
} catch (e) {
    displayError('LỖI CHUYỂN KHOẢN', e.message, {
        details: 'Số dư không đủ để chuyển khoản',
        amount: 10000,
        accountId: acc2_saving.id
    });
}
showTransactionTable('BẢNG GIAO DỊCH CHUYỂN KHOẢN');


console.log('\n GIAO DỊCH ĐA DẠNG VÀ PHỨC TẠP ');
try {
    // Nạp tiền lương
    CustomerService.deposit(cus1, 8000);
    CustomerService.deposit(cus4, 6000);

    // Chuyển tiền cho gia đình
    cus1.accounts[0].transferTo(cus2.accounts[0], 1200);
    cus4.accounts[0].transferTo(cus3.accounts[0], 800);

    // Rút tiền ATM
    CustomerService.withdraw(cus2, 300);
    CustomerService.withdraw(cus3, 150);

    // Giao dịch kinh doanh
    acc1_business.transferTo(acc4_business, 5000);
    acc4_business.transferTo(acc2_saving, 2000);

    // Tiết kiệm và đầu tư
    cus1.accounts[0].transferTo(acc1_saving, 3000);
    cus2.accounts[0].transferTo(acc2_saving, 1000);
    acc3_saving.transferTo(acc1_business, 1500);

    // Thanh toán hóa đơn
    CustomerService.withdraw(cus1, 400);
    CustomerService.withdraw(cus2, 250);
    acc4_business.withdraw(1800);

} catch (e) {
    console.log('❌ Lỗi giao dịch đa dạng:', e.message);
}

console.log('\n TEST GIỚI HẠN VÀ BẢO MẬT ');
try {
    // Test nhiều giao dịch liên tiếp từ cùng một tài khoản
    CustomerService.withdraw(cus1, 100);
    CustomerService.withdraw(cus1, 200);
    CustomerService.withdraw(cus1, 150);

    // Test chuyển khoản số tiền lớn
    acc1_saving.transferTo(acc4_business, 4000);

    // Test giao dịch chuỗi (A->B->C->A)
    cus2.accounts[0].transferTo(cus3.accounts[0], 500);
    cus3.accounts[0].transferTo(cus4.accounts[0], 300);
    cus4.accounts[0].transferTo(cus2.accounts[0], 200);

    // Test giao dịch đồng thời từ nhiều tài khoản của cùng khách hàng
    acc1_saving.withdraw(500);
    acc1_business.withdraw(800);
    CustomerService.deposit(cus1, 600);

    // Test các trường hợp biên
    CustomerService.withdraw(cus3, 1);
    acc2_saving.transferTo(acc3_saving, 1);

    // Test lỗi: Giao dịch không hợp lệ
    CustomerService.withdraw(cus1, 0);
} catch (e) {
    console.log('❌ Lỗi test giới hạn:', e.message);
}

console.log('\n GIAO DỊCH KHẨN CẤP VÀ ĐẶC BIỆT');
try {
    // Trường hợp khẩn cấp: Cần tiền gấp
    acc1_saving.transferTo(cus1.accounts[0], 2500);
    cus1.accounts[0].transferTo(cus2.accounts[0], 2000);

    // Hoàn trả giao dịch
    cus2.accounts[0].transferTo(cus1.accounts[0], 500);

    // Giao dịch số tiền lớn giữa doanh nghiệp
    acc1_business.transferTo(acc4_business, 3000);
    acc4_business.transferTo(acc1_business, 1000);

    // Nạp tiền từ nhiều nguồn
    CustomerService.deposit(cus3, 1500);
    acc3_saving.deposit(800);
    CustomerService.deposit(cus3, 600);

} catch (e) {
    console.log('❌ Lỗi giao dịch khẩn cấp:', e.message);
}

// In ra bảng số dư các tài khoản 
console.log('\n📊 BẢNG SỐ DƯ TẤT CẢ TÀI KHOẢN:');
console.table([
    { owner: 'An (Chính)', id: cus1.accounts[0].id, balance: cus1.accounts[0].getBalance().toLocaleString() + ' VND' },
    { owner: 'An (Tiết kiệm)', id: acc1_saving.id, balance: acc1_saving.getBalance().toLocaleString() + ' VND' },
    { owner: 'An (Thương mại)', id: acc1_business.id, balance: acc1_business.getBalance().toLocaleString() + ' VND' },
    { owner: 'Binh (Chính)', id: cus2.accounts[0].id, balance: cus2.accounts[0].getBalance().toLocaleString() + ' VND' },
    { owner: 'Binh (Tiết kiệm)', id: acc2_saving.id, balance: acc2_saving.getBalance().toLocaleString() + ' VND' },
    { owner: 'Cuong (Chính)', id: cus3.accounts[0].id, balance: cus3.accounts[0].getBalance().toLocaleString() + ' VND' },
    { owner: 'Cuong (Tiết kiệm)', id: acc3_saving.id, balance: acc3_saving.getBalance().toLocaleString() + ' VND' },
    { owner: 'Dung (Chính)', id: cus4.accounts[0].id, balance: cus4.accounts[0].getBalance().toLocaleString() + ' VND' },
    { owner: 'Dung (Thương mại)', id: acc4_business.id, balance: acc4_business.getBalance().toLocaleString() + ' VND' },
]);

console.log('\n👤 THỐNG KÊ THEO KHÁCH HÀNG:');
[cus1, cus2, cus3, cus4].forEach(customer => {
    const totalBalance = customer.accounts.reduce((sum, acc) => sum + acc.getBalance(), 0);
    const accountCount = customer.accounts.length;
    console.log(`${customer.name}: ${accountCount} tài khoản, Tổng: ${totalBalance.toLocaleString()} VND`);
});

console.log('\n💳 LỊCH SỬ GIAO DỊCH CỦA AN:');
console.table(cus1.accounts[0].getTransactions().map(tx => ({
    type: tx.type,
    amount: tx.amount.toLocaleString() + ' VND',
    from: tx.type === 'transfer' ? tx.fromAccount : '-',
    to: tx.type === 'transfer' ? tx.toAccount : '-',
    time: new Date(tx.date).toLocaleTimeString()
})));

console.log('\n🏦 ===== BÁO CÁO BANK MANAGER =====');
console.log(`💰 Tổng số dư toàn hệ thống: ${manager.viewTotalBalance().toLocaleString()} VND`);
console.log(`👥 Tổng số khách hàng: ${manager.viewAllCustomers().length} người`);
console.log(`📁 Tổng số tài khoản: ${manager.viewAllAccounts().length} tài khoản`);
console.log(`📋 Tổng số giao dịch: ${manager.viewAllTransactions().length} giao dịch`);

console.log('\n📋 TẤT CẢ GIAO DỊCH TRONG HỆ THỐNG (10 giao dịch gần nhất):');
const allTransactions = manager.viewAllTransactions();
console.table(allTransactions.slice(-10).map((tx, index) => ({
    stt: index + 1,
    type: tx.type.toUpperCase(),
    amount: tx.amount.toLocaleString() + ' VND',
    from: tx.fromAccount || 'External',
    to: tx.toAccount || 'External',
    time: new Date(tx.date).toLocaleTimeString()
})));
