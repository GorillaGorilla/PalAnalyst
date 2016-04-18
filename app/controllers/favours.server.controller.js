/**
 * Created by Frederick on 12/04/2016.
 */
var mongoose = require('mongoose'),
    Favour = mongoose.model('Favour');

var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function(req, res) {
    var fav = req.body;
    fav.target = req.user;
    fav.creator = req.user;
    var favour = new Favour(fav);
    console.log("create Favour method fired");
    favour.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(favour);
        }
    });
};

exports.list = function(req, res) {
    //find needs to be changed to find all for you. Page 105 explains.
    Favour.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, favours) {
        if (err) {return res.status(400).send({
            message: getErrorMessage(err)
        });
        } else {
            res.json(favours);
        }
    });
};

exports.favourByID = function(req, res, next, id) {
    Favour.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, favour) {if (err) return next(err);
        if (!favour) return next(new Error('Failed to load Favour ' + id));
        req.favour = favour;
        next();
    });
};

exports.read = function(req, res) {
    res.json(req.favour);
};

exports.update = function(req, res) {
    var favour = req.favour;
    favour.title = req.body.title;
    favour.content = req.body.content;
    favour.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(favour);
        }
    });
};
exports.delete = function(req, res) {
    var Favour = req.Favour;
    Favour.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(Favour);
        }
    });
};
// need to create equivalent for favours... So tha can only view own
exports.hasAuthorization = function(req, res, next) {
    if (req.favour.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};