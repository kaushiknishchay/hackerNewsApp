/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Observable, take } from 'rxjs';

const defaultConfig = () => ({
  baseURL: 'https://hacker-news.firebaseio.com/v0',
});

// https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
const baseUrl = 'https://hacker-news.firebaseio.com/v0';

const fetchTopStories = () => axios.get('/topstories.json', defaultConfig());

const fetchNewStories = () => axios.get('/newstories.json', defaultConfig());

const fetchBestStories = () => axios.get('/beststories.json', defaultConfig());

const fetchItemInfo = id => axios.get(`/item/${id}.json`, defaultConfig());

export default {
  fetchTopStories: Observable.fromPromise(fetchTopStories())
    .map(res => res.data)
    .delay(1000),
  fetchTopStories$: Observable.ajax(`${baseUrl}/topstories.json`)
    .map(res => res.response)
    .delay(1000),
  fetchNewStories$: Observable.ajax(`${baseUrl}/newstories.json`)
    .map(res => res.response)
    .delay(1000),
  fetchNewStories: Observable.fromPromise(fetchNewStories())
    .map(res => res.data)
    .delay(1000),
  fetchBestStories$: Observable.fromPromise(fetchNewStories())
    .map(res => res.data)
    .delay(1000),
  fetchStoryInfo$: id => Observable
    .ajax(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
    // .delay(1000)
    .map(e => e.response).take(1),
  fetchItemInfo: id => fetchItemInfo(id),

};
