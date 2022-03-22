import  path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(__dirname, '/apis');

function getMethodcall(app, method) {
    method = method.toLowerCase()
    var callback;
    switch(method) {
        case 'get':
            callback = app.get.bind(app); break
        case 'post':
            callback = app.post.bind(app); break
        case 'put':
            callback = app.put.bind(app); break
        case 'delete':
            callback = app.delete.bind(app); break
    }
    return callback
}

async function initRestApis(app) {
    let files = fs.readdirSync(directoryPath)
    return new Promise((resolve, reject) => {
        files.forEach(async function (file) {
            let restApiInfo = await import(`${__dirname}/apis/${file}`)
            let endpoints = restApiInfo['endpoints']
            Object.keys(endpoints).forEach((url) => {
                endpoints[url].forEach((req) => {
                    let callback = getMethodcall(app, req.method)
                    console.log(`Loading ${req.method} ${url} `)
                    callback(url, req.callbacks[0])
                })
            })
            resolve()
        });
    })
}

export {initRestApis}

