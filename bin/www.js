const app = require("../app");

//サーバー起動
app.set("trust proxy", true);
app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), function () {
  console.log("Express server listening on port " + server.address().port);
});