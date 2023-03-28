import axios from 'axios';

const API_URL = process.env.REACT_APP_DOG_API_URL;
const API_KEY = process.env.REACT_APP_DOG_API_KEY;

const callAPI = async (url, params = null) => {
  const requestConfig = {
    baseURL: 'https://api.thedogapi.com/v1/',
    headers: {
      'x-api-key': 'live_gcBedApjEyKq1waeOOMIIoJL7kzCPqXjjP1T9iQq1FCzHJ4mUgdDBYtK6NPPesZo'
    },
    url
  };

  if (params) {
    requestConfig.params = params;
  }
  try {
    return await axios(requestConfig);
  } catch (err) {
    console.log('axios encountered an error', err);
  }
};

export const fetchBreeds = async (page, count = 10) => {
  const breeds = await callAPI('breeds', {
    limit: count,
    page,
  });

  return {
    breeds: breeds.data,
    totalBreeds: breeds.headers['pagination-count'],
  };
};

export const fetchPictures = async (breed = '', count = 20) => {
  if (!breed) {
    return [];
  }

  const pictures = await callAPI('images/search', {
    breed_id: breed,
    limit: count
  });

  return pictures.data;
};