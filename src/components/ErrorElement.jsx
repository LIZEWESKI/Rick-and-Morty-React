import React from 'react';
import { Link, useRouteError} from 'react-router-dom';
import "./ErrorElement.css"
const ErrorElement = () => {
    const error = useRouteError()
    console.log(error)
    const errorMessage = error?.message || "Sorry folks, um technical difficulties...";
    return (
        <main className='error_main'>
            <h1>{errorMessage}</h1>
            <p>Try Again later!</p>
            <Link to="/"><button>Go to Home</button></Link>
        </main>
    );
};

export default ErrorElement;
