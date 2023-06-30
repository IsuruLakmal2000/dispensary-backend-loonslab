const{createUser,getSalon,login} = require('./user_controller');
const router = require('express').Router();

router.post('/', createUser);
router.get('/', getSalon);

router.post('/login',login)


module.exports = router;