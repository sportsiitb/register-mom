const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://harshbaldwa:anurag93@ds359298.mlab.com:59298/heroku_j45c257j"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();

const Type = require("./models/type");
const Surgery = require("./models/surgery");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/surgeryNew', (req, res, next) => {
  const surgeryType = req.body;
  const surgery = new Surgery({
    hName: req.body.hName,
    pName: req.body.pName,
    surgeryType: req.body.surgeryType,
    amount: req.body.amount,
    date: req.body.date
  });
  surgery
    .save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
    });
  console.log(surgeryType);
});

app.get("/api/rate", (req, res, next) => {
  Type.find({}).then(documents => {
    const rateCard = documents;
    res.status(200).json(rateCard);
  });
});

app.post("/api/surgeryTypeNew", (req, res, next) => {
  const surgeryType = new Type({
    name: req.body.name,
    amount: req.body.rate
  });
  surgeryType
    .save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/api/surgeryTypeUpdate", (req, res, next) => {
  Type.updateOne({ name: req.body.name }, { amount: req.body.rate }).then(
    result => {
      res.status(200).json(result);
    }
  );
});

app.get("/api/overview/:time", (req, res, next) => {
  switch (req.params.time) {
    case "today":
      var today = new Date();
      var tomorrow = new Date(Date.now() + 24*3600*1000);
      var todayFrom = new Date(today.toDateString());
      var todayTo = new Date(tomorrow.toDateString());
      Surgery.find({date: {
        $gte: todayFrom.getTime(),
        $lt: todayTo.getTime()
      }}).then(data => {
        amount = 0
        surgeries = data.length;
        for (var item of data) {
          amount += item.amount;
        }
        res.status(200).json({
          amount: amount,
          surgeries: surgeries,
          data: data
        });
      });
      break;

    case "lastWeek":
      var dateFirst = new Date(Date.now() - 7 * 24 * 3600 * 1000);
      var dateLast = new Date(Date.now() + 24 * 3600 * 1000);
      var dateFrom = new Date(dateFirst.toDateString());
      var dateTo = new Date(dateLast.toDateString());
      Surgery.find({
        date: {
          $gte: dateFrom.getTime(),
          $lt: dateTo.getTime()
        }
      }).then(data => {
        amount = 0;
        surgeries = data.length;
        for (var item of data) {
          amount += item.amount;
        }
        res.status(200).json({
          amount: amount,
          surgeries: surgeries,
          data: data
        });
      });
      break;

    case "lastMonth":
      var dateFirst = new Date();
      dateFirst.setDate(1);
      var dateLast = new Date(Date.now() + 24 * 3600 * 1000);
      var dateFrom = new Date(dateFirst.toDateString());
      var dateTo = new Date(dateLast.toDateString());
      Surgery.find({
        date: {
          $gte: dateFrom.getTime(),
          $lt: dateTo.getTime()
        }
      }).then(data => {
        amount = 0;
        surgeries = data.length;
        for (var item of data) {
          amount += item.amount;
        }
        res.status(200).json({
          amount: amount,
          surgeries: surgeries,
          data: data
        });
      });
      break;

    case "last3Month":
      var dateFirst = new Date();
      dateFirst.setDate(0);
      dateFirst.setDate(1);
      dateFirst.setDate(0);
      dateFirst.setDate(1);
      var dateLast = new Date(Date.now() + 24 * 3600 * 1000);
      var dateFrom = new Date(dateFirst.toDateString());
      var dateTo = new Date(dateLast.toDateString());
      Surgery.find({
        date: {
          $gte: dateFrom.getTime(),
          $lt: dateTo.getTime()
        }
      }).then(data => {
        amount = 0;
        surgeries = data.length;
        for (var item of data) {
          amount += item.amount;
        }
        res.status(200).json({
          amount: amount,
          surgeries: surgeries,
          data: data
        });
      });
      break;

    case "last6Month":
      var dateFirst = new Date();
      dateFirst.setDate(0);
      dateFirst.setDate(1);
      dateFirst.setDate(0);
      dateFirst.setDate(1);
      dateFirst.setDate(0);
      dateFirst.setDate(1);
      dateFirst.setDate(0);
      dateFirst.setDate(1);
      dateFirst.setDate(0);
      dateFirst.setDate(1);
      var dateLast = new Date(Date.now() + 24 * 3600 * 1000);
      var dateFrom = new Date(dateFirst.toDateString());
      var dateTo = new Date(dateLast.toDateString());
      Surgery.find({
        date: {
          $gte: dateFrom.getTime(),
          $lt: dateTo.getTime()
        }
      }).then(data => {
        amount = 0;
        surgeries = data.length;
        for (var item of data) {
          amount += item.amount;
        }
        res.status(200).json({
          amount: amount,
          surgeries: surgeries,
          data: data
        });
      });
      break;

    case "lastYear":
      var dateFirst = new Date(new Date().getFullYear(), 0, 1);
      var dateLast = new Date(Date.now() + 24 * 3600 * 1000);
      var dateFrom = new Date(dateFirst.toDateString());
      var dateTo = new Date(dateLast.toDateString());
      Surgery.find({
        date: {
          $gte: dateFrom.getTime(),
          $lt: dateTo.getTime()
        }
      }).then(data => {
        amount = 0;
        surgeries = data.length;
        for (var item of data) {
          amount += item.amount;
        }
        res.status(200).json({
          amount: amount,
          surgeries: surgeries,
          data: data
        });
      });
      break;
  }
});

module.exports = app;
