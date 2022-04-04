const express = require('express');

const router = express.Router();
// const { checkAuth } = require('../utils/passport');
const { sendMessage } = require('../kafka/producer');

/* GET TAGS. */
router.get('/get-tags', async (req, res, next) => {
  sendMessage(
    process.env.ADMIN_TOPIC,
    req.body,
    'GET-TAGS',
    (error, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json(error);
    }
});
});

/* ADD TAGS. */
router.post('/add-tag', async (req, res, next) => {
  sendMessage(
    process.env.ADMIN_TOPIC,
    { ...req.body, admin: 'Abul Hasan' },
    'ADD-TAG',
    (error, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json(error);
    }
});
});

/* GET PENDING QUESTIONS. */
router.get('/get-pending-questions', async (req, res, next) => {
  sendMessage(
    process.env.ADMIN_TOPIC,
    req.body,
    'GET-PENDING-QUESTIONS',
    (error, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json(error);
    }
});
});

/* UPDATE REVIEW STATUS. */
router.post('/update-review-status', async (req, res, next) => {
  sendMessage(
    process.env.ADMIN_TOPIC,
    req.body,
    'UPDATE-REVIEW-STATUS',
    (error, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json(error);
    }
});
});

/* GET ANALYTICS. */
router.get('/get-analytics', async (req, res, next) => {
  sendMessage(
    process.env.ADMIN_TOPIC,
    req.body,
    'GET-ANALYTICS',
    (error, data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(400).json(error);
    }
},
    );
});

module.exports = router;
