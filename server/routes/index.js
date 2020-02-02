import { Router } from 'express';
import logger from '../config/logger';
import models from '../models';

const router = Router();

router.get('/heartbeat', async (req, res) => {
  try {
    const roles = await models.Rol.findAll();
    res.send(roles);
  } catch (error) {
    logger.error('This a test using winston');
  }
});

export default router;
