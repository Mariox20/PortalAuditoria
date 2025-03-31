export interface IUsuario {
  UsuarioID?: string;
  NombreUsuario: string;
  CorreoElectronico: string;
  idPerfil: number;
  descPerfil?: string | null;
}
