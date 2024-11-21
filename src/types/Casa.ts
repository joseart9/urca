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
  antiguedadTiempo?: number;
  imagenes?: CasaImg[];
  descripcion?: string;

  // Seccion nueva
  tipoPropiedad?: "casa" | "departamento" | "otros";
  tipoOperacion?: "venta" | "renta";
}
