const http = require("http");
const mongodb = require("mongodb");

let db;
const connectionString =
  process.env.MONGO_URL;

mongodb.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) console.log("ERROR on connection with MongoDB");
    else {
      console.log("Successfully connected to MongoDB");
      db = client.db();
      module.exports = {
        db: () => db,
      };

      const app = require("./app");
      const server = http.createServer(app); // createServer - bu method bitta parameterni - app - qabul qiladi.
      let PORT = 3000;
      server.listen(PORT, function () {
        console.log(
          `The server is running successfully on port: ${PORT}, http://localhost:${PORT}`
        );
      });
    }
  }
);
