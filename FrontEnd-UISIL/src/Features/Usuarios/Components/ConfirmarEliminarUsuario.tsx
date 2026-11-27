import type { Usuario } from "../Services/UsuariosAPI";

interface ConfirmarEliminarUsuarioProps {
  usuario: Usuario;
  eliminando: boolean;
  error: string;
  confirmar: () => Promise<void>;
  cancelar: () => void;
}

export function ConfirmarEliminarUsuario({
  usuario,
  eliminando,
  error,
  confirmar,
  cancelar,
}: ConfirmarEliminarUsuarioProps) {
  const nombre = [usuario.nombre, usuario.apellido1, usuario.apellido2]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className="card border-danger rouded-4 mb-4"
      aria-busy={eliminando}
    >
      <div className="card-body p-4">
        <h2 id="titulo-eliminar" className="h5 mb-3">
          Eliminar usuario
        </h2>

        <span>
          ¿Desea eliminar a {nombre || "este usuario"} (ID: {usuario.idUsuario}
          )? Esta acción no se puede deshacer.
        </span>
        <div className="d-flex flex-wrap gap-2">
          <button
            className="btn btn-danger"
            type="button"
            disabled={eliminando}
            onClick={confirmar}
          >
            {eliminando ? "Eliminado" : "Confirmar eliminación"}
          </button>

          <button
            className="btn btn-outline-secudary"
            type="button"
            disabled={eliminando}
            onClick={cancelar}
          >
            Cancelar
          </button>
        </div>

        {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}
      </div>
    </section>
  );
}
