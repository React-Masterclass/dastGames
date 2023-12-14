import ListGenres from "../ListGenres";
import ListPlatforms from "../ListPlatforms";

function AppSidebar() {
  return (
    <div className="container">
      <div className="row my-3">
        <h4 className="tx-secondary p-3">Filtra i giochi</h4>
      </div>

      <div className="row">
        <ListGenres />
      </div>

      <div className="row">
        <ListPlatforms />
      </div>
    </div>
  );
}

export default AppSidebar;
