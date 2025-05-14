export const getSearch = async (query: string) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
