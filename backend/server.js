 const express = require("express");
 const mysql = require('mysql');
 const cors = require('cors');

 const app = express();
 app.use(cors());
 app.use(express.json());
 

 const db= mysql.createConnection({
    host: 'localhost',
    user: "root",
    password:"",
    database:"weather"
 })
 
app.post('/weather',(req, res) => {
    const sql="INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ] 
    db.query(sql,[values],(err,data)=>{
        if(err){
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM login WHERE `email`=? AND `password`=?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
      if (err) {
          console.log('Error:', err);
          return res.json("Error", err);
      }
      if (data.length > 0) {
        res.status(200).json({ message: 'Login Successfully' });
      } else {
        return res.json("No Record Found");
      }
  });
});


app.post('/storeWeatherData', (req, res) => {
    const { location, temperature, humidity, pressure, weather } = req.body;
    const sql = "INSERT INTO weather_data (location, temperature, humidity, pressure, weather_description) VALUES (?, ?, ?, ?, ?)";
    const values = [location, temperature, humidity, pressure, weather];
    db.query(sql, values, (err, data) => {
      if (err) {
        console.error('Error storing weather data:', err);
        return res.json("Error");
      }
      console.log('Weather data stored successfully:', data);
      return res.json("Data stored successfully");
    });
});

  
  app.get('/getWeatherData', (req, res) => {
    const location = req.query.location;
    const sql = "SELECT * FROM weather_data WHERE location = ?";
    db.query(sql, [location], (err, data) => {
      if (err) {
        return res.json("Error");
      }
      return res.json(data);
    })
  })
  
 app.listen(8081,()=>{
    console.log("Listening...");

 })