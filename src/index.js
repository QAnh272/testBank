const CustomerService = require('./services/customerService');
const BankService = require('./services/bankService');
const BankManagerService = require('./services/bankManagerService');
const Account = require('./models/account');

// Tạo hệ thống ngân hàng và bank manager
const bank = new BankService();
const manager = new BankManagerService(bank);

// Tạo khách hàng (mô phỏng 4 khách hàng thực tế)
const cus1 = CustomerService.createCustomer('cus-1', 'Nguyen Van An', 'an@gmail.com');
const cus2 = CustomerService.createCustomer('cus-2', 'Le Thi Binh', 'binh@gmail.com');
const cus3 = CustomerService.createCustomer('cus-3', 'Tran Minh Cuong', 'cuong@gmail.com');
const cus4 = CustomerService.createCustomer('cus-4', 'Pham Thi Dung', 'dung@gmail.com');

// Tạo thêm tài khoản phụ cho mỗi khách hàng (tiết kiệm và thương mại)
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




// KỊCH BẢN 1: NẠP TIỀN KHỞI TẠO CHO TẤT CẢ TÀI KHOẢN
console.log('=== KỊCH BẢN 1: NẠP TIỀN KHỞI TẠO ===');
try {
    // Nạp tiền cho tài khoản chính của tất cả khách hàng
    CustomerService.deposit(cus1, 5000);   // An: 5,000k tài khoản chính
    CustomerService.deposit(cus2, 3000);   // Binh: 3,000k tài khoản chính  
    CustomerService.deposit(cus3, 2000);   // Cuong: 2,000k tài khoản chính
    CustomerService.deposit(cus4, 4000);   // Dung: 4,000k tài khoản chính

    // Nạp tiền cho tài khoản phụ
    acc1_saving.deposit(10000);     // An: 10,000k tài khoản tiết kiệm
    acc1_business.deposit(15000);   // An: 15,000k tài khoản thương mại
    acc2_saving.deposit(7000);      // Binh: 7,000k tài khoản tiết kiệm
    acc3_saving.deposit(8000);      // Cuong: 8,000k tài khoản tiết kiệm
    acc4_business.deposit(12000);   // Dung: 12,000k tài khoản thương mại

    // Test lỗi: nạp số tiền âm
    acc1_saving.deposit(-500);
} catch (e) {
    console.log('❌ Lỗi nạp tiền:', e.message);
}

// KỊCH BẢN 2: CÁC GIAO DỊCH RÚT TIỀN KHÁC NHAU
console.log('\n=== KỊCH BẢN 2: CÁC GIAO DỊCH RÚT TIỀN ===');
try {
    // Rút tiền bình thường
    CustomerService.withdraw(cus1, 1000);     // An rút 1,000k từ tài khoản chính
    acc1_saving.withdraw(2000);               // An rút 2,000k từ tiết kiệm
    acc2_saving.withdraw(1500);               // Binh rút 1,500k từ tiết kiệm
    CustomerService.withdraw(cus3, 500);      // Cuong rút 500k từ tài khoản chính
    acc4_business.withdraw(3000);             // Dung rút 3,000k từ thương mại

    // Test lỗi: rút quá số dư
    CustomerService.withdraw(cus2, 5000);     // Binh chỉ có 3,000k nhưng rút 5,000k
} catch (e) {
    console.log('❌ Lỗi rút tiền:', e.message);
}

// KỊCH BẢN 3: CHUYỂN KHOẢN GIỮA CÁC LOẠI TÀI KHOẢN
console.log('\n=== KỊCH BẢN 3: CHUYỂN KHOẢN GIỮA CÁC TÀI KHOẢN ===');
try {
    // Chuyển khoản giữa tài khoản của cùng 1 người
    cus1.accounts[0].transferTo(acc1_saving, 500);       // An: chính -> tiết kiệm 500k
    acc1_business.transferTo(cus1.accounts[0], 2000);    // An: thương mại -> chính 2,000k

    // Chuyển khoản giữa các khách hàng khác nhau  
    cus1.accounts[0].transferTo(cus2.accounts[0], 800);  // An -> Binh: chính -> chính 800k
    acc1_saving.transferTo(acc2_saving, 1000);           // An -> Binh: tiết kiệm -> tiết kiệm 1,000k
    acc4_business.transferTo(cus3.accounts[0], 1500);    // Dung -> Cuong: thương mại -> chính 1,500k

    // Chuyển khoản nhiều người liên tiếp (chuỗi giao dịch)
    cus2.accounts[0].transferTo(cus3.accounts[0], 600);  // Binh -> Cuong 600k
    cus3.accounts[0].transferTo(acc3_saving, 1000);      // Cuong: chính -> tiết kiệm 1,000k
    acc3_saving.transferTo(cus4.accounts[0], 500);       // Cuong -> Dung: tiết kiệm -> chính 500k

    // Test lỗi: chuyển khoản quá số dư  
    acc2_saving.transferTo(acc4_business, 10000);        // Binh chỉ có ~5,500k nhưng chuyển 10,000k
} catch (e) {
    console.log('❌ Lỗi chuyển khoản:', e.message);
}

