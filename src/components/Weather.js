import React, {useEffect, useState} from 'react'
import './style.css'

  const Weather = () => {
    const [weatherState, setWeatherState] = useState("wi-day-sunny")
  const [uInVal, setuInVal] = useState("kanepokhari")
  const [tempInfo, setTempInfo] = useState("");
  let sec = tempInfo.sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`; 

    useEffect(()=>{
   switch (tempInfo.cloudMood) {
    case "Clouds":
      setWeatherState("wi-day-cloudy");
      break;
      case "Haze":
        setWeatherState("wi-fog");
        break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;

    default: setWeatherState("wi-day-sunny");
      break;
   }
    }, [tempInfo.cloudMood])

  const getData = async()=>{
  try {
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${uInVal}&units=metric&appid=7deb5d5ef513acbd22dfbbe0bbc92e65`;
    const res = await fetch(url);
    const mainData = await res.json();
    const { temp, humidity, pressure } = mainData.main;
    const { main: cloudMood } = mainData.weather[0];
    const { name } = mainData;
    const { speed } = mainData.wind;
   const { country, sunset } = mainData.sys;
   const myNewWeatherInfo = {
    temp,
    humidity,
    pressure,
    name,
    cloudMood,
    speed,
   country,
    sunset
   };
setTempInfo(myNewWeatherInfo)

  } catch (error) {
    alert(error)
  }}

useEffect(()=>{
    getData();
}, [getData])

  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input 
            type='search'
            placeholder='search..'
            autoFocus
            id='search'
            className='searchTerm'
            value={uInVal}
            onChange={(e)=>{setuInVal(e.target.value)}}
            style={{marginTop: '15px'}}
            />
            <button 
            className='searchButton' 
            type='button'
            style={{marginTop: '15px'}}
            onClick={getData}>
                Submit
                </button>
        </div>
      </div>

      {/* card */}

      <article className='widget'>
        <div className='weatherIcon'>
            <i className={`wi ${weatherState}`}></i>
        </div>

        <div className='weatherInfo'>
            <div className='tempreature'
            style={{marginLeft: '17px', fontSize: '20px'}}>
                <span>{tempInfo.temp} &deg;</span>
            </div>

            <div className='description '
            style={{marginLeft: '20px'}}>
                <div className='weatherCondition'>{tempInfo.cloudMood}</div>
                <div className='place'>
                    {tempInfo.name}, {tempInfo.country}
                </div>
            </div>
        </div>

        <div className='date'>{new Date().toLocaleString()}</div>

        <div className='extra-temp'>
          <div className='temp-info-minmax'>
            <div className='two-sided-section'>
              <p><i className={'wi wi-sunset'}></i></p>
              <p className='extra-info-leftside'>
              {timeStr} PM <br/>
                Sunshine
              </p>
            </div>
            <div className='two-sided-section'>
              <p><i className={'wi wi-humidity'}></i></p>
              <p className='extra-info-leftside'>
              {tempInfo.humidity}% <br/>
               Humidity
              </p>
            </div>
          </div>
          <div className='temp-info-minmax'>
          <div className='two-sided-section'>
              <p><i className={'wi wi-rain'}></i></p>
              <p className='extra-info-leftside'>
              {tempInfo.pressure} hPa <br/>
               Pressure
              </p>
            </div>
            <div className='two-sided-section'>
              <p><i className={'wi wi-strong-wind'}></i></p>
              <p className='extra-info-leftside'>
              {tempInfo.speed} m/s <br/>
               Speed
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default Weather
