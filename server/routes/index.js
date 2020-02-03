import { Router } from 'express';
import inputValidation from '../middlewares/inputValidation';
import { user } from '../controllers';

const router = Router();

router.get('/heartbeat', async (req, res) => {
  res.send('Heartbeat');
});

router.route('/user').post(inputValidation('userSchema'), user.createUser);

router.post('/loggin', inputValidation('userSchema'), user.loggin);

export default router;
