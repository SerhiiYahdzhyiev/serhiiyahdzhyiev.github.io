import { useState, useRef, useEffect, useCallback } from "react";

interface Track {
  title: string;
  year: number;
  duration: string;
  filename: string;
  cover?: string;
  tags: string[];
}

interface AudioPlayerProps {
  tracks: Track[];
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ tracks }: AudioPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = currentIdx !== null ? tracks[currentIdx] : null;

  // Sync audio element when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIdx === null) return;
    audio.src = `/music/tracks/${tracks[currentIdx].filename}`;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [currentIdx, tracks]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  }, []);

  const handleEnded = useCallback(() => {
    if (currentIdx !== null && currentIdx < tracks.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentIdx, tracks.length]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isPlaying]);

  const selectTrack = useCallback(
    (idx: number) => {
      if (idx === currentIdx) {
        togglePlay();
      } else {
        setCurrentIdx(idx);
        setCurrentTime(0);
        setDuration(0);
      }
    },
    [currentIdx, togglePlay]
  );

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (audioRef.current) audioRef.current.currentTime = val;
  }, []);

  if (tracks.length === 0) {
    return (
      <div className="player-empty">
        <p>No tracks yet. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      {/* Now playing bar */}
      <div className="player-bar">
        <div className="player-bar__info">
          {currentTrack ? (
            <>
              <span className="player-bar__title">{currentTrack.title}</span>
              <span className="player-bar__year">{currentTrack.year}</span>
            </>
          ) : (
            <span className="player-bar__idle">Select a track to play</span>
          )}
        </div>

        <div className="player-bar__controls">
          <button
            className="player-btn player-btn--prev"
            onClick={() =>
              currentIdx !== null &&
              currentIdx > 0 &&
              setCurrentIdx(currentIdx - 1)
            }
            disabled={currentIdx === null || currentIdx === 0}
            aria-label="Previous track"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" x2="5" y1="19" y2="5" />
            </svg>
          </button>

          <button
            className="player-btn player-btn--play"
            onClick={currentTrack ? togglePlay : () => selectTrack(0)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <button
            className="player-btn player-btn--next"
            onClick={() =>
              currentIdx !== null &&
              currentIdx < tracks.length - 1 &&
              setCurrentIdx(currentIdx + 1)
            }
            disabled={currentIdx === null || currentIdx === tracks.length - 1}
            aria-label="Next track"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" x2="19" y1="5" y2="19" />
            </svg>
          </button>
        </div>

        <div className="player-bar__seek">
          <span className="player-bar__time">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="player-seek"
            min={0}
            max={duration || 0}
            value={currentTime}
            step={0.5}
            onChange={handleSeek}
            aria-label="Seek"
            disabled={!currentTrack}
          />
          <span className="player-bar__time">{formatTime(duration)}</span>
        </div>

        <div className="player-bar__volume">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
          <input
            type="range"
            className="player-volume"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volume"
          />
        </div>
      </div>

      {/* Track list */}
      <ul className="track-list">
        {tracks.map((track, idx) => (
          <li
            key={track.filename}
            className={`track-item${idx === currentIdx ? " track-item--active" : ""}`}
          >
            <button
              className="track-item__btn"
              onClick={() => selectTrack(idx)}
              aria-label={`Play ${track.title}`}
              aria-pressed={idx === currentIdx && isPlaying}
            >
              <span className="track-item__num">
                {idx === currentIdx && isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="none"
                    aria-hidden="true"
                  >
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <span>{(idx + 1).toString().padStart(2, "0")}</span>
                )}
              </span>
              <span className="track-item__title">{track.title}</span>
              {track.tags.length > 0 && (
                <span className="track-item__tags">
                  {track.tags.map((t) => (
                    <span key={t} className="track-item__tag">
                      {t}
                    </span>
                  ))}
                </span>
              )}
              <span className="track-item__year">{track.year}</span>
              <span className="track-item__duration">{track.duration}</span>
            </button>
          </li>
        ))}
      </ul>

      <style>{`
        .audio-player {
          max-width: 800px;
        }

        .player-empty {
          color: var(--clr-text-muted);
          font-style: italic;
          padding: var(--sp-6) 0;
        }

        /* Player bar */
        .player-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto;
          align-items: center;
          gap: var(--sp-4);
          padding: var(--sp-4) var(--sp-5);
          background: var(--clr-bg-surface);
          border: 1px solid var(--clr-border-subtle);
          border-radius: var(--rd-lg);
          margin-bottom: var(--sp-5);
          flex-wrap: wrap;
        }

        .player-bar__info {
          display: flex;
          flex-direction: column;
          gap: var(--sp-1);
          min-width: 0;
        }

        .player-bar__title {
          font-weight: var(--fw-medium);
          color: var(--clr-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .player-bar__year {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
        }

        .player-bar__idle {
          font-size: var(--fs-1);
          color: var(--clr-text-muted);
          font-style: italic;
        }

        .player-bar__controls {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
        }

        .player-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--clr-border-subtle);
          border-radius: var(--rd-md);
          color: var(--clr-text-muted);
          cursor: pointer;
          padding: var(--sp-2);
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }

        .player-btn:hover:not(:disabled) {
          color: var(--clr-accent);
          border-color: var(--clr-accent);
          background: var(--clr-surface-1);
        }

        .player-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }

        .player-btn--play {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border-color: var(--clr-border-strong);
          color: var(--clr-text-primary);
        }

        .player-bar__seek {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
          flex: 1;
        }

        .player-bar__time {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
          min-width: 3ch;
          text-align: center;
        }

        .player-seek,
        .player-volume {
          flex: 1;
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          background: var(--clr-border-strong);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .player-seek::-webkit-slider-thumb,
        .player-volume::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--clr-text-primary);
          cursor: pointer;
        }

        .player-seek:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .player-bar__volume {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
          color: var(--clr-text-muted);
          min-width: 100px;
        }

        .player-volume {
          width: 80px;
          flex: none;
        }

        /* Track list */
        .track-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--clr-border-subtle);
          border-radius: var(--rd-lg);
          overflow: hidden;
        }

        .track-item {
          border-bottom: 1px solid var(--clr-border-subtle);
        }

        .track-item:last-child {
          border-bottom: none;
        }

        .track-item--active {
          background: var(--clr-surface-1);
        }

        .track-item--active .track-item__title {
          color: var(--clr-text-primary);
          font-weight: var(--fw-medium);
        }

        .track-item__btn {
          width: 100%;
          display: grid;
          grid-template-columns: 2.5rem 1fr auto auto auto;
          align-items: center;
          gap: var(--sp-3);
          padding: var(--sp-4) var(--sp-5);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: inherit;
          transition: background 0.15s ease;
        }

        .track-item__btn:hover {
          background: var(--clr-surface-1);
        }

        .track-item--active .track-item__btn:hover {
          background: var(--clr-surface-2);
        }

        .track-item__num {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .track-item__title {
          font-size: var(--fs-1);
          color: var(--clr-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.15s ease;
        }

        .track-item__btn:hover .track-item__title {
          color: var(--clr-accent);
        }

        .track-item__tags {
          display: flex;
          gap: var(--sp-1);
        }

        .track-item__tag {
          font-family: var(--ff-mono);
          font-size: 0.7rem;
          padding: 0.1em 0.4em;
          border: 1px solid var(--clr-border-subtle);
          border-radius: 2px;
          color: var(--clr-text-muted);
        }

        .track-item__year {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
        }

        .track-item__duration {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
          min-width: 3.5ch;
          text-align: right;
        }

        @media (max-width: 600px) {
          .player-bar {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
          }

          .player-bar__seek {
            grid-column: 1 / -1;
          }

          .player-bar__volume {
            display: none;
          }

          .track-item__tags {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
