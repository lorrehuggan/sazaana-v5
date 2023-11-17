import { json } from "solid-start"
import { sortArtistsByQuery } from "~/utils"
import { internalSpotifyAccessToken, spotify_auth_url, spotify_url } from "~/utils/spotify"
import { z } from "zod";

export const searchArtistServerAction = async (form: FormData) => {
  const artist = form.get('artist') as string

  const searchSchema = z.string().min(1).max(50)

  try {
    searchSchema.parse(artist)
  } catch (e) {
    if (e instanceof z.ZodError) {
      return json({ error: e.errors.map(err => err.message) }, { status: 400 })
    }
  }

  const QUERY_URL = new URL(`${spotify_url}search?q=${artist.replace(' ', '+')}&type=artist&market=US`)

  try {

    const accessToken = await internalSpotifyAccessToken()

    const artistResponse = await fetch(QUERY_URL.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
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
