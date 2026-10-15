import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [seconds, setSeconds] = useState(14);
  const totalSeconds = 84; // 1m 24s

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isOpen && isPlaying) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= totalSeconds) return 0;
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSecs = sec % 60;
    return `00:${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progressPercent = (seconds / totalSeconds) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12 animate-fadeIn"
      onClick={onClose}
    >
      {/* Top Bar with Close button */}
      <div
        className="w-full max-w-5xl flex items-center justify-between text-white/80 pb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-3 text-xs tracking-widest font-mono">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
          <span className="uppercase text-[#ffddb5]">OYINDAMOLA STUDIO · 4K MASTER PROJECTION</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close Showreel Modal"
          className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Video Container */}
      <div
        className="w-full max-w-5xl aspect-video bg-black relative border border-white/20 shadow-2xl overflow-hidden group"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNX2C6vCdHCTCBlO-olCutDQ1Ut4SYd0Ymw2vS3vjLkc5UxG6MoYh5Gr072r1S0CCQwzlqE1tme9AbJbHlT0mz9qCUY-vg6AMTbSP4kef0aukby76pF6unkIkDyCYuwrZxUTDqZ5rzFyBKa05YG-8xxV7-KmT-uzMyEZXf7yI0o66-SqwE6B1TJ_gTsQn4bk1mIVFsJkE0_7FjGiNA-9qjIHvVChCAEz-1EhOcOQofS4CAXOUkDWDeqw"
          alt="Studio Showreel Still"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isPlaying ? 'scale-105 filter brightness-100 contrast-105' : 'scale-100 filter brightness-75'
          }`}
        />

        {/* Film grain and letterbox bars */}
        <div className="absolute inset-0 bg-black/10 film-grain pointer-events-none"></div>

        {/* HUD Overlay Top */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center space-x-3 bg-black/70 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white text-[11px] font-mono tracking-widest">
          <span className="text-[#ffddb5]">CODEC: PRORES 4444 XQ</span>
          <span className="text-white/40">|</span>
          <span>DCI-P3 4K</span>
        </div>

        {/* Center Play/Pause Trigger if paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-[#745a36] hover:border-[#745a36] transition-all duration-300"
            >
              <Play className="w-8 h-8 ml-1 fill-white" />
            </button>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 md:p-6 text-white flex flex-col space-y-3">
          {/* Progress Timeline Scrubber */}
          <div
            className="w-full h-1.5 bg-white/20 hover:h-2 transition-all cursor-pointer rounded-full relative overflow-hidden"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              setSeconds(Math.floor(ratio * totalSeconds));
            }}
          >
            <div
              className="h-full bg-[#ffddb5] rounded-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:text-[#ffddb5] transition-colors p-1"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setSeconds(0)}
                className="hover:text-[#ffddb5] transition-colors p-1"
                title="Restart"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#ffddb5] transition-colors p-1"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-white/80">
                {formatTime(seconds)} / {formatTime(totalSeconds)}
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-4 text-white/60">
              <span>BITRATE: 68 MBPS</span>
              <span>·</span>
              <span>3840x2160</span>
              <span>·</span>
              <span className="text-[#ffddb5]">STEREO AI FOLEY</span>
            </div>

            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen?.();
                } else {
                  document.exitFullscreen?.();
                }
              }}
              className="hover:text-[#ffddb5] transition-colors p-1"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
