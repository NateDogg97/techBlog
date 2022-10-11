const router = require('express').Router();
const { Post } = require('../../../models');
const withAuth = require('../../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const postContent = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!postContent) {
      res.status(400).json({ message: 'No Post with that ID.' });
      return;
    }
    res.status(200).json(postContent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postContent = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postContent) {
      res.status(404).json({ message: 'No post with that ID.'});
      return;
    }
    res.status(200).json(postContent);
  } catch (err) {
      res.status(500).json(err);
  } 
});

module.exports = router;