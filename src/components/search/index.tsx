import { createEffect, createSignal, For, Show, useContext } from "solid-js"
import { createServerAction$ } from "solid-start/server";
import { QueriesContext } from "~/context/queries";
import { TracklistContext } from "~/context/tracklist";
import { searchArtistServerAction } from "./server";

import style from "./style.module.css"



const Search = () => {
  const [search, setSearch] = createSignal({ value: "" })
  const [results, setResults] = createSignal<Spotify.ArtistObjectFull[] | null>(null)
  const { items, setItems } = useContext(TracklistContext)
  const { items: queries, setItems: setQueries } = useContext(QueriesContext)
  const [searchAction, { Form }] = createServerAction$(async (form: FormData, { request }) => {
    return await searchArtistServerAction(form)
  })

  const handleInput = (e: InputEvent & {
    target: HTMLInputElement
  }) => {
    setSearch({ value: e.target.value })
  }

  const handleSelect = async (artist_id: string) => {
    setQueries({ ids: [...queries.ids, artist_id] })
    const unique_ids = [...new Set([...queries.ids])]
    const request = await fetch(`/api/spotify/artist/recommended/${unique_ids.join(",")}`)
    const response = await request.json()
    console.log(response)
  }

  createEffect(async () => {
    setResults(await searchAction.result?.json())
  })

  return (
    <>
      <section class={style.search}>
        <Form>
          <input onInput={handleInput} autocomplete="off" type="text" name="artist" value={search().value} placeholder="Enter artist name..." />
          <button type="submit" disabled={searchAction.pending}>{searchAction.pending ? "Searching" : "Search"}</button>
        </Form>
      </section>
      <Show when={results() !== null && search().value.length > 0}>
        <ul class={style.results}>
          <For each={results()}>
            {(result) => {
              if (!result.images[2]?.url) return <></>
              return <li onClick={() => handleSelect(result.id)}>
                {result.images[2].url && (
                  <img src={result.images[2]?.url} alt="" />
                )}
                <p>{result.name}</p>
              </li>
            }}
          </For>
        </ul>
      </Show>
    </>
  )

}

export default Search
