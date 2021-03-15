const Router = require('express').Router;
const serviceRoute = require('./service');

const router = Router();

router.use('/api/service', serviceRoute);

module.exports = router;

