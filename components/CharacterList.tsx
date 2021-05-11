import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-native";
import { Text } from "react-native";


interface Character {
  id: number;
  name: string;
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
      } 
    }
  }
`

export default function CharacterList() {
  const { data } = useQuery<ICharactersQuery>(CHARACTERS_QUERY);

  return (
    <>
      {(data?.characters?.results || []).map((character: Character) => (
        <div key={character.name}>
          <Link to={`/${character.id}`}>
            <Text>Id is {character.id}, Name is {character.name}</Text>
          </Link>
        </div>
      ))}
    </>
  );
}
