const baseUrl = 'http://localhost:5000';

type dataCreate = {
  longUrl: string;
  expireAt?: number | null;
};

type dataGetStat = {
  shortUrl: string;
};

type goRedirect = {
  shortCode: string;
};

export const createShortLink = (data: dataCreate) => {
  return fetch(baseUrl + '/create', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getStat = (data: dataGetStat) => {
  return fetch(baseUrl + '/stat', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const getRedirect = (data: goRedirect) => {
  return fetch(baseUrl + `/${data.shortCode}`,{
    method: 'GET',
    credentials: 'include',
    redirect: 'follow'
  });
};
