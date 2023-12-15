import useStores from "../hooks/useStores";
import { Link } from "react-router-dom";

export default function ListPlatforms() {
  const stores = useStores();

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
            Negozi
          </a>
        <ul className="dropdown-menu bg-primar ms-3">
          {stores ? stores.map((store) => {
            return (
              <li key={store.id} className="nav-item">
                <Link
                  to={`/games/store/${store.id}`}
                  className="text-decoration-none"
                >
                  <p className="tx-secondary">{store.name}</p>
                </Link>
              </li>
            );
          }): 'caricamento'}
        </ul>
      </li>
    </div>
  );
}
