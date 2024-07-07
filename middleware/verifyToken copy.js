import jwt from "jsonwebtoken";

// Function to check if the token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token, { complete: true });
    const exp = decoded.payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= exp;
  } catch (err) {
    // If token can't be decoded, consider it invalid/expired
    return true;
  }
};

// Function to clear cookies
const clearCookies = (res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "None", // Adjust based on your requirement
    secure: true, // Adjust based on your requirement
  });
};

const auth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  if (isTokenExpired(token)) {
    console.log("Session expired. Please log in again.");
    // clearCookies(res);
    return res
      .status(401)
      .json({ msg: "Session expired. Please log in again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(decoded.user);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;
