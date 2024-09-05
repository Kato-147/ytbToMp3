import axios from "axios";

const requestOptions = {
  method: "GET",
  url: "https://youtube-mp36.p.rapidapi.com/dl",
  params: {},
  headers: {
    "x-rapidapi-key": "dc85c55751msh6997146eaf78fcap1ad9d7jsn5a0722ff02d9",
    "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
  },
};

const fetch = async (id) => {
  requestOptions.params = { id };
  const respone = await axios.request(requestOptions);
  return respone;
};

export { fetch };
