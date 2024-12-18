import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const UrlDirection = (setRedirect) => {
  const { slug } = useParams(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  const backend_Call = async () => {
  
    try {
      const response = await axios.get(`https://url-shortner-thht.onrender.com/${slug}`);
      let url = response.data.url;
      window.location.href = url;
    } catch (err) {
      setError("Failed to redirect. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    backend_Call();
  }, [slug]);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  return (
    <>
      <p>Redirecting...</p>
    </>
  );
};

export default UrlDirection;
