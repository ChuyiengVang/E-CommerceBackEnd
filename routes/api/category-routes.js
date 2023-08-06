const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

  // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }

});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{model:Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }

});

// create a new category
router.post('/', (req, res) => {
  
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });

});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
    .then((updateCategory) => {
      res.json(updateCategory);
    })    
    .catch((err) => {
      res.json(err);
    });

});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
 
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((deleteCategory) => {
      res.json(deleteCategory);
    })
    .catch((err) => res.json(err));

});

module.exports = router;
