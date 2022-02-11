const dbHelper = require("./dbHelper");
const table = 'questions'
module.exports = {
    sendQuestions : (req, res)=>{
        let noOfQuestion = req.body.number;
        let query = `select * from ${table} limit ${noOfQuestion}`;
        dbHelper.execute(query, (err, data)=>{
            if(err){
                console.log(err);
            }else{
                return res.json(data);
            }
        })
    },
    addUpdateQuestion : (req, res)=>{
        let {id, question, options, answer} = req.body;
        question = question.trim();
        options = options.trim();
        answer = answer.trim();
        if(id){
            id = Number(id);
            const query = `update ${table} set questions="${question}", options="${options}", answer ="${answer}" where questionId = ${id}`;
            dbHelper.execute(query, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    return res.json({
                        success:true,
                        data:{
                            id,
                            question,
                            options,
                            answer
                        }
                    });
                }
            })
        }
        else{
            const query = `insert into ${table} value(0, '${question}', '${options}', '${answer}')`;
            dbHelper.execute(query, (err, data)=>{
                if(err){
                    console.log(err);
                }else{
                    return res.json({
                        success:true,
                        data:{
                            id:data.insertId,
                            question,
                            options,
                            answer
                        }
                    });
                }
            })
        }
    },
    deleteQuestion : (req, res)=>{
        const { id } = req.body;
        const query = `delete from ${table} where questionId = ${id}`;
        dbHelper.execute(query, (err)=>{
            if(err){
                console.log(err);
            }else{
                return res.json({success:true})
            }
        })
    }
}