import axios from 'axios';
import { Entertainer } from '../types/Entertainer';

const API_BASE = 'http://localhost:5058/api/EntertainmentAgency';

export const addEntertainer = async (entertainer: Entertainer) => {
  const response = await axios.post(`${API_BASE}/AddEntertainer`, entertainer);
  return response.data;
};

export const updateEntertainer = async (
  id: number,
  entertainer: Entertainer
) => {
  const response = await axios.put(
    `${API_BASE}/UpdateEntertainer/${id}`,
    entertainer
  );
  return response.data;
};

export const deleteEntertainer = async (id: number) => {
  await axios.delete(`${API_BASE}/DeleteEntertainer/${id}`);
};

export const getEntertainer = async (id: number): Promise<Entertainer> => {
  const response = await axios.get(`${API_BASE}/EntertainerDetails/${id}`);
  return response.data;
};
