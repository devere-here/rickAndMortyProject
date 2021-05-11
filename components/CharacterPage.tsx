import React from 'react';
import { useParams } from "react-router-dom";

interface CharacterPageParams {
  id: string;
}

export default function CharacterPage() {
  const { id } = useParams<CharacterPageParams>();

  return (
    <div>
      On the character page for character number {id}
    </div>
  );
}
