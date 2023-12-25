const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|^/index(.html)?", (req, res) => {
  // ^/$ -> sadece '/' karakteri olan istekleri kapsar.
  // '/index(.html)?' -> yolu '/index' veya '/index.html' olan istekleri ifade eder. '/index' veya '/index.html' şeklindeki istekleri kapsar.
  // Sonuç olarak '/', '/index' veya '/index.html' isteklerini kapsar.
  // res.send("Hello World!");   // String gönderilir.
  // res.sendFile("./views/index.html", { root: __dirname });    // index.html gönderilir.
  res.sendFile(path.join(__dirname, "..", "views", "index.html")); // index.html gönderilir.
});

// router.get("/new-page(.html)?", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "views", "new-page.html")); // new-page.html gönderilir.
// });

// router.get("/old-page(.html)?", (req, res) => {
//   res.redirect(301, "/new-page.html"); // '/old-page' veya '/old-page.html' istek atıldığında '/new-page' sayfasına yönlendirilir.
// });

module.exports = router;
