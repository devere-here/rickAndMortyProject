import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-native";

import CharacterContainer from "../components/CharacterContainer";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

interface CharacterQueryInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface Characters {
  info: CharacterQueryInfo;
  results: Character[];
}

interface ICharactersQuery {
  characters: Characters;
}


const CHARACTERS_QUERY = gql`
  query GetCharacters {
    characters {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        gender
        image
      } 
    }
  }
`

export default function CharacterList() {
  const { data } = useQuery<ICharactersQuery>(CHARACTERS_QUERY);

  return (
    <div>
      {(data?.characters?.results || []).map((character: Character) => (
        <Link to={`/${character.id}`} key={character.name}>
          <CharacterContainer character={character} />
        </Link>
      ))}
    </div>
  );
}
