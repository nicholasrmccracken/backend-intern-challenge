/**
 * Represents a transaction.
 */
export class Transaction {
    /**
     * @param {string} payer - The payer associated with the transaction.
     * @param {number} points - The number of points in the transaction.
     * @param {string} timestamp - The timestamp when the transaction occurred.
     */
    constructor(
        public payer: string,
        public points: number,
        public timestamp: string
    ) {}

    /**
     * Spends points from the transaction.
     * @param {number} pointsToSpend - The number of points to spend.
     * @returns {number} - The actual number of points spent.
     */
    spendPoints(pointsToSpend: number): number {
        const pointsSpent = Math.min(this.points, pointsToSpend);
        this.points -= pointsSpent;
        return pointsSpent;
    }
}
