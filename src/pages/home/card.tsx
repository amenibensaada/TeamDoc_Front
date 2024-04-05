import { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

interface StaticFileCardProps {
  title: string;
  description: string;
  noteId: number;
}

const StaticFileCard = ({
  title,
  description,
}: // noteId,
StaticFileCardProps) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  return (
    <div className="static-file-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="buttons-container">
        <img
          src="/like.png"
          alt="Like"
          className="like-icon"
          onClick={handleLike}
          width="50px"
          height="50px"
          style={{ cursor: "pointer" }}
        />
        <span>{likes}</span>
        <img
          src="/dislike.png"
          alt="Dislike"
          className="dislike-icon"
          onClick={handleDislike}
          width="50px"
          height="50px"
          style={{ cursor: "pointer" }}
        />
        <span>{dislikes}</span>
      </div>
      <br />
      <Link to={`/editor/65f2fbe78e9282e0755a60dd`}>
        <button>Ajouter une note</button>
      </Link>
    </div>
  );
};

export default StaticFileCard;
