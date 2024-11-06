import React from 'react'
import { useSearchParams } from 'react-router-dom';
import CharacterCard from "./CharacterCard"
const CharactersGrid = ({characterData}) => {
  const {info,results} = characterData;
  const totalCharacters = info.count
  return (
    <>
      <CharactersCount totalCharacters={totalCharacters}/>
      <section className='characters_grid'>
          {results.map(character => <CharacterCard key={character.id} character={character}/>)}
      </section>
    </>
  )
}
function CharactersCount({totalCharacters}){
  const [sp, setSp] = useSearchParams();
  const currentPage = Number(sp.get('page')) || 1;
  const charactersPerPage = 20
  let lastShown = charactersPerPage * currentPage;
  const firstShown = lastShown - (charactersPerPage - 1);
  if(lastShown > totalCharacters) lastShown = totalCharacters 
    return (
    <small>Showing {firstShown} - {lastShown} of <strong>{totalCharacters}</strong> {totalCharacters === 1 ? "Character" : "Characters"} </small>
  )
}
export default CharactersGrid