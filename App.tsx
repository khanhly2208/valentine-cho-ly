
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Gift, RefreshCw } from 'lucide-react';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import PhotoGallery from './components/PhotoGallery';
import { generateLoveLetter } from './services/geminiService';

// Casting motion.div to any to bypass type compatibility issues for initial/animate/transition props
const MotionDiv = motion.div as any;

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [letter, setLetter] = useState<string>("");
  const [loadingLetter, setLoadingLetter] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setIsPlaying(true);
  };

  const handleGenerateLetter = async () => {
    setLoadingLetter(true);
    const text = await generateLoveLetter("Ly");
    setLetter(text);
    setLoadingLetter(false);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-love-50 via-pink-100 to-love-200 text-gray-800 font-sans relative overflow-x-hidden transition-colors duration-1000">
      {/* Background Hearts - Persistent */}
      <FloatingHearts />
      
      {/* Music Player - Always mounted but hidden/controlled */}
      {started && (
        <MusicPlayer isPlaying={isPlaying} onToggle={() => setIsPlaying(!isPlaying)} />
      )}

      {!started ? (
        <div className="h-screen flex flex-col items-center justify-center relative z-10">
          <MotionDiv
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="text-center p-8 glass-panel rounded-3xl shadow-2xl max-w-md mx-4"
          >
            <h1 className="font-script text-6xl text-love-600 mb-4">Hello Ly!</h1>
            <p className="text-gray-600 mb-8 font-sans text-lg">Anh có một món quà nhỏ dành cho em...</p>
            <button
              onClick={handleStart}
              className="bg-love-500 hover:bg-love-600 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Gift size={24} />
              Mở Quà Valentine
            </button>
          </MotionDiv>
        </div>
      ) : (
        <MotionDiv 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="pb-20 pt-12"
        >
          <main className="container mx-auto px-4 relative z-10 max-w-4xl">
            
            {/* Header Section */}
            <MotionDiv 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="font-script text-7xl md:text-8xl text-love-600 mb-4 drop-shadow-sm">
                Happy Valentine's
              </h1>
              <h2 className="font-script text-5xl md:text-6xl text-love-500">
                Dành tặng Ly ❤️
              </h2>
            </MotionDiv>

            {/* Photo Gallery */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-love-700 flex items-center justify-center gap-2">
                  <Stars className="text-yellow-400" /> Những Khoảnh Khắc <Stars className="text-yellow-400" />
                </h3>
              </div>
              <PhotoGallery />
            </div>

            {/* Gemini Love Letter Section */}
            <MotionDiv
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass-panel p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-love-300 via-love-500 to-love-300" />
              
              <div className="text-center mb-8">
                 <Heart className="w-16 h-16 text-love-500 mx-auto mb-4 animate-pulse-slow" fill="currentColor" />
                 <h3 className="text-3xl font-script text-gray-800">Lời nhắn từ trái tim</h3>
                 <p className="text-gray-500 text-sm mt-2">Được viết riêng cho em bởi AI (và tình yêu của anh)</p>
              </div>

              <div className="min-h-[200px] flex flex-col items-center justify-center">
                {letter ? (
                  <MotionDiv 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="prose prose-pink max-w-none text-center"
                  >
                    <p className="text-xl md:text-2xl font-script leading-relaxed text-gray-800 whitespace-pre-wrap">
                      "{letter}"
                    </p>
                    <div className="mt-8 flex justify-center">
                      <button 
                        onClick={handleGenerateLetter}
                        className="text-sm text-love-500 hover:text-love-700 flex items-center gap-1 underline"
                      >
                        <RefreshCw size={14} /> Viết lại lời khác
                      </button>
                    </div>
                  </MotionDiv>
                ) : (
                  <div className="text-center">
                     <p className="text-gray-500 mb-6 italic">Nhấn nút bên dưới để nhận lời chúc bí mật...</p>
                     <button
                      onClick={handleGenerateLetter}
                      disabled={loadingLetter}
                      className="bg-love-500 hover:bg-love-600 text-white py-3 px-6 rounded-full shadow-md transition-all flex items-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loadingLetter ? (
                        <>
                          <RefreshCw className="animate-spin" /> Đang viết...
                        </>
                      ) : (
                        <>
                          <Heart size={20} fill="white" /> Gửi lời yêu thương
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </MotionDiv>

            {/* Footer */}
            <footer className="text-center mt-20 text-love-800/60">
              <p className="font-script text-2xl">Mãi bên nhau, chờ anh nhé!</p>
              <p className="text-sm mt-2">Made with ❤️ for Ly</p>
            </footer>

          </main>
        </MotionDiv>
      )}
    </div>
  );
};

export default App;
