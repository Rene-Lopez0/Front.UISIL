import { http } from "../../../Shared/http";

// Datos de cada persona que se muestran en la tabla.
export interface Usuario {
  idUsuario: number;
  nombre: string | null;
  apellido1: string | null;
  apellido2: string | null;
  correo: string | null;
  telefono: string | null;
  nombreRol: string | null;
}

// Datos que la API recibe al crear una persona.
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
  idRol: number;
}

interface RespuestaUsuarios {
  ok: boolean;
  mensaje: string | null;
  valorRetorno: Usuario[] | null;
}

export const UsuariosAPI = {
  // El GET usa la URL base configurada en el cliente HTTP compartido.
  async Listar(signal: AbortSignal): Promise<Usuario[]> {
    const respuesta = await http.get<RespuestaUsuarios>("/Usuarios", {
      signal,
    });
    const resultado = respuesta.data;

    // La API puede responder HTTP 200 y devolver ok: false.
    if (resultado?.ok !== true) {
      throw new Error(
        resultado?.mensaje || "No se pudo consultar los usuarios.",
      );
    }

    if (!Array.isArray(resultado.valorRetorno)) {
      throw new Error("La API no devolvió una lista de usuarios.");
    }

    return resultado.valorRetorno;
  },

  // Envía los datos al servidor y comprueba si el alta fue aceptada.
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
