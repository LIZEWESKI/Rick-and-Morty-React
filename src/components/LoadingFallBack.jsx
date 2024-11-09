import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const LoadingFallBack = () => {
    const loadingWrapperStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };
  return (
    <div style={loadingWrapperStyles}>
        <ClipLoader size={150} aria-label="Loading Spinner" color="#b36cff"/>
    </div>
  )
}

export default LoadingFallBack