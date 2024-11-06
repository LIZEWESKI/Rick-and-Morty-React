import React, {Suspense} from 'react'
import { useLoaderData, defer, Await} from 'react-router-dom';
import { characterLoader ,episodeLoader,locationLoader} from '../utils/api';
import ScrollButton from '../components/ScrollToTopButton';
import CharacterDetailsCard from '../components/CharacterDetailsCard';
import RelatedCharactersSection from '../components/RelatedCharactersSection';
import convertURLtoIds from '../utils/convertsURLtoIds';
import renameFields from '../utils/renamingFields';
import BreadCrumbs from '../components/BreadCrumbs';
import ClipLoader from "react-spinners/ClipLoader";
import "./CharacterDetails.css"
// for Ref!
// export async function loader({params}){
//   const {id} = params;
//   // Getting Character
//   const getCharacter =  await characterLoader(Number(id));
//   // Getting Episode
//   const firstEpisodeURL = getCharacter.data.episode[0];
//   const episodeId = convertURLtoIds(firstEpisodeURL,false,null)
//   const getEpisode =  await episodeLoader(episodeId);
//   // Getting Location
//   const locationURL = getCharacter.data.location.url;
//   const locationId = convertURLtoIds(locationURL,false,null)
//   const getLocation = await locationLoader(locationId)
//   // Field mappings to rename fields
//   const characterFieldMap = {
//     episode: 'episodes'
//   };
//   const episodeFieldMap = {
//     id: 'episodeId',
//     name: 'episodeName',
//     characters: 'epCharacters'
//   };
//   const locationFieldMap = {
//     id: 'locationId',
//     name: 'locationName',
//     type: 'locationType'
//   };
//   // Renamed Fields
//   const transformedCharacterData = renameFields(getCharacter.data, characterFieldMap);
//   const transformedEpisodeData = renameFields(getEpisode.data, episodeFieldMap);
//   const transformedLocationData = renameFields(getLocation.data, locationFieldMap);
//   // Related Characters URLs
//   const locationResidentsArrayURLs  = getLocation.data.residents;
//   const epCharactersArrayURLs = getEpisode.data.characters;
//   // Gettings Ids from the Related Characters Arrays
//   const residentsIds = convertURLtoIds(locationResidentsArrayURLs,true,id)
//   const epCharactersIds = convertURLtoIds(epCharactersArrayURLs,true,id);
//   // Fetching Related Characters
//   const residents = await characterLoader(residentsIds)
//   const EPcharacters = await characterLoader(epCharactersIds)
//   // Organizing Data
//   const data = {
//     characterData: {
//       ...transformedCharacterData,
//       ...transformedEpisodeData, 
//       ...transformedLocationData
//     },
//     residents: Array.isArray(residents.data) ? [...residents.data] : [residents.data],
//     epCharacters: Array.isArray(EPcharacters.data) ? EPcharacters.data : [EPcharacters.data]
//   }
//   return data;
// }
export function loader({params}) {
  const { id } = params;

  // First fetch: Get the character
  const characterPromise = characterLoader(Number(id)).then(getCharacter => {
    // Second fetch: Get the episode based on character's episode data
    const firstEpisodeURL = getCharacter.data.episode[0];
    const episodeId = convertURLtoIds(firstEpisodeURL, false, null);
    
    return episodeLoader(episodeId).then(getEpisode => {
      // Third fetch: Get the location based on character's location data
      const locationURL = getCharacter.data.location.url;
      const locationId = convertURLtoIds(locationURL, false, null);
      
      return locationLoader(locationId).then(getLocation => {
        // Field mappings
        const characterFieldMap = {
          episode: 'episodes'
        };
        const episodeFieldMap = {
          id: 'episodeId',
          name: 'episodeName',
          characters: 'epCharacters'
        };
        const locationFieldMap = {
          id: 'locationId',
          name: 'locationName',
          type: 'locationType'
        };

        // Rename fields
        const transformedCharacterData = renameFields(getCharacter.data, characterFieldMap);
        const transformedEpisodeData = renameFields(getEpisode.data, episodeFieldMap);
        const transformedLocationData = renameFields(getLocation.data, locationFieldMap);

        // Fetch related characters
        const locationResidentsArrayURLs = getLocation.data.residents;
        const epCharactersArrayURLs = getEpisode.data.characters;
        
        const residentsIds = convertURLtoIds(locationResidentsArrayURLs, true, id);
        const epCharactersIds = convertURLtoIds(epCharactersArrayURLs, true, id);

        // Fetch related characters asynchronously
        const residentsPromise = characterLoader(residentsIds);
        const epCharactersPromise = characterLoader(epCharactersIds);

        return Promise.all([residentsPromise, epCharactersPromise]).then(([residents, epCharacters]) => {
          // Organize data
          const data = {
            characterData: {
              ...transformedCharacterData,
              ...transformedEpisodeData,
              ...transformedLocationData
            },
            residents: Array.isArray(residents.data) ? [...residents.data] : [residents.data],
            epCharacters: Array.isArray(epCharacters.data) ? epCharacters.data : [epCharacters.data]
          };
          return data;
        });
      });
    });
  });

  // Use defer to return promises
  return defer({
    characterDetails: characterPromise
  });
}

const CharacterDetails = () => {
    const characterPromise = useLoaderData();
    console.log(characterPromise)
    return (
      <main className='character--details__main'>
        <Suspense fallback={
                <div className='loading--wrapper'>
                    <ClipLoader size={150} aria-label="Loading Spinner" color="#b36cff"/>
                </div>}>
          <Await resolve={characterPromise.characterDetails}>
            {
              (characterDetails)=> {
                const {characterData, residents, epCharacters} = characterDetails
                return (
                  <>
                    <BreadCrumbs characterName={characterData.name}/>
                    <CharacterDetailsCard characterData={characterData}/>
                    <RelatedCharactersSection data={characterDetails}/> 
                  </>
                )
              }
            }
          </Await>
        </Suspense>
        <ScrollButton/>
      </main>
    );
}

export default CharacterDetails