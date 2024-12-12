import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const UrlDirection = (setRedirect) => {
  const { slug } = useParams(); // Retrieve the slug parameter from the URL
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();
  

  const backend_Call = async () => {
  
    try {
      const response = await axios.get(`http://localhost:8000/${slug}`);
      let url = response.data.url;
    //   url = url.slice(1, -1);
     window.location.href = url;
    //   window.location.replace(url);
    //   navigate(url);
    //   // Ensure the URL is clean and valid
    //   if (url.startsWith('"') && url.endsWith('"')) {
    //     url = url.slice(1, -1); // Remove extra quotes
    //   }

    //   // Redirect to the fetched URL
    //   if (url.startsWith("https://") || url.startsWith("http://")) {
    //     window.location.href = decodeURIComponent(url);
    //   } else {
    //     throw new Error("Invalid URL format received from the backend");
    //   }
    } catch (err) {
      console.error("Error fetching URL:", err);
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
