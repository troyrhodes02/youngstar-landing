import React from "react";
import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: string;
  fallbackSrc?: string;
  lowQualitySrc?: string;
  lazyLoad?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallbackSrc,
  lowQualitySrc,
  lazyLoad = true,
  alt,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(lowQualitySrc || src);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check if browser supports WebP
  const [supportsWebP, setSupportsWebP] = useState(false);

  useEffect(() => {
    // Check WebP support
    const checkWebPSupport = async () => {
      const webPSupported =
        document
          .createElement("canvas")
          .toDataURL("image/webp")
          .indexOf("data:image/webp") === 0;
      setSupportsWebP(webPSupported);
    };
    checkWebPSupport();

    // If low quality placeholder is provided, load the main image
    if (lowQualitySrc) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoaded(true);
      };
    }
  }, [lowQualitySrc, src]);

  // Get WebP version if supported
  const getOptimizedSrc = () => {
    if (!src) return fallbackSrc || "";

    // Use WebP if browser supports it
    if (supportsWebP) {
      // Check if we're using an optimized path or need to construct one
      if (src.startsWith("/optimized/")) {
        return src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      } else {
        const baseName = src.split(".")[0].replace(/^\//, "");
        return `/optimized/${baseName}.webp`;
      }
    }

    // Use optimized JPG version as fallback
    if (src.startsWith("/optimized/")) {
      return src;
    } else {
      const baseName = src.split("/").pop() || "";
      return `/optimized/${baseName}`;
    }
  };

  // Handle image load error
  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <Image
        src={supportsWebP && isLoaded ? getOptimizedSrc() : imgSrc}
        alt={alt || "Image"}
        onError={handleError}
        priority={!lazyLoad}
        loading={lazyLoad ? "lazy" : "eager"}
        {...props}
      />
    </div>
  );
};
