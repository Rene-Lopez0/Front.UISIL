import { http } from "../../../Shared/http";

export interface Usuariosesion {
  idUsuario: number;
  correo: string | null;
  nombreCompleto: string | null;
}

interface RespuestaInicioSesion {
  ok: boolean;
  mensaje: string | null;
  valorRetorno: Usuariosesion | null;
}

export const AuthAPI = {
  async IniciarSesion(
    Correo: string,
    Contrasena: string,
  ): Promise<Usuariosesion> {
    const respuesta = await http.post<RespuestaInicioSesion>("/InicioSesion", {
      Correo,
      Contrasena,
    });

    const resultado = respuesta.data;

    if (!resultado || typeof resultado.ok !== "boolean") {
      throw new Error("La API devolvió una respuesta inesperada");
    }

    if (!resultado.ok) {
      throw new Error(
        resultado.mensaje || "El correo o la contraseña no son válidos",
      );
    }

    if (!resultado.valorRetorno) {
      throw new Error("La API no devilvió los datos del usuario");
    }

    return {
      idUsuario: resultado.valorRetorno.idUsuario,
      correo: resultado.valorRetorno.correo,
      nombreCompleto: resultado.valorRetorno.nombreCompleto,
    };
  },
};
