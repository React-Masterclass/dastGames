import usePlatforms from "../hooks/usePlatforms";
import { Link } from "react-router-dom";

export default function ListPlatforms() {
  const platforms = usePlatforms();

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
            Piattaforme
          </a>
        <ul className="dropdown-menu bg-primar ms-3">
          {platforms ? platforms.map((platform) => {
            return (
              <li key={platform.id} className="nav-item">
                <Link
                  to={`/games/platform/${platform.id}`}
                  className="text-decoration-none"
                >
                  <p className="tx-secondary">{platform.name}</p>
                </Link>
              </li>
            );
          }): 'caricamento'}
        </ul>
      </li>
    </div>
  );
}
