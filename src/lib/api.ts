import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function test(token: string) {
  const response = await axios.get(`${API_BASE_URL}/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}