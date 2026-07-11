// only allow admins through
exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).send({ msg: "Access denied: admin only" });
  }
  next();
};

// only allow the resource owner (req.params[paramName] === req.user._id) or an admin
exports.isSelfOrAdmin = (paramName = "id") => (req, res, next) => {
  const targetId = req.params[paramName];
  if (req.user?.role === "admin" || req.user?._id?.toString() === targetId) {
    return next();
  }
  return res.status(403).send({ msg: "Access denied" });
};
