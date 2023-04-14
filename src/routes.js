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
import CardCreditReleasesBulkCreateController from './app/controller/CardCreditReleasesBulkCreateController';
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
import MetaFilterController from './app/controller/MetaFilterController';
import ReportFilterController from './app/controller/ReportFilterController';
import HistoryDeleteController from './app/controller/HistoryDeleteController';
import FixedController from './app/controller/FixedController';
import ReleasesBulkController from './app/controller/ReleasesBulkController';
import NotificationController from './app/controller/NotificationController';
import FixedFilterController from './app/controller/FixedFilterController';
import InstalmentsReleasesController from './app/controller/InstalmentsReleasesController';
import InstalmentsFilterController from './app/controller/InstalmentsFilterController';

import NotificationIndexDelete from './app/controller/NotificationIndexDelete';

router.get('/user/:id', UserController.index);
router.post('/user', UserController.store);
router.get('/user', UserController.show);
router.post('/session', SessionController.store);

router.post('/reportpdf', ReportPdfController.store);
router.post('/reportexel', ReportReleasesExelController.store);

router.post('/reportfullpdf', ReportFullPdfController.store);
router.post('/reportfullexel', ReportFullExelController.store);

router.use(authMiddleware);

router.put('/user', UserController.update);

router.post('/files', upload.single('file'), FileController.store);
router.delete('/files/:id', FileController.delete);

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

router.get('/releases/:rulesfilter', ReleasesController.index);
router.post('/releases', ReleasesController.store);
router.put('/releases/:id', ReleasesController.update);

router.post('/bankconsolidation', BankConsolidationController.store);
router.post('/processofx', upload.single('file'), ProcessOfxController.store);

router.get('/cardcreditreleases/:rulesfilter', CardCreditReleasesController.index);
router.get('/cardcreditreleases', CardCreditReleasesController.show);
router.post('/cardcreditreleases', CardCreditReleasesController.store);
router.put('/cardcreditreleases/:id', CardCreditReleasesController.update);

router.get('/meta/:rulesfilter', MetaController.index);
router.post('/meta', MetaController.store);
router.put('/meta/:id', MetaController.put);
router.delete('/meta/:id', MetaController.delete);

router.put('/metareleases/:id', MetaReleasesController.put);
router.get('/metafilter/:id', MetaFilterController.index);

router.get('/reportFilter/:rulesfilter', ReportFilterController.show)

router.post('/historydelete', HistoryDeleteController.store);

router.get('/fixedrelease/:day', FixedController.index);
router.post('/fixedrelease', FixedController.store);

router.get('instalmentsReleases/:day', InstalmentsReleasesController.index)
router.post('/instalmentsReleases', InstalmentsReleasesController.store);

router.get('/fixedfilter/:id', FixedFilterController.index);

router.get('instalmentsReleases/:day', InstalmentsReleasesController.index)
router.post('/instalmentsReleases', InstalmentsReleasesController.store);

router.get('/instalmentsFilter/:id', InstalmentsFilterController.index);

router.post('/cardcreditreleasesbulkcreate', CardCreditReleasesBulkCreateController.store);
router.post('/releasebulkcreate', ReleasesBulkController.store);

router.get('/notification/:id', NotificationController.index);
router.get('/notification', NotificationController.show);
router.post('/notification', NotificationController.store);
router.put('/notification/:id', NotificationController.update);
router.delete('/notification', NotificationController.delete);

router.delete('/notificationIndex/:id', NotificationIndexDelete.delete);

export default router;