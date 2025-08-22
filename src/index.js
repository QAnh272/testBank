const CustomerService = require('./services/customerService');
const BankService = require('./services/bankService');
const BankManagerService = require('./services/bankManagerService');
const Account = require('./models/account');

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




console.log(' NẠP TIỀN KHỞI TẠO ===');
try {
    // Nạp tiền cho tài khoản chính của tất cả khách hàng
    CustomerService.deposit(cus1, 5000);   
    CustomerService.deposit(cus2, 3000);   
    CustomerService.deposit(cus3, 2000);  
    CustomerService.deposit(cus4, 4000);  

    // Nạp tiền cho tài khoản phụ
    acc1_saving.deposit(10000);    
    acc1_business.deposit(15000);  
    acc2_saving.deposit(7000);    
    acc3_saving.deposit(8000);      
    acc4_business.deposit(12000);  

    // Test lỗi: nạp số tiền âm
    acc1_saving.deposit(-500);
} catch (e) {
    console.log('❌ Lỗi nạp tiền:', e.message);
}

console.log('\n=== KỊCH BẢN 2: CÁC GIAO DỊCH RÚT TIỀN ===');
try {
    // Rút tiền bình thường
    CustomerService.withdraw(cus1, 1000);     
    acc1_saving.withdraw(2000);               
    acc2_saving.withdraw(1500);              
    CustomerService.withdraw(cus3, 500);      
    acc4_business.withdraw(3000);             

    // Test lỗi: rút quá số dư
    CustomerService.withdraw(cus2, 5000);    
} catch (e) {
    console.log('❌ Lỗi rút tiền:', e.message);
}

console.log('\n CHUYỂN KHOẢN GIỮA CÁC TÀI KHOẢN ===');
try {
    // Chuyển khoản giữa tài khoản của cùng 1 người
    cus1.accounts[0].transferTo(acc1_saving, 500);      
    acc1_business.transferTo(cus1.accounts[0], 2000);    

    // Chuyển khoản giữa các khách hàng khác nhau  
    cus1.accounts[0].transferTo(cus2.accounts[0], 800);
    acc1_saving.transferTo(acc2_saving, 1000);           
    acc4_business.transferTo(cus3.accounts[0], 1500);    

    // Chuyển khoản nhiều người liên tiếp (chuỗi giao dịch)
    cus2.accounts[0].transferTo(cus3.accounts[0], 600);  
    cus3.accounts[0].transferTo(acc3_saving, 1000);      
    acc3_saving.transferTo(cus4.accounts[0], 500);      

    // Test lỗi: chuyển khoản quá số dư  
    acc2_saving.transferTo(acc4_business, 10000);       
} catch (e) {
    console.log('❌ Lỗi chuyển khoản:', e.message);
}


console.log('\n GIAO DỊCH ĐA DẠNG VÀ PHỨC TẠP ===');
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

console.log('\n TEST GIỚI HẠN VÀ BẢO MẬT ===');
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

console.log('\n GIAO DỊCH KHẨN CẤP VÀ ĐẶC BIỆT ===');
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

console.log('\n💳 LỊCH SỬ GIAO DỊCH TÀI KHOẢN CHÍNH CỦA AN:');
console.table(cus1.accounts[0].getTransactions().map(tx => ({
    type: tx.type,
    amount: tx.amount.toLocaleString() + ' VND',
    from: tx.type === 'transfer' ? tx.fromAccount : '-',
    to: tx.type === 'transfer' ? tx.toAccount : '-',
    time: new Date(tx.date).toLocaleTimeString()
})));

console.log('\n💰 LỊCH SỬ GIAO DỊCH TÀI KHOẢN TIẾT KIỆM CỦA AN:');
console.table(acc1_saving.getTransactions().map(tx => ({
    type: tx.type,
    amount: tx.amount.toLocaleString() + ' VND',
    from: tx.type === 'transfer' ? tx.fromAccount : '-',
    to: tx.type === 'transfer' ? tx.toAccount : '-',
    time: new Date(tx.date).toLocaleTimeString()
})));

