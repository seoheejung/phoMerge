const express = require('express');
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
    try {
        await mergeImages(req, res, next);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
