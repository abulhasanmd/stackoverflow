var request = require("request");
var host = 'http://127.0.0.1:3001'; 
var options = { method: 'POST',
  url: host + '/questions/post-question',
  headers: 
   { 'postman-token': '6c96b5a4-0705-cdac-66c4-d2521fd4b2bd',
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: 
   { title: 'question ',
     descr: 'descr1',
     tags: [ '626c87d1c0b2b6b5a2d68081' ],
     createdBy: 
      { _id: '626da3a2298f363d9c012a30',
        imageUrl: 'https://vsdfvdfv.com/dlvknkd' },
     reviewStatus: 'pending' },
  json: true };

function createQuestion(idx){
    if(idx == 25) {
      return;
    }
    let prevQuestion = options.body.title;
    options.body.title = options.body.title + idx 
    request(options, function (error, response, body) {
      options.body.title = prevQuestion
        if (error) throw new Error(error);
        console.log("Success ", idx);
        createQuestion(idx+1)
      });
}

createQuestion(1)