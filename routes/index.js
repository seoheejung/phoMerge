const express = require('express');
const moment = require('moment');
const router = express.Router();
const { upload } = require('../controllers/multerController');
const { mergeImages } = require('../controllers/imageMergeController');


router.get('/', (req, res, next) => {
    try {
        res.render('index')
    } catch (err) {
        next(err);
    }
});

router.post('/upload', upload.array('photos', 4), async (req, res, next) => {
	console.log('[' + moment().format("YYYY-MM-DD hh:mm:ss") + '] merged start')
    try {
        await mergeImages(req, res, next);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
