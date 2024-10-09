import axios from "axios";

const fetchPosts = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!apiUrl) {
    console.error("API URL is not defined");
    return [];
  }

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export { fetchPosts };
