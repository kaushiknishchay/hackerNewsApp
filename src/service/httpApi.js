/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Observable, take } from 'rxjs';

const defaultConfig = () => ({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
});

// https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty


const fetchTopStories = () => axios.get('/topstories.json', defaultConfig());

const fetchStoryInfo = id => axios.get(`/item/${id}.json`, defaultConfig());

export default {
  fetchTopStories$: Observable.fromPromise(fetchTopStories())
    .map(res => res.data)
    .filter(res => res.slice(0, 10))
    .delay(1000),
  fetchStoryInfo$: id => Observable
    .ajax(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    .delay(1000)
    .map(e => e.response).take(1),
};
