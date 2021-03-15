const Router = require('express').Router;

const serviceController = require('../controllers/service');

const router = Router();

/**
 * POST /api/service/generate
 */
router.post('/generate', serviceController.generate);


module.exports = router;