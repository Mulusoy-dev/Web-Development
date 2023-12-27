const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// bcrypt definition
const bcrypt = require("bcrypt");
// jwt definiton
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const foundUser = usersDB.users.find((person) => person.username === user);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // Roles
    const roles = Object.values(foundUser.roles);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username, // Payload -> JWT içinde taşınacak veri
          roles: roles,
        },
      },

      process.env.ACCESS_TOKEN_SECRET, // Secret Key -> JWT'nin imzalanması için kullanılan gizli anahtardır.
      { expiresIn: "30s" } // Options -> JWT geçerliliğini ve diğer ayarları belirten bir dizi seçenek içerir. (Burada, JWT 30s geçerlilik süresi olarak belirtilmiş.)
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username }, // Payload -> JWT içinde taşınacak veri
      process.env.REFRESH_TOKEN_SECRET, // Secret Key -> JWT'nin imzalanması için kullanılan gizli anahtardır.
      { expiresIn: "1d" } // Options -> JWT geçerliliğini ve diğer ayarları belirten bir dizi seçenek içerir. (Burada, JWT 1 gün geçerlilik süresi olarak belirtilmiş.)
    );

    // Aktif kullanıcı için refreshToken kaydetme
    const otherUsers = usersDB.users.filter(
      (person) => person.username !== foundUser.username
    );
    const currentUser = { ...foundUser, refreshToken };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    // İstemciye 'refreshToken' ve 'accessToken' gerekli işlemleri yapması için gönderilir.
    // accessToken istemciye gönderilen JSON formatı içinde yer alır. refreshToken bir HTTP çerezine (cookie) eklenir.
    // httpOnly: true özelliği sayesinde tarayıcı üzerinden çerezin okunmasını ve değiştirilmesini önler.
    // refresh token'ı bir HTTP çerezi içinde göndermenin temel amacı, tarayıcı tabanlı saldırıları (XSS gibi) engellemektir.
    // refresh token httpOnly özelliği ile sadece sunucu tarafından okunabilen bir çerezde saklandığı için, XSS saldırıları bu çereze erişemez.
    // Bu çerez JavaScript tarafından okunamaz.
    res.cookie("jwt", refreshToken, {
      // 'jwt' -> çerez adı
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: true,
    }); // 1 gün geçerli
    res.json({ accessToken });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = { handleLogin };
