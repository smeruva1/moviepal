const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api',apiRoutes);

//server up reach front-end in producton.
router.use((req,res)=>{
    res.sendFile(path.join(_dirname,'../../client/build/index.html'))
});

module.exports = router;