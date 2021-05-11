import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';
import { Text } from "react-native";

interface CharacterPageParams {
  id: string;
}

const CHARACTER_QUERY = gql`
  query Character($id: ID!){
    character(id: $id) {
      id
      name
    }
  }
`

export default function CharacterPage() {
  const { id } = useParams<CharacterPageParams>();
  const { data, loading } = useQuery(CHARACTER_QUERY, {
    variables: { id }
  });

  return (
    <>
      {!loading && <Text>On the character page for character {data?.character?.name}</Text>}
    </>
  );
}
