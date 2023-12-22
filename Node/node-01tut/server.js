const os = require("os");
const path = require("path");
const fsPromises = require("fs").promises;

const fileOps = async () => {
  try {
    const data = await fsPromises.readFile(
      path.join(__dirname, "files", "starter.txt"),
      "utf8"
    );
    console.log(data);

    // unlink ==> Delete File
    await fsPromises.unlink(path.join(__dirname, "files", "starter.txt"));
    await fsPromises.writeFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      data
    );
    await fsPromises.appendFile(
      path.join(__dirname, "files", "promiseWrite.txt"),
      "\n\nNice to meet you!"
    );
    await fsPromises.rename(
      path.join(__dirname, "files", "promiseWrite.txt"),
      path.join(__dirname, "files", "promiseComplete.txt")
    );
    const newData = await fsPromises.readFile(
      path.join(__dirname, "files", "promiseComplete.txt"),
      "utf8"
    );
    console.log(newData);
  } catch (err) {
    console.error(err);
  }
};

fileOps();

const math = require("./math"); // or
const { add, subtract, multiply, divide } = require("./math");

console.log(os.type()); // Windows_NT
console.log(os.version()); // Windows 10 Home Single Language
console.log(os.homedir()); // C:\Users\Lenovo

console.log(__dirname); // C:\Users\Lenovo\OneDrive\Masaüstü\Web - Github\Web-Development\Node\node-01tut
console.log(__filename); // C:\Users\Lenovo\OneDrive\Masaüstü\Web - Github\Web-Development\Node\node-01tut\server.js

console.log(path.dirname(__filename)); // C:\Users\Lenovo\OneDrive\Masaüstü\Web - Github\Web-Development\Node\node-01tut
console.log(path.basename(__filename)); // server.js
console.log(path.extname(__filename)); // .js
console.log(path.parse(__filename)); // { root: 'C:\\', dir: 'C:\\Users\\Lenovo\\OneDrive\\Masaüstü\\Web - Github\\Web-Development\\Node\\node-01tut', base: 'server.js', ext: '.js', name: 'server' }

console.log(math.add(3, 5)); // 8
console.log(multiply(3, 5)); // 15
console.log(subtract(3, 5)); // -2
console.log(divide(3, 5)); // 0.6

// Read File
// fs.readFile(
//   path.join(__dirname, "files", "starter.txt"),
//   "utf8",
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

// // Write File
// fs.writeFile(
//   path.join(__dirname, "files", "result.txt"),
//   "Hello Melih",
//   (err) => {
//     if (err) throw err;
//     console.log("Write complete");
//     // Append File
//     fs.appendFile(
//       path.join(__dirname, "files", "result.txt"),
//       "\n\nmalatya",
//       (err) => {
//         if (err) throw err;
//         console.log("Append complete");
//        // Rename File
//         fs.rename(
//           path.join(__dirname, "files", "result.txt"),
//           path.join(__dirname, "files", "newResult.txt"),
//           (err) => {
//             if (err) throw err;
//             console.log("Rename complete");
//           }
//         );
//       }
//     );
//   }
// );

// exit on uncaught errors
// Bir hata oluştuğunda ve bu hata işlenmediğinde bu olay tetiklenir.
process.on("uncaughtException", (err) => {
  console.log(`There was an uncaught error: ${err}`);
  process.exit(1);
});
