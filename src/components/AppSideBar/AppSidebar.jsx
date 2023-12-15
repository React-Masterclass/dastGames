import ListGenres from "../ListGenres";
import ListPlatforms from "../ListPlatforms";
import ListStores from "../ListStores";
import ListPublishers from "../ListPublishers";
import ListDevelopers from "../ListDevelopers";



function AppSidebar() {
  return (
    <div className="">
      <div className="row my-3">
        <h4 className="tx-secondary text-center p-3">Filtra i giochi</h4>
      </div>

      <div className="row">
        <ListGenres />
      </div>

      <div className="row">
        <ListPlatforms />
      </div>
      <div className="row">
        <ListStores />
      </div>
      <div className="row">
        <ListPublishers />
      </div>
      <div className="row">
        <ListDevelopers />
      </div>

    </div>
  );
}

export default AppSidebar;
