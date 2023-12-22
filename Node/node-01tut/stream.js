// Instead of processing the entire data, it divides the data into pieces and processes it piece by piece. It is especially important for large data.
const fs = require("fs");
const path = require("path");

// Readable Stream
const rs = fs.createReadStream(path.join(__dirname, "files", "lorem.txt"), {
  encoding: "utf8",
});

// Writeable Strem
const ws = fs.createWriteStream(path.join(__dirname, "files", "newLorem.txt"));

// First Way -> Read then Write
// rs.on("data", (dataChunk) => {
//   ws.write(dataChunk);
// });

// Second Way -> Read then Write
rs.pipe(ws);
