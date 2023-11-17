import clsx from "clsx"
import { createEffect, createSignal, For, Show } from "solid-js"
import style from "./style.module.css"
import { createServerAction$, json } from "solid-start/server";
import { searchArtistServerAction } from "./server";

const Search = () => {
  const [search, setSearch] = createSignal({ value: "" })
  const [results, setResults] = createSignal<Spotify.ArtistObjectFull[] | null>(null)
  const [searchResult, { Form }] = createServerAction$(async (form: FormData, { request }) => {
    const artist = form.get('artist') as string
    if (!artist) return
    const serverActionResult = await searchArtistServerAction(artist)
    return serverActionResult
  })

  const handleInput = (e: InputEvent & {
    target: HTMLInputElement
  }) => {
    setSearch({ value: e.target.value })
  }

  createEffect(async () => {
    setResults(await searchResult.result?.json())
  })

  return (
    <>
      <section class={style.search}>
        <Form>
          <input onInput={handleInput} autocomplete="off" type="text" name="artist" value={search().value} placeholder="Enter artist name..." />
          <button type="submit" disabled={searchResult.pending}>{searchResult.pending ? "Searching" : "Search"}</button>
        </Form>
      </section>
      <Show when={results() !== null && search().value.length > 0}>
        <ul class={style.results}>
          <For each={results()}>
            {(result, i) => {
              if (!result.images[2]?.url) return <></>
              return <li class={clsx("", {
                [style.first]: i() % 2 === 0
              })}>
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
