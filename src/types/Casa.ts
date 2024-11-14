import { CasaImg } from "./CasaImg";

export interface Casa {
  id: string;
  nombre?: string;
  precio?: number;
  terrenoTotal?: number;
  terrenoConstruccion?: number;
  recamaras?: number;
  banos?: number;
  estacionamientos?: number;
  antiguedad?: "nueva" | "usada";
  imagenes?: CasaImg[];
  descripcion?: string;
}
