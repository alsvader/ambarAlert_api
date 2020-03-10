import { Router } from 'express';
import inputValidation from '../middlewares/inputValidation';
import { user, child, denuncia } from '../controllers';
import { pdfUpload, imageUpload } from '../config/multerConf';
import keys from '../config/keys';

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

router.post('/user/:userId', inputValidation('updateUser'), user.updateUser);

router.post('/child', inputValidation('childSchema'), child.createChild);

router.post('/child/mychilds', child.getMyChilds);

router
  .route('/child/:childId')
  .get(child.getById)
  .post(inputValidation('childSchema'), child.updateChild)
  .delete(child.deleteChild);

router.post('/child/:childId/acta', pdfUpload, child.uploadActa);

router.post('/child/:childId/curp', pdfUpload, child.uploadCurp);

router.post('/child/:childId/imgProfile', imageUpload, child.uploadProfile);

router.post('/child/:childId/gallery', imageUpload, child.uploadGallery);

/** Denuncia */
router.get('/denuncia', denuncia.getAll);

router
  .route('/denuncia')
  .post(inputValidation('denunciaSchema'), denuncia.createDenuncia);

router.post(
  '/denuncia/:denunciaId/update',
  inputValidation('denunciaSchema'),
  denuncia.updateDenuncia
);

router.post('/denuncia/:denunciaId/status/:statusId', denuncia.changeStatus);

router.post(
  '/denuncia/:denunciaId/dependencia/:dependenciaId',
  denuncia.setToAmber
);

/** Get Storage url */
router.get('/getStorageUrl', (req, res) => {
  const storageUrl = `${keys.backendHost}${keys.storageName}/`;
  res.send({ storageUrl });
});

router.post('/persona', user.consultaPersona);

router.post('/estados', user.consultaEstado);

export default router;
