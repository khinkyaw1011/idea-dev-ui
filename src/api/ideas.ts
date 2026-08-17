import API from "../lib/axios";
import type { Idea } from "../types";
export const fetchIdeas = async (): Promise<Idea[]> => {
  const res = await API.get('/ideas');
  return res.data;
};

export const fetchIdea = async (ideaId: string): Promise<Idea> => {
 const res = await API.get(`/ideas/${ideaId}`);
  return res.data;
}