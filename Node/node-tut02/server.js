const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing
// origin: Bu, isteğin geldiği origin'i kontrol eden bir fonksiyonu içerir. Eğer isteğin origin'i whitelist içinde yer alıyorsa veya origin bilgisi yoksa (örneğin, isteği yapan bir yerel dosya sisteminden gelmişse), callback(null, true) çağrılarak istek kabul edilir. Aksi takdirde, callback(new Error("Not allowed by CORS")) çağrılarak hata ile sonuçlanan bir yanıt döndürülür.
const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Built-in middleware -> 'content-type: application/x-www-form-urlencoded'
// 'express.urlencoded' gelen HTTP POST isteklerinin veri içeriğini işler.
// Özellikle 'extended: false' seçeneği kullanılarak gelen veri, bir düz nesne (key-value) olarak işlenir.
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
// Gelen JSON verilerini işler.
// Özellikle, bu JSON verileri içeren HTTP isteklerini çözümleyerek 'req,body' nesnesine ekler.
// İstemcilere JSON formatında veri göndermek ve istemcilerden JSON formatında veri almak için kullanılır.
app.use(express.json());

// serve static file
// 'express.static' belirtilen dizindeki dosyaları tarayıcılara doğrudan sunabilen bir middleware'dir.
// css dosyasına erişmek için -> 'http://localhost:3500/css/style.css'
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
  // ^/$ -> sadece '/' karakteri olan istekleri kapsar.
  // '/index(.html)?' -> yolu '/index' veya '/index.html' olan istekleri ifade eder. '/index' veya '/index.html' şeklindeki istekleri kapsar.
  // Sonuç olarak '/', '/index' veya '/index.html' isteklerini kapsar.
  // res.send("Hello World!");   // String gönderilir.
  // res.sendFile("./views/index.html", { root: __dirname });    // index.html gönderilir.
  res.sendFile(path.join(__dirname, "views", "index.html")); // index.html gönderilir.
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html")); // new-page.html gönderilir.
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "/new-page.html"); // '/old-page' veya '/old-page.html' istek atıldığında '/new-page' sayfasına yönlendirilir.
});

// Route Handlers
app.get(
  "/hello(.html)?",
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hello Anakin");
  }
);

// Middleware:
// Bir web uygulamasında HTTP istekleri ve yanıtları üzerinde işlemler gerçekleştiren ara yazılımlardır.
// Middleware fonksiyonları, HTTP istekleri ve yanıtları üzerinde sıralı olarak çalışarak ek işlemler eklemenize veya mevcut istek ve yanıtları değiştirmenizi sağlar.

// app.use('/')
app.all("*", (req, res) => {
  // Express uygulmasında belirli bir route eşleşmediğinde çalışacak olan bir middleware (ara yazılım) olarak düşünülebilir.
  // Yani bu route, yukarıda tanımlanan diğer route'lar eşleşmediği durumlarda devreye girecek.
  // Bu kod bloğu, Express uygulamasında bir "catch-all" veya "fallback" route'u tanımlar. Yani, bu route, yukarıda tanımlanan diğer route'lar ile eşleşmediği durumlarda devreye girer. Yani, hiçbir önceki route'e eşleşmeyen bir istek yapıldığında çalışır.
  // Bu şekilde, belirli bir route ile eşleşmeyen tüm isteklere karşı genel bir 404 yanıtı sağlanmış olur.
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
