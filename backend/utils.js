const Logs = require('./models/logs');

async function log(what, comment='', createdBy, resourceId) {
    var data = {what, comment, createdBy, resourceId};
    console.log("#### logged ", data, " event : ", what);
    let result = await Logs.create({what, comment, createdBy, resourceId})
    return result;
}
module.exports = {
    log
}