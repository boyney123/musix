import axios from "axios";
import { resolve } from "url";

const getSongs = async () => {
  return await axios({
    url: resolve(process.env.REACT_APP_SONGS_API, "songs?page=1&limit=100"),
    method: "GET",
    json: true
  });
};

export { getSongs };
