const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Just in memory for now... this could be store in redis or something...out of scope for now...
const count = {};

io.on("connection", function(socket) {
  socket.on("song-started", song => {
    count[song._id] = count[song._id] + 1 || 1;
    io.emit("song-state", count);
    console.log("user is listening to a song", song.title, count[song._id]);
  });

  socket.on("song-stopped", song => {
    if (count[song._id] > 0) {
      count[song._id] = count[song._id] - 1;
      io.emit("song-state", count);
      console.log("user is stopped listening to a song", song.title, count[song._id]);
    }
  });
});

http.listen(5000, function() {
  console.log("listening on *:5000");
});
