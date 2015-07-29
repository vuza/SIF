var errHandler = {
    do: function(err, res){
        if(err){
            res.status(500).send('error occurred');
            console.error(err);
            return true;
        }

        return false;
    }
};

module.exports = errHandler;