// KỊCH BẢN 4: CÁC GIAO DỊCH CUỐI NGÀY
console.log('\n=== KỊCH BẢN 4: CÁC GIAO DỊCH CUỐI NGÀY ===');
try {
    // Một số giao dịch nhỏ cuối ngày
    acc1_business.transferTo(acc4_business, 1000);       // An -> Dung: doanh nghiệp 1,000k
    cus4.accounts[0].transferTo(cus2.accounts[0], 300);  // Dung -> Binh 300k
    acc3_saving.transferTo(acc1_saving, 800);            // Cuong -> An: tiết kiệm 800k

    // Test thêm một số giao dịch rút/nạp
    CustomerService.deposit(cus4, 1000);                 // Dung nạp thêm 1,000k
    acc2_saving.withdraw(500);                           // Binh rút 500k từ tiết kiệm
} catch (e) {
    console.log('❌ Lỗi giao dịch cuối ngày:', e.message);
}


// In ra bảng số dư các tài khoản (toàn bộ hệ thống)
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

// Thống kê chi tiết từng khách hàng
console.log('\n👤 THỐNG KÊ THEO KHÁCH HÀNG:');
[cus1, cus2, cus3, cus4].forEach(customer => {
    const totalBalance = customer.accounts.reduce((sum, acc) => sum + acc.getBalance(), 0);
    const accountCount = customer.accounts.length;
    console.log(`${customer.name}: ${accountCount} tài khoản, Tổng: ${totalBalance.toLocaleString()} VND`);
});

// In ra giao dịch của tài khoản có nhiều giao dịch nhất (An - tài khoản chính)
console.log('\n💳 LỊCH SỬ GIAO DỊCH TÀI KHOẢN CHÍNH CỦA AN:');
console.table(cus1.accounts[0].getTransactions().map(tx => ({
    type: tx.type,
    amount: tx.amount.toLocaleString() + ' VND',
    from: tx.type === 'transfer' ? tx.fromAccount : '-',
    to: tx.type === 'transfer' ? tx.toAccount : '-',
    time: new Date(tx.date).toLocaleTimeString()
})));

// In ra giao dịch của tài khoản tiết kiệm của An
console.log('\n💰 LỊCH SỬ GIAO DỊCH TÀI KHOẢN TIẾT KIỆM CỦA AN:');
console.table(acc1_saving.getTransactions().map(tx => ({
    type: tx.type,
    amount: tx.amount.toLocaleString() + ' VND',
    from: tx.type === 'transfer' ? tx.fromAccount : '-',
    to: tx.type === 'transfer' ? tx.toAccount : '-',
    time: new Date(tx.date).toLocaleTimeString()
})));


// Bank manager xem tổng quan toàn hệ thống
console.log('\n🏦 TỔNG QUAN HỆ THỐNG NGÂN HÀNG:');
console.log(`💰 Tổng số dư toàn hệ thống: ${manager.viewTotalBalance().toLocaleString()} VND`);
console.log(`👥 Tổng số khách hàng: ${bank.customers.length} người`);
console.log(`📁 Tổng số tài khoản: ${manager.viewAllAccounts().length} tài khoản`);
console.log(`📋 Tổng số giao dịch: ${manager.viewAllTransactions().length} giao dịch`);

// Phân tích các loại giao dịch
const allTransactions = manager.viewAllTransactions();
const transactionTypes = allTransactions.reduce((acc, tx) => {
    acc[tx.type] = (acc[tx.type] || 0) + 1;
    return acc;
}, {});

console.log('\n📊 THỐNG KÊ THEO LOẠI GIAO DỊCH:');
Object.entries(transactionTypes).forEach(([type, count]) => {
    console.log(`${type.toUpperCase()}: ${count} giao dịch`);
});

// Top 5 giao dịch lớn nhất
console.log('\n🔥 TOP 5 GIAO DỊCH LỚN NHẤT:');
const topTransactions = allTransactions
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
    .map(tx => ({
        type: tx.type,
        amount: tx.amount.toLocaleString() + ' VND',
        from: tx.type === 'transfer' ? tx.fromAccount : '-',
        to: tx.type === 'transfer' ? tx.toAccount : '-',
        time: new Date(tx.date).toLocaleTimeString()
    }));
console.table(topTransactions);

// Bank manager xem thông tin chi tiết các account
console.log('\n🏪 THÔNG TIN CHI TIẾT TẤT CẢ ACCOUNT:');
manager.viewAllAccounts().forEach(acc => {
    const owner = acc.customer && acc.customer.name ? acc.customer.name : 'Không xác định';
    const txCount = acc.getTransactions().length;
    console.log(`Account ID: ${acc.id} | Balance: ${acc.getBalance().toLocaleString()} VND | Owner: ${owner} | Transactions: ${txCount}`);
});