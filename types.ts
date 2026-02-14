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
  // Đường dẫn đến file nhạc bạn để trong thư mục web
  url: "./nhac.mp3" 
};