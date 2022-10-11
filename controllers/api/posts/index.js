const router = require('express').Router();
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

router.use('/', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;