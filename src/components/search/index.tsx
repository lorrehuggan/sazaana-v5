import clsx from "clsx"
import { createSignal, For, Show } from "solid-js"
import style from "./style.module.css"


const Search = () => {
  const [search, setSearch] = createSignal({ value: "" })
  const [fetchState, setFetchState] = createSignal<'loading' | 'idle' | 'error' | 'success'>('idle')
  const [results, setResults] = createSignal<Spotify.ArtistObjectFull[] | null>(null)

  const handleInput = (e: InputEvent & {
    target: HTMLInputElement
  }) => {
    setSearch({ value: e.target.value })
  }

  const handleSubmit = async () => {
    if (Search() === "") return
    setFetchState('loading')
    try {
      const res = await fetch(`/api/spotify/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ artist: search().value }),
      })
      const data = await res.json() as Spotify.ArtistObjectFull[]
      setResults(data)
      setFetchState('success')
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message)
        setFetchState('error')
      }
    }

  }

  return (
    <>
      <section class={style.search}>
        <input autocomplete="off" onInput={handleInput} type="text" name="search" placeholder="Enter artist name" />
        <button onClick={handleSubmit} disabled={fetchState() === "loading"}>{fetchState() === "loading" ? "finding" : "find"}</button>
      </section>
      <Show when={results() !== null}>
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
