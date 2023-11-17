import { createContext, JSX } from 'solid-js';
import { createStore } from 'solid-js/store';

interface QueriesProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface QueriesState {
  ids: string[];
}

export const QueriesContext = createContext<{
  items: QueriesState;
  setItems: (value: QueriesState) => void;
}>(
  {
    items: {
      ids: []
    },
    setItems: () => { }
  }
);

const QueriesProvider = (props: QueriesProviderProps) => {

  const [items, setItems] = createStore<QueriesState>({
    ids: []
  });

  return (
    <QueriesContext.Provider
      value={{ items, setItems }}>
      {props.children}
    </QueriesContext.Provider>
  );
};

export default QueriesProvider;
