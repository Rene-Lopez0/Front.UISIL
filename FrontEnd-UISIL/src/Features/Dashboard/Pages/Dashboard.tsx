import { Link, Navigate, Route, Routes } from "react-router";
import type { Usuariosesion } from "../../Auth/services/AuthAPI";
import { MenuLateral } from "../Components/MenuLateral";
import "./Dashboard.css";

interface DashboardProps {
  usuario: Usuariosesion;
  cerrarSesion: () => void;
}

export function DashboardPage({ usuario, cerrarSesion }: DashboardProps) {
  const nombre = usuario.nombreCompleto || usuario.correo || "Usuario";

  return (
    <div className="dashboard-layout">
      <MenuLateral nombre={nombre} cerrarSesion={cerrarSesion} />
      <div className="dashboard-cuerpo">
        <header className="dashboard-cabecera">
          <span>Panel de administración</span>
          <span className="badge text-bg-success">Sesión activa</span>
        </header>

        <main className="dashboard-contenido">
          {/* Las rutas internas cambian el contenido y conservan el menú a la izquierda. */}
          <Routes>
            <Route
              index
              element={
                <>
                  <p className="dashboard-sobretitulo">INICIO</p>
                  <h1>Hola, {nombre}</h1>
                  <p className="text-secondary mb-4">
                    Bienvenido al sistema de gestión UISIL.
                  </p>

                  <section
                    className="dashboard-bienvenida"
                    aria-labelledby="bienvenida"
                  >
                    <div>
                      <span className="badge bg-white text-success mb-3">
                        Tu espacio de trabajo
                      </span>
                      <h2 id="bienvenida">Todo comienza aquí.</h2>
                      <p>
                        Utiliza el menú lateral para navegar por las opciones
                        del sistema y consultar tu información.
                      </p>
                      <Link
                        className="btn btn-light text-success fw-semibold"
                        to="/dashboard/perfil"
                      >
                        Ver mi perfil →
                      </Link>
                    </div>
                    <span className="dashboard-emblema" aria-hidden="true">
                      z
                    </span>
                  </section>

                  <section className="mt-4" aria-labelledby="acceso-rapido">
                    <h2 id="acceso-rapido" className="h5 mb-3">
                      Acceso rápido
                    </h2>
                    <Link className="dashboard-tarjeta" to="/dashboard/perfil">
                      <span
                        className="dashboard-tarjeta-icono"
                        aria-hidden="true"
                      >
                        U
                      </span>
                      <span>
                        <strong>Mi perfil</strong>
                        <small>Consulta los datos de tu cuenta.</small>
                      </span>
                      <span className="ms-auto" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </section>
                </>
              }
            />
            <Route
              path="perfil"
              element={
                <>
                  <p className="dashboard-sobretitulo">MI CUENTA</p>
                  <h1>Mi perfil</h1>
                  <p className="text-secondary mb-4">
                    Información de tu cuenta de UISIL.
                  </p>
                  <section
                    className="dashboard-perfil"
                    aria-labelledby="datos-cuenta"
                  >
                    <h2 id="datos-cuenta" className="h5 mb-4">
                      Datos de la cuenta
                    </h2>
                    {/* ?? usa el texto alternativo únicamente si el valor es null o undefined. */}
                    <dl className="mb-0">
                      <dt>Nombre completo</dt>
                      <dd>{usuario.nombreCompleto || "No disponible"}</dd>
                      <dt>Correo electrónico</dt>
                      <dd>{usuario.correo || "No disponible"}</dd>
                      <dt>Identificador de usuario</dt>
                      <dd>{usuario.idUsuario ?? "No disponible"}</dd>
                    </dl>
                  </section>
                </>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
