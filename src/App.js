import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import MovieSearch from "./component/movieSearch";

function App() {
  return (
    <Provider store={store}>
      <MovieSearch />
    </Provider>
  );
}

export default App;
