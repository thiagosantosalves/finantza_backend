import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';

const router = new Router();
const upload = multer( multerConfig);

import UserController from './app/controller/UserController';
import SessionController from './app/controller/SessionControtroller';
import FileController from './app/controller/FileController';
import AccountController from './app/controller/AccountController';
import RcCategoryController from './app/controller/RcCategoryController';
import DpCategoryController from './app/controller/DpCategoryController';
import CardCreditController from './app/controller/CardCreditController';
import TagsController from './app/controller/TagsController';
import ReleasesController from './app/controller/ReleasesController';
import ReportPdfController from './app/controller/ReportPdfController';
import ReportReleasesExelController from './app/controller/ReportReleasesExelController';
import ReportFullExelController from './app/controller/ReportFullExelController';
import ReportFullPdfController from './app/controller/ReportFullPdfController';
import ProcessOfxController from './app/controller/ProcessOfxController';
import BankConsolidationController from './app/controller/BankConsolidationController';
import CardCreditReleasesController from './app/controller/CardCreditReleasesController';
import DpCategoryFilterController from './app/controller/DpCategoryFilterController';
import MetaController from './app/controller/MetaController';
import MetaReleasesController from './app/controller/MetaReleasesController';

router.post('/user', UserController.store);
router.get('/user', UserController.show);
router.post('/session', SessionController.store);

router.post('/files', upload.single('file'), FileController.store);

router.post('/reportpdf', ReportPdfController.store);
router.post('/reportexel', ReportReleasesExelController.store);

router.post('/reportfullpdf', ReportFullPdfController.store);
router.post('/reportfullexel', ReportFullExelController.store);

router.use(authMiddleware);

router.put('/user', UserController.update);

router.get('/account/:id', AccountController.index);
router.get('/account', AccountController.show);
router.post('/account', AccountController.store);
router.put('/account/:id', AccountController.update);

router.get('/rccategory/:id', RcCategoryController.index);
router.get('/rccategory', RcCategoryController.show);
router.post('/rccategory', RcCategoryController.store);
router.put('/rccategory/:id', RcCategoryController.update);

router.get('/dpcategory/:id', DpCategoryController.index);
router.get('/dpcategory', DpCategoryController.show);
router.post('/dpcategory', DpCategoryController.store);
router.put('/dpcategory/:id', DpCategoryController.update);

router.get('/dpcategoryfilter/:ids', DpCategoryFilterController.index)

router.get('/cardcredit/:id', CardCreditController.index);
router.get('/cardcredit', CardCreditController.show);
router.post('/cardcredit', CardCreditController.store);
router.put('/cardcredit/:id', CardCreditController.update);

router.get('/tags/:id', TagsController.index);
router.get('/tags', TagsController.show);
router.post('/tags', TagsController.store);
router.put('/tags/:id', TagsController.update);
router.delete('/tags/:id', TagsController.delete);

router.get('/releases/:id', ReleasesController.index);
router.get('/releases', ReleasesController.show);
router.post('/releases', ReleasesController.store);
router.put('/releases/:id', ReleasesController.update);

router.post('/processofx', upload.single('file'), ProcessOfxController.store)
router.post('/bankconsolidation', BankConsolidationController.store);

router.get('/cardcreditreleases/:id', CardCreditReleasesController.index)
router.get('/cardcreditreleases', CardCreditReleasesController.show);
router.post('/cardcreditreleases', CardCreditReleasesController.store);
router.put('/cardcreditreleases/:id', CardCreditReleasesController.update);

router.get('/meta/:id', MetaController.index);
router.get('/meta', MetaController.show);
router.post('/meta', MetaController.store);
router.put('/meta/:id', MetaController.put);
router.delete('/meta/:id', MetaController.delete);

router.put('/metareleases/:id', MetaReleasesController.put);

export default router;