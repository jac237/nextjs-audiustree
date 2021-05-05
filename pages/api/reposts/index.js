import getHost from '../../../lib/getHost';

export default async function handler(req, res) {
  const host = await getHost();
  const id = process.env.AUDIUS_TREE_ID;
  const appName = process.env.APP_NAME;

  const repostTracksUrl = `${host}/v1/users/${id}/reposts?app_name=${appName}`;

  console.log('/REPOSTS/', repostTracksUrl);

  const result = await fetch(repostTracksUrl);
  const reposts = await result.json();

  if (!reposts.data) {
    console.log('REPOSTS:', reposts);
  }

  // filter tracks using the 'item_type' attribute
  const tracks = reposts.data
    .filter((track) => track.item_type === 'track')
    .map((track) => track.item);

  return res.json(tracks);
}
