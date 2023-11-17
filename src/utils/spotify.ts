import { json } from "solid-start"

export const spotify_url = 'https://api.spotify.com/v1/'
export const spotify_auth_url = 'https://accounts.spotify.com/api/token'

export const client_id = process.env.SPOTIFY_ID
export const client_secret = process.env.SPOTIFY_SECRET

export const internalSpotifyAccessToken = async () => {
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

    return requestAuth.access_token

  } catch (e) {
    if (e instanceof Error) {
      return json({
        error: e.message
      })
    }
  }
}
