import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, Loader, AlertCircle } from 'lucide-react';
import ReactPlayer from 'react-player';
import { VALENTINE_SONG } from '../types';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // State quản lý nguồn nhạc (mặc định là từ types.ts)
  const [audioUrl] = useState<string>(VALENTINE_SONG.url);
  const [songInfo] = useState({
    title: VALENTINE_SONG.title,
    artist: VALENTINE_SONG.artist
  });

  // Reset error state if song url changes
  useEffect(() => {
    setHasError(false);
    setIsReady(false);
  }, [audioUrl]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {/* Player chính */}
      <div className="glass-panel p-3 rounded-full flex items-center gap-3 shadow-lg transition-all hover:scale-105">
        <div className={`p-2 rounded-full ${isPlaying ? 'bg-love-500 animate-spin' : hasError ? 'bg-red-500' : 'bg-gray-300'}`}>
          {hasError ? <AlertCircle size={20} className="text-white" /> : <Music size={20} className="text-white" />}
        </div>
        
        <div className="hidden md:block pr-2 max-w-[150px]">
          <p className="text-xs font-bold text-gray-800 truncate">{songInfo.title}</p>
          <p className="text-[10px] text-gray-600 truncate">{hasError ? "Lỗi phát nhạc" : songInfo.artist}</p>
        </div>

        <button 
          onClick={onToggle}
          disabled={!isReady && !hasError}
          className={`text-white p-2 rounded-full transition-colors ${(!isReady && !hasError) ? 'bg-gray-400 cursor-not-allowed' : 'bg-love-500 hover:bg-love-600'}`}
        >
          {(!isReady && !hasError) ? (
            <Loader size={18} className="animate-spin" /> 
          ) : isPlaying ? (
            <Pause size={18} />
          ) : (
            <Play size={18} />
          )}
        </button>
        
        {/* Hidden Player */}
        <div className="absolute opacity-0 pointer-events-none w-[1px] h-[1px] overflow-hidden -z-10 bottom-0 right-0">
          <ReactPlayer
            url={audioUrl}
            playing={isPlaying}
            volume={1}
            loop={true}
            width="100%"
            height="100%"
            playsinline={true}
            onReady={() => setIsReady(true)}
            onBuffer={() => console.log('Buffering...')}
            onError={(e) => {
              console.error('Player Error:', e);
              setHasError(true);
              if (isPlaying) onToggle();
            }}
            config={{
              file: {
                forceAudio: true
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;