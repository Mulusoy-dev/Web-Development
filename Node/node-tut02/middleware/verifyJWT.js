const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  // Başta oluşturulan token 'username' e göre oluşturulduğu için onaylanması da 'username' ile olur.
  // Bu onaylama işlemini 'route' ları korumak için yaptık. Şimdi 'route' da bu onaylama kullanılacak.
  // İtemciden gelen 'token', backend'de olan 'ACCESS_TOKEN_SECRET' ile çözülür daha sonra karşılaştırılır.
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
