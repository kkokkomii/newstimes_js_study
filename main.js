// 1. 버튼의 클릭 이벤트를 만들어줘야함
// 2. 버튼의 카테고리별 뉴스를 가져오기
// 3. 그 뉴스를 보여줘야함(render())
const menus = document.querySelectorAll(".menus button")
const menus_side = document.querySelectorAll(".side-menu-list button")
menus.forEach(element => element.addEventListener("click", (event)=>getnewsByCategory(event))) // 각각의 메뉴 element에 eventlistner를 더해줌
menus_side.forEach(element => element.addEventListener("click", (event)=>getnewsByCategory(event))) // 각각의 메뉴 element에 eventlistner를 더해줌

const api_Key= `c9f80cc1bb6145e595b972698153921b`
let PAGE_SIZE = 10;
let newsList = [];


const getLatesNews = async () =>{
  const url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us`);
  // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${api_Key}`);
  const response = await fetch(url)
  const data = await response.json()
  newsList = data.articles;
  render();
}



//엔터키로 검색 키워드 입력
const keyword_enter = document.getElementById("search-input");
keyword_enter.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    getNewsKeyword();}
  })

let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`);

const getNews = async()=> {
  try{
    const response = await fetch(url)
    const data = await response.json()
    if(response.status === 200){
      newsList = data.articles;
      console.log(newsList)
      render();
    }else{
      throw new Error(data.message)
    }

  }catch(error){
    errorRender(error.massage)
  }

}

const getNewsKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  if(keyword.length===0 || keyword==="" || keyword === " "){
    alert("검색 키워드를 입력해주세요!"); 
    return;
  } // 검색 키워드를 입력하지 않으면 alert가 뜸
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&q=${keyword}`);
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${api_Key}`);
  await getNews();

  keyword_enter.value = ""; // 검색 키워드 엔터치고 나면 입력창 비워둠
}

const getnewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=us&category=${category}`);
  // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${api_Key}`);
  await getNews();

}

// const catchError = ()=> {
//   try{
//     newsList.map
//   }
// }
const render=()=>{
  // 만약 찾는 검색어가 없으면 검색결과가 없다는 이미지가 나옴
  if(newsList.length===0){
    const newsHTML = `<div>
      <img class = "noResult" src="https://www.turista.co.kr/images/user/nodata.png" />
    </div>`
    document.getElementById('newsboard').innerHTML = newsHTML;
    console.log("none")

  }else{
    const newsHTML = newsList.map(item=>`<div class = "row news">
            <div class = "col-lg-4">
              <img
                class="news-ima-size"
                src=${item.urlToImage} 
                onerror="this.src='https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo-available_87543-11093.jpg'"
              />
            </div>
            <div class = "col-lg-8">
              <h2 id = "title" onClick="location.href='${item.url}'">${item.title}</h2>
              <p id = "description" onClick="location.href='${item.url}'">
              ${item.description == null || item.description == "" ? "내용없음" : item.description.length > 200 ? item.description.substring(0, 200) + "..." : item.description}
              </p>
              <div>${item.source.name == null || item.source.name == "" ? "출처없음" : item.source.name}, ${moment(item.publishedAt).fromNow()}</div>
            </div>
          </div>`)
          document.getElementById('newsboard').innerHTML = newsHTML.join(''); // news 사이에 존재하는 ','를 없애기 위해서 join()을 사용함
        }

  //내용없음 표시 or 200장 이상일때 ... 으로 줄이는 부분은 조건부 연산자(물음표 연산자) 사용
// title, description 누르면 뉴스 링크로 이동함
  
}

const errorRender = (errorMassage)=> {
  const errorHTML =  `<div class="alert alert-danger" role="alert">  ${errorMassage} </div>`
  document.getElementById("news-borad").innerHTML = errorHTML;
}


const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};
getLatesNews();
