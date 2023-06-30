const pool = require('../../config/database'); 

module.exports = {
    create : (data, callBack) => {
        pool.query(
            'insert into salon(salon_name,owner_name,email,phone,address,password,latitude,longitude) values(?,?,?,?,?,?,?,?)',
            [
                data.salonName,
                data.ownerName,
                data.email,
                data.pno,
                data.address,
                data.password,
                data.latitude,
                data.longitude
               
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
   
    getSalon: callback =>{
        pool.query(
            'select * from salon',
            [   ],
            (error, results, fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
    

    getUserByEmail : (email,callBack)=>{
        console.log(email);
        pool.query(
            'select * from salon where email=?',
            [email],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        );
    }

}