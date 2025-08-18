import { useState } from "react";

export default function useGallery(initialGallery = []) {

  const [gallery, setGallery] = useState(initialGallery);

  const addImage = () => {    
    const newId = gallery.length > 0 ? Math.max(...gallery.map((s) => s.id)) + 1 : 1;    
    setGallery([
      ...gallery,
      {
        id: newId,
        url: "/",
      },
    ]);
  };

  const removeImage = (id) => {
    setGallery(gallery.filter((s) => s.id !== id));
  };

  const handleGalleryChange = (id, fieldName, value) => {
    setGallery(
      gallery.map((image) =>
        image.id === id ? { ...image, [fieldName]: value } : image
      )
    );
  };

  return {
    gallery,
    setGallery,
    addImage,
    removeImage,
    handleGalleryChange,
  };
}