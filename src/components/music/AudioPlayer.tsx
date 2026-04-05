import { useState, useRef, useEffect, useCallback, useMemo } from "react";

interface Track {
  title: string;
  album?: string;
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

  // Sort tracks into album order: albums by year desc then name asc,
  // tracks within each album by leading track number in filename.
  const orderedTracks = useMemo(() => {
    const albumMap = new Map<string, Track[]>();
    tracks.forEach((track) => {
      const key = track.album ?? "—";
      if (!albumMap.has(key)) albumMap.set(key, []);
      albumMap.get(key)!.push(track);
    });

    albumMap.forEach((albumTracks) => {
      albumTracks.sort(
        (a, b) => (parseInt(a.filename) || 0) - (parseInt(b.filename) || 0)
      );
    });

    return Array.from(albumMap.entries())
      .sort(([aKey, aTracks], [bKey, bTracks]) => {
        const aYear = aTracks[0]?.year ?? 0;
        const bYear = bTracks[0]?.year ?? 0;
        return bYear - aYear || aKey.localeCompare(bKey);
      })
      .flatMap(([, albumTracks]) => albumTracks);
  }, [tracks]);

  // Build album sections for rendering, preserving flat indices for playback.
  const albumSections = useMemo(() => {
    const sections: Array<{
      name: string;
      cover?: string;
      year: number;
      tags: string[];
      entries: Array<{ track: Track; idx: number }>;
    }> = [];

    orderedTracks.forEach((track, idx) => {
      const albumName = track.album ?? "—";
      const last = sections[sections.length - 1];
      if (!last || last.name !== albumName) {
        sections.push({
          name: albumName,
          cover: track.cover,
          year: track.year,
          tags: track.tags,
          entries: [],
        });
      }
      sections[sections.length - 1].entries.push({ track, idx });
    });

    return sections;
  }, [orderedTracks]);

  const currentTrack = currentIdx !== null ? orderedTracks[currentIdx] : null;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || currentIdx === null) return;
    audio.src = `/music/tracks/${orderedTracks[currentIdx].filename}`;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [currentIdx, orderedTracks]);

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
    if (currentIdx !== null && currentIdx < orderedTracks.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentIdx, orderedTracks.length]);

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

  if (orderedTracks.length === 0) {
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
          <div className="player-bar__cover" aria-hidden="true">
            {currentTrack?.cover ? (
              <img
                src={`/music/covers/${currentTrack.cover}`}
                alt=""
                className="player-bar__cover-img"
              />
            ) : (
              <div className="player-bar__cover-placeholder" />
            )}
          </div>
          <div className="player-bar__info-text">
            {currentTrack ? (
              <>
                <span className="player-bar__title">{currentTrack.title}</span>
                <span className="player-bar__meta">
                  {currentTrack.album && (
                    <span className="player-bar__album">
                      {currentTrack.album}
                    </span>
                  )}
                  <span className="player-bar__year">{currentTrack.year}</span>
                </span>
              </>
            ) : (
              <span className="player-bar__idle">Select a track to play</span>
            )}
          </div>
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
                /* INFO: Fix play icon positioning a bit*/
                style={{
                  paddingLeft: !isPlaying ? '2px' : undefined
                }}
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          <button
            className="player-btn player-btn--next"
            onClick={() =>
              currentIdx !== null &&
              currentIdx < orderedTracks.length - 1 &&
              setCurrentIdx(currentIdx + 1)
            }
            disabled={
              currentIdx === null || currentIdx === orderedTracks.length - 1
            }
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

      {/* Album sections */}
      <div className="album-list">
        {albumSections.map((album) => (
          <div key={album.name} className="album-section">
            <div className="album-header">
              {album.cover && (
                <img
                  src={`/music/covers/${album.cover}`}
                  alt=""
                  className="album-header__cover"
                  aria-hidden="true"
                />
              )}
              <span className="album-header__name">{album.name}</span>
              <span className="album-header__year">{album.year}</span>
              <span className="album-header__tags">
                {album.tags.map((t) => (
                  <span key={t} className="album-header__tag">
                    {t}
                  </span>
                ))}
              </span>
            </div>

            <ul className="track-list">
              {album.entries.map(({ track, idx }, pos) => (
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
                        <span>{(pos + 1).toString().padStart(2, "0")}</span>
                      )}
                    </span>
                    <span className="track-item__title">{track.title}</span>
                    <span className="track-item__duration">
                      {track.duration}
                    </span>
                  </button>
                  <a
                    href={`/music/tracks/${track.filename}`}
                    download
                    className="track-item__download"
                    aria-label={`Download ${track.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" x2="12" y1="15" y2="3" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <style>{`
        .audio-player {
          width: 100%;
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
        }

        .player-bar__info {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: var(--sp-3);
          min-width: 0;
        }

        .player-bar__cover {
          flex-shrink: 0;
          width: 3rem;
          height: 3rem;
          border-radius: var(--rd-sm);
          overflow: hidden;
          border: 1px solid var(--clr-border-subtle);
          background: var(--clr-surface-1);
        }

        .player-bar__cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .player-bar__cover-placeholder {
          width: 100%;
          height: 100%;
          background: var(--clr-surface-2);
        }

        .player-bar__info-text {
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

        .player-bar__meta {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
        }

        .player-bar__album::after {
          content: "·";
          margin-left: var(--sp-2);
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

        /* Album list */
        .album-list {
          display: flex;
          flex-direction: column;
          gap: var(--sp-4);
        }

        .album-section {
          border: 1px solid var(--clr-border-subtle);
          border-radius: var(--rd-lg);
          overflow: hidden;
        }

        .album-header {
          display: flex;
          align-items: center;
          gap: var(--sp-3);
          padding: var(--sp-3) var(--sp-5);
          background: var(--clr-bg-surface);
          border-bottom: 1px solid var(--clr-border-subtle);
        }

        .album-header__cover {
          flex-shrink: 0;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: var(--rd-sm);
          object-fit: cover;
          border: 1px solid var(--clr-border-subtle);
        }

        .album-header__name {
          font-weight: var(--fw-medium);
          font-size: var(--fs-1);
          color: var(--clr-text-primary);
          flex: 1;
        }

        .album-header__year {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
        }

        .album-header__tags {
          display: flex;
          gap: var(--sp-1);
        }

        .album-header__tag {
          font-family: var(--ff-mono);
          font-size: 0.7rem;
          padding: 0.15em 0.5em;
          border: 1px solid var(--clr-border-subtle);
          border-radius: 2px;
          color: var(--clr-text-muted);
        }

        /* Track list */
        .track-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .track-item {
          display: flex;
          align-items: center;
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

        .track-item__download {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--sp-4) var(--sp-4) var(--sp-4) var(--sp-2);
          color: var(--clr-text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .track-item__download:hover {
          color: var(--clr-accent);
        }

        .track-item__btn {
          flex: 1;
          min-width: 0;
          display: grid;
          grid-template-columns: 2rem 1fr auto;
          align-items: center;
          gap: var(--sp-3);
          padding: var(--sp-3) var(--sp-5);
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

          .album-header__tags {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
