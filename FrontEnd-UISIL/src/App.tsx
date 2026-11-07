import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import { InicioSesionPage } from "./Features/Auth/Pages/Iniciosesion";
import { useInicioSesion } from "./Features/Auth/hooks/useInicioSesion";
import { DashboardPage } from "./Features/Dashboard/Pages/Dashboard";

function App() {
  const sesion = useInicioSesion();

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/inicio-sesion"
          element={
            sesion.usuario ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <InicioSesionPage sesion={sesion} />
            )
          }
        />

        <Route
          path="/dashboard/*"
          element={
            sesion.usuario ? (
              <DashboardPage
                usuario={sesion.usuario}
                cerrarSesion={sesion.CerrarSesion}
              />
            ) : (
              <Navigate to={"/inicio-sesion replace"} />
            )
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={sesion.usuario ? "/dashboard" : "/inicio-sesion"}
              replace
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
