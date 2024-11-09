import { redirect } from "react-router-dom"
export default function mutateResponseToRedirect(path){
    //redirect returns the patch response 
    let response = redirect(path)
    //body can be anything but undefined
    response.body = true 
    return response
   }