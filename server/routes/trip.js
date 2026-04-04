const router = require('express').Router();
const Trip   = require('../models/Trip');

// Start a new trip
router.post('/start', async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update live location
router.patch('/:id/location', async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { $push: { route: { lat, lng, timestamp: new Date() } } },
      { new: true }
    );
    // Broadcast to guardian's map in real time
    req.app.get('io').emit(`trip:${trip.userId}`, { lat, lng });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// End a trip
router.patch('/:id/end', async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.id,
      { status: 'completed' },
      { new: true }
    );
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Trip history for a user
router.get('/history/:userId', async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;