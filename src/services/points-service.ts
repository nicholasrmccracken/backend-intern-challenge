import { Transaction } from '../models/transaction';

let transactions: Transaction[] = [];
let payerBalances: { [key: string]: number } = {};

/**
 * Adds a new transaction and updates the payer's balance.
 * 
 * @param {Transaction} transaction - The transaction to add.
 */
const addUserPoints = (transaction: Transaction) => {
    if (payerBalances[transaction.payer]) {
        if (payerBalances[transaction.payer] + transaction.points < 0) {
            throw new Error('Transaction creates negative payer balance');
        }
        payerBalances[transaction.payer] += transaction.points;
    } else {
        payerBalances[transaction.payer] = transaction.points;
    }
    transactions.push(transaction);
    sortTransactions();
    console.log(transactions);
}

/**
 * Spends points from the user's balance, respecting the oldest-first rule.
 * 
 * @param {number} pointsToSpend - The total number of points to spend.
 * @returns {Array<{ payer: string, points: number }>} - The log of how the points were spent.
 * @throws {Error} - If there are insufficient points to spend.
 */
const spendUserPoints = (pointsToSpend: number ): { payer: string, points: number }[] => {
    let totalAvailablePoints = Object.values(payerBalances).reduce((a, b) => a + b, 0);

    if (pointsToSpend > totalAvailablePoints) {
        throw new Error('Insufficient points');
    }
    
    const spendLog: { payer: string, points: number }[] = [];

    while (pointsToSpend > 0 && transactions.length > 0) {
        const transaction = transactions.pop();

        if (transaction) {
            // Spend points from the transaction
            const pointsSpent = transaction.spendPoints(pointsToSpend);

            // Update the payer's balance
            payerBalances[transaction.payer] -= pointsSpent;

            // Reduce the remaining points to spend
            pointsToSpend -= pointsSpent;

            // Log the deduction for the current payer
            addLogEntry(transaction.payer, pointsSpent, spendLog);

            // If there are remaining points in the transaction, push it back into the array
            if (transaction.points > 0) {
                transactions.push(transaction);
                sortTransactions();
            }
        }
    }

    return spendLog;
}

/**
 * Sorts the transactions array in place by timestamp, in descending order.
 */
const sortTransactions = () => {
    transactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/**
 * Adds or updates a log entry for the points spent by a payer.
 * 
 * @param {string} payer - The name of the payer whose points were spent.
 * @param {number} pointsSpent - The number of points spent.
 * @param {Array<{ payer: string, points: number }>} spendLog - The spend log where the entry will be added or updated.
 */
const addLogEntry = (payer: string, pointsSpent: number, spendLog: { payer: string, points: number }[]) => {
    const existingLog = spendLog.find(log => log.payer === payer);
    if (existingLog) {
        existingLog.points -= pointsSpent;
    } else {
        spendLog.push({ payer: payer, points: -pointsSpent });
    }
}

/**
 * Gets the current balance of points by payer.
 * 
 * @returns {Record<string, number>} - The current balance by payer.
 */
const getUserBalance = (): Record<string, number> => {
    return payerBalances;
}

export { addUserPoints, spendUserPoints, getUserBalance };
