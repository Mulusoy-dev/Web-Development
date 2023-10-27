const socket = io("ws://localhost:3500");

function sendMessage(e) {
  e.preventDefault(); // sayfanın yenilenmesini önler
  const input = document.querySelector("input");
  if (input.value) {
    socket.emit("message", input.value);
    input.value = ""; // Mesajı gönderdikten sonra temizliyor
  }
  input.focus();
}

document.querySelector("form").addEventListener("submit", sendMessage);

// Gelen mesajları dinle
socket.on("message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("ul").appendChild(li);
});
