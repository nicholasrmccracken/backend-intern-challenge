import { Request, Response } from 'express';
import { Transaction } from '../models/transaction';
import { addUserPoints, spendUserPoints, getUserBalance } from '../services/points-service';

/**
 * Adds points for a specific transaction.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const addPoints = (req: Request, res: Response) => {
    const transaction = new Transaction(req.body.payer, req.body.points, req.body.timestamp);
    try {
        addUserPoints(transaction);
        res.status(200).send('Transaction added successfully');
    } catch (err) {
        res.status(400).send('Error adding transaction');
    }
}

/**
 * Spends points from the user's balances.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const spendPoints = (req: Request, res: Response) => {
    const { points } = req.body;
    try {
        const spendLog = spendUserPoints(points);
        res.status(200).json(spendLog);
    } catch (err) {
        res.status(400).send(`Insufficient points`);
    }
}

/**
 * Retrieves the balance of points by payer.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const getBalance = (req: Request, res: Response) => {
    const balance = getUserBalance();
    res.status(200).json(balance);
}

export { addPoints, spendPoints, getBalance };
