import React from "react";
import Image from "next/image";

interface RecipeImageProps {
  src?: string,
  alt?: string
}

export default function RecipeImage({ src, alt="Image Placeholder" }: RecipeImageProps) {

  return (
    <div className="w-full md:mb-0 md:w-4/12 lg:w-3/12 bg-stone-300 max-h-[400px] min-h-[200px] md:min-h-full md:max-h-none md:h-screen fixed top-0">
      { src &&
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
        />
      }
    </div>
  );
}
