import React, { useEffect } from 'react';
import './NotFound.css'; // Assurez-vous que le chemin d'accès est correct

const NotFound = () => {
  useEffect(() => {
    // Sauvegarde du style de body actuel
    const originalStyle = window.getComputedStyle(document.body).background;
    // Application du style d'arrière-plan pour NotFound
    document.body.style.backgroundImage = "url('/notFound.PNG')"; // Ajustez le chemin d'accès
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";

    // Réinitialisation du style de body lorsque le composant est démonté
    return () => {
      document.body.style.background = originalStyle;
    };
  }, []);

  return (
    <div className="not-found-content">
      <h1 className="not-found-header">Oops!</h1>
      <p className="not-found-text">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
