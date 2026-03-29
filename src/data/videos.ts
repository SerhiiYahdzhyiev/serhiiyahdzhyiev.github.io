export interface Video {
  title: string;
  description?: string;
  youtubeId: string;
  year: number;
}

export const videos: Video[] = [
  {
    youtubeId: "58L9Klsqw7M",
    title: "[SY] - Glass",
    year: 2020,
  },
  {
    youtubeId: "e4gSFQYaAyM",
    title: "[SY] - F.T.B. (Original by Robert Glasper)",
    year: 2020,
  },
  {
    youtubeId: "aYulfw2vgYs",
    title: "The Cure - Lullaby (SY's Cover)",
    year: 2020,
  },
  {
    youtubeId: "zCdLzwSHTns",
    title: "[SY] - Todays Queen",
    year: 2020,
  }
];
