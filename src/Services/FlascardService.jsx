import { API, API_Auth, API_FormFile } from '../component/callApi';

export const GetFlashcardByAccountId = async (accountId) => {
  const res = await API.get(`/FlashCard/GetFlashcardByAccountId?id=${accountId}`);
  return res;
}

export const CreateFlascard = async (data) => {
  const res = await API.post('/FlashCard/CreateFlashCard', data);
  return res;
}

export const CreateFlashCardItem = async (data) => {
  const res = await API_FormFile.post('/FlashCard/CreateFlashCardItem', data);
  return res;
}

export const UpdateFlashcard = async (id, data) => {
  const res = await API.put(`/FlashCard/UpdateFlashCard?id=${id}`, data);
  return res;
}

export const DeleteFlashcard = async (id) => {
  const res = await API.delete(`/FlashCard/DeleteFlashCard?id=${id}`);
  return res;
}

export const GetFlashCardByFlashcardId = (flascardId, accountId) => {
  return API.get(`/FlashCard/GetFlashCardByFlashcardId?flashid=${flascardId}&accountid=${accountId}`);
}

export const CreateItemCard = async (data) => {
  const res = await API.post('/FlashCard/CreateItemCard', data);
  return res;
}