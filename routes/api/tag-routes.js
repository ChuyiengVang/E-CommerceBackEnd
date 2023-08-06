const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {

  try {
    const tagData = await Tag.findAll({
      include: [{model:Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }

});

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model:Product}],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }

});

 // create a new tag
router.post('/', (req, res) => {
 
  Tag.create(req.body)
  .then((newTag) => {
    res.json(newTag);
  }) 
  .catch((err) => {
    res.json(err);

  })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {

  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
    .then((updateTag) => {
      res.json(updateTag);
    })
    .catch((err) => {
      res.json(err);
    });

});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {

  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((deleteTag) => {
      res.json(deleteTag);
    })
    .catch((err) => res.json(err));

});

module.exports = router;
