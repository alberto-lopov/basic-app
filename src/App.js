import "./App.css";
import { GridPokemon } from './GridPokemon';
import { PageBar } from "./PageBar";
import { SearchBar } from "./SearchBar";

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <SearchBar />
          <PageBar />
        </header>
        <main className="App-main">
          <GridPokemon/>
        </main>
      </div>
  );
}

export default App;
