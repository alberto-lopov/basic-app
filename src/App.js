import "./App.css";
import { nPokemonToFecth} from "./globalVar";
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
          <GridPokemon limit={nPokemonToFecth}/>
        </main>
      </div>
  );
}

export default App;
