import usePublishers from "../hooks/usePublishers";
import { Link } from "react-router-dom";

export default function ListPublishers() {
  const publishers = usePublishers();

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
            Pubblicato da
          </a>
        <ul className="dropdown-menu bg-primar ms-3">
          {publishers ? publishers.map((publisher) => {
            return (
              <li key={publisher.id} className="nav-item">
                <Link
                  to={`/games/publisher/${publisher.id}`}
                  className="text-decoration-none"
                >
                  <p className="tx-secondary">{publisher.name}</p>
                </Link>
              </li>
            );
          }): 'caricamento'}
        </ul>
      </li>
    </div>
  );
}
