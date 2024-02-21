
// var data = require('./data.json');
const express = require('express')
const app = express()
const port = 3002

const fs = require("fs");
let datajson = fs.readFileSync("data.json","utf-8");
let data = JSON.parse(datajson)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(data.restaurants[0].restaurantReviews)

 


app.get('/', (req, res) => {
  res.send('Hello World')
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

   data.restaurants[req.body.id].restaurantReviews.push({ "username": req.body.user , "reviewDate": Date.now , "userRating": req.body.rating ,"userReview": req.body.review })
   datajson = JSON.stringify(data)
   fs.writeFileSync("data.json",datajson,"utf-8")
   console.log(data.restaurants[0].restaurantReviews)
   console.log("Data Added Successfully")

   res.send("Review added successfully");
 
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})