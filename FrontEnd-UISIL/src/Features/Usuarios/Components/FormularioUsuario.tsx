import { useState } from "react";
import type { FormEvent } from "react";
import type { NuevoUsuario } from "../Services/usuariosAPI";

interface FormularioUsuarioProps {
  guardando: boolean;
  error: string;
  guardar: (usuario: NuevoUsuario) => Promise<void>;
  cancelar: () => void;
}

export function FormularioUsuario({
  guardando,
  error,
  guardar,
  cancelar,
}: FormularioUsuarioProps) {
  const [errorValidacion, setErrorValidacion] = useState("");

  async function EnviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (guardando) return;

    const datos = new FormData(evento.currentTarget);

    const usuario = {
      nombre: String(datos.get("nombre")).trim(),
      apellido1: String(datos.get("apellido1")).trim(),
      apellido2: String(datos.get("apellido2")).trim(),
      correo: String(datos.get("correo")).trim(),
      contrasena: String(datos.get("contrasena")).trim(),
      fechaNac: String(datos.get("fechaNac")).trim(),
      genero: String(datos.get("genero")).trim(),
      telefono: String(datos.get("telefono")).trim(),
      direccion: String(datos.get("direccion")).trim(),
      idRol: String(datos.get("idRol")).trim(),
    };

    if (Object.values(usuario).some((valor) => String(valor).trim() === "")) {
      setErrorValidacion("Completa todos los campos del formulario");
      return;
    }

    setErrorValidacion("");
    await guardar(usuario);
  }

  return (
    <section className="card rounded-4 mb-4">
      <div className="card-body p-4">
        <h2 id="titulo-crear" className="h5 mb-3">
          Crear usuario
        </h2>

        <form onSubmit={EnviarFormulario}>
          <fieldset disabled={guardando}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="nombre" className="form-label">
                  Nombre:
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  className="form-control"
                  maxLength={50}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="apellido1" className="form-label">
                  Primer apellido
                </label>
                <input
                  id="apellido1"
                  name="apellido1"
                  className="form-control"
                  maxLength={50}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="apellido2" className="form-label">
                  Segundo apellido
                </label>
                <input
                  id="apellido2"
                  name="apellido2"
                  className="form-control"
                  maxLength={50}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="correo" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  className="form-control"
                  maxLength={50}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="contrasena" className="form-label">
                  Contraseña
                </label>
                <input
                  id="contrasena"
                  name="contrasena"
                  type="password"
                  className="form-control"
                  maxLength={50}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="fechaNac" className="form-label">
                  Fecha de nacimiento
                </label>
                <input
                  id="fechaNac"
                  name="fechaNac"
                  type="date"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="genero" className="form-label">
                  Género
                </label>
                <input
                  id="genero"
                  name="genero"
                  className="form-control"
                  maxLength={30}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="form-control"
                  maxLength={20}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="idRol" className="form-label">
                  Ingrese un idRol existente
                </label>
                <input
                  id="idRol"
                  type="number"
                  name="idRol"
                  className="form-control"
                  maxLength={30}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="direccion" className="form-label">
                  Dirección
                </label>
                <textarea
                  id="direccion"
                  name="direccion"
                  className="form-control"
                  rows={2}
                  maxLength={500}
                  required
                />
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <button className="btn btn-success" type="submit">
                {guardando ? "Guardando..." : "Guardar Usuario"}
              </button>

              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={cancelar}
              >
                Cancelar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
