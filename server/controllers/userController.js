const User = require('../models/user');
const HTTPError = require('../utils/HTTPError');

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      succes: true,
      user,
      token: user.generateToken(),
    });
  } catch (error) {
    console.dir(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json({ message: 'Missing field' });
  try {
    const user = await User.findOne({ email });
    if (!user) throw new HTTPError(401, 'Unauthorized Access, Verify Email or passowrd');
    const isMatched = user.comparePassword(password);
    if (!isMatched) throw new HTTPError(401, 'Unauthorized Access, Verify Email or passowrd');
    res.status(201).json({ user, token: user.generateToken() });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw new HTTPError('No user was found', 404);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

exports.updateProfilePic = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);
    if (!user) throw new HTTPError('No user was found', 404);
    console.log(req.file);
    const profilePic = req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;
    await User.findByIdAndUpdate(id, { profilePic });
    res.json({ succes: true });
  } catch (error) {
    next(error);
  }
};
