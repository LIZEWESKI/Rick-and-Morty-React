import React,{createContext, Suspense} from 'react'
import { defer, useLoaderData, useSearchParams, Await} from 'react-router-dom';
import { charactersLoader } from '../utils/api';
import "./Characters.css"
import FilterComponent from '../components/FilterComponent'
import CharactersGrid from '../components/CharactersGrid';
import Pagination from '../components/Pagination';
import ScrollToTopButton from '../components/ScrollToTopButton';
import LoadingFallBack from '../components/LoadingFallBack';
export function loader({request}){
    const urlSP = new URL(request.url).searchParams;
    // urlSP.entries convert the data into an array, Object.fromEntries converts it into an object
    // with the format of Key / Value
    const spObject = Object.fromEntries(urlSP?.entries());
    const charactersPromise = charactersLoader(spObject || "");
    return defer({charactersData: charactersPromise}) 
}
export const SpContext = createContext(null);
const Characters = () => {
    // Promise contains data object//
    const charactersPromise = useLoaderData();
    const [sp,setSp] = useSearchParams()
    function renderCharacters(characterData){
        return (
            characterData.results.length === 0 ? 
            <NoDataFound feedbackMessage={characterData.message}/> : 
            <>
            <SpContext.Provider value={sp?.toString() || ""}>
                <CharactersGrid characterData={characterData}/>
            </SpContext.Provider>
            {characterData.info.pages !== 1 && <Pagination info={characterData.info}/>}
            </>
        )
    }
    return (
        <main className='characters_main'>
            <h1 className='characters_title'>Characters Cards</h1>
            <FilterComponent/>
            <Suspense fallback={<LoadingFallBack/>}>
                <Await resolve={charactersPromise.charactersData}>
                    {(charactersData)=> renderCharacters(charactersData.data)}
                </Await>
            </Suspense>
            <ScrollToTopButton/>
        </main>
    )
}
const NoDataFound = ({feedbackMessage}) => {
    return (
        <div className='feedback_message--wrapper'>
            <h1 className='feedback--message'>{feedbackMessage}</h1>
        </div>
    )
}
export default Characters