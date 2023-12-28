// User model tanımlandı.
const User = require("../model/User");

const handleLogout = async (req, res) => {
  // Client (istemci) erişim(access) token frontend'den silinir. bu işlem backend de yapılamaz.

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  const refreshToken = cookies.jwt;

  // Veri tabanında refrestToken'i bul
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    // Kullancıyı bulamadı ama cookie silinmesi gerek.
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.sendStatus(204); // başarılı amam içerik yok.
  }

  // Veritabanında aradığımız refreshToken bulundu ve silinmesi lazım.
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  // Production -> Production'a verildiğinde 'secure:true' da eklenmeli.
  // res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true });
  res.sendStatus(204);
};

module.exports = { handleLogout };

// HTTPS kULLANIMI:  production ortamında uygulamanızı HTTPS üzerinden hizmete almalısınız. Bu, çerezlerin güvenli bir şekilde iletilmesini sağlar.
// res.clearCookie("jwt", {
//   httpOnly: true,
//   maxAge: 24 * 60 * 60 * 1000,
//   secure: true,
// });

// SameSite Politikası: Güvenlik açısından, çerezlerin aynı siteden gelen taleplere sınırlanması önemlidir. SameSite özelliği ile bu kontrol sağlanabilir.
// res.clearCookie("jwt", {
//   httpOnly: true,
//   maxAge: 24 * 60 * 60 * 1000,
//   secure: true,
//   sameSite: "none",
// });

// Domain Kontrolü: Çerezlerin hangi domainlere gönderileceğini belirlemek için domain özelliğini kullanabilirsiniz. Bu, çerezin yalnızca belirli bir alt alan veya domainde erişilebilir olmasını sağlar.
// res.clearCookie("jwt", {
//   httpOnly: true,
//   maxAge: 24 * 60 * 60 * 1000,
//   secure: true,
//   sameSite: "none",
//   domain: ".example.com",
// });

// Path Kontrolü: path özelliği ile çerezin hangi yollarda geçerli olacağını belirleyebilirsiniz. Özellikle, çerezin yalnızca belirli bir alt dizinde geçerli olmasını istiyorsanız bu özellik kullanışlı olabilir.
// res.clearCookie("jwt", {
//   httpOnly: true,
//   maxAge: 24 * 60 * 60 * 1000,
//   secure: true,
//   sameSite: "none",
//   domain: ".example.com",
//   path: "/app",
// });
