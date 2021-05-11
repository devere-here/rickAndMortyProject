import React from "react";
import { Character } from "../pages/CharacterList";

interface CharacterProps {
  character: Character
}

export default function CharacterContainer({ character }: CharacterProps) {
  return (
    <div>
      <h1>{character.name}</h1>
      <h4>Info: {character.status}, {character.species}, {character.gender}</h4>
      <img src={character.image} alt={character.name}/>
    </div>
  );
}
