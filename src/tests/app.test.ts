import request from 'supertest';
import app from '../app';

describe('Points API', () => {
  /**
   * Test that checks the transaction flow from the project requirements.
   */
  test(`should add points, spend points, and return the user's correct balance`, async () => {
    // Add transactions
    await request(app)
      .post('/add')
      .send({ payer: 'DANNON', points: 300, timestamp: '2022-10-31T10:00:00Z' })
      .expect(200);
      
    await request(app)
      .post('/add')
      .send({ payer: 'UNILEVER', points: 200, timestamp: '2022-10-31T11:00:00Z' })
      .expect(200);
      
    await request(app)
      .post('/add')
      .send({ payer: 'DANNON', points: -200, timestamp: '2022-10-31T15:00:00Z' })
      .expect(200);

    await request(app)
      .post('/add')
      .send({ payer: 'DANNON', points: -200, timestamp: '2022-10-31T15:00:00Z' })
      .expect(400);

    await request(app)
      .post('/add')
      .send({ payer: 'MILLER COORS', points: 10000, timestamp: '2022-11-01T14:00:00Z' })
      .expect(200);

    await request(app)
      .post('/add')
      .send({ payer: 'DANNON', points: 1000, timestamp: '2022-11-02T14:00:00Z' })
      .expect(200);

    // Attempt to spend 100000 points
    await request(app)
      .post('/spend')
      .send({ points: 100000 })
      .expect(400);
    
    // Spend 5000 points
    const spendResponse = await request(app)
      .post('/spend')
      .send({ points: 5000 })
      .expect(200);

    // Verify spend result
    expect(spendResponse.body).toEqual([
      { payer: 'DANNON', points: -100 },
      { payer: 'UNILEVER', points: -200 },
      { payer: 'MILLER COORS', points: -4700 }
    ]);

    // Check the current balance after spending
    const balanceResponse = await request(app).get('/balance').expect(200);

    // Verify the final balance
    expect(balanceResponse.body).toEqual({
      DANNON: 1000,
      UNILEVER: 0,
      'MILLER COORS': 5300
    });
  });
});
