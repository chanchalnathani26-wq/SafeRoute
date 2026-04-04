const router = require('express').Router();
const Alert  = require('../models/Alert');
const User   = require('../models/User');
const { sendSMSAlert } = require('../utils/notifier');

// Trigger SOS alert
router.post('/trigger', async (req, res) => {
  try {
    const { userId, tripId, location, type } = req.body;

    const alert = await Alert.create({
      userId,
      tripId,
      location,
      type: type || 'sos',
    });

    const user = await User.findById(userId).select('name emergencyContacts');

    // Send SMS to every emergency contact
    for (const contact of user.emergencyContacts) {
      await sendSMSAlert(
        contact.phone,
        `ALERT: ${user.name} needs help! Location: https://maps.google.com/?q=${location.lat},${location.lng}`
      );
    }

    // Push to guardian dashboard via Socket.IO
    req.app.get('io').emit(`guardian:${userId}`, { alert, user });

    res.json({ success: true, alertId: alert._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark alert as resolved
router.post('/resolve/:id', async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );
    res.json(alert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;