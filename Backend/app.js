const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config");

const windows = [
  {
    id: 1,
    name: "fenêtre sud",
    state: "opened"
  },
  {
    id: 2,
    name: "fenêtre nord",
    state: "closed"
  }
];

let WindowsRouter = express.Router();

app.use(morgan("dev"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

WindowsRouter.route("/")
  .get((req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(succes(windows));
  })
  .post((req, res) => {
    if (req.body) {
      console.log(req.body);
      let id = parseInt(req.body.id);
      let index = windows.findIndex(window => {
        return window.id == id;
      });
      if (index == -1) {
        windows.push({
          id: id,
          name: req.body.name,
          state: req.body.state
        });
      } else {
        windows[index].name = req.body.name;
        windows[index].state = req.body.state;
      }
      res.json(succes("Succesful"));
    }
  });
app.use(config.rootApi + "windows", WindowsRouter);
app.listen(config.port, () =>
  console.log(
    "Server ready on the port: ",
    config.port + " Root API: ",
    config.rootApi
  )
);

function succes(result) {
  return result;
}

function error(message) {
  return {
    status: "error",
    message: message
  };
}
