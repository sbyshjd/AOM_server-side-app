const passport = require('passport');

require('./serializer');
require('./strategy');

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
}