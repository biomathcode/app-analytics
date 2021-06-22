import axios from "axios";

const token = process.env.REACT_APP_API_TOKEN
// https://{{api-server}}/v2/analyze/standard/en/sentiment
axios.defaults.baseURL = "https://nlapi.expert.ai/v2/"
axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

export default axios;