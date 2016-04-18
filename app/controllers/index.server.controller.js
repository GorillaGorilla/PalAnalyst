/**
 * Created by Frederick on 22/03/2016.
 */
exports.render = function(req, res){
    res.render('index', {
        title: 'Article List App',
        user: JSON.stringify(req.user)
    });
};