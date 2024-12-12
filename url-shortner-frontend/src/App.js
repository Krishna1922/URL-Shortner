import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import UrlDirection from './components/Urldirection/Urldirection';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(){
  // const [redirectt , setRedirect] = useState(null);
  // useEffect(()=>{
  //   if(redirectt){
  //     window.location.href = redirectt;
  //   }
     
  // },[redirectt])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<UrlDirection/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;