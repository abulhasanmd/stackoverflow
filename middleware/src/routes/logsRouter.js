const express = require('express');

const router = express.Router();
let logsService = require('../../../backend/services/logsService.js');

router.get('/:resourceId', async (req, res, next) => {
    let {resourceId} = req.body;
    let results  = await logsService.fetchLogs(resourceId)
    return res.json({data: results.response}).status(results.statusCode)
});

module.exports = router;