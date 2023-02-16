
import './App.css';
import {useState} from 'react';
import Axios from 'axios';
import{WiCloud} from 'react-icons/wi';
import '../src/icons.css';


function App() {
const api={key:/*ENTER KEY*/,
          base:"https://api.openweathermap.org/data/2.5/"
}

const[city,setCity]=useState("");
const[weatherData,setWeatherData]=useState([{}]);
const [error, setError] = useState(null);

const getCityName=(e)=>{
setCity(e.target.value);
}
const fetchWeatherData=()=>{
  setError(null);
  Axios.get(`${api.base}weather?q=${city}&appid=${api.key}&units=metric`)
  .then((res)=>{
    console.log(res?.data)
    setWeatherData(res?.data)
  }).catch((error) => {
    console.log(error);
    setError("Failed to fetch weather data. Please try again.");
    setWeatherData({});
  });

};
/*
res.data.main.temp
res.data.main.name
res.data.main.temp_min
res.data.main.temp_max
res.data.weather[0].main
res.data.weather[0].description
*/

  return (
    <div className="App">
      <div className="Heading">
        <h1>Weather App</h1>
      </div>
      <div className="Content">
      {/*<header>
        <h1>Weather App</h1>
  </header>*/}
      <input type="text" name="searchcity" placeholder="enter city e.g., Cape town" onChange={getCityName}/>
      <button onClick={fetchWeatherData}>Search City</button>
      <div className="Error">{error}</div>
      <br/>
      {weatherData.main? <img src={"http://openweathermap.org/img/w/"+weatherData.weather[0].icon+".png"} alt="weather"/>:null}
      {weatherData.main?<h1>{weatherData.name}</h1>:null}
      {weatherData.main?<h1>{Math.round(weatherData.main.temp)}&#8451;</h1>:null}
      {weatherData.main?<p>{weatherData.weather[0].description}</p>:null}
      {weatherData.main?<p>Min: {Math.round(weatherData.main.temp_min)}&#8451; <br/> Max: {Math.round(weatherData.main.temp_max)}&#8451;</p>:null}
      {/*<footer>
        <p>created by @SBthedev </p>
        <p></p>2023|&copy; simabuhlem
</footer>*/}
      </div>
      <footer>
        <p>created by @SBTheDev</p>
      </footer>
    </div>
  );
}

export default App;
