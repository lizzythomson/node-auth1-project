const usersModel = require('../users/users-model');
/*
  If the user does not have a session saved in the server

  status 401
  {
    "message": "You shall not pass!"
  }
*/

function restricted(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next({ status: 401, message: 'You shall not pass!' });
  }
}

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
async function checkUsernameFree(req, res, next) {
  const username = req.body.username.trim();
  const allUsers = await usersModel.find();
  const duplicateUsername = allUsers.find((user) => {
    return user.username === username;
  });
  if (duplicateUsername !== undefined) {
    res.status(422).json({ message: 'Username taken' });
  } else {
    req.body.username = req.body.username.trim();
    next();
  }
}

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
async function checkUsernameExists(req, res, next) {
  const username = req.body.username.trim();
  const allUsers = await usersModel.find();
  const validateUsername = allUsers.find((user) => {
    return user.username === username;
  });
  if (validateUsername === undefined) {
    res.status(422).json({ message: 'Invalid credentials' });
  } else {
    next();
  }
}
/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
function checkPasswordLength(req, res, next) {
  // TODO: How to check length??
  if (!req.body.password || req.body.password.length < 4) {
    res.status(422).json({ message: 'Password must be longer than 3 chars' });
  } else {
    next();
  }
}

// Don't forget to add these to the `exports` object so they can be required in other modules

module.exports = {
  restricted,
  checkUsernameFree,
  checkPasswordLength,
  checkUsernameExists,
};
