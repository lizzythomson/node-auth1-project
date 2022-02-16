// Require the `restricted` middleware from `auth-middleware.js`. You will need it here!
const router = require('express').Router();

const usersModel = require('./users-model');

const { restricted } = require('../auth/auth-middleware');

router.get('/', restricted, (req, res, next) => {
  usersModel
    .find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => next(error));
});

module.exports = router;

/**
  [GET] /api/users

  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  response:
  status 200
  [
    {
      "user_id": 1,
      "username": "bob"
    },
    // etc
  ]

  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */

// Don't forget to add the router to the `exports` object so it can be required in other modules
