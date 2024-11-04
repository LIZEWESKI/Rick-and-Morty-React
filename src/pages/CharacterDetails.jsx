import React  from 'react'
import { useLoaderData} from 'react-router-dom';
import ScrollButton from '../components/ScrollToTopButton';
import CharacterDetailsCard from '../components/CharacterDetailsCard';
import RelatedCharactersSection from '../components/RelatedCharactersSection';
import convertURLtoIds from '../utils/convertsURLtoIds';
import renameFields from '../utils/renamingFields';
import BreadCrumbs from '../components/BreadCrumbs';
import { characterLoader ,episodeLoader,locationLoader} from '../utils/api';
import "./CharacterDetails.css"
export async function loader({params}){
      const {id} = params;
      // Getting Character
        const getCharacter =  await characterLoader(Number(id));
      // Getting Episode
      const firstEpisodeURL = getCharacter.data.episode[0];
      const episodeId = convertURLtoIds(firstEpisodeURL,false,null)
      const getEpisode =  await episodeLoader(episodeId);
      // Getting Location
      const locationURL = getCharacter.data.location.url;
      const locationId = convertURLtoIds(locationURL,false,null)
      const getLocation = await locationLoader(locationId)
      // Field mappings to rename fields
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
      // Renamed Fields
      const transformedCharacterData = renameFields(getCharacter.data, characterFieldMap);
      const transformedEpisodeData = renameFields(getEpisode.data, episodeFieldMap);
      const transformedLocationData = renameFields(getLocation.data, locationFieldMap);
      // Related Characters URLs
      const locationResidentsArrayURLs  = getLocation.data.residents;
      const epCharactersArrayURLs = getEpisode.data.characters;
      // Gettings Ids from the Related Characters Arrays
      const residentsIds = convertURLtoIds(locationResidentsArrayURLs,true,id)
      const epCharactersIds = convertURLtoIds(epCharactersArrayURLs,true,id);
      // Fetching Related Characters
      const residents = await characterLoader(residentsIds)
      const EPcharacters = await characterLoader(epCharactersIds)
      // Organizing Data
      const data = {
        characterData: {
          ...transformedCharacterData,
          ...transformedEpisodeData, 
          ...transformedLocationData
        },
        residents: Array.isArray(residents.data) ? [...residents.data] : [residents.data],
        epCharacters: Array.isArray(EPcharacters.data) ? EPcharacters.data : [EPcharacters.data]
      }
      return data;
}
const CharacterDetails = () => {
    const data = useLoaderData();
    const {characterData, residents, epCharacters} = data
    return (
      <main className='character--details__main'>
        <BreadCrumbs characterName={characterData.name}/>
        <CharacterDetailsCard characterData={characterData}/>
        <RelatedCharactersSection data={data}/>
        <ScrollButton/>
      </main>
    );
}

export default CharacterDetails