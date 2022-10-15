const router = require('express').Router();
const { Post } = require('../../../models');
const { Comment } = require('../../../models');
const withAuth = require('../../../utils/auth');



router.post('/:num', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      post_id: req.params.num,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.update(req.body, {
      where: 
      { 
        id: req.params.id, 
      }
    });
    if (!newComment) {
      res.status(400).json({ message: 'No Post with that ID.' });
      return;
    }
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const newComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!newComment) {
      res.status(404).json({ message: 'No post with that ID.'});
      return;
    }
    res.status(200).json(newComment);
  } catch (err) {
      res.status(500).json(err);
  } 
});

module.exports = router;