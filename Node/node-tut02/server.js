const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

// CORS'dan önce credentials (kimlik) kontrol et ve cookies(çerezleri) getir
app.use(credentials);

// Cross Origin Resource Sharing
// origin: Bu, isteğin geldiği origin'i kontrol eden bir fonksiyonu içerir. Eğer isteğin origin'i whitelist içinde yer alıyorsa veya origin bilgisi yoksa (örneğin, isteği yapan bir yerel dosya sisteminden gelmişse), callback(null, true) çağrılarak istek kabul edilir. Aksi takdirde, callback(new Error("Not allowed by CORS")) çağrılarak hata ile sonuçlanan bir yanıt döndürülür.
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

// authController tarafından gönderilen 'refreshToken' cookie olarak gönderildi. Burada cookie parser middleware tanımlanır.
app.use(cookieParser());

// serve static file
// 'express.static' belirtilen dizindeki dosyaları tarayıcılara doğrudan sunabilen bir middleware'dir.
// css dosyasına erişmek için -> 'http://localhost:3500/css/style.css'
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

// RefreshToken
app.use("/refresh", require("./routes/refresh"));

// Logout
app.use("/logout", require("./routes/logout"));

// Tüm 'employees' yolunu JWT ile korumak için app.use(verifyJWT) kullanılır.
// app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

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
