import "./Iniciosesion.css";

export function InicioSesionPage() {
  return (
    <main className="min-vh-100 d-flex align-items-center bg-light py-4">
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

                <form action="">
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico:</label>
                    <input
                      id="correo"
                      className="form-control"
                      placeholder="Ingrese su correo"
                      autoComplete="username"
                      type="text"
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
                    />
                  </div>

                  <button type="button" className="btn btn-success w-100">
                    Iniciar sesión
                  </button>
                </form>

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
