// dependencies
import { API_HOST } from 'cfg';

// eslint-disable-next-line
export async function fetchApi(endpoint, init = {}) {
  const result = await fetch(`${API_HOST}/${endpoint}`, init);
  const data = await result.json();

  const { statusCode } = data.meta;
  const { payload } = data;

  return {
    statusCode,
    payload,
  };
}
