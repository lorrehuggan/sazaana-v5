import * as levenshtein from 'fast-levenshtein';

export const sortArtistsByQuery = (artists: Spotify.ArtistObjectFull[], query: string) => {
  return artists.sort((a, b) => {
    const distanceA = levenshtein.get(a.name.toLowerCase(), query.toLowerCase());
    const distanceB = levenshtein.get(b.name.toLowerCase(), query.toLowerCase());
    return distanceA - distanceB;
  });
}

export const debounce = (fn: Function, delay = 500) => {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
