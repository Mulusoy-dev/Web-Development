const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  // Bu middleware bir hata yönetimi tanımlar. burada 'next' parametresi yok çünkü hatalarla başa çıkmak için tasarlanmıştır ve sonraki middleware'e geçişi önler
  logEvents(`${err.name}: ${err.message}`, "errLog.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
