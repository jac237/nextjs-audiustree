// E.g. https://twitter.com/intent/tweet?url=&via=AudiusProject&text=&hashtags=moombahfy%2Caudius
import queryString from 'query-string';

export default function getTweetIntent(track) {
  const twitterUrl = 'https://twitter.com/intent/tweet?';
  const options = {
    text: `Check this out! 🔥 @AudiusProject 🎵: ${track.title}`,
    url: `https://audius.co/tracks/${track.id}`,
    via: 'moombahfy',
    hashtags: 'audius,moombahfy',
  };
  return `${twitterUrl}${queryString.stringify(options)}`;
}
