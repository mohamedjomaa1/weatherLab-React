import { Card } from "react-bootstrap";

const WeatherDisplay = ({ data }) => {
  if (!data) return null;

  return (
    <Card className="mt-4">
      <Card.Body>
        <h2>{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <p>Température : {Math.round(data.main.temp)}°C</p>
        <p>Humidité : {data.main.humidity}%</p>
        <p>Vent : {data.wind.speed} m/s</p>
      </Card.Body>
    </Card>
  );
};

export default WeatherDisplay;
