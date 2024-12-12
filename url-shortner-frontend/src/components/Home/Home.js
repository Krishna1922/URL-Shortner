import axios from 'axios';
import React, { useState } from "react";
export default function MyApp() {

  const [inputText, setInputText] = useState("");
  const [responseMessage, setResponseMessage] = useState("");


  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };
  async function CallTheApi(){
    if(!inputText){
      setResponseMessage("The input cannot be empty.");
    }else if(!inputText.startsWith("https://")){
      setResponseMessage("Invalid Url!")
    }else{
      setResponseMessage("");
      try {
        const data = {
          longURL : inputText
        };
  
        const response = await axios.post(
          "http://localhost:8000/generate_url", // Replace with your endpoint
          data
        );
  
        setResponseMessage(`short URL : ${response.data.url}`);
        console.log(response.data.url); // Log response to console
      } catch (error) {
        console.error("Error :", error);
        setResponseMessage("Failed");
      }
      console.log(inputText);
    }
    
  }
  

  return (
    <div className='middle'>
      <div className='content'>
        <h1>Welcome to URL shortner</h1>
        <input  name="myInput" className='text-box' value={inputText} onChange={handleInputChange}/>
        <p>{responseMessage}</p>
        <button className='butoon' onClick={CallTheApi}>
          Generate
        </button>
      </div>
      
    </div>
  );
}