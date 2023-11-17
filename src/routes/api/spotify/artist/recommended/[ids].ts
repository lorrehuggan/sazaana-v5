import { APIEvent, json } from "solid-start";
import { z } from "zod";
import { internalSpotifyAccessToken } from "~/utils/spotify";

export const GET = async ({ params }: APIEvent) => {
  const { ids } = params

  const recommendedSchema = z.string().min(1).max(50)

  try {
    recommendedSchema.parse(ids)
  } catch (e) {
    if (e instanceof z.ZodError) {
      return json({ error: e.errors[0].message }, { status: 400 })
    } else {
      return json({ error: 'Something went wrong' }, { status: 500 })
    }
  }

  const GET_RECOMMENDED_TRACKS_URL =
    new URL(`https://api.spotify.com/v1/recommendations?limit=15&seed_artists=${ids}`)

  const GET_AUDIO_FEATURES_URL = (ids: string[]) =>
    new URL(`https://api.spotify.com/v1/audio-features?ids=${ids}`).toString()


  try {
    //recommended tracks
    const accessToken = await internalSpotifyAccessToken()
    const recommendedTracksRequest = await fetch(GET_RECOMMENDED_TRACKS_URL.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const recommendedTrackResponse = await recommendedTracksRequest.json()
    const { tracks } = recommendedTrackResponse as { tracks: Spotify.TrackObjectFull[] }

    const ids = tracks.map((track) => track.id)
    //audio features

    const audioFeaturesRequest = await fetch(GET_AUDIO_FEATURES_URL(ids), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const audioFeaturesResponse = await audioFeaturesRequest.json()
    const tracksWithAudioFeatures = tracks.map((track) => {
      const audioFeatures =
        audioFeaturesResponse.audio_features.find((audioFeature: Spotify.AudioFeaturesObject) =>
          audioFeature.id === track.id)
      return {
        track: { ...track },
        audioFeatures
      }
    })
    return json(tracksWithAudioFeatures)
  } catch (e) {
    if (e instanceof Error) {
      return json({ error: e.message }, { status: 500 })
    } else {
      return json({ error: 'Something went wrong' }, { status: 500 })
    }
  }

}
