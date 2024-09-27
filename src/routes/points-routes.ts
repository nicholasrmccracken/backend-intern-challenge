import { Router } from 'express';
import { addPoints, spendPoints, getBalance } from '../controllers/points-controller';

const router = Router();

/**
 * POST /add - Adds a new transaction.
 */
router.post('/add', addPoints);

/**
 * POST /spend - Spends points according to the oldest-first rule.
 */

router.post('/spend', spendPoints);

/**
 * GET /balance - Fetches the current point balance per payer.
 */
router.get('/balance', getBalance);

export default router;
