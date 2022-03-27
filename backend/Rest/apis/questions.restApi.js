import QuestionsModel from '../../db.mongo/ModelConfig/questions.js';


async function getAllQuestions(req, res) 
{
    var userId = req.body.params;
    try
    {
        const que = await QuestionsModel.find({ });
        if(que)
        {
            console.log(que);
            res.status(200).json({
              questions: que
             });
        }else
        {
            res.status(400).json({
                msg: 'Error fetching questions'
                })
        }
    }
    catch(err)
    {
            console.log("ERROR"+err);
            res.status(400).json({
            msg: 'Error fetching questions'
            })
    }
    
    
}

let endpoints = {
    '/users/:userId/questions': [{
        method: 'GET',
        callbacks: [getAllQuestions] // last index function is always a rest function
    }]
}

export { endpoints }
