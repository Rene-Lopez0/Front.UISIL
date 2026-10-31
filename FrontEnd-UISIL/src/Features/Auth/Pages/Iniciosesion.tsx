import "./Iniciosesion.css";
import { useState } from "react";
import type { FormEvent } from "react";
import { useInicioSesion } from "../hooks/useInicioSesion";
import { PantallaCarga } from "../Components/PantallaCarga";

export function InicioSesionPage() {
  const [correo, setcorreo] = useState("");
  const [contrasena, setcontrasena] = useState("");
  const [errorvalidacion, seterrorvalidacion] = useState("");

  const sesion = useInicioSesion();

  async function EnviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (sesion.cargando) return;
    seterrorvalidacion("");

    if (contrasena.trim() === "") {
      seterrorvalidacion("Debe ingresar una contraseña");
      return;
    }

    await sesion.Iniciar(correo.trim(), contrasena);

    setcontrasena("");
  }

  return (
    <main className="min-vh-100 d-flex align-items-center bg-light py-4">
      {sesion.cargando && <PantallaCarga />}

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5 col-xl-4">
            <section className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-sm-5">
                <div className="text-center mb-4">
                  <span className="text-success fw-bold">UISIL</span>

                  <h1 id="titulo-login" className="h3 mt-3 mb-2">
                    Inicio de sesión
                  </h1>

                  <p className="text-secondary">
                    Ingresa tus datos para acceder.
                  </p>
                </div>

                <form onSubmit={EnviarFormulario}>
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico:</label>
                    <input
                      id="correo"
                      className="form-control"
                      placeholder="Ingrese su correo"
                      autoComplete="username"
                      type="text"
                      required
                      value={correo}
                      onChange={(evento) => setcorreo(evento.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Contraseña</label>

                    <input
                      id="contrasena"
                      className="form-control"
                      placeholder="Ingrese su contraseña"
                      autoComplete="current-password"
                      type="password"
                      required
                      onChange={(evento) => setcontrasena(evento.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-100">
                    Iniciar sesión
                  </button>
                </form>

                {errorvalidacion && (
                  <div className="alert alert-danger mt-3">
                    {errorvalidacion}
                  </div>
                )}

                {sesion.error && (
                  <div className="alert alert-danger mt-3">{sesion.error}</div>
                )}

                {sesion.usuario && (
                  <div className="alert alert-success mt-3">
                    Credenciales aceptadas: {sesion.usuario.nombreCompleto}
                  </div>
                )}

                <p className="text-center text-secondary small mt-4 mb-0">
                  Sistema de gestion UISIL
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
