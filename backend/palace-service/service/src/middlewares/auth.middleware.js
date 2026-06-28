const userIdHeaderName = "x-user-id";

const authenticate = (req, res, next) => {
  const userId = req.get(userIdHeaderName)?.trim();

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  req.userId = userId;
  req.user = {
    id: userId,
  };
  next();
};

export default authenticate;
