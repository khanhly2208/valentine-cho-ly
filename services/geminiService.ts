
import { GoogleGenAI } from "@google/genai";

const FALLBACK_MESSAGE = `Gửi Ly yêu thương,\n\nNgày Valentine này anh chỉ muốn nói rằng em là điều tuyệt vời nhất đến với cuộc đời anh. Dù có chờ đợi bao lâu, anh vẫn sẽ luôn hướng về em. Chờ anh nhé, yêu em nhiều!\n\n(Trái tim anh đã nói thay cho AI ❤️)`;

export const generateLoveLetter = async (partnerName: string): Promise<string> => {
  try {
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    // Initialization must use a named parameter: new GoogleGenAI({ apiKey: process.env.API_KEY }).
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using ai.models.generateContent with the appropriate model for creative text generation.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Viết một lá thư chúc mừng ngày Valentine cực kỳ ngọt ngào cho người yêu tên là ${partnerName}. Chủ đề là sự chân thành và lời hẹn ước. Viết khoảng 80 từ, không dùng ký hiệu markdown như dấu sao.`,
    });

    // The .text property directly returns the generated string content.
    return response.text || FALLBACK_MESSAGE;
  } catch (err) {
    // Implementing robust error handling with a fallback message for a seamless experience.
    console.error("Gemini API Error:", err);
    return FALLBACK_MESSAGE;
  }
};
