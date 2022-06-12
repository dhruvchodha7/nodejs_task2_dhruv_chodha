const {loginRequired} = require('../config/JWT')



exports.index = (req, res) => {
    res.render('index')
}

exports.dashboard = (req, res) => {
    res.render('dashboard')
};

exports.logout = (req, res) => {
    res.cookie('access-token', "", {maxAge: 1})
    res.status(200).json({
        success: true,
        msg: "User successfully logged out"
    })
    res.redirect('/user/login')
}

