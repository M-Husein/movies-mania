// omdbapi.com max param page 1-100
export const TOTAL_PAGES = 100;

// omdbapi.com param type options :
export const TYPE_OPTIONS = ["movie", "series", "episode"];

// Parse year for omdbapi.com param y (Year of release)
export const yearOptions = () => {
  let now = new Date().getFullYear() + 5;
  return Array.from({ length: now - 1930 }).map((v, i) => now - (i + 1));
}

