import { NavLink } from "react-router";

interface MenuLateralProps {
  nombre: string;
  cerrarSesion: () => void;
}

export function MenuLateral({ nombre, cerrarSesion }: MenuLateralProps) {
  return (
    <aside className="dashboard-menu">
      <a className="dashboard-marca" href="#/dashboard">
        <span className="dashboard-logo">U</span>
        <span>
          UISIL<small>Sistema de gestión estudiantil</small>
        </span>
      </a>

      <h3 className="dashboard-menu-etiqueta">Principal</h3>
      <nav className="dashboard-navegacion">
        <NavLink to="dashboard" end>
          Inicio
        </NavLink>
        <NavLink to="/dashboard/perfil">Mi perfil</NavLink>
      </nav>

      <div className="dashboard-menu-pie">
        <span className="dashboard-avatar">
          {nombre.charAt(0).toUpperCase()}
        </span>
        <div className="dashboard-menu-usuario">
          <strong>{nombre}</strong>
          <small>Sesión iniciada</small>
        </div>
        <button
          className="btn btn-outline-light w-100 mt-3"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
