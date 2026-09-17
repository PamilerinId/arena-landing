import { SearchBar } from "./SearchBar";

/**
 * The search pill. It sits between the hero and the board and is pulled up so
 * it straddles the seam: half over the film, half over the section below.
 */
export function SearchDock() {
  return (
    <div className="search-dock">
      <SearchBar />
    </div>
  );
}
