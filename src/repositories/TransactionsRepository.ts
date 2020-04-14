import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Transactions {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((sum, current) => {
      if (current.type === 'income') return sum + current.value;
      return sum;
    }, 0);

    const outcome = this.transactions.reduce((acumulated, current) => {
      if (current.type === 'outcome') return acumulated + current.value;
      return acumulated;
    }, 0);

    const total = income - outcome;
    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, type, value }: Transactions): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
