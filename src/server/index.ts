"use server";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
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

export async function getAllCasas(): Promise<Casa[]> {
  try {
    // Referencia a la colección "casas"
    const casasCollection = collection(firestore, "casas");

    // Obtiene todos los documentos de la colección "casas"
    const snapshot = await getDocs(casasCollection);

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
    // Referencia al documento de la casa con el ID especificado
    const casaDoc = doc(firestore, "casas", id);

    // Elimina el documento
    await deleteDoc(casaDoc);

    return `Casa con ID ${id} eliminada correctamente.`;
  } catch (error) {
    console.error("Error al eliminar la casa: ", error);
    throw new Error("No se pudo eliminar la casa");
  }
}

export async function updateCasa(id: string, updatedData: Partial<Casa>) {
  try {
    // Referencia al documento de la casa con el ID especificado
    const casaDoc = doc(firestore, "casas", id);

    // Actualiza los campos especificados en `updatedData`
    await updateDoc(casaDoc, updatedData);

    return `Casa con ID ${id} actualizada correctamente.`;
  } catch (error) {
    console.error("Error al actualizar la casa: ", error);
    throw new Error("No se pudo actualizar la casa");
  }
}
