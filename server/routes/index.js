import { Router } from 'express';

const router = Router();

router.get('/heartbeat', (req, res) => res.send('OK'));

export default router;
