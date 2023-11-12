
// CharacterCard.js
import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  border: 2px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    background-color: #f0f0f0;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 87%;
`;

const CardTitle = styled.h2`
  text-align: center;
  padding: 10px;
  margin: 0px;
  background-color: #333;
  color: #fff;
`;

function CharacterCard({ character, onClick }) {
  const randomImageId = Math.floor(Math.random() * 1000); // Generate a random number for Picsum

  return (
    <CardWrapper onClick={onClick} style={{ backgroundColor: getSpeciesColor(character.species) }}>
      <CardImage
        src={`https://picsum.photos/200/300?random=${randomImageId}`}
        alt={character.name}
      />
      <CardTitle>{character.name}</CardTitle>
    </CardWrapper>
  );
}

const getSpeciesColor = (species) => {
  if (!species) {
    return "#2196F3"; // Default color for undefined species
  }

  if (Array.isArray(species)) {
    // If species is an array, use the first item for color determination
    return getSpeciesColor(species[0]);
  }

  switch (species.toLowerCase()) {
    case "human":
      return "#4CAF50"; // Green for humans
    case "wookiee":
      return "#8D6E63"; // Brown for Wookiees
    // Add more cases for other species
    default:
      return "#2196F3"; // Default color
  }
};

export default CharacterCard;
