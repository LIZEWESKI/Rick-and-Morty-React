import { getCharacter, getEpisode, getLocation, getCharacters} from 'rickmortyapi';

export async function charactersLoader(id){
    const resCharacters = await getCharacters(id)
    if (resCharacters.error === "There is nothing here" || resCharacters.status === 404) {
        return { 
            data: {
                results: [],
                message: `Burrrp! No matches, Jerry! Loosen up those filters and try again, or it's nada for you!`
            } 
        };
    }
    if (resCharacters.status >= 500) {
        throw createErrorResponse(
            "Sorry folks, um technical difficulties... We couldn't load Characters",
            resCharacters.status || 500,
            resCharacters.statusText || "Error")
    }
    return resCharacters;
}

export async function characterLoader(id){
    const resCharacter = await getCharacter(id)
    if (!resCharacter || resCharacter.status !== 200 || !resCharacter.data) {
        throw createErrorResponse(
            "Sorry folks, um technical difficulties... We couldn't load Character",
            resCharacter.status || 500,
            resCharacter.statusText || "Error")
    }
    return resCharacter;
}
export async function episodeLoader(id){
    const resEP = await getEpisode(id)
    if (!resEP || resEP.status === 404 || !resEP.data) {
        throw createErrorResponse("Sorry folks, um technical difficulties... We couldn't load Episode",
            resEP.status,
            resEP.statusText)
    }
    return resEP;
}
export async function locationLoader(id){
    const resLocation = await getLocation(id)
    if (!resLocation || resLocation.status === 404 || !resLocation.data) {
        throw createErrorResponse("Sorry folks, um technical difficulties... We couldn't load Location Data",
            resLocation.status,
            resLocation.statusText)
    }
    return resLocation;
}
export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
export function createErrorResponse(message, status, statusText) {
    const response = new Response(null, {
        status: status,
        statusText: statusText,
    });
    response.message = message; // Custom property for error message
    return response;
  }