import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-native";
import { Text } from "react-native";

import CharacterContainer from "../components/CharacterContainer";

interface CharacterPageParams {
  id: string;
}

const CHARACTER_QUERY = gql`
  query Character($id: ID!){
    character(id: $id) {
      id
      name
      status
      species
      gender
      image
    }
  }
`

export default function CharacterPage() {
  const { id } = useParams<CharacterPageParams>();
  const { data, loading } = useQuery(CHARACTER_QUERY, {
    variables: { id }
  });

  if (loading) return null

  return (
    <>
      {data?.character && (
        <CharacterContainer character={data.character} />
      )}
      <Link to='/'><Text>Go back to the list</Text></Link>
    </>
  );
}
