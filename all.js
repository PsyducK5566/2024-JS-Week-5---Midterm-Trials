/******origin data start******/
let data = [
    {
      id: 0,
      name: "肥宅心碎賞櫻3日",
      imgUrl:
        "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      area: "高雄",
      description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      group: 87,
      price: 1400,
      rate: 10
    },
    {
      id: 1,
      name: "貓空纜車雙程票",
      imgUrl:
        "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      area: "台北",
      description:
        "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      group: 99,
      price: 240,
      rate: 2
    },
    {
      id: 2,
      name: "台中谷關溫泉會1日",
      imgUrl:
        "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      area: "台中",
      description:
        "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      group: 20,
      price: 1765,
      rate: 7
    }
  ];
/******origin data end******/

/*
地區用 change 監聽
上方新增的地區跟下方篩選的地區都寫死選項（依照目前提供的 JSON data area 欄位）
地區的篩選下拉需要加上『全部地區』option
不需要有「清除資料」的按鈕
預設資料為 3 筆（內容需依照目前提供的 JSON data）
篩選後會顯示『搜尋資料為 ? 筆』
描述欄位使用 textarea
星級區間是 1-10 分
金額、組數、星級的 type 為 Number
*/

/*
1.讀取資料：data 陣列中包含 3 筆資料，每筆資料都有 id、name、imgUrl、area、description、group、price 和 rate 等屬性。
2.生成 HTML：使用 forEach 遍歷 data，為每筆資料生成對應的 HTML 結構，並將其累加到 text 變數中。
3.渲染到頁面：將生成的 HTML 字串插入到 .ticketCard-area 容器中，顯示在頁面上。

綁定表單的 submit 事件，當使用者點擊「新增套票」按鈕時觸發。
使用 trim() 去除多餘的空格，並檢查是否有未填寫的欄位。
使用 isNaN() 確保數字欄位（如金額、組數、星級）輸入正確。
將新套票資料以物件形式加入 data 陣列。
呼叫 renderCards(data) 重新渲染票券列表。
使用 form.reset() 清空表單內容。
*/
/*
2024/12/15 FEEDBACK:
切換到「全部地區」選項時，建議顯示所有套票內容

測試步驟：
載入頁面，應該預設顯示所有票券。
從下拉選單中選擇「台北」、「台中」或「高雄」，應該只顯示對應地區的票券。
再次選擇「全部地區」，應該顯示所有票券。


目前點擊新增套票按鈕時，不會執行 addTicket 函式，建議對元素註冊 click 事件來觸發此函式


*/



// 選取 DOM 元素
const ticketCardArea = document.querySelector(".ticketCard-area");
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");
const addTicketForm = document.querySelector(".addTicket-form");
const cantFindArea = document.querySelector(".cantFind-area");

// 初始化頁面
function init() {
  renderCards(data); // 預設渲染所有資料
  regionSearch.addEventListener("change", filterData); // 綁定篩選事件
  addTicketForm.addEventListener("submit", addTicket); // 綁定新增套票事件
}

// 渲染票券卡片
function renderCards(dataArray) {
  let text = "";
  dataArray.forEach((item) => {
    text += `<li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img src="${item.imgUrl}" alt="${item.name}">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span>${item.group}</span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span>${item.price}</span>
              </p>
            </div>
          </div>
        </li>`;
  });

  // 更新卡片區域
  ticketCardArea.innerHTML = text;

  // 更新搜尋結果筆數
  searchResultText.textContent = `本次搜尋共 ${dataArray.length} 筆資料`;

  // 顯示/隱藏「查無資料」區域
  cantFindArea.style.display = dataArray.length === 0 ? "block" : "none";
}

// 篩選資料
function filterData() {
  const selectedRegion = regionSearch.value; // 取得使用者選擇的地區
  if (selectedRegion === "全部地區" || selectedRegion === "") {
    renderCards(data); // 顯示全部資料
  } else {
    const filteredData = data.filter((item) => item.area === selectedRegion); // 篩選符合條件的資料
    renderCards(filteredData); // 渲染篩選後的資料
  }
}

/*
綁定篩選事件 
*/
regionSearch.addEventListener("change", filterData); 

/*
選取新增套票按鈕
*/
const addTicketBtn = document.querySelector(".addTicket-btn");

/* 
註冊 click 事件
*/
addTicketBtn.addEventListener("click", addTicket);


// 新增套票
function addTicket(e) {
  e.preventDefault(); // 阻止表單預設行為（刷新頁面）

  // 取得表單中的輸入值
  const ticketName = document.querySelector("#ticketName").value.trim();
  const ticketImgUrl = document.querySelector("#ticketImgUrl").value.trim();
  const ticketRegion = document.querySelector("#ticketRegion").value;
  const ticketPrice = parseInt(document.querySelector("#ticketPrice").value, 10);
  const ticketNum = parseInt(document.querySelector("#ticketNum").value, 10);
  const ticketRate = parseInt(document.querySelector("#ticketRate").value, 10);
  const ticketDescription = document
    .querySelector("#ticketDescription")
    .value.trim();

  // 驗證輸入值是否有效
  if (
    !ticketName ||
    !ticketImgUrl ||
    !ticketRegion ||
    isNaN(ticketPrice) ||
    isNaN(ticketNum) ||
    isNaN(ticketRate) ||
    !ticketDescription
  ) {
    alert("請填寫所有欄位！");
    return;
  }

  // 新增資料到 data 陣列
  const newTicket = {
    id: data.length, // 使用陣列長度作為 ID
    name: ticketName,
    imgUrl: ticketImgUrl,
    area: ticketRegion,
    description: ticketDescription,
    group: ticketNum,
    price: ticketPrice,
    rate: ticketRate,
  };
  data.push(newTicket);

  // 更新畫面
  renderCards(data);

  // 清空表單
  addTicketForm.reset();
  alert("新增套票成功！");
}

// 初始化頁面
init();