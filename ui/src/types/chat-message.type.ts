export interface ChatMessage {
  source: Source;
  text: string;
  content?: JSX.Element;
}

export type Source = "user" | "ai";
