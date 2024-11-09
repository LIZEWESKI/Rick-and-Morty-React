import React, { useState } from 'react';
import './Login.css';
import { loginUser } from '../utils/api';
import { Form, useActionData, useLoaderData,useNavigation} from 'react-router-dom';
import mutateResponseToRedirect from '../utils/mutateRedirect';
import ClipLoader from 'react-spinners/ClipLoader';
import { setAuthStatus } from '../components/AuthProvider';
import { FaRegCopy } from "react-icons/fa";
export function loader({request}){
  const url = new URL(request.url)
  const isLoggedIn = JSON.parse(localStorage.getItem("auth"));
  const isAuth = url.searchParams.get("auth") === "true" ? true : null;
  
  // If the user is already logged in, redirect them to the homepage
  if (isLoggedIn) {
    return mutateResponseToRedirect('/'); // or redirect('/home') depending on your route
  }
  return isAuth
}
export async function action({request}){
  const formData = Object.fromEntries(await request.formData());
  const redirectParam = new URL(request.url).searchParams.get("redirectTo") || '/'
  try{
    const data = await loginUser(formData)
    setAuthStatus(true); // Update AuthProvider's state directly
    localStorage.setItem("auth", JSON.stringify(true)); 
    console.log(redirectParam)
    console.log(data)
    return mutateResponseToRedirect(redirectParam)
  }catch(err){
    return err.message
  }
}
const Login = () => {
    const authMessage = useLoaderData()
    const errorMessage = useActionData()
    const navigation = useNavigation()
    return (
        <main className="login__main">
            {authMessage ? 
            <h1 className='warning--message'>Wubba lubba dub-dub! You gotta log in to see your favorites, Jerry!</h1> : 
            <h1>Log in to your account</h1>}
            <div className="account-wrapper">
              <p>Use our fake account: </p>
              <CopyToClipboard textToCopy="iamjerry@dub.com" defaultText="Copy Email" />
              <CopyToClipboard textToCopy="jerry123**" defaultText="Copy Password" />
            </div>
            <Form method="post">
                <label>
                  <input
                      placeholder='Email Adress'
                      type="email"
                      name="email"
                      autoComplete='username'
                      required 
                  />
                </label>
                <label>
                  <input 
                      placeholder='Password'
                      type="password" 
                      name="password"
                      autoComplete='current-password'
                      required 
                      />
                </label>
                <button  type="submit" disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? <ClipLoader size={20}/> : "Login"}
                </button>
            </Form>
            {errorMessage && <p className='form__err-message'>{errorMessage}</p>}
            <p className="signup-prompt">
                Don’t have an account? <a href="#">Create one now</a>
            </p>
        </main>
    ); 
  
};
function CopyToClipboard({ textToCopy, defaultText = 'Copy' }) {
  const [copyStatus, setCopyStatus] = useState(defaultText);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setCopyStatus('Copied!');
    setTimeout(() => setCopyStatus(defaultText), 2000);
  };
  return (
    <div className="copy--account-info">
      <small>{textToCopy}</small>
      {document.queryCommandSupported('copy') && (
        <div className="copy--clipboard__wrapper" onClick={handleCopy}>
          <FaRegCopy />
          <small>{copyStatus}</small>
        </div>
      )}
    </div>
  );
}
export default Login;
