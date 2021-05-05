import getHost from '../../../lib/getHost';

export default async function handler(req, res) {
  const { handle } = req.query;

  const host = await getHost();
  const appName = process.env.APP_NAME;

  const url = `https://audius.co/${handle}`;
  const resolveUrl = `${host}/v1/resolve?url=${url}&app_name=${appName}`;

  console.log('/USER/:HANDLE', resolveUrl);

  const result = await fetch(resolveUrl);
  const user = await result.json();

  return res.json(user.data);
}
