import getHost from '../../../lib/getHost';

export default async function handler(req, res) {
  const { id } = req.query;

  const host = await getHost();
  const appName = process.env.APP_NAME;

  const url = `${host}/v1/tracks/${id}?app_name=${appName}`;

  console.log('/TRACKS/:ID', url);

  const result = await fetch(url);
  const user = await result.json();

  return res.json(user.data);
}
