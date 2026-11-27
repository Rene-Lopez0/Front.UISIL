import { useEffect, useState } from "react";
import axios from "axios";
import { UsuariosAPI } from "../Services/UsuariosAPI";
import type { NuevoUsuario, Usuario } from "../Services/UsuariosAPI";

// Usa el mensaje del servidor cuando está disponible.
function ObtenerMensaje(error: unknown, mensaje: string) {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "No se pudo contactar con el servidor.";
    return error.response.data?.mensaje || mensaje;
  }

  return error instanceof Error ? error.message : mensaje;
}

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorLista, setErrorLista] = useState("");
  const [consulta, setConsulta] = useState(0);
  const [guardando, setGuardando] = useState(false);
  const [errorGuardado, setErrorGuardado] = useState("");
  const [eliminado, setEliminado] = useState(false);
  const [errorEliminacion, setErrorEliminacion] = useState("");

  // Carga la lista al entrar y cada vez que cambia el número de consulta.
  useEffect(() => {
    const controlador = new AbortController();

    async function CargarUsuarios() {
      try {
        const datos = await UsuariosAPI.Listar(controlador.signal);
        if (!controlador.signal.aborted) setUsuarios(datos);
      } catch (error) {
        if (!controlador.signal.aborted) {
          setErrorLista(
            ObtenerMensaje(error, "No se pudo consultar los usuarios."),
          );
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    void CargarUsuarios();
    // Cancela la consulta anterior al recargar o salir de la pantalla.
    return () => controlador.abort();
  }, [consulta]);

  function Recargar() {
    setCargando(true);
    setErrorLista("");
    setConsulta((numero) => numero + 1);
  }

  async function Crear(usuario: NuevoUsuario) {
    if (guardando) return false;

    setErrorGuardado("");
    setGuardando(true);
    try {
      await UsuariosAPI.Crear(usuario);
      // Vuelve a pedir la lista para incluir el registro recién creado.
      Recargar();
      return true;
    } catch (error) {
      setErrorGuardado(ObtenerMensaje(error, "No se pudo crear el usuario."));
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function Eliminar(IdUsuario: number) {
    if (eliminado) return false;

    setErrorEliminacion("");
    setEliminado(true);

    try {
      await UsuariosAPI.Eliminar(IdUsuario);
      Recargar();
      return true;
    } catch (error) {
      setErrorEliminacion(
        ObtenerMensaje(error, "No se pudo eliminar el usuario"),
      );
      return false;
    } finally {
      setEliminado(false);
    }
  }

  return {
    usuarios,
    cargando,
    errorLista,
    Recargar,
    guardando,
    errorGuardado,
    setErrorGuardado,
    Crear,
    eliminado,
    errorEliminacion,
    setErrorEliminacion,
    Eliminar,
  };
}
