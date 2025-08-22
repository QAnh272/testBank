graph TB
    Customer([Customer])
    BankManager([Bank Manager])
    
    subgraph "Banking System"
        UC1[Join Bank]
        UC2[Deposit Money]
        UC3[Withdraw Money]
        UC4[Check Balance]
        UC5[View Own Transactions]
        UC6[Internal Transfer]
        UC7[View Total Balance]
        UC8[View All Transactions]
        UC9[View All Customers]
        UC10[View All Accounts]
    end
    
    %% Customer Use Cases
    Customer --> UC1
    Customer --> UC2
    Customer --> UC3
    Customer --> UC4
    Customer --> UC5
    Customer --> UC6
    
    %% Bank Manager Use Cases
    BankManager --> UC7
    BankManager --> UC8
    BankManager --> UC9
    BankManager --> UC10
    
    %% Styling
    classDef actor fill:#e1f5fe
    classDef usecase fill:#f3e5f5
    
    class Customer,BankManager actor
    class UC1,UC2,UC3,UC4,UC5,UC6,UC7,UC8,UC9,UC10 usecase