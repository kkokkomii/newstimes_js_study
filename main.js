// 1. 버튼의 클릭 이벤트를 만들어줘야함
// 2. 버튼의 카테고리별 뉴스를 가져오기
// 3. 그 뉴스를 보여줘야함(render())
const menus = document.querySelectorAll(".menus button")
console.log(menus)
menus.forEach(element => element.addEventListener("click", (event)=>getnewsByCategory(event))) // 각각의 메뉴 element에 eventlistner를 더해줌

const api_Key= `c9f80cc1bb6145e595b972698153921b`
let PAGE_SIZE = 10;
let newsList = [];


const getLatesNews = async () =>{
  const url = new URL(`https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?country=us`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_Key}`);
  const response = await fetch(url)
  const data = await response.json()
  newsList = data.articles;
  render();
}

const getNewsKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  const url = new URL(`https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?country=us&q=${keyword}`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${api_Key}`);
  const response = await fetch(url)
  const data = await response.json()
  newsList = data.articles;
  render();

  console.log("keyword", newsList )
}

const getnewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log(`category+ ${category}`);
  const url = new URL(`https://study-website-be-bbb1539aa813.herokuapp.com/top-headlines?country=us&category=${category}`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${api_Key}`);
  const response = await fetch(url)
  const data = await response.json()
  newsList = data.articles;
  render();
}


const render=()=>{
  const newsHTML = newsList.map(item=>`<div class = "row news">
          <div class = "col-lg-4">
            <img
              class="news-ima-size"
              src=${item.urlToImage}
            />
          </div>
          <div class = "col-lg-8">
            <h2>${item.title}</h2>
            <p>
              ${item.description}
            </p>
            <div>${item.source.name} * ${item.publishedAt}</div>
          </div>
        </div>`)

  document.getElementById('newsboard').innerHTML = newsHTML.join(''); // news 사이에 존재하는 ','를 없애기 위해서 join()을 사용함
}
getLatesNews();
