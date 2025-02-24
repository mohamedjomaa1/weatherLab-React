import { useState } from "react"; // ✅ FIX: Import useState
import { Button, Spinner } from "react-bootstrap";
import { getWeatherByCoords } from "../services/weatherService";

const LocationButton = ({ onLocationFound }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLocationClick = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          onLocationFound(data);
        } catch (error) {
          alert("Erreur de localisation");
        }
        setIsLoading(false);
      },
      () => {
        alert("Permission de localisation refusée");
        setIsLoading(false);
      }
    );
  };

  return (
    <Button variant="outline-primary" onClick={handleLocationClick} disabled={isLoading} className="mt-2">
      {isLoading ? <Spinner animation="border" size="sm" /> : "Utiliser ma position actuelle"}
    </Button>
  );
};

export default LocationButton;
