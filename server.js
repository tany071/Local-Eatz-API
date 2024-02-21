
var data = require('./data.json');
const express = require('express')
const app = express()
const port = 3002

// console.log(data.restaurants[0].restaurantReviews)


app.get('/', (req, res) => {
  res.send('Hello World')
})


app.get('/review', (req,res)=>{
  res.send("Hello From Review")
   // structure for req { id , user , rating(input) ,review(input) }

   data.restaurants[req.body.id].restaurantReviews.push({ "username": req.body.user , "reviewDate": Date.now , "userRating": req.body.rating ,"userReview": req.body.review })
   console.log("Data Added Successfully")
 
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})