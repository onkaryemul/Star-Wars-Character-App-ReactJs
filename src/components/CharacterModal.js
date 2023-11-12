
// CharacterModal.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 600px;
  width: 100%;
  color: black
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

const ModalHeader = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const ModalText = styled.p`
  margin-bottom: 10px;
`;

function CharacterModal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState(null);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const response = await axios.get(character.homeworld);
        setHomeworld(response.data);
      } catch (error) {
        console.error("Error fetching homeworld data:", error.message);
      }
    };

    fetchHomeworld();
  }, [character.homeworld]);

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalHeader>{character.name}</ModalHeader>
        <ModalText>Height: {character.height} meters</ModalText>
        <ModalText>Mass: {character.mass} kg</ModalText>
        <ModalText>Added to API: {formatDate(character.created)}</ModalText>
        <ModalText>Films: {character.films.length}</ModalText>
        <ModalText>Birth Year: {character.birth_year}</ModalText>

        {homeworld && (
          <div>
            <h3>Homeworld Information:</h3>
            <ModalText>Name: {homeworld.name}</ModalText>
            <ModalText>Terrain: {homeworld.terrain}</ModalText>
            <ModalText>Climate: {homeworld.climate}</ModalText>
            <ModalText>Residents: {homeworld.residents.length}</ModalText>
          </div>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

export default CharacterModal;
