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
  
    // 생성 코드 변수
    let hcode = `<ul class="trintro">`;
  
    sub1_data.clipData.forEach((v) => {
    hcode += `
    <h3>${v.title}</h3>
    <li class="trmovie">
    <iframe src="https://www.youtube.com/embed/${v.mvid01}" autoplay="트레일러" controls=""></iframe>  
    <iframe src="https://www.youtube.com/embed/${v.mvid02}" autoplay="트레일러" controls=""></iframe>  
    <h4>
    ${v.subintro}</h4>
    </h4>
    </li>
    `;
  }); ///////// forEach

  hcode += `</ul>`;

  // 화면 출력하기
  clipBox.innerHTML = hcode;

})(); /////////////// 인트로 파트 영역 끝

/// 디자인 파트
(() => {
  const deBox = mFn.qs(".design-box")
  let gcode = `<ul class="deintro">`;
  sub1_data.designData.forEach((v) => {
    gcode += `
    <h3>${v.title01}</h3>
    <li class="demovie">
    <iframe src="https://www.youtube.com/embed/${v.mvid01}" autoplay="트레일러" controls=""></iframe>  
    <iframe src="https://www.youtube.com/embed/${v.mvid02}" autoplay="트레일러" controls=""></iframe>  
    <h4>
    ${v.subintro}</h4>
    </h4>
    </li>
    `;
  });
  gcode += `</ul>`;
  deBox.innerHTML = gcode;
})(); /////////////// 디자인 파트 영역 끝


////// 캐릭터 이미지 박스
// 대상 .cha-box
const chgrid = mFn.qs(".cha-box");

// 이미지 넣기
for (let i = 1; i <= 8; i++) {
  chgrid.innerHTML += `
      <div>
        <img src="./IMG/img1/cha0${i}.jpg" alt="캐릭터">
        <h3>${sub1_data.chaData[i - 1].chaname}</h3>
        <p>${sub1_data.chaData[i - 1].chaintro}</p>
      </div>
      `;

} //////// for /////////
//////////////캐릭터 이미지 박스 코딩 끝


///////////////// 컨셉 영역 코딩 시작 //////////////////////////////////
const qs = (x) => document.querySelector(x);
const qsa = (x) => document.querySelectorAll(x);
const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);

// HTML태그 로딩후 loadFn함수 호출! ///
addEvt(window, "DOMContentLoaded", loadFn);

