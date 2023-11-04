import axios from 'axios';

const judgeAPI = axios.create({
	baseURL: process.env.JUDGE_BASE_URL,
});

export default judgeAPI;
