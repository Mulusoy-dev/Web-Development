const socket = io("ws://localhost:3500");

const activity = document.querySelector(".activity");
const msgInput = document.querySelector("input");

function sendMessage(e) {
  e.preventDefault(); // sayfanın yenilenmesini önler

  if (msgInput.value) {
    socket.emit("message", msgInput.value);
    msgInput.value = ""; // Mesajı gönderdikten sonra temizliyor
  }
  msgInput.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

// Gelen mesajları dinle
socket.on("message", (data) => {
  activity.textContent = "";
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 5));
});

let activityTimer;
socket.on("activity", () => {
  activity.textContent = `${socket.id.substring(0, 5)} is typing...`;

  // 3 saniyeden sonra temizle
  clearTimeout(activityTimer);
  activityTimer = setTimeout(() => {
    activity.textContent = "";
  }, 3000);
});
