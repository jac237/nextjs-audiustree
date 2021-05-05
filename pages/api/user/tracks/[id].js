import getHost from '../../../../lib/getHost';

export default async function handler(req, res) {
  const { id } = req.query;

  const host = await getHost();
  const appName = process.env.APP_NAME;
  const url = `${host}/v1/users/${id}/tracks?&app_name=${appName}`;

  console.log('/USER/TRACKS/:ID', url);

  const result = await fetch(url);
  const tracks = await result.json();

  return res.json(tracks.data);
}
