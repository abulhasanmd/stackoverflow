const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// Setup work and export for the JWT passport strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET,
};

passport.use(new JwtStrategy(opts, (jwtPayload, callback) => {
  const { userId } = jwtPayload;
  return callback(null, { userId });
}));

// exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
// TODO
// passport.authorize
