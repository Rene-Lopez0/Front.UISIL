import { useEffect, useState } from "react";
import axios from "axios";
import { UsuariosAPI } from "../Services/usuariosAPI";
import type { NuevoUsuario, Usuario } from "../Services/usuariosAPI";

function ObtenerMensaje(error: unknown, mensaje: string) {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "No se pudo contactar con el servidor";

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
  const [errorGuandando, setErrorGuardando] = useState("");

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarUsuarios() {
      try {
        const datos = await UsuariosAPI.Listar(controlador.signal);
        if (!controlador.signal.aborted) setUsuarios(datos);
      } catch (error) {
        if (!controlador.signal.aborted) {
          setErrorLista(
            ObtenerMensaje(error, "No se pudo consultar los usuarios"),
          );
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    void cargarUsuarios();

    return () => controlador.abort();
  }, [consulta]);

  function Recargar() {
    setCargando(true);
    setErrorLista("");
    setConsulta((numero) => numero + 1);
  }

  async function Crear(usuario: NuevoUsuario) {
    if (guardando) return false;

    setErrorGuardando("");
    setGuardando(true);

    try {
      await UsuariosAPI.Crear(usuario);
      Recargar();
      return true;
    } catch (error) {
      setErrorGuardando(ObtenerMensaje(error, "No se pudo crear el usuario"));
      return false;
    } finally {
      setGuardando(false);
    }
  }

  return {
    usuarios,
    cargando,
    errorLista,
    Recargar,
    guardando,
    errorGuandando,
    setErrorGuardando,
    Crear,
  };
}
