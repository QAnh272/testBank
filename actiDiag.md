flowchart TD
    Start([Bắt đầu chuyển khoản])
    --> CheckSender{Kiểm tra tài khoản gửi}
    
    CheckSender -->|Tồn tại| CheckReceiver{Kiểm tra tài khoản nhận}
    CheckSender -->|Không tồn tại| Error1[Lỗi: Tài khoản gửi không tồn tại]
    
    CheckReceiver -->|Tồn tại| CheckAmount{Kiểm tra số tiền > 0}
    CheckReceiver -->|Không tồn tại| Error2[Lỗi: Tài khoản nhận không tồn tại]
    
    CheckAmount -->|Hợp lệ| CheckBalance{Kiểm tra số dư đủ}
    CheckAmount -->|Không hợp lệ| Error3[Lỗi: Số tiền phải > 0]
    
    CheckBalance -->|Đủ tiền| DeductMoney[Trừ tiền tài khoản gửi]
    CheckBalance -->|Không đủ| Error4[Lỗi: Số dư không đủ]
    
    DeductMoney --> AddMoney[Cộng tiền tài khoản nhận]
    AddMoney --> CreateTxSender[Tạo transaction cho người gửi]
    CreateTxSender --> CreateTxReceiver[Tạo transaction cho người nhận]
    CreateTxReceiver --> Success[Chuyển khoản thành công]
    
    Error1 --> End([Kết thúc])
    Error2 --> End
    Error3 --> End
    Error4 --> End
    Success --> End