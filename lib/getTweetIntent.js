// E.g. https://twitter.com/intent/tweet?url=&via=AudiusProject&text=&hashtags=moombahfy%2Caudius
import queryString from 'query-string';

export default function getTweetIntent(trackId) {
  const twitterUrl = 'https://twitter.com/intent/tweet?';
  const options = {
    text: 'Whoah!! Check this out! 🔥 @AudiusProject',
    url: `https://audius.co/tracks/${trackId}`,
    via: 'moombahfy',
    hashtags: 'audius,audiustree,moombahfy',
  };
  return `${twitterUrl}${queryString.stringify(options)}`;
}
