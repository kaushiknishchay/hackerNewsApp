import axios from 'axios';

const defaultConfig = () => ({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
});

// https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty


const fetchTopStories = () => axios.get('/topstories.json', defaultConfig());


export default {
  fetchTopStories,
};
