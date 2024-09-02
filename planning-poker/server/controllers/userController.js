const { createUser } = require('../data/userRepository');
const { handleErrors } = require('../middlewares/errorHandler');
const verifyToken  = require('../middlewares/auth-middleware.js');

function userController(router) {

  router.post(
    '/create', verifyToken,
    handleErrors(async (req, res) => {
      const upn = req.upn;
      const newUser = await createUser(upn);
      res.status(201).json(newUser);
    })
  );
}

module.exports = { userController };
