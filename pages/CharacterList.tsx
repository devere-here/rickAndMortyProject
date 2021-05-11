import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { TextInput, StyleSheet } from "react-native";
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
  const [filterText, setFilterText] = useState<string>('');
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    setCharacters(data?.characters?.results || [])
  }, [data?.characters?.results]);

  useEffect(() => {
    const lowerCaseFilterText = filterText.toLowerCase()
    const filteredCharacters = (data?.characters?.results || []).filter((character: Character) => {
      const lowerCaseName = character.name.toLowerCase()

      return lowerCaseName.includes(lowerCaseFilterText)
    })

    setCharacters(filteredCharacters)
  }, [filterText])

  return (
    <div>
      <TextInput style={styles.input} value={filterText} onChangeText={(text: string) => setFilterText(text)} />
      {(characters || []).map((character: Character) => (
        <Link to={`/${character.id}`} key={character.name}>
          <CharacterContainer character={character} />
        </Link>
      ))}
    </div>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
