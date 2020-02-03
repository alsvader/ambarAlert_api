import { Router } from 'express';
import inputValidation from '../middlewares/inputValidation';
import { user } from '../controllers';

const router = Router();

router.get('/heartbeat', async (req, res) => {
  res.send('Heartbeat');
});

router.route('/user').post(inputValidation('userSchema'), user.createUser);

router.post('/login', inputValidation('loginSchema'), user.login);

export default router;
