import React, { useState, useEffect } from "react";
import axios from "axios";
import CharacterCard from "./components/CharacterCard.js";
import CharacterModal from "./components/CharacterModal.js";
import "./App.css";

import "./styles/CharacterCard.css";
import "./styles/CharacterModal.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCharacters = async (page) => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
      setCharacters(response.data.results);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage); // Fetch characters for the current page
  }, [currentPage]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const loadNextPage = () => {
    // Increment the current page to load the next page of characters
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg_img">
      <div className="app">
        <div>
          <h1>Star Wars Characters</h1>
        </div>
        <div className='special'>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
        </div>
        <div className="character-list">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onClick={() => handleCharacterClick(character)}
            />
          ))}
        </div>
        <button className="more" onClick={loadNextPage}>Load More Characters</button>
        {selectedCharacter && (
          <CharacterModal character={selectedCharacter} onClose={handleCloseModal} />
        )}
      </div>
    </div>
  );
}

export default App;
