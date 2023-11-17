import { json } from "solid-start"
import { sortArtistsByQuery } from "~/utils"
import { spotify_auth_url, spotify_url } from "~/utils/spotify"

export const searchArtistServerAction = async (artist: string) => {
  if (!artist) {
    return json({
      error: 'No artist provided'
    })
  }

  const client_id = process.env.SPOTIFY_ID
  const client_secret = process.env.SPOTIFY_SECRET

  const QUERY_URL = new URL(`${spotify_url}search?q=${artist.replace(' ', '+')}&type=artist&market=US`)

  try {
    const requestAuthResponse = await fetch(spotify_auth_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials',
    })

    const requestAuth = await requestAuthResponse.json()

    const artistResponse = await fetch(QUERY_URL.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${requestAuth.access_token}`
      }
    })

    const response = await artistResponse.json()

    let items = sortArtistsByQuery(response.artists.items, artist)

    return json(items)

  } catch (e) {
    console.log(e)
    return json({
      error: 'Something went wrong'
    })
  }

}
