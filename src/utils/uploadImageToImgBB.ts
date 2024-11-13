import { CasaImg } from "@/types/CasaImg";
import { v4 as uuidv4 } from "uuid";

export async function uploadImageToImgBB(file: File): Promise<CasaImg> {
  const apiKey = process.env.NEXT_PUBLIC_IMG_BB_KEY;
  const formData = new FormData();
  formData.append("image", file);

  if (!apiKey) {
    throw new Error("API key is missing");
  }
  formData.append("key", apiKey);

  try {
    const response = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir la imagen a ImgBB");
    }

    const data = await response.json();
    const img = data.data.url;
    const id = uuidv4(); // Genera un ID aleatorio usando uuid

    return { img, id };
  } catch (error) {
    console.error("Error en la carga de imagen:", error);
    throw error;
  }
}

// export const uploadImageToImgBB = async (file: File): Promise<CasaImg> => {
//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     const response = await fetch(
//       `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_KEY}`,
//       {
//         method: "POST",
//         body: formData,
//       }
//     );
//     const data = await response.json();
//     if (data.success) {
//       return data.data.url;
//     } else {
//       throw new Error("Error al subir la imagen a ImgBB");
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
