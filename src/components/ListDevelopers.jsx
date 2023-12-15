import useDevelopers from "../hooks/useDevelopers";
import { Link } from "react-router-dom";

export default function ListDevelopers() {
  const developers = useDevelopers();

  return (
    <div className="m-3">
      <li className="nav-item dropdown list-unstyled ">
          <a
            className="text-decoration-none dropdown-toggle bg-primar tx-secondary "
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sviluppato da
          </a>
        <ul className="dropdown-menu bg-primar ms-3">
          {developers ? developers.map((developer) => {
            return (
              <li key={developer.id} className="nav-item">
                <Link
                  to={`/games/developer/${developer.id}`}
                  className="text-decoration-none"
                >
                  <p className="tx-secondary">{developer.name}</p>
                </Link>
              </li>
            );
          }): 'caricamento'}
        </ul>
      </li>
    </div>
  );
}
