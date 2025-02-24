import { Card, Row, Col } from "react-bootstrap";

const Forecast = ({ forecastData }) => {
  if (!forecastData?.list) return null;

  // Regrouper les prévisions par jour
  const dailyForecasts = forecastData.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="mt-4">
      <h3>Prévisions sur 5 jours</h3>
      <Row className="g-4">
        {dailyForecasts.map((day) => (
          <Col key={day.dt} md={2} sm={4}>
            <Card>
              <Card.Body>
                <small>
                  {new Date(day.dt * 1000).toLocaleDateString("fr-FR", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </small>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="weather icon"
                />
                <div>
                  <span className="text-warning">{Math.round(day.main.temp_max)}°</span> /{" "}
                  <span className="text-primary">{Math.round(day.main.temp_min)}°</span>
                </div>
                <small>{day.weather[0].description}</small>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Forecast;
