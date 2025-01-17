import * as express from 'express';
import { userController as controller} from '../controllers';
import {authMiddleware} from '../middlewares/auth-middleware';
import {
  verifyMongooseID,
  verifyUserWrapper,
  verifyLocation,
} from '../middlewares/index';

const router = express.Router();

router.get('/', authMiddleware, controller.getUsers);
router.get('/session', authMiddleware, controller.getSession)
router.get('/logout', authMiddleware, controller.logout);
router.get('/:id', verifyMongooseID, controller.getUser);
router.post('/register', verifyUserWrapper(false), controller.createUser);
router.post('/login', controller.login);
router.delete('/:id/', verifyMongooseID, controller.deleteUser);
router.put('/:id/', verifyMongooseID, verifyUserWrapper(true), controller.updateUser);

router.post('/:id/main_location', verifyMongooseID, verifyLocation, controller.addMainLocation);
router.delete('/:id/main_location', verifyMongooseID, controller.removeMainLocation);
router.post('/:id/location', verifyMongooseID, verifyLocation, controller.addLocation);
router.delete('/:id/location', verifyMongooseID, verifyLocation, controller.removeLocation);

export{router};
