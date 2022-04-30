const express = require('express');
const adminService = require('../services/adminService');

const router = express.Router();

/* GET users listing. */
router.get('/get-tags', async (req, res, next) => {
  const response = await adminService.getTags();
  responseHelper(res, response);
});

/* GET users listing. */
router.post('/add-tag', async (req, res, next) => {
  const response = await adminService.addTag({ ...req.body, admin: 'Abul Hasan' });
  responseHelper(res, response);
});

/* GET users listing. */
router.get('/get-pending-questions', async (req, res, next) => {
  const response = await adminService.getPendingQuestions();
  responseHelper(res, response);
});

/* GET users listing. */
router.post('/update-review-status', async (req, res, next) => {
  const response = await adminService.updateReviewStatus(req.body);
  responseHelper(res, response);
});

/* GET users listing. */
router.get('/get-analytics', async (req, res, next) => {
  const response = await adminService.getAnalytics();
  responseHelper(res, response);
});

const responseHelper = (res, response) => {
  if (response.data) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
};
module.exports = router;
