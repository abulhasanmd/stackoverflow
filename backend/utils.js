const Logs = require('./models/logs');

async function log(what, comment='', createdBy, resourceId) {
    console.log("#### logged ", what, " event");
    let result = await Logs.create({what, comment, createdBy, resourceId})
    return result;
}
module.exports = {
    log
}