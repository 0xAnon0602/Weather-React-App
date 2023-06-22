import {useState, useEffect} from "react";
import axios from "axios";
// import ReactLoading from 'react-loading';

export default function App() {

  const [location, setLocation] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  // const [error,setError]= useState(false)

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

//   const handleSearch = () => {
//     setWeatherInfo("")
//     axios
//     .get(`https://api.weatherapi.com/v1/forecast.json?key=57d549a0f3a74d38b55110037232106&q=${location}&days=3&aqi=no&alerts=no`)
//     .then((response) => {
//       if (response.status === 200) {
//         setWeatherInfo(response.data)
//         // setError(false)
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//       // setError(true)
//     });

// };

  useEffect(() => {
    axios
      .get(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=0cca7dd9ca1a4a0f8668a74e4b07e278"
      )
      .then((response) => {
        if (response.status === 200) {
        // setError(false)
        axios
        .get(`https://api.weatherapi.com/v1/forecast.json?key=57d549a0f3a74d38b55110037232106&q=${response.data.latitude},${response.data.longitude}&days=3&aqi=no&alerts=no
      `)
        .then((response) => {
          if (response.status === 200) {
            setWeatherInfo(response.data)
            // setError(false)
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          // setError(true)
        });

        }

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setError(true)
      });
    }, 
  
  []);


  return (
    <div className="h-screen flex">
    <div className="m-4"> 
        <input
        type="text"
        id="Location"
        className="bg-[#212B3B] border border[#212B3B] text-gray-900 text-xs rounded-lg block w-full p-2.5 px-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        placeholder="Location"
        required
        value={location}
        onChange={handleInputChange}
        />
    
    <div>
    <div className="flex">
      <div className="mr-12">
        <p className="text-5xl font-extrabold text-[#DEE0E4] mt-20 ml-20">{weatherInfo.location.name}</p>
        <p className="text-[#DEE0E4] font-bold ml-32">{`${weatherInfo.location.region}, ${weatherInfo.location.country}`}</p>
      </div>
      <img
        className="mt-20 ml-52"
        src={`https:` + weatherInfo.current.condition.icon.replaceAll("64", "128")}
        alt="Weather Icon"
      />
    </div>
    <p className="text-[#DEE0E4] text-4xl font-extrabold ml-20 px-12">{`${weatherInfo.current.temp_c}° C`}</p>
    </div>

  <div className="bg-[#212B3B] h-64 mt-12 w-full rounded-3xl">
    <p className="ml-12 py-8 text-[#9399A2] text-xs">TODAY'S FORECAST</p>
  </div>


    </div>
    </div>
  );
}