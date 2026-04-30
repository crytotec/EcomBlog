


async function unsplash() {
  const category = 'modern living room';

  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${category}&per_page=10&client_id=${import.meta.env.VITE_UNSPLASH_KEY}`
  );

  const result = await response.json();
  console.log(result.results);

  return result.results;
}

export default unsplash;
