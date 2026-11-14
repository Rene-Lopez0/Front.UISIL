import { http } from "../../../Shared/http";

export interface Usuario {
  idUsuario: number;
  nombre: string | null;
  apellido1: string | null;
  apellido2: string | null;
  correo: string | null;
  telefono: string | null;
  nombreRol: string | null;
}

export interface NuevoUsuario {
  nombre: string;
  apellido1: string;
  apellido2: string;
  correo: string;
  contrasena: string;
  fechaNac: string;
  genero: string;
  telefono: string;
  direccion: string;
  idRol: string;
}

interface RespuestaUsuarios {
  ok: boolean;
  mensaje: string | null;
  valorRetorno: Usuario[] | null;
}

export const UsuariosAPI = {
  async Listar(signal: AbortSignal): Promise<Usuario[]> {
    const respuesta = await http.get<RespuestaUsuarios>("/Usuarios", {
      signal,
    });

    const resultado = respuesta.data;

    if (resultado?.ok !== true) {
      throw new Error(
        resultado?.mensaje || "No se pudo consultar los usuarios",
      );
    }

    if (!Array.isArray(resultado.valorRetorno)) {
      throw new Error("El API no devolvió una lista de usuarios.");
    }

    return resultado.valorRetorno;
  },

  async Crear(usuario: NuevoUsuario): Promise<void> {
    const respuesta = await http.post<{ ok: boolean; mensaje: string | null }>(
      "/Usuarios",
      usuario,
    );

    if (respuesta.data?.ok !== true) {
      throw new Error(
        respuesta.data?.mensaje || "No se pudo crear el usuario.",
      );
    }
  },
};
