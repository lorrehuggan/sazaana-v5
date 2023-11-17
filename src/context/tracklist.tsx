import { createContext, JSX } from 'solid-js';
import { createStore } from 'solid-js/store';

interface TracklistProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface TracklistState {
  tracks: Spotify.TrackObjectFull[];
  loading: boolean;
  error: Error | null;
}

export const TracklistContext = createContext<{
  items: TracklistState;
  setItems: (value: TracklistState) => void;
}>(
  {
    items: {
      tracks: [],
      loading: false,
      error: null
    },
    setItems: () => { }
  }
);

const TracklistProvider = (props: TracklistProviderProps) => {

  const [items, setItems] = createStore<TracklistState>({
    tracks: [],
    loading: false,
    error: null
  });

  return (
    <TracklistContext.Provider
      value={{ items, setItems }}>
      {props.children}
    </TracklistContext.Provider>
  );
};

export default TracklistProvider;
