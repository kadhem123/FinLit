const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const path = require('path');
const { forEach } = require('lodash');
multer = require('multer')
bodyParser = require('body-parser');
const User = mongoose.model('User');
module.exports.register = (req, res, next) => {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.image=req.body.image;

    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err)
            return res.status(400).json(err);
        // registered user
        else if (user) {
            return res.status(200).json({ "token": user.generateJwt() });
        }
        // unknown user or wrong password
        else
            return res.status(404).json(info);
    })(req, res);

}
module.exports.userProfile = (req, res, next) => {
    User.findOne({ _id: req._id })
        .exec(function (err, user) {
            if (!user) {
                console.log(req._id)

                return res.status(404).json({ status: false, message: 'User record not found.', err: err, id: req._id });
            }
            else {

                return res.status(200).json({ status: true, user: _.pick(user, ['_id', 'email','image']) });
            }
        }
        );
}
module.exports.updateUser = (req, res, next) => {
    const id = req.params._id;
    const newUserData = req.body;
   
    User.findByIdAndUpdate(id, { $set: newUserData }, (err, doc) => {
        if (err) return res.send(err.message)
        if (doc) return res.send(doc);
    })
}

const PATH = './';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './images/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.user.username)
    }

});
let upload = multer({
    storage: storage
});

module.exports.uploadImage = (req, res) => {
    if (!req.file) {
        console.log("No file is available!");
        return res.send({
            success: false
        });

    } else {
        console.log('File is available!');
        return res.send({
            success: true
        })
    }

}

