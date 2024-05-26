import Time from "../time/Time";

export default interface Citas {
  ID: number;
  FECHA: Date;
  DESCRIPCION: string;
  SEDES_ID: number;
  TIPO: string;
  HORA: string | Time;
  CLIENTES_ID: number;
  ESTADO: number;
}
