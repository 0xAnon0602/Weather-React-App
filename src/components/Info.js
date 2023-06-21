import axios from "axios";
import { useEffect, useState } from "react";

export default function Info() {
  const [weatherInfo, setWeatherInfo] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://ipgeolocation.abstractapi.com/v1/?api_key=0cca7dd9ca1a4a0f8668a74e4b07e278"
      )
      .then((response) => {
        if (response.status === 200) {

        axios
        .get(`https://api.weatherapi.com/v1/current.json?key=57d549a0f3a74d38b55110037232106&q=${response.data.latitude},${response.data.longitude}&aqi=no`)
        .then((response) => {
          if (response.status === 200) {
            setWeatherInfo(response.data)
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

        }

      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }, 
  
  []);

  return (
    <div className="flex items-center justify-center">
      {weatherInfo ? (
        <div>
        <div className=" items-center ml-5">
        <img
            className="pt-20 mt-24"
            src={`https:` + weatherInfo.current.condition.icon.replaceAll("64", "128")}
            alt="Weather Icon"
        />
        <p className="text-[#F0F1F1] text-5xl font-extrabold mt-8 text-center">{`${weatherInfo.current.temp_c}° C`}</p>
        </div>
        <p className="text-[#F0F1F1] text-3xl font-bold mt-10 text-center">{weatherInfo.location.name}</p>
        <p className="text-[#F0F1F1]  font-bold pt-3 text-center">{`${weatherInfo.location.region},${weatherInfo.location.country}`}</p>
        </div>
      ) : (
        <p>Loading weather information...</p>
      )}
    </div>

    
  );
}

//voriwa2863@byorby.com