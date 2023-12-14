import useGenres from "../hooks/useGenres";
import { Link } from "react-router-dom";

export default function ListGenres() {
  const genres = useGenres();

  return (
    <div className="m-3">
      <li className="nav-item dropdown list-unstyled">
          <a
            className=" dropdown-toggle tx-secondary text-decoration-none"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Generi
          </a>
        <ul className="dropdown-menu bg-primar">
          {genres ? genres.map((genre) => {
            return (
              <li key={genre.id} className="nav-item ms-3">
                <Link
                  to={`/games/genre/${genre.slug}`}
                  className="text-decoration-none tx-secondary "
                >
                  <p>{genre.name}</p>
                </Link>
              </li>
            );
          }): 'caricamento'}
        </ul>
      </li>
    </div>
  );
}
