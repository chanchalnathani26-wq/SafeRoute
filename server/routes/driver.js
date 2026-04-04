const router = require('express').Router();

// Placeholder — returns dummy driver data for now
router.get('/:id', (req, res) => {
  res.json({
    name:    'Ramesh Kumar',
    vehicle: 'MH12AB1234',
    rating:  4.2,
  });
});

module.exports = router;