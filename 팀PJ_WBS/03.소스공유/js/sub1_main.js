// 서브 1 메인 JS

// 나의 함수 불러오기
import mFn from "./my_function.js";

// 데이터 셋팅 불러오기
import * as sub1_data from "./sub1_data.js";

//////////////////////////////////// 데이터 코딩 구역 ////////////////////////////////////////

  // 인트로 파트 영역 시작 //
  // 데이터 : sub1_data.clipData
  (() => {
    // 변경 대상 : .trmovie-box
    const clipBox = mFn.qs(".trmovie-box");
  
    // 5-2. 생성 코드 변수
    let hcode = `<ul class="trintro">`;
  
    sub1_data.clipData.forEach((v) => {
    hcode += `
    <li class="trmovie">
    <h3>${v.title}</h3>
    <iframe src="https://www.youtube.com/embed/${v.mvid01}" autoplay="트레일러" controls=""></iframe>  
    <iframe src="https://www.youtube.com/embed/${v.mvid02}" autoplay="트레일러" controls=""></iframe>  
    <h4>
    ${v.subintro}</h4>
    </h4>
    </li>
    `;
  }); ///////// forEach

  hcode += `</ul>`;

  // 5-3. 화면 출력하기
  clipBox.innerHTML = hcode;
})(); /////////////// 인트로 파트 영역 끝





