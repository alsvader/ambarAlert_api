import { Router } from 'express';
import inputValidation from '../middlewares/inputValidation';
import { user, child } from '../controllers';
import { pdfUpload, imageUpload, multipleUpload } from '../config/multerConf';

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

router.post('/child', inputValidation('childSchema'), child.createChild);

router
  .route('/child/:childId')
  .get(child.getById)
  .post(inputValidation('childSchema'), child.updateChild)
  .delete(child.deleteChild);

router.post('/child/:childId/acta', pdfUpload, child.uploadActa);

router.post('/child/:childId/curp', pdfUpload, child.uploadCurp);

router.post('/child/:childId/imgProfil', imageUpload, child.uploadProfile);

router.post('/child/:childId/gallery', multipleUpload, child.uploadGallery);

export default router;
