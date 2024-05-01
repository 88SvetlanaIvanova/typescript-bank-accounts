class BankAccount {
  private balance: number;
  private interestRate: number;
  private interestCeiling: number;
  private favouriteAccounts: BankAccount[] = [];
  private id: number;

  constructor(
    id: number,
    balance: number,
    interestRate: number,
    interestCeiling: number
  ) {
    this.id = id;
    this.balance = balance;
    this.interestRate = interestRate;
    this.interestCeiling = interestCeiling;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (this.balance - amount < 0) {
      throw new Error("Insufficient funds.");
    }
    this.balance -= amount;
  }
  getBalance() {
    return this.balance;
  }

  transferMoney(amount: number, account: BankAccount): void {
    this.withdraw(amount);
    account.deposit(amount);
  }
  getMonthlyInterest(): number {
    if (this.balance > this.interestCeiling) {
      return this.interestCeiling * this.interestRate;
    } else {
      return this.balance * this.interestRate;
    }
  }
  addAccountToFavourites(account: BankAccount): void {
    this.favouriteAccounts.push(account);
  }
  getFavouriteAccounts(): BankAccount[] {
    return this.favouriteAccounts;
  }

  removeFavoriteAccountById(id: number): void {
    const indexToRemove = this.favouriteAccounts.findIndex(
      (account: BankAccount) => account.id === id
    );
    if(indexToRemove === -1){
        throw new Error("Account not found in favorites.")
    }
    this.favouriteAccounts.splice(indexToRemove,1);
  }
}

const account1 = new BankAccount(1, 40000, 0.01, 50000);
account1.deposit(10000);

account1.withdraw(50000);
console.log("balance", account1.getBalance());
try {
  account1.withdraw(50000);
} catch (err: unknown) {
  console.log((err as Error).message);
}
account1.deposit(1000000);
console.log("interest", account1.getMonthlyInterest());
const account2 = new BankAccount(2, 100000, 0.01, 5000);
account1.addAccountToFavourites(account2);
console.log("Fav", account1.getFavouriteAccounts()[0].getBalance());
//story
const account3 = new BankAccount(3, 40000, 0.01, 50000);
const account4 = new BankAccount(4, 10000, 0.01, 50000);
account3.addAccountToFavourites(account4);
account3.transferMoney(20000, account3.getFavouriteAccounts()[0]);

try{
    account3.withdraw(25000)
}catch (err: unknown) {
    console.log((err as Error).message);
  }
  console.log("Account3 monthly interest", account3.getMonthlyInterest());
  console.log("Balance account 1 ", account3.getBalance());
  account3.removeFavoriteAccountById(4);