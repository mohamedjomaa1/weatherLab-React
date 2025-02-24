import { useState } from "react"; // ✅ FIX: Import useState
import { Form, InputGroup, Button } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          placeholder="Entrez une ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button type="submit">Rechercher</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
