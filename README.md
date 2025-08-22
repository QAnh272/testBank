# 🏦 Hệ Thống Ngân Hàng - Banking System

> **Dự án hệ thống ngân hàng**: Hệ thống ngân hàng đơn giản với đầy đủ chức năng cơ bản

## 📖 Giới thiệu

Đây là một hệ thống ngân hàng được xây dựng bằng Node.js, thể hiện các thao tác ngân hàng cốt lõi với kiến trúc sạch và dễ hiểu. Dự án được thiết kế để đáp ứng yêu cầu kỹ thuật với nguyên tắc "đơn giản nhưng đầy đủ".

## ✨ Tính năng chính

### 👤 Chức năng Khách hàng

- ✅ **Tham gia ngân hàng** - Tạo tài khoản mới
- ✅ **Nạp tiền** - Gửi tiền vào tài khoản
- ✅ **Rút tiền** - Không cho phép thấu chi
- ✅ **Kiểm tra số dư** - Xem số tiền hiện có
- ✅ **Lịch sử giao dịch** - Xem tất cả giao dịch đã thực hiện
- ✅ **Chuyển khoản nội bộ** - Chuyển tiền giữa các khách hàng

### 🏦 Chức năng Quản lý Ngân hàng

- ✅ **Xem tổng số dư** - Tổng tiền trong toàn hệ thống
- ✅ **Xem tất cả giao dịch** - Theo dõi mọi hoạt động

## 🏗️ Kiến trúc hệ thống

```
src/
├── models/                    # 📊 Cấu trúc dữ liệu
│   ├── customer.js           # Thông tin khách hàng
│   ├── account.js            # Thông tin tài khoản
│   ├── transaction.js        # Thông tin giao dịch
│   └── bankManager.js        # Thông tin quản lý
├── services/                  # 🔧 Logic nghiệp vụ
│   ├── customerService.js    # Xử lý khách hàng
│   ├── accountService.js     # Xử lý tài khoản
│   ├── bankService.js        # Xử lý ngân hàng
│   └── bankManagerService.js # Xử lý quản lý
├── tests/                     # 🧪 Kiểm thử
│   ├── customerService.test.js
│   ├── accountService.test.js
│   └── bankManagerService.test.js
└── index.js                   # 🚀 Demo chính
```

## 🚀 Hướng dẫn chạy dự án

### Bước 1: Cài đặt

```bash
# Clone dự án
git clone https://github.com/QAnh272/testBank
cd path/Users/<your_profile>/testBank

# Cài đặt dependencies
npm install
```

### Bước 2: Chạy kiểm thử

```bash
# Chạy tất cả test cases
npm test

# Kết quả mong đợi: All tests passed
```

### Bước 3: Chạy demo

```bash
# Chạy demo để xem hệ thống hoạt động
node src/index.js
```

## 📋 Quy tắc nghiệp vụ

### 🔒 Bảo mật và Hạn chế

1. **Không thấu chi**: Khách hàng không thể rút quá số dư hiện có
2. **Chuyển khoản nội bộ**: Chỉ cho phép chuyển tiền giữa các tài khoản trong cùng ngân hàng
3. **Kiểm tra số dư**: Tất cả giao dịch đều kiểm tra đủ tiền trước khi thực hiện
4. **Lưu trữ giao dịch**: Mọi thao tác đều được ghi lại với thời gian

### 💰 Các loại giao dịch

- **DEPOSIT**: Nạp tiền vào tài khoản
- **WITHDRAW**: Rút tiền từ tài khoản
- **TRANSFER**: Chuyển tiền đi (ghi ở tài khoản nguồn)
- **RECEIVE**: Nhận tiền (ghi ở tài khoản đích)

## 🧪 Kiểm thử hệ thống

Dự án bao gồm bộ test toàn diện:

```bash
# Chạy tất cả tests
npm test

# Kết quả mong đợi:
# ✅ 15 tests passed
# ✅ 3 test suites passed
# ✅ All functionality covered
```

### Test Coverage

- ✅ **Customer Service**: Tạo khách hàng, nạp/rút tiền, chuyển khoản
- ✅ **Account Service**: Quản lý tài khoản, lịch sử giao dịch
- ✅ **Bank Manager Service**: Tổng quan hệ thống, báo cáo
- ✅ **Edge Cases**: Xử lý lỗi, validation dữ liệu

## 📊 Demo Output

Khi chạy `node src/index.js`, bạn sẽ thấy:

### 1. Tạo khách hàng và tài khoản

```
🏦 Tạo khách hàng: Nguyen Van An
💳 Tạo tài khoản chính: cus-1-main
💰 Nạp tiền khởi tạo: 5,000 VND
```

### 2. Các giao dịch cơ bản

```
💸 Rút tiền: 1,000 VND (Số dư còn: 4,000 VND)
🔄 Chuyển khoản: 500 VND cho acc1-saving
```

### 3. Báo cáo tổng quan

```
💰 Tổng số dư toàn hệ thống: 70,849 VND
👥 Tổng số khách hàng: 4 người
📋 Tổng số giao dịch: 81 giao dịch
```

## 📈 Biểu đồ và Tài liệu Kỹ thuật

Dự án bao gồm các biểu đồ Mermaid để hiểu rõ hệ thống:

### 📁 Các file biểu đồ có sẵn:

- **`useCaseDiag.md`** - Use Case Diagram (Chức năng hệ thống)
- **`actiDiag.md`** - Activity Diagram (Quy trình hoạt động)
- **`ERDDiag.md`** - Entity Relationship Diagram (Cấu trúc dữ liệu)
- **`classDiag.md`** - Class Diagram (Kiến trúc lớp)

### 🔍 Cách xem biểu đồ Mermaid:

#### VS Code Extension (Recommended)

1. **Cài đặt extension**:

   - Mở VS Code Extensions: `Ctrl+Shift+X`
   - Tìm và cài: `Mermaid Chart` hoặc `Mermaid Preview`

2. **Xem biểu đồ**:
   - Mở file `.md` chứa biểu đồ (ví dụ: `useCaseDiag.md`)
   - Click nút **Preview** (👁️) ở góc phải trên
   - Hoặc: `Ctrl+Shift+P` → gõ "Mermaid Preview"
```

## 🛠️ Công nghệ sử dụng

- **Runtime**: Node.js 24+
- **Testing Framework**: Jest
- **Architecture**: Service-oriented với tách biệt rõ ràng
- **Module System**: CommonJS để tương thích tốt
- **Code Style**: Clean Code principles

## 📝 Cách sử dụng API

### Tạo khách hàng mới

```javascript
const CustomerService = require("./src/services/customerService");
const customer = CustomerService.createCustomer("John Doe", "john@email.com");
```

### Nạp tiền

```javascript
CustomerService.deposit(customer.mainAccount.id, 1000);
```

### Rút tiền

```javascript
const result = CustomerService.withdraw(customer.mainAccount.id, 500);
if (result.success) {
  console.log("Rút tiền thành công");
}
```

### Chuyển khoản

```javascript
CustomerService.transfer(fromAccountId, toAccountId, 200);
```