function loadFn() {
  // console.log("로딩완료!");
  // 이동 버튼 대상 : .abtn
  const abtn = qsa(".abtn");
  // 변경 대상 : #slide
  const slide = qs("#slide");
  //console.log(abtn,slide);

  // 블릿버튼 : .indic
  let indic = document.querySelector(".indic");
  //// 초기 셋팅하기
  for (let i = 0; i < 18; i++) {
    // 슬라이드 넣기
    slide.innerHTML += `
    <li data-seq="${i}">
      <img src="IMG/img1/ched${i+1}.jpg" alt="slide">
    </li>
    `;

    // 블릿 넣기
    indic.innerHTML += `
    <li ${i===0?'class="on"':''}>
    <img src="IMG/img1/dot1.png" alt="흰색">
    <img src="IMG/img1/dot2.png" alt="회색">
    </li>
    `;
  } ////////// for문 ///////

  // 블릿의 li까지 수집! indic 변수
  indic = document.querySelectorAll('.indic li');

  // 2. 버튼을 모두 이벤트 설정하기
  for (let x of abtn) {
    x.onclick = goSlide;
  } //////////////// for문

  // 광클 금지 변수
  let prot = false;
  /***************************************************************************************************************
                                          함수명 : goSlide
                                          기능 : 슬라이드 이동
  ***************************************************************************************************************/

  function goSlide(evt,sts=true){

    
    //console.log('전달변수:',evt,sts);
    
    // 만약 버튼 클릭일 경우 인터발 지우기 함수 호출
    if(sts){
      clearAuto();
    } //////// if ///////////

    if (prot) return;
    prot = true;
    setTimeout(() => {
      prot = false;
    }, 600);
    /////////////////////////////////////////////

    // 두번째 버튼인 .ab2인가?
    let isRbtn =
    sts?this.classList.contains("ab2"):true;

    // 함수 호출 확인
    console.log("나 슬라이드", this, isRbtn);


    ///// 2. 버튼별 분기하기 (나누기)
    // 오른쪽 버튼일 경우 //
    if (isRbtn) {
      // (1) 먼저 왼쪽으로 이동하기
      slide.style.left = "-100%";
      slide.style.transition = ".6s ease-in-out";

      // (2) 이동하는 시간 0.6초간 기다림
      setTimeout(() => {
        // 맨앞 li 맨뒤로 이동
        slide.appendChild(slide.querySelectorAll("li")[0]);
        // 슬라이드 left 값이 -100%이므로 left값을 0으로 변경
        slide.style.left = "0";
        // left 트랜지션 없애기
        slide.style.transition = "none";
      }, 600);

    } // if문 ///

    /// 왼쪽 버튼일 경우
    else {
      // 하위 li 수집하기
      let list = slide.querySelectorAll("li");

      // (1) 맨뒤 li 맨앞으로 이동하기
      slide.insertBefore(list[list.length - 1], list[0]);

      // (2) left 값을 -100%로 변경
      slide.style.left = "-100%";

      slide.style.transition = "none";

      setTimeout(() => {
        /// (3) left 값을 0으로 트랜지션하여 들어옴
        slide.style.left = "0";
        slide.style.transition = ".6s ease-in-out";
      }, 0);
    } ////// else문

    // 3. 블릿을 위해 읽어올 슬라이드 순번 구하기

    let seq = slide.querySelectorAll('li')[isRbtn?1:0].getAttribute('data-seq');

    // 4. 블릿 변경하기
    indic.forEach((ele,idx)=>{

      // ele - 각각의 li , idx - 각각의 순번
     if(idx==seq){
       ele.classList.add('on');
     } /// if ////
     else {
       ele.classList.remove('on');
     } //// else ////
   }); /// forEach ///
  } /////////////////// goSlide 함수

//////////////// 인터발용 변수 (지울목적)
let autoI;
// 타임아웃용 변수 (지울 목적)
let autoT;
// 자동넘김 호출함수 최초 호출하기
autoSlide();

//////////////// 자동 넘김 호출 함수 /////////////////////////////////
function autoSlide(){
  autoI = setInterval(() => {
  }, 3000);
} ///////// autoSlide 함수


//////////// 인터발 지우기 함수 /////////////////
function clearAuto(){

   //console.log('인터발 지워');

   clearInterval(autoI);

   clearTimeout(autoT);

   autoT = setTimeout(() => {
     autoSlide();
   }, 5000);
} ///////// clearAuto함수

} //////////////// loadFn 함수 ///////////////
////////////////////// 컨셉 영역 코딩 끝

////////////////////// 배경파트 코딩 시작 //////////////////////////////////
const grid = qs(".grid");

// 20개 이미지 넣기
for (let i = 1; i <= 19; i++) {
  grid.innerHTML += `
      <div ${
        i === 1 ? 'class="first beingTxt"' : i === 8 ? 'class="second beingTxt"' : 
        i === 15? 'class="third beingTxt"' : i === 18? 'class="fourth beingTxt"':""
      }>
          <img src="./IMG/img1/bged${i}.jpg" alt="bg">
      </div>
      `;
} //////// for /////////

const imgTxt = [
  "[Andy's House]<br>Andy’s room was a world of its own, home to most of Toy Story’s characters and a place that immediately conveyed comfort and safety. That sense of safety provided the conflict as the characters faced new anxieties like leaving the house and welcoming a new toy.",
  "[Sid's House]<br>Movie villains are often more fun than the straight guy, and many on the Pixar team found they related to the mutant impulses of Sid, the bad boy next door. “I think Sid is normal,” says Andrew Stanton. “I think Andy is the weird one, this boy who takes care of his toys.” Coming up with disturbing new creations to populate Sid’s room became one of the most popular tasks in Toy Story.",
  "Dinoco Station",
  "Pizza Planet",
];

mFn.qsaEl(grid,".beingTxt").forEach((ele,idx)=>{
  ele.innerHTML += `<span>${imgTxt[idx]}</span>`;
})



