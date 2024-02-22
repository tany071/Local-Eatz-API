
// var data = require('./data.json');
const express = require('express')
const app = express()
const port = 3002

const fs = require("fs");
let datajson = fs.readFileSync("data.json","utf-8");
let itineraryjson = fs.readFileSync("itinerary.json","utf-8");
let itinerary = JSON.parse(itineraryjson)
let data = JSON.parse(datajson)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(data.restaurants[0].restaurantReviews)

 


app.get('/', (req, res) => {
  res.send('Hello World')
})


app.get('/itinerary',(req,res)=>{
  res.send(itinerary)
})



app.post('/itinerary',(req,res)=>{

  // structure { userEmail, location , startDate , endDate ,preference , meal , coordinates }

  // itinerary.itinerary[]

  itinerary.itineraries.push(
  {
            "userEmail": req.body.userEmail,
            "location": req.body.location,
            "startDate": req.body.startDate,
            "endDate": req.body.endDate,
            "preference": req.body.preference,
            "meal": req.body.meal,
            "coordinates": req.body.coordinates

  })


  itineraryjson = JSON.stringify(itinerary)
  fs.writeFileSync("itinerary.json",itineraryjson,"utf-8")
   console.log(itinerary.itineraries)
   console.log("Itinerary Added Successfully")




})


app.post('/review', (req,res)=>{
    // structure for req { id , user , rating(input) ,review(input) }
  // const  {id, user, rating, review}  = req.body;

  // // Push new review to the restaurant's review array
  // const newReview = {
  //   username: user,
  //   reviewDate: new Date().toISOString(), // Format date as ISO string
  //   userRating: rating,
  //   userReview: review
  // };

    console.log(req.body)

   data.restaurants[req.body.id].restaurantReviews.push({ "userName": req.body.user , "reviewDate": req.body.date , "userRating": req.body.rating ,"userReview": req.body.review })
   datajson = JSON.stringify(data)
   fs.writeFileSync("data.json",datajson,"utf-8")
   console.log(data.restaurants[0].restaurantReviews)
   console.log("Data Added Successfully")

   res.send("Review added successfully");
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})