import { useState } from "react";
import { FormularioUsuario } from "../Components/FormularioUsuario";
import { useUsuarios } from "../Hooks/useUsuarios";
import type { NuevoUsuario } from "../Services/UsuariosAPI";

export function UsuarioPage() {
  const mantenimiento = useUsuarios();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensaje, setMensaje] = useState("");

  function AbrirFormulario() {
    mantenimiento.setErrorGuardado("");
    setMensaje("");
    setMostrarFormulario(true);
  }

  async function GuardarUsuario(usuario: NuevoUsuario) {
    const creado = await mantenimiento.Crear(usuario);

    if (creado) {
      setMostrarFormulario(false);
      setMensaje("El usuario se creó correctamente.");
    }
  }

  return (
    <>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <h1 className="mb-0">Mantenimiento de usuarios</h1>

        {!mostrarFormulario && (
          <button
            className="btn btn-success"
            type="button"
            onClick={AbrirFormulario}
          >
            Crear usuario
          </button>
        )}
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      {mostrarFormulario && (
        <FormularioUsuario
          guardando={mantenimiento.guardando}
          error={mantenimiento.errorGuardado}
          guardar={GuardarUsuario}
          cancelar={() => setMostrarFormulario(false)}
        />
      )}

      <section className=" card rounded-4">
        <div className="card card-body p-4">
          <h2 id="titulo-lista" className="h5 mb-3">
            Usuarios registrados
          </h2>

          {mantenimiento.cargando && <span>Cargando usuarios...</span>}
          {mantenimiento.errorLista && (
            <div className="alert alert-danger mb-0">
              <span>{mantenimiento.errorLista}</span>

              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={mantenimiento.Recargar}
              >
                Reintentar
              </button>
            </div>
          )}

          {!mantenimiento.cargando &&
            !mantenimiento.errorLista &&
            (mantenimiento.usuarios.length === 0 ? (
              <span className="text-secondary mb-0">
                No hay usuarios registrados
              </span>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nombre Completo</th>
                      <th scope="col">Correo Electrónico</th>
                      <th scope="col">Teléfono</th>
                      <th scope="col">Rol</th>
                    </tr>
                  </thead>

                  <tbody>
                    {mantenimiento.usuarios.map((usuario) => (
                      <tr key={usuario.idUsuario}>
                        <td>{usuario.idUsuario}</td>

                        <td>
                          {[
                            usuario.nombre,
                            usuario.apellido1,
                            usuario.apellido2,
                          ]
                            .filter(Boolean)
                            .join(" ") || "-"}
                        </td>

                        <td>{usuario.correo}</td>
                        <td>{usuario.telefono}</td>
                        <td>{usuario.nombreRol}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
