import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

function Weather() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})
  const getWeatherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + API_KEY
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
      alert("City Not Found.")
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    if(inputCity === ""){
      alert("Please Enter City Name.")
    }
    else {
    getWeatherDetails(inputCity)}
  }
  return (
    <div className="col-md-10">
      <div className="wetherBg">
        <h1 className="heading">Enter the City to get Weather Details</h1>

        <div className="d-grid gap-3 col-2 mt-3">
          <input type="text" className="form-control"
            value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
          <img className="weathorIcon" src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" alt="" />


              {/* to print the output data */}

            <h5 className="weathorCity">
              {data?.name}
            </h5>
            <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(0)}°C</h6>
          </div>
        </div>
      }
    </div>
  );
}

export default Weather;
