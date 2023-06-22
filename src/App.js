import {useState, useEffect} from "react";
import axios from "axios";
import ReactLoading from 'react-loading';

export default function App() {

  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [error,setError]= useState(false)

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {
    setWeatherInfo("")
    axios
    .get(`https://api.weatherapi.com/v1/forecast.json?key=57d549a0f3a74d38b55110037232106&q=${location}&days=7&aqi=no&alerts=no`)
    .then((response) => {
      if (response.status === 200) {
        setWeatherInfo(response.data)
        setError(false)
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      setError(true)
    });

};

const getDay = (_timestamp) => {
  var a = new Date(_timestamp*1000);
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  return ((days[a.getDay()]).toLocaleUpperCase())
}

  useEffect(() => {
    axios
      .get(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=0cca7dd9ca1a4a0f8668a74e4b07e278"
      )
      .then((response) => {
        if (response.status === 200) {
        setError(false)
        axios
        .get(`https://api.weatherapi.com/v1/forecast.json?key=57d549a0f3a74d38b55110037232106&q=${response.data.latitude},${response.data.longitude}&days=7&aqi=no&alerts=no
      `)
        .then((response) => {
          if (response.status === 200) {
            setWeatherInfo(response.data)
            setError(false)
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(true)
        });

        }

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true)
      });
    }, 
  
  []);


  return (
    <div className="flex">

    {!error ? (
      <>

    <div className="m-4"> 
    <div className="flex">
        <input
        type="text"
        id="Location"
        className="bg-[#212B3B] border border[#212B3B] text-gray-900 text-xs rounded-lg block w-full p-2.5 px-70 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Location"
        required
        value={location}
        onChange={handleInputChange}
        />
      <button className="bg-blue-500 text-white px-2 rounded ml-2 mt-1"
        onClick={handleSearch}
        >
        Search
      </button>
    </div>

    {weatherInfo ? (
    <>
    <div>
    <div className="flex">
      <div className="mr-12">
        <p className="text-5xl font-extrabold text-[#DEE0E4] mt-20 ml-20 px-10">{weatherInfo.location.name}</p>
        <p className="text-[#DEE0E4] font-bold ml-32">{`${weatherInfo.location.region}, ${weatherInfo.location.country}`}</p>
      </div>
      <img
        className="mt-20 ml-52"
        src={`https:` + weatherInfo.current.condition.icon.replaceAll("64", "128")}
        alt="Weather Icon"
      />
    </div>
    <p className="text-[#DEE0E4] text-4xl font-extrabold ml-20 px-10">{`${weatherInfo.current.temp_c}° C`}</p>
    </div>
    <div className="bg-[#212B3B] h-64 mt-12 w-full rounded-3xl">
    <p className="ml-12 py-10 text-[#9399A2] text-xs font-bold">TODAY'S FORECAST</p>

    <div className="flex divide-x-2 divide-[#9399A2]">

<div className="row px-1 mr-6">
  <p className="text-[#9399A2] ml-8 text-sm font-semibold">6:00 AM</p>
  <img
    className="ml-6 mt-2"
    src={`https:` + weatherInfo.forecast.forecastday[0].hour[6].condition.icon}
    alt="Weather Icon"
  />
  <p className="text-[#DEE0E4] font-bold ml-8 mt-3">{`${weatherInfo.forecast.forecastday[0].hour[6].temp_c}° C`}</p>
</div>

<div className="row px-3 mr-3">
  <p className="text-[#9399A2] ml-8 text-sm font-semibold">9:00 AM</p>
  <img
    className="ml-6 mt-2 mr-3"
    src={`https:` + weatherInfo.forecast.forecastday[0].hour[9].condition.icon}
    alt="Weather Icon"
  />
  <p className="text-[#DEE0E4] font-bold ml-8 mt-3">{`${weatherInfo.forecast.forecastday[0].hour[9].temp_c}° C`}</p>
</div>

<div className="row px-3 mr-3">
  <p className="text-[#9399A2] ml-8 text-sm font-semibold">12:00 PM</p>
  <img
    className="ml-6 mt-2 mr-3"
    src={`https:` + weatherInfo.forecast.forecastday[0].hour[12].condition.icon}
    alt="Weather Icon"
  />
  <p className="text-[#DEE0E4] font-bold ml-8 mt-3">{`${weatherInfo.forecast.forecastday[0].hour[12].temp_c}° C`}</p>
</div>

<div className="row px-3 mr-3">
  <p className="text-[#9399A2] ml-8 text-sm font-semibold">3:00 PM</p>
  <img
    className="ml-6 mt-2 mr-3"
    src={`https:` + weatherInfo.forecast.forecastday[0].hour[15].condition.icon}
    alt="Weather Icon"
  />
  <p className="text-[#DEE0E4] font-bold ml-8 mt-3">{`${weatherInfo.forecast.forecastday[0].hour[15].temp_c}° C`}</p>
</div>

<div className="row px-3 mr-3">
  <p className="text-[#9399A2] ml-8 text-sm font-semibold">6:00 PM</p>
  <img
    className="ml-6 mt-2 mr-3"
    src={`https:` + weatherInfo.forecast.forecastday[0].hour[18].condition.icon}
    alt="Weather Icon"
  />
  <p className="text-[#DEE0E4] font-bold ml-8 mt-3">{`${weatherInfo.forecast.forecastday[0].hour[18].temp_c}° C`}</p>
</div>

<div className="row px-3 mr-3">
  <p className="text-[#9399A2] ml-8 text-sm font-semibold">9:00 PM</p>
  <img
    className="ml-6 mt-2 mr-3"
    src={`https:` + weatherInfo.forecast.forecastday[0].hour[21].condition.icon}
    alt="Weather Icon"
  />
  <p className="text-[#DEE0E4] font-bold ml-8 mt-3">{`${weatherInfo.forecast.forecastday[0].hour[21].temp_c}° C`}</p>
</div>

</div>
</div>
      <div>
        <p className="mt-20 text-center text-[#DEE0E4] font-bold text-2xl"> Created by 0xAnon</p>
      </div>

    </>
    ):(
      <>
        <div className="text-xl pt-24 mt-24 text-center ml-20 flex">
        <p className="text-[#F0F1F1] ml-20 mx-2">Loading</p>
        <ReactLoading className="" type="cylon" height={'5%'} width={'5%'} />
        </div>
      </>
    )}
    </div>

    {weatherInfo ? (
      <>
    <div className="bg-[#212B3B] mt-16 w-96 rounded-3xl">
    <p className="ml-12 py-8 text-[#9399A2] text-xs font-bold">7-DAY FORECAST</p>

    <div className="grid grid-cols-1 gap-2">
    <div className="flex mb-3 py-3">

    <p className="text-[#9399A2] text-xs font-semibold ml-12 mt-6">TODAY</p>
    <img
    className="ml-20 px-14 absolute"
    src={`https:` + weatherInfo.forecast.forecastday[0].day.condition.icon}
    alt="Weather Icon"
    /> 
    <p className="text-[#9399A2] text-xs font-semibold mt-6 ml-20 px-32 absolute"> {weatherInfo.forecast.forecastday[0].day.condition.text}</p>   
    <p className="text-[#DFE0E4] text-xs font-semibold mt-6 ml-44 px-32 absolute"> {`${weatherInfo.forecast.forecastday[0].day.maxtemp_c}/${weatherInfo.forecast.forecastday[0].day.mintemp_c}`}</p>   
    </div>



    <div className="flex mb-3 py-5">
    <p className="text-[#9399A2] text-xs font-semibold ml-12 mt-6">{getDay(weatherInfo.forecast.forecastday[1].date_epoch)}</p>
    <img
    className="ml-20 px-14 absolute"
    src={`https:` + weatherInfo.forecast.forecastday[1].day.condition.icon}
    alt="Weather Icon"
    /> 
    <p className="text-[#9399A2] text-xs font-semibold mt-6 ml-20 px-32 absolute"> {weatherInfo.forecast.forecastday[1].day.condition.text}</p>   
    <p className="text-[#DFE0E4] text-xs font-semibold mt-6 ml-44 px-32 absolute"> {`${weatherInfo.forecast.forecastday[1].day.maxtemp_c}/${weatherInfo.forecast.forecastday[1].day.mintemp_c}`}</p>   </div>



    <div className="flex mb-3 py-5">
    <p className="text-[#9399A2] text-xs font-semibold ml-12 mt-6">{getDay(weatherInfo.forecast.forecastday[2].date_epoch)}</p>
    <img
    className="ml-20 px-14 absolute"
    src={`https:` + weatherInfo.forecast.forecastday[2].day.condition.icon}
    alt="Weather Icon"
    /> 
    <p className="text-[#9399A2] text-xs font-semibold mt-6 ml-20 px-32 absolute"> {weatherInfo.forecast.forecastday[2].day.condition.text}</p>   
    <p className="text-[#DFE0E4] text-xs font-semibold mt-6 ml-44 px-32 absolute"> {`${weatherInfo.forecast.forecastday[2].day.maxtemp_c}/${weatherInfo.forecast.forecastday[2].day.mintemp_c}`}</p>   </div>


    <div className="flex mb-3 py-5">
    <p className="text-[#9399A2] text-xs font-semibold ml-12 mt-6">{getDay(weatherInfo.forecast.forecastday[3].date_epoch)}</p>
    <img
    className="ml-20 px-14 absolute"
    src={`https:` + weatherInfo.forecast.forecastday[3].day.condition.icon}
    alt="Weather Icon"
    /> 
    <p className="text-[#9399A2] text-xs font-semibold mt-6 ml-20 px-32 absolute"> {weatherInfo.forecast.forecastday[3].day.condition.text}</p>   
    <p className="text-[#DFE0E4] text-xs font-semibold mt-6 ml-44 px-32 absolute"> {`${weatherInfo.forecast.forecastday[3].day.maxtemp_c}/${weatherInfo.forecast.forecastday[3].day.mintemp_c}`}</p>   </div>


    <div className="flex mb-3 py-5">
    <p className="text-[#9399A2] text-xs font-semibold ml-12 mt-6">{getDay(weatherInfo.forecast.forecastday[4].date_epoch)}</p>
    <img
    className="ml-20 px-14 absolute"
    src={`https:` + weatherInfo.forecast.forecastday[4].day.condition.icon}
    alt="Weather Icon"
    /> 
    <p className="text-[#9399A2] text-xs font-semibold mt-6 ml-20 px-32 absolute"> {weatherInfo.forecast.forecastday[4].day.condition.text}</p>   
    <p className="text-[#DFE0E4] text-xs font-semibold mt-6 ml-44 px-32 absolute"> {`${weatherInfo.forecast.forecastday[4].day.maxtemp_c}/${weatherInfo.forecast.forecastday[4].day.mintemp_c}`}</p>   </div>


    <div className="flex mb-3 py-5">
    <p className="text-[#9399A2] text-xs font-semibold ml-12 mt-6">{getDay(weatherInfo.forecast.forecastday[5].date_epoch)}</p>
    <img
    className="ml-20 px-14 absolute"
    src={`https:` + weatherInfo.forecast.forecastday[5].day.condition.icon}
    alt="Weather Icon"
    /> 
    <p className="text-[#9399A2] text-xs font-semibold mt-6 ml-20 px-32 absolute"> {weatherInfo.forecast.forecastday[5].day.condition.text}</p>   
    <p className="text-[#DFE0E4] text-xs font-semibold mt-6 ml-44 px-32 absolute"> {`${weatherInfo.forecast.forecastday[5].day.maxtemp_c}/${weatherInfo.forecast.forecastday[5].day.mintemp_c}`}</p>   </div>


    <div className="flex mb-3 py-5">
    <p className="text-[#9399A2] text-xs font-semibold ml-12 mt-6">{getDay(weatherInfo.forecast.forecastday[6].date_epoch)}</p>
    <img
    className="ml-20 px-14 absolute"
    src={`https:` + weatherInfo.forecast.forecastday[6].day.condition.icon}
    alt="Weather Icon"
    /> 
    <p className="text-[#9399A2] text-xs font-semibold mt-6 ml-20 px-32 absolute"> {weatherInfo.forecast.forecastday[6].day.condition.text}</p>   
    <p className="text-[#DFE0E4] text-xs font-semibold mt-6 ml-44 px-32 absolute"> {`${weatherInfo.forecast.forecastday[6].day.maxtemp_c}/${weatherInfo.forecast.forecastday[6].day.mintemp_c}`}</p>   </div>


    </div>
    </div>
      </>
    ):(
      <>
      </>
    )}
      </>
    ):(
      <>
    <div className="m-2"> 
      <div className="flex">
        <input
        type="text"
        id="Location"
        className="bg-[#212B3B] border border[#212B3B] text-gray-900 text-xs rounded-lg block w-full p-2.5 px-70 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Location"
        required
        value={location}
        onChange={handleInputChange}
        />
      <button className="bg-blue-500 text-white px-2 rounded ml-2 mt-1"
        onClick={handleSearch}
        >
        Search
      </button>
      </div>
    </div>
      <div className="text-3xl pt-24 mt-24 text-center">
      <p className="text-[#DB2546] mt-24 pt-24">No such location found!</p>
      </div>
      </>
    )}

    
    </div>
  );
}