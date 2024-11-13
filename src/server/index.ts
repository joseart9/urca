"use server";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
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
