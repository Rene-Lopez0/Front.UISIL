import { useState } from "react";
import axios from "axios";
import { AuthAPI } from "../services/AuthAPI";
import type { Usuariosesion } from "../services/AuthAPI";

export function useInicioSesion() {
  const [usuario, setusuario] = useState<Usuariosesion | null>(null);
  const [cargando, setcargando] = useState(false);
  const [error, seterror] = useState("");

  async function Iniciar(correo: string, contrasena: string) {
    seterror("");
    setusuario(null);
    setcargando(true);
    try {
      const datos = await AuthAPI.IniciarSesion(correo, contrasena);
      setusuario(datos);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          seterror("No se pudo contactar con el servidor");
        } else if (error.response.status === 401) {
          seterror("El correo o la contraseña no son correctos");
        } else {
          seterror(
            "No se pudo completar la solicitaud, intenténtelo nuevamente",
          );
        }
      } else if (error instanceof Error) {
        seterror(error.message);
      } else {
        seterror("Ocurrió un error inesperado.");
      }
    } finally {
      //Colocar pantalla de carga
      setcargando(false);
    }
  }

  function CerrarSesion() {
    setusuario(null);
    seterror("");
  }

  return { usuario, error, Iniciar, CerrarSesion, cargando };
}
