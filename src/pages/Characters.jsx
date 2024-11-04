import React,{createContext} from 'react'
import "./Characters.css"
import FilterComponent from '../components/FilterComponent'
import { useLoaderData, useSearchParams} from 'react-router-dom';
import CharactersGrid from '../components/CharactersGrid';
import Pagination from '../components/Pagination';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { charactersLoader } from '../utils/api';
export async  function loader({request}){
    const urlSP = new URL(request.url).searchParams;
    // urlSP.entries convert the data into an array, Object.fromEntries converts it into an object
    // with the format of Key / Value
    const spObject = Object.fromEntries(urlSP.entries());
    const res = await charactersLoader(spObject);
    if (!res || res.status === 404 || res.data.results.length === 0) {
        return { 
            results: [],
            message: `Burrrp! No matches, Jerry! Loosen up those filters and try again, or it's nada for you!` 
        };
    }
    return res.data;
}
export const SpContext = createContext(null);
const Characters = () => {
    const charactersData = useLoaderData();
    const [sp,setSp] = useSearchParams()
    return (
        <main className='characters_main'>
            <h1 className='characters_title'>Characters Cards</h1>
            <FilterComponent/>
            {charactersData.results.length === 0 ? 
            <NoDataFound feedbackMessage={charactersData.message}/> : 
            <>
            <SpContext.Provider value={sp?.toString() || ""}>
                <CharactersGrid charactersData={charactersData}/>
            </SpContext.Provider>
            {charactersData.info.pages !== 1 && <Pagination info={charactersData.info}/>}
            </>
            }
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