import axios from 'axios'

export async function fetchStream(url) {
  const headers = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': url
  }

  console.log('00000000001:' + url);
  const response = await axios.get(url, { headers })
  return {
    status: response.status,
    contentType: response.headers['content-type'],
    length: response.headers['content-length'],
    ok: true
  }
}
