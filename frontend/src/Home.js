import './Home.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

function Home() {

  const [city, setCity] = useState('bengaluru');
  const [weatherData, setWeatherData] = useState(null);

  const APIKey = '546b8e7bc2e42c8c92a2572386d39b0a';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

  const getData = () => {
    axios.get(url)
      .then(res => {
        setWeatherData(res.data);
        axios.post('http://localhost:8081/storeWeatherData', {
          location: res.data.name,
          temperature: res.data.main.temp,
          humidity: res.data.main.humidity,
          pressure: res.data.main.pressure,
          weather: res.data.weather[0].description
        }).then(response => console.log(response))
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get(`http://localhost:8081/getWeatherData?location=${city}`)
      .then(res => setWeatherData(res.data[0]))
      .catch(err => console.log(err));
    document.getElementById("weatherInput").focus();
  }, [city]);

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = () => {
    getData();
  }

  const handleKeypress = e => {
    if (e.charCode === 13) {
      getData();
    }
  };
  const name = weatherData ? weatherData.name : '';

  const country = weatherData && weatherData.sys ? weatherData.sys.country : '';
  const humidity = weatherData && weatherData.main ? weatherData.main.humidity : '';
const pressure = weatherData && weatherData.main ? weatherData.main.pressure : '';
const temp = weatherData && weatherData.main ? weatherData.main.temp : '';
const weather = weatherData && weatherData.weather ? weatherData.weather[0].description : '';
const iconcode = weatherData && weatherData.weather ? weatherData.weather[0].icon : '#';


  

  const d = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return (
    <div className="App">
      <header className="App-header">
        <div className="weather" style={{textAlign:'center',marginTop:'15px'}}>
          <input id="weatherInput" style={{border:'2px solid black'}} type="text" name="city" placeholde="city name"
            onChange={handleChange}
            onKeyPress={handleKeypress}
          />
          <button onClick={handleSubmit}>Search</button>
        </div>

        <div className="results" style={styles.results}>
          <div style={{ fontSize: 30,color:'white' }}>{name}, {country}</div>

          <div style={{ color: 'white', fontSize: 18 }}>{days[d.getDay()]}, {month[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</div>

          <div style={{ fontSize: 54, fontWeight: 'bold' }}>{Math.round(temp)}' C</div>

          <img src={`http://openweathermap.org/img/w/${iconcode}.png`} alt="Weather icon" />

          <div style={{ textTransform: 'capitalize', marginBottom: 20,color:'white' }}>{weather}</div>

          <div style={{color:'white'}}>Humidity : {humidity}%</div>
          <div style={{color:'white'}}>Pressure : {pressure} hPa</div>
        </div>
      </header>

    </div>
  );
}

const styles = {
  results: {
    border: '1px solid #111111',
    borderRadius: 15,
    backgroundColor: '#111',
    padding: '2rem',
    margin: '1rem',
    boxShadow: 'rgb(84 179 207 / 50%) 3px 3px 2px 0px',
  }
}

export default Home;