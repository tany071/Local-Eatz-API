// var data = require('./data.json');
const express = require("express");
const cors = require('cors')
const app = express();
app.use(cors());
const port = 3002;

const fs = require("fs");
let datajson = fs.readFileSync("data.json", "utf-8");
let itineraryjson = fs.readFileSync("itinerary.json", "utf-8");
let itinerary = JSON.parse(itineraryjson);
let data = JSON.parse(datajson);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/restaurants", (req, res) => {
  res.send(data.restaurants);
});

app.get("/restaurants/:id", (req, res) => {
  const { params } = req.params.id;
  console.log(req.params);
  let idx = Number(req.params.id);
  // console.log(data.restaurants[idx]);
  res.send(data.restaurants[idx]);
});

app.get("/itinerary", (req, res) => {
  res.send(itinerary);
});

app.post("/itinerary", (req, res) => {
  // structure { userEmail, location , startDate , endDate ,preference , meal , coordinates }

  itinerary.itineraries.push({
    userEmail: req.body.userEmail,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    preference: req.body.preference,
    coordinates: req.body.coordinates,
  });

  itineraryjson = JSON.stringify(itinerary);
  fs.writeFileSync("itinerary.json", itineraryjson, "utf-8");
  console.log(itinerary.itineraries);
  console.log("Itinerary Added Successfully");
});

app.post("/review", (req, res) => {
  // structure for req { id , user , rating(input) ,review(input) }

  data.restaurants[req.body.id].restaurantReviews.push({
    userName: req.body.user,
    reviewDate: req.body.date,
    userRating: req.body.rating,
    userReview: req.body.review,
  });
  datajson = JSON.stringify(data);
  fs.writeFileSync("data.json", datajson, "utf-8");
  console.log(data.restaurants[0].restaurantReviews);
  console.log("Data Added Successfully");

  res.send("Review added successfully");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
