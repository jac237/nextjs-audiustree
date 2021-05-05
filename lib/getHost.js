// https://audiusproject.github.io/api-docs/#audius-api-docs

export default async function getHost() {
  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const host = await fetch('https://api.audius.co')
    .then((r) => r.json())
    .then((j) => j.data)
    .then((d) => sample(d));

  console.log('HOST:', host);

  return host;
}
