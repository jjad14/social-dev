const mongoose = require('mongoose');

const checkObjectId = (id) => (req, res, next) => {
      // check if id is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
        return res.status(404).json({ msg: 'Invalid Object ID' });
      }
      next();
};

module.exports = checkObjectId;