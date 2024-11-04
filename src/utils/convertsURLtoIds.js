export default function convertURLtoIds(url,isArray,currentCharacterId){
    let arrIds = []
    const currentId = Number(currentCharacterId)
    if(isArray){
        // Limiting to 10
        if (url.length > 21) url.length = Math.min(url.length, 21);
        // Addings Ids to a arrIds
        url.forEach(character => {
        // Spliting Each URL to get the Id
        const characterURL = character.split("/");
        // here we get each Id
        const characterId = characterURL[characterURL.length -1]
        // Adding it to the Ids Array
        arrIds.push(Number(characterId))
        })
        arrIds = arrIds.filter(id => id !== currentId)
        return arrIds
    } else {
      // Spliting the Ep URL to get the Id
      const urlArray = url.split("/")
      // here we got the Id
      const id = urlArray[urlArray.length -1]
      return Number(id)
    }
  }