export interface Source {
  url: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
}

export interface Conversation {
  id: string;
  title: string | null;
  slug: string;
}

export interface ConversationDetail {
  id: string;
  title: string;
  messages: Message[];
}

export interface AskResponse {
  answer: string;
  sources: Source[];
  conversationId: string;
}

export interface FollowUpResponse {
  answer: string;
  sources: Source[];
}

export interface AskRequest {
  query: string;
}

export interface FollowUpRequest {
  conversationId: string;
  query: string;
}
