// User model tanımlandı.
const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) return res.sendStatus(409); // Conflict

  // If there is not duplicate
  try {
    // encrypt the password using bcrypt
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // create and store the new user
    const result = await User.create({
      username: user,
      // roles: { User: 2001 },   // bu kaldırılır. Çünkü default olarak yeni kullanıcılar 'User' olarak tanımlanıyor.
      password: hashedPwd,
    });

    // 2.yol
    // const newUser = new User({
    //   "username": user,
    //   "password": hashedPwd
    // })
    // newUser.save()

    console.log(result);
    res.status(201).json({ success: `New user ${user} is created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error(err);
  }
};

module.exports = { handleNewUser };
