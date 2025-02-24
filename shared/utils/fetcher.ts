export const fetcher = async (url: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET") => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MOVIE_DB_API_KEY}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error("fetcher", { error });
    throw error;
  }
};
