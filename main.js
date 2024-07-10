const api_Key= `c9f80cc1bb6145e595b972698153921b`
let news = [];
const getLatesNews = async () =>{
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
  const response = await fetch(url)
  const data = await response.json()
  news = data.articles;
  console.log("ddd", news)
}
getLatesNews()
