const api_Key= `c9f80cc1bb6145e595b972698153921b`
let news = [];

let PAGE_SIZE = 10;
const getLatesNews = async () =>{
  const url = new URL(`https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`);
  const response = await fetch(url)
  const data = await response.json()
  news = data.articles;
  console.log("ddd", news)
}
getLatesNews()
