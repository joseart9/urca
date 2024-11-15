"use server";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import db from "@/db";
import { Casa } from "@/types/Casa";

const firestore = getFirestore(db);

export async function addCasa(casa: Casa) {
  try {
    // Referencia a la colección "casas"
    const casasCollection = collection(firestore, "casas");

    // Agrega el documento a Firestore
    const docRef = await addDoc(casasCollection, casa);

    return docRef.id; // Devuelve el ID del documento agregado si es necesario
  } catch (error) {
    console.error("Error al agregar la casa: ", error);
    throw new Error("No se pudo agregar la casa");
  }
}

export async function getAllCasas(filter?: {
  key: string;
  value: [number, number]; // Cambiamos a tipo array de números
}): Promise<Casa[]> {
  try {
    // Referencia a la colección "casas"
    const casasCollection = collection(firestore, "casas");

    let casasQuery;

    // Verifica si el filtro está definido y aplica el rango
    if (filter?.key && filter.value) {
      const [min, max] = filter.value; // Usamos el rango directamente
      casasQuery = query(
        casasCollection,
        where(filter.key, ">=", min),
        where(filter.key, "<=", max)
      );
    } else {
      // Si no hay filtro, obtiene todos los documentos
      casasQuery = casasCollection;
    }

    // Obtiene los documentos según la consulta (con o sin filtro)
    const snapshot = await getDocs(casasQuery);

    // Mapea los documentos a un array de objetos "Casa"
    const casas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Casa[];

    return casas;
  } catch (error) {
    console.error("Error al obtener las casas: ", error);
    throw new Error("No se pudo obtener la lista de casas");
  }
}

export async function deleteCasa(id: string) {
  try {
    // Referencia a la colección "casas"
    const casasCollection = collection(firestore, "casas");

    // Crea una consulta para buscar el documento con el campo `id` igual al valor proporcionado
    const q = query(casasCollection, where("id", "==", id));

    // Ejecuta la consulta
    const querySnapshot = await getDocs(q);

    // Verifica si algún documento coincide con la consulta
    if (!querySnapshot.empty) {
      // Itera sobre los documentos coincidentes y los elimina
      for (const docSnapshot of querySnapshot.docs) {
        await deleteDoc(docSnapshot.ref);
      }
      return `Casa con ID ${id} eliminada correctamente.`;
    } else {
      console.warn(`Casa con ID ${id} no encontrada.`);
      return `No se encontró una casa con el ID ${id}.`;
    }
  } catch (error) {
    console.error("Error al eliminar la casa: ", error);
    throw new Error("No se pudo eliminar la casa");
  }
}

export async function updateCasa(id: string, updatedData: Partial<Casa>) {
  try {
    // Referencia a la colección "casas"
    const casasCollection = collection(firestore, "casas");

    // Crea una consulta para buscar el documento donde el campo `id` coincide
    const q = query(casasCollection, where("id", "==", id));

    // Ejecuta la consulta
    const querySnapshot = await getDocs(q);

    // Verifica si algún documento coincide con la consulta
    if (!querySnapshot.empty) {
      // Extrae el primer documento coincidente
      const docSnapshot = querySnapshot.docs[0];
      const casaDoc = doc(firestore, "casas", docSnapshot.id);

      // Actualiza los campos especificados en `updatedData`
      await updateDoc(casaDoc, updatedData);

      return `Casa con ID ${id} actualizada correctamente.`;
    } else {
      console.warn(`Casa con ID ${id} no encontrada.`);
      return null; // Retorna null si no se encuentra un documento coincidente
    }
  } catch (error) {
    console.error("Error al actualizar la casa: ", error);
    throw new Error("No se pudo actualizar la casa");
  }
}

export async function getCasaById(id: string): Promise<Casa | null> {
  try {
    // Referencia a la colección "casas"
    const casasCollection = collection(firestore, "casas");

    // Crea una consulta para buscar el documento donde el campo `id` coincide
    const q = query(casasCollection, where("id", "==", id));

    // Ejecuta la consulta
    const querySnapshot = await getDocs(q);

    // Verifica si algún documento coincide con la consulta
    if (!querySnapshot.empty) {
      // Extrae el primer documento coincidente
      const docSnapshot = querySnapshot.docs[0];
      return {
        id: docSnapshot.id, // Usa el `docSnapshot.id` como el identificador único del documento
        ...docSnapshot.data(),
      } as Casa;
    } else {
      console.warn(`Casa con ID ${id} no encontrada.`);
      return null; // Retorna null si no se encuentra un documento coincidente
    }
  } catch (error) {
    console.error("Error al obtener la casa: ", error);
    throw new Error("No se pudo obtener la casa");
  }
}
