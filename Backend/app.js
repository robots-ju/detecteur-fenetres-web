const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const config = require("./config");
const OneSignal = require("onesignal-node");
const io = require("socket.io");
const server = require('http').createServer();

let WindowsRouter = express.Router();

let windows = [];

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
        return window.id === id;
      });
      if (index === -1) {
        windows.push({
          id: id,
          name: req.body.name,
          state: req.body.state
        });
        index = windows.length - 1;
      } else {
        windows[index].name = req.body.name;
        windows[index].state = req.body.state;
      }
      if (windows[index].state === "opened") {
        if (!windows[index].openedDate) {
          windows[index].openedDate = new Date();
          windows[index].openedNumber++;
        }
        windows[index].openedTime = convertDate(
          new Date() - windows[index].openedDate
        );
        console.log(windows[index].openedTime);
        notifification(windows[index]);
      } else {
        windows[index].openedTime = 0;
        windows[index].openedDate = 0;
        notifification(windows[index]);
      }
      socket.emit('windows', windows);
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

let socket = io(server);
server.listen(8081);   

function succes(result) {
  return result;
}

function error(message) {
  return {
    status: "error",
    message: message
  };
}

var myClient = new OneSignal.Client({
  userAuthKey: "YTBhYWJhNTktNjRjNC00NDRlLTk5MGMtYjVjNmVhY2E1MTM3",
  app: {
    appAuthKey: "YzkxM2EwOTQtYTQ1Yy00NDY3LWI0MzQtY2UyM2I5NGZmYzdi",
    appId: "55a5ef9d-30fa-4f8d-b7f1-667e715eb9fb"
  }
});

function notifification(window) {
  // we need to create a notification to send
  let notification;
  if (Array.isArray(window.openedTime)) {
    notification = new OneSignal.Notification({
      headings: {
        en: window.name
      },
      contents: {
        en:
          "Is " +
          window.state +
          " since: " +
          window.openedTime[0] +
          "h" +
          window.openedTime[1] +
          "m" +
          " !"
      }
    });
  } else if (window.openedTime) {
    notification = new OneSignal.Notification({
      headings: {
        en: window.name
      },
      contents: {
        en: "is " + window.state + " since: " + window.openedTime + " !"
      }
    });
  } else {
    notification = new OneSignal.Notification({
      headings: {
        en: window.name
      },
      contents: {
        en: "is closed !"
      }
    });
  }

  // set target users
  notification.postBody["included_segments"] = ["Active Users"];
  notification.postBody["excluded_segments"] = ["Banned Users"];

  // set notification parameters
  notification.postBody["data"] = { abc: "123", foo: "bar" };
  notification.postBody["send_after"] = new Date();

  // send this notification to All Users except Inactive ones
  myClient.sendNotification(notification, function(err, httpResponse, data) {
    if (err) {
      console.log("Something went wrong...");
    } else {
      console.log(data, httpResponse.statusCode);
    }
  });
}

function convertDate(duration) {
  let hDecimal = duration / 3600000;
  let m = Math.floor((hDecimal * 60) % 60);
  let h = Math.floor(hDecimal);
  if (m === 0) {
    return "now";
  } else {
    return [h, m];
  }
}
