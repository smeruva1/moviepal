const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URI|| 'mongoddb://locaolhost/moviepal',
{
    useNewURLParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify: true

}
);

module.exports= mongoose.connection;