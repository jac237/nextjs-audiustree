// https://audiusproject.github.io/api-docs/#audius-api-docs

export default async function getHost() {
  console.log('\tAwaiting Audius Host...');
  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const host = await fetch('https://api.audius.co')
    .then((r) => r.json())
    .then((j) => j.data)
    .then((d) => sample(d));

  console.log('HOST:', host);
  if (!host) throw new Error('Unable to fetch Audius host...');

  return host;
}
