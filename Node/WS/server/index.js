import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;

// ADMIN Kullanıcısını Oluşturma
const ADMIN = "Admin";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// state
const UsersState = {
  users: [],
  setUsers: function (newUsersArray) {
    this.users = newUsersArray;
  },
};

const io = new Server(expressServer, {
  cors: {
    origin:
      // process.env.NODE_ENV === "production" ifadesi, uygulamanın üretim ortamında mı çalıştığını kontrol eder. Eğer üretim ortamındaysa, CORS (Cross-Origin Resource Sharing) ayarlarında tüm kaynakların (origin) kabul edilmemesi (false) sağlanır; aksi takdirde sadece "http://localhost:5500" kaynağının kabul edilmesi sağlanır.
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);

  // socket.emit() => sadece aktif kullancıya mesaj gönderecek.
  socket.emit("message", buildMsg(ADMIN, "Welcome to Chat App"));

  socket.on("enterRoom", ({ name, room }) => {
    // Girilmiş önceki gruplardan çıkma işlevi
    const prevRoom = getUser(socket.id)?.room;

    if (prevRoom) {
      socket.leave(prevRoom);
      // Odadan ayrıldığında diğer odalara mesaj gönderiyor
      io.to(prevRoom).emit(
        "message",
        buildMsg(ADMIN, `${name} has left the room`)
      );
    }

    // Kullanıcı Aktif
    const user = activateUser(socket.id, name, room);

    // Durum güncellemesi etkinleştirilene kadar önceki oda listesi güncellenemez.
    if (prevRoom) {
      io.to(prevRoom).emit("userList", {
        users: getUsersInRoom(prevRoom),
      });
    }

    // Odaya katılma
    socket.join(user.room);

    // Kim katıldı bilgisi
    socket.emit(
      "message",
      buildMsg(ADMIN, `You have joined the ${user.room} chat room`)
    );

    // Diğer herkese
    socket.broadcast
      .to(user.room)
      .emit("message", buildMsg(ADMIN, `${user.name} has joined the room`));
  });

  // Oda için kullanıcı listesini güncelleme
  io.to(user.room).emit("userList", {
    users: getUsersInRoom(user.room),
  });

  // Herkes için Oda listelerini güncelleme
  io.emit("roomsList", {
    rooms: getAllActiveRooms(),
  });

  // Gelen veriyi dinleme
  socket.on("message", (data) => {
    console.log(data);
    io.emit("message", `${socket.id.substring(0, 5)}: ${data}`); // emit() ile bu server'a bağlanan herkes bu mesajı görebilir.
  });

  // Kullanıcının herkesle bağlantısı koptuğunda
  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "message",
      `User ${socket.id.substring(0, 5)} disconnected`
    );
  });

  // Activity olayını dinleme
  socket.on("activity", (name) => {
    socket.broadcast.emit("activity", name);
  });
});

// Veri Yapısını Oluşturma
function buildMsg(name, text) {
  return {
    name,
    text,
    time: new Intl.DateTimeFormat("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }).format(new Date()),
  };
}

// Kullanıcı Fonksiyonları
function activateUser(id, name, room) {
  const user = { id, name, room };
  UsersState.setUsers([
    ...UsersState.users.filter((user) => user.id !== id),
    user,
  ]);
  return user;
}

function userLeavesApp() {
  UsersState.setUsers(UsersState.users.filter((user) => user.id !== id));
}

function getUser() {
  return UsersState.users.find((user) => user.id === id);
}

function getUsersInRoom(room) {
  return UsersState.users.filter((user) => user.room === room);
}

function getAllActiveRooms() {
  return Array.from(new Set(UsersState.users.map((user) => user.room)));
}
