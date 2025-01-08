import React from "react";

interface RecipeImageProps {
  src?: string,
  alt?: string
}

export default function RecipeImage({ src, alt="Image Placeholder" }: RecipeImageProps) {

  return (
    <div className="w-full md:mb-0 md:w-4/12 lg:w-3/12 bg-stone-300 max-h-[200px] md:max-h-none md:h-screen sticky top-0 ">
      {src && <img src={src} alt={alt} className="object-cover w-full max-h-[200px] md:max-h-none md:h-full" />}
    </div>
  );
}
