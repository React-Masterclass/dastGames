import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import AppContext from "./contexts/Appcontext";
import useAuth from "./hooks/useAuth";

function App() {
  return <RouterProvider router={router} />;
}

function WrappedApp() {
  const data = useAuth();

  return (
    <AppContext.Provider value={data}>
        <App />
    </AppContext.Provider>
  );
}

export default WrappedApp;
