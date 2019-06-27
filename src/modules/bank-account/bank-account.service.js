class BankAccountService {

    addBankAccount(payload) {
        payload.id = Date.now();
        const bankAccounts = JSON.parse(localStorage.getItem('BankAccount')) || [];
        bankAccounts.push(payload);
        localStorage.setItem('BankAccount', JSON.stringify(bankAccounts));
    }

    getBankAccounts() {
        return JSON.parse(localStorage.getItem('BankAccount')) || [{}];
    }

    getBankAccount(id) {
        return (JSON.parse(localStorage.getItem('BankAccount')) || [{}]).filter(bankAccount => bankAccount.id === Number(id))[0] || {};
    }

    editBankAccount(payload) {
        let bankAccounts = JSON.parse(localStorage.getItem('BankAccount')) || [];
        bankAccounts = bankAccounts.map((bankAccount) => {
            if (bankAccount.id === payload.id){
                bankAccount = payload;
            }
            return bankAccount;
        });
        localStorage.setItem('BankAccount', JSON.stringify(bankAccounts));
    }
    
    deleteBankAccount(id) {
        let bankAccounts = JSON.parse(localStorage.getItem('BankAccount')) || [];
        bankAccounts = bankAccounts.filter(bankAccount => bankAccount.id !== id);
        localStorage.setItem('BankAccount', JSON.stringify(bankAccounts));
    }
}

export const bankAccountService = new BankAccountService();