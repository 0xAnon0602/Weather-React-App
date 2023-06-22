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
    .get(`https://api.weatherapi.com/v1/forecast.json?key=57d549a0f3a74d38b55110037232106&q=${location}&days=3&aqi=no&alerts=no`)
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

  useEffect(() => {
    axios
      .get(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=0cca7dd9ca1a4a0f8668a74e4b07e278"
      )
      .then((response) => {
        if (response.status === 200) {
        setError(false)
        axios
        .get(`https://api.weatherapi.com/v1/forecast.json?key=57d549a0f3a74d38b55110037232106&q=${response.data.latitude},${response.data.longitude}&days=3&aqi=no&alerts=no
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
    <div className="h-screen flex">
      <div className="bg-[#212B3B] w-1/2 m-12 rounded-3xl">
      <div className="flex items-center justify-center">
    {!error ? (
      <>
          {weatherInfo ? (
      <div>
      <div className="relative">
          <img
              className="pt-20 mt-24  m-auto"
              src={`https:` + weatherInfo.current.condition.icon.replaceAll("64", "128")}
              alt="Weather Icon"
          />
          <p className="text-[#F0F1F1] text-5xl font-extrabold mt-8 text-center">{`${weatherInfo.current.temp_c}° C`}</p>
          </div>
          <p className="text-[#F0F1F1] text-3xl font-bold mt-10 text-center">{weatherInfo.location.name}</p>
          <p className="text-[#F0F1F1]  font-bold pt-3 text-center">{`${weatherInfo.location.region},${weatherInfo.location.country}`}</p>
          </div>
        ) : (
          <div className="text-5xl pt-24 mt-24 m-auto">
          <p className="text-[#F0F1F1] mt-12">Loading</p>
          <ReactLoading className="mt-4 ml-12" type="spin" height={'40%'} width={'30%'} />
          </div>
        )}
      </>
    ):(
      <>
          <div className="text-3xl pt-24 mt-24 m-auto">
          <p className="text-[#DB2546] mt-24 pt-24">No such location found!</p>
          </div>
      </>
    )}

      </div>
      </div>
      <div className=" w-1/4 m-12 rounded-3xl">
        <div className="flex items-center justify-center">
          <div className="pt-36 mt-52  m-auto"> 
              <input
              type="text"
              id="Location"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Location"
              required
              value={location}
              onChange={handleInputChange}
              />
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-3 ml-16"
              onClick={handleSearch}
              >
              Search
              </button>
          </div>
          </div>
        </div>
    </div>
  );
}