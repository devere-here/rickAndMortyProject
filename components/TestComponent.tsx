import React from 'react';
import { useQuery, gql } from '@apollo/client';

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

export default function TestComponent() {
  const { data } = useQuery<ICharactersQuery>(CHARACTERS_QUERY);

  return (
    <>
      {(data?.characters?.results || []).map((character: any) => (
        <div>
          Id is {character.id}, Name is {character.name}
        </div>
      ))}
    </>
  );
}