console.log('\n🏦 ===== BÁO CÁO TỔNG QUAN HỆ THỐNG NGÂN HÀNG =====');
console.log(`💰 Tổng số dư toàn hệ thống: ${manager.viewTotalBalance().toLocaleString()} VND`);
console.log(`👥 Tổng số khách hàng: ${manager.viewAllCustomers().length} người`);
console.log(`📁 Tổng số tài khoản: ${manager.viewAllAccounts().length} tài khoản`);
console.log(`📋 Tổng số giao dịch: ${manager.viewAllTransactions().length} giao dịch`);

// Phân tích chi tiết các loại giao dịch
const allTransactions = manager.viewAllTransactions();
const transactionAnalysis = allTransactions.reduce((acc, tx) => {
    if (!acc[tx.type]) {
        acc[tx.type] = { count: 0, totalAmount: 0 };
    }
    acc[tx.type].count += 1;
    acc[tx.type].totalAmount += tx.amount;
    return acc;
}, {});

console.log('\n📊 PHÂN TÍCH CHI TIẾT THEO LOẠI GIAO DỊCH:');
Object.entries(transactionAnalysis).forEach(([type, data]) => {
    console.log(`${type.toUpperCase()}: ${data.count} giao dịch, Tổng tiền: ${data.totalAmount.toLocaleString()} VND`);
});

// Phân tích số dư theo khách hàng
console.log('\n💳 PHÂN TÍCH SỐ DƯ THEO KHÁCH HÀNG:');
const customerAnalysis = manager.viewAllCustomers().map(customer => {
    const totalBalance = customer.accounts.reduce((sum, acc) => sum + acc.getBalance(), 0);
    const accountCount = customer.accounts.length;
    const transactionCount = customer.accounts.reduce((sum, acc) => sum + acc.getTransactions().length, 0);
    return {
        name: customer.name,
        accounts: accountCount,
        balance: totalBalance.toLocaleString() + ' VND',
        transactions: transactionCount
    };
}).sort((a, b) => parseInt(a.balance.replace(/\D/g, '')) - parseInt(b.balance.replace(/\D/g, '')));

console.table(customerAnalysis);

// Top 5 giao dịch lớn nhất
console.log('\n🔥 TOP 5 GIAO DỊCH LỚN NHẤT:');
const topTransactions = allTransactions
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
    .map((tx, index) => ({
        rank: index + 1,
        type: tx.type,
        amount: tx.amount.toLocaleString() + ' VND',
        from: tx.fromAccount || 'N/A',
        to: tx.toAccount || 'N/A',
        time: new Date(tx.date).toLocaleTimeString()
    }));
console.table(topTransactions);

// Top 5 giao dịch nhỏ nhất
console.log('\n📉 TOP 5 GIAO DỊCH NHỎ NHẤT:');
const smallTransactions = allTransactions
    .filter(tx => tx.amount > 0)
    .sort((a, b) => a.amount - b.amount)
    .slice(0, 5)
    .map((tx, index) => ({
        rank: index + 1,
        type: tx.type,
        amount: tx.amount.toLocaleString() + ' VND',
        from: tx.fromAccount || 'N/A',
        to: tx.toAccount || 'N/A',
        time: new Date(tx.date).toLocaleTimeString()
    }));
console.table(smallTransactions);

// Kiểm tra tính toàn vẹn số liệu
console.log('\n🔍 KIỂM TOÁN SỐ LIỆU:');
const totalDeposits = allTransactions
    .filter(tx => tx.type === 'deposit')
    .reduce((sum, tx) => sum + tx.amount, 0);
const totalWithdraws = allTransactions
    .filter(tx => tx.type === 'withdraw')
    .reduce((sum, tx) => sum + tx.amount, 0);
