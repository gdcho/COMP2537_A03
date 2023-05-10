import axios from "axios";

export default async function fetchTotalCount() {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
  return response.data.count;
}
