
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Casting motion.div to any to bypass type compatibility issues in the environment
const MotionDiv = motion.div as any;

// Sử dụng import.meta.url để Vite xử lý và include ảnh vào build
const defaultPhotos = [
  new URL('../anh1.jpg', import.meta.url).href,
  new URL('../anh2.jpg', import.meta.url).href,
  new URL('../anh3.jpg', import.meta.url).href,
];

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>(defaultPhotos);

  const handleImageError = (index: number) => {
    // Nếu file local chưa có, hiện ảnh mẫu lãng mạn để web không bị trống
    const fallbacks = [
      "https://images.unsplash.com/photo-1518105579727-87565142a53d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529634806980-85c3dd403432?q=80&w=800&auto=format&fit=crop",
    ];
    const newPhotos = [...photos];
    newPhotos[index] = fallbacks[index % 3];
    setPhotos(newPhotos);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {photos.map((src, index) => (
        <MotionDiv
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative group overflow-hidden rounded-xl shadow-lg border-4 border-white transform rotate-2 hover:rotate-0 transition-all duration-300 bg-white"
        >
          <img
            src={src}
            alt="Memory"
            className="w-full h-80 object-cover"
            onError={() => handleImageError(index)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-love-600/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-white font-script text-2xl drop-shadow-md">Kỷ niệm {index + 1}</span>
          </div>
        </MotionDiv>
      ))}
    </div>
  );
};

export default PhotoGallery;