const totalTransfers = allTransactions
    .filter(tx => tx.type === 'transfer')
    .reduce((sum, tx) => sum + tx.amount, 0);

console.log(`💵 Tổng tiền nạp: ${totalDeposits.toLocaleString()} VND`);
console.log(`💸 Tổng tiền rút: ${totalWithdraws.toLocaleString()} VND`);
console.log(`🔄 Tổng tiền chuyển khoản: ${totalTransfers.toLocaleString()} VND`);
console.log(`💰 Số dư hiện tại: ${manager.viewTotalBalance().toLocaleString()} VND`);
console.log(`✅ Kiểm tra: ${totalDeposits - totalWithdraws === manager.viewTotalBalance() ? 'CHÍNH XÁC' : 'CÓ SAI SÓT'}`);

// Phân tích tài khoản có hoạt động nhiều nhất
console.log('\n🏆 TÀI KHOẢN HOẠT ĐỘNG NHIỀU NHẤT:');
const accountActivity = manager.viewAllAccounts()
    .map(acc => ({
        id: acc.id,
        owner: acc.customer?.name || 'N/A',
        balance: acc.getBalance().toLocaleString() + ' VND',
        transactions: acc.getTransactions().length,
        lastActivity: acc.getTransactions().length > 0 
            ? new Date(acc.getTransactions()[acc.getTransactions().length - 1].date).toLocaleTimeString()
            : 'Chưa có giao dịch'
    }))
    .sort((a, b) => b.transactions - a.transactions)
    .slice(0, 3);

console.table(accountActivity);

// Phân tích theo thời gian giao dịch
console.log('\n⏰ PHÂN TÍCH GIAO DỊCH THEO THỜI GIAN:');
const timeAnalysis = allTransactions.reduce((acc, tx) => {
    const hour = new Date(tx.date).getHours();
    const timeSlot = `${hour}:00-${hour + 1}:00`;
    acc[timeSlot] = (acc[timeSlot] || 0) + 1;
    return acc;
}, {});

Object.entries(timeAnalysis)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([time, count]) => {
        console.log(`${time}: ${count} giao dịch`);
    });

// Bank manager xem thông tin chi tiết và đánh giá rủi ro
console.log('\n🏪 THÔNG TIN CHI TIẾT VÀ ĐÁNH GIÁ RỦI RO:');
manager.viewAllAccounts().forEach(acc => {
    const owner = acc.customer?.name || 'Không xác định';
    const balance = acc.getBalance();
    const txCount = acc.getTransactions().length;
    const avgTransaction = txCount > 0 
        ? acc.getTransactions().reduce((sum, tx) => sum + tx.amount, 0) / txCount
        : 0;
    
    let riskLevel = '🟢 THẤP';
    if (balance > 10000) riskLevel = '🟡 TRUNG BÌNH';
    if (balance > 20000) riskLevel = '🔴 CAO';
    
    console.log(`Account: ${acc.id} | Owner: ${owner} | Balance: ${balance.toLocaleString()} VND | TXs: ${txCount} | Avg TX: ${avgTransaction.toLocaleString()} VND | Risk: ${riskLevel}`);
});

// Báo cáo tài khoản có số dư bất thường
console.log('\n⚠️ TÀI KHOẢN CẦN THEO DÕI:');
const unusualAccounts = manager.viewAllAccounts().filter(acc => {
    const balance = acc.getBalance();
    const txCount = acc.getTransactions().length;
    return balance > 15000 || txCount > 10 || balance < 1000;
});

if (unusualAccounts.length > 0) {
    unusualAccounts.forEach(acc => {
        const reason = acc.getBalance() > 15000 ? 'Số dư cao' : 
                      acc.getTransactions().length > 10 ? 'Giao dịch nhiều' : 'Số dư thấp';
        console.log(`🔍 ${acc.id} (${acc.customer?.name}): ${reason} - ${acc.getBalance().toLocaleString()} VND`);
    });
} else {
    console.log('✅ Không có tài khoản bất thường');
}