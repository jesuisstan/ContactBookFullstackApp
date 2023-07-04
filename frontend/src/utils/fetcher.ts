import axios from 'axios';

const baseUrl = 'http://localhost:9999';

export const getAllContacts = async () => {
  return axios.get(`${baseUrl}/getall`).then(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error('Error retrieving contacts:', error);
    }
    //.catch(error => {
    //  console.error('Error retrieving contacts:', error);
    //  throw error;
    //}
  );
};
