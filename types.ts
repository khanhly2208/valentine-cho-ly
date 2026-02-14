export interface LetterState {
  isLoading: boolean;
  content: string;
  error: string | null;
}

export interface Song {
  title: string;
  artist: string;
  url: string;
}

export const VALENTINE_SONG: Song = {
  title: "Chờ Anh Nhé",
  artist: "Hoàng Dũng",
  // Sử dụng import.meta.url để Vite xử lý file nhạc
  url: new URL('./nhac.mp3', import.meta.url).href
};