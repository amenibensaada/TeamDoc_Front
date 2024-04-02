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
  noteId,
}: StaticFileCardProps) => {
  return (
    <div className="static-file-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/editor/${noteId}`}>
        <button>Ajouter une note</button>
      </Link>
    </div>
  );
};

export default StaticFileCard;
