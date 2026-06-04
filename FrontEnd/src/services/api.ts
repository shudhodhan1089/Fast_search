import axios, { type AxiosRequestConfig } from "axios";
import { BACKEND_URL } from "@/lib/config";
import type {
  AskRequest,
  AskResponse,
  Conversation,
  ConversationDetail,
  FollowUpRequest,
  FollowUpResponse,
} from "@/types/conversation";

function getAuthHeaders(token: string): AxiosRequestConfig {
  return {
    headers: {
      Authorization: token,
    },
  };
}

export async function getConversations(token: string): Promise<Conversation[]> {
  const response = await axios.get<Conversation[]>(
    `${BACKEND_URL}/Conversations`,
    getAuthHeaders(token)
  );
  return response.data;
}

export async function getConversation(
  id: string,
  token: string
): Promise<ConversationDetail> {
  const response = await axios.get<ConversationDetail>(
    `${BACKEND_URL}/Conversation/${id}`,
    getAuthHeaders(token)
  );
  return response.data;
}

export async function askQuestion(
  data: AskRequest,
  token: string
): Promise<AskResponse> {
  const response = await axios.post<AskResponse>(
    `${BACKEND_URL}/fast_search_ask`,
    data,
    getAuthHeaders(token)
  );
  return response.data;
}

export async function followUp(
  data: FollowUpRequest,
  token: string
): Promise<FollowUpResponse> {
  const response = await axios.post<FollowUpResponse>(
    `${BACKEND_URL}/Conversation/follow_up`,
    data,
    getAuthHeaders(token)
  );
  return response.data;
}
