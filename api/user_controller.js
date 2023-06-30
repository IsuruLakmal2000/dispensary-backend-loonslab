
const {create, getSalon,getUserByEmail} = require('./user_service');
const { genSaltSync, hashSync ,compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        console.log(req.body);
        //-----------salon password encryption----------
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        //-----------
        create(body,(err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    
   
    getSalon: (req, res) => {
        getSalon((err,results) => {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
//------------login function----------------

    login: (req, res) => {
        const {email,password} = req.body;
        
        getUserByEmail(email, (err, results) => {
          
            if(err){
                console.log("cant get email");
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Email does not exists, please check again!"
                });
            }
           const result = compareSync(password, results.password);
            // const result = function(password){
            //     return bcrypt.compareSync(password, results.password);

            // };
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            }else{
                console.log(result);
                console.log(password +"   "+ results.password);
                return res.json({
                    
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    },
    
};