import React from 'react';
import { useParams } from 'react-router-dom';

export default function ShelfScreen({}) {
  const { type } = useParams();
  return (
    <h1>
      SHELF SCREEN - Showing list of movies stored in { type } shelf.
    </h1>
  );
}
