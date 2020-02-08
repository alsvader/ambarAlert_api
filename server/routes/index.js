import { Router } from 'express';
import inputValidation from '../middlewares/inputValidation';
import { user } from '../controllers';

const router = Router();

router.get('/heartbeat', async (req, res) => {
  res.send('Heartbeat');
});

router.route('/user').post(inputValidation('userSchema'), user.createUser);

router.post('/login', inputValidation('loginSchema'), user.login);

router.post(
  '/login/validatecode',
  inputValidation('validateCodeSchema'),
  user.validateCode
);

router.post(
  '/user/:userId/changepassword',
  inputValidation('changePassword'),
  user.changePassword
);

router.put('/user/:userId', inputValidation('updateUser'), user.updateUser);

export default router;
