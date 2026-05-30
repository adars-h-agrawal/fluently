import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

export async function getFriendRequests() {
  const response = await axiosInstance.get("/users/friend-requests");
  return response.data;
}

export async function acceptFriendRequest(requestId) {
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data;
}

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}

export async function runAiAction(action, text, targetLanguage) {
  const response = await axiosInstance.post("/ai/action", { action, text, targetLanguage });
  return response.data;
}

export async function aiCoachChat(messages) {
  const response = await axiosInstance.post("/ai/coach", { messages });
  return response.data;
}

export async function getPracticeContent() {
  const response = await axiosInstance.get("/ai/practice");
  return response.data;
}

export async function getVocabulary() {
  const response = await axiosInstance.get("/vocabulary");
  return response.data;
}

export async function saveVocabularyItem(data) {
  const response = await axiosInstance.post("/vocabulary", data);
  return response.data;
}

export async function deleteVocabularyItem(id) {
  const response = await axiosInstance.delete(`/vocabulary/${id}`);
  return response.data;
}

export async function reviewVocabularyItem(id, masteryLevel) {
  const response = await axiosInstance.post(`/vocabulary/${id}/review`, { masteryLevel });
  return response.data;
}

export async function getLearningStats() {
  const response = await axiosInstance.get("/users/learning-stats");
  return response.data;
}

export async function updateProfile(data) {
  const response = await axiosInstance.patch("/users/profile", data);
  return response.data;
}