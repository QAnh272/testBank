class Customer {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.accounts = [];
    }
    addAccount(account) {
        this.accounts.push(account);
    }
}

module.exports = Customer;
