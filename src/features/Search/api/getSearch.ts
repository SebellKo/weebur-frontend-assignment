export const getSearch = async (query: string, sort?: string) => {
  const queryString = sort
    ? `q=${query}&sortBy=${sort}&order=desc`
    : `q=${query}`;

  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?${queryString}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
