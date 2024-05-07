export default function charSlide(){
// DOM 함수 객체 //////////////

    // DOM 선택함수
    const qs = (x) => document.querySelector(x);
    const qsa = (x) => document.querySelectorAll(x);

    // addEvent 함수
    // ele - 요소, evt - 이벤트, fn - 함수
    const addEvt = (ele, evt, fn) => ele.addEventListener(evt, fn);

    // HTML태그 로딩후 loadFn함수 호출! ///
    addEvt(window, "DOMContentLoaded", loadFn);


function loadFn(){
    // console.log("로딩완료!");

    // 대상선정
    let slide = qs(".char-banner");
    console.log("대상:", slide);

    // 이동버튼
    const abtn = qsa(".abtn");

    // 블릿버튼
    let indic = qs(".indic");

    // 블릿, 슬라이드 개수
    const SLIDE_CNT = 5;
     // 슬라이드 트랜지션 시간 상수
     const SLIDE_TRANS_TIME = 600;

    // 광클금지변수
    let stop = false;

    // 슬라이드 순번 전역변수
    let snum = 0;

    // 데이터 할당
    // 캐릭터 이름
    const bulText =["Woody", "Buzz Lightyear","Lotso","Ken","Andy"]
    
    // 소개택스트
    const introText=[
        "Woody is a cowboy sheriff who proclaims his signature catchphrases from the 1950s TV show Woody’s Roundup every time his pull-string is pulled. He’s always been Andy’s favorite toy. Even though his owner is now grown, the loyal sheriff Woody maintains a steadfast belief that Andy still cares about his toys.",
        "Buzz Lightyear is a heroic space ranger action figure, complete with laser beam, karate-chop action, and pop-out wings. Buzz is a boy’s dream toy who becomes a quick favorite of young Andy and the closest of buddies with Woody. While Buzz’s sole mission used to be defeating the evil Emperor Zurg, what he now cares about most is keeping his toy family together. Buzz’s new mission is sidetracked along the way, however, when his journey brings out surprising aspects of his personality even he didn’t know existed.",
        "Lotso is a jumbo, extra-soft teddy bear with a pink and white plush body and a velvety purple nose. This lovable bear ranks fuzzy heads and shoulders above other teddy bears because he smells like sweet strawberries. With a smile that will light up your child’s face and a belly just asking to be hugged, Lotso Bear is sure to become a bedtime necessity. Stain resistant. Spot clean plush surface with a damp cloth.",
        "Grab your binoculars and join Ken on a safari! A swinging bachelor who's always on the lookout for fun, Ken sports the perfect outfit for his eco-adventure: light blue shorts and a leopard-print shirt with short sleeves sure to keep him cool in the hot sun. And after his exciting expedition, Ken will be ready to hit the dance floor in style. His accessories include a matching scarf, sensible loafers, and a fashion-forward gold belt. Dozens of additional Ken outfits sold separately.",
        "Andy—Buzz and Woody’s kind, imaginative young owner—is now nearly 18 years old and just days away from heading to college. His bedroom walls, once covered with Buzz Lightyear posters, are now plastered with images of sports cars, rock bands, and skateboarders. Although Andy no longer brings his old toys out from the chest for playtime, he hasn’t been able to bring himself to get rid of them. With his imminent departure looming, and his mom's prodding, the time has come for Andy to decide the fate of his favorite toys.",
    ];
    
    
        // html태그 변수
        let hcode = "";
        // 지연시간 계산을 위한 순번변수
        let seqNum = 0;
         // 초기 셋팅하기
        // 슬라이드 배너 표시
        // 블릿 영역 표시
        for(let i=0;i< SLIDE_CNT;i++){
            // 슬라이드 넣기
            slide.innerHTML +=`<li ${i === 0 ? 'class="on"' : ""}>
            <img 
            src="./IMG/img3/toystory3-${i + 1}.jpg"         
            alt="slide">
            <p><span>${bulText[i]}</span></br></br>${introText[i]}</p>
        </li>    `;

        // 블릿 넣기
        indic.innerHTML += `<li><span>${bulText[i]}</span>
        <img src="./IMG/img3/toystory3-${i + 1}.jpg" alt="charbtn"/>
        </li>`;
        }

        // li를 생성한 후 그 li다시 수집한다!
    // (1) 슬라이드의 li까지 수집! slide 변수
    slide = qsa(".char-banner li");
    // (2) 블릿의 li까지 수집! indic 변수
    indic = qsa(".indic li");

    // 1. 이벤트 연결 설정하기
    // 대상: .abtn
    // addEvt(대상,이벤트,함수)
    abtn.forEach((ele) => {
        addEvt(ele, "click", goSlide);
    });

    // 2. 이벤트 처리 함수 만들기
    // 처리순서
    // (1) 오른쪽버튼이면 전역슬라이드 변수 snum++
    // (2) 왼쪽버튼이면 전역슬라이드 변수 snum--
    // (3) 이때 한계값을 체크하여 순환되게 함
    // -> 끝번호 뒤는 첫번호, 첫번호 앞은 끝번호
    // (4) 해당순번의 슬라이드에 클래스 on 넣기
    // ->> 나머지 슬라이드는 on제거하기(외부함수구성)
    // (5) 블릿표시자도 슬라이드와 같은 순번에 클래스 on넣고 나머지는 빼준다(외부함수구성)
    // (6) 자동넘김 구성 호출하여 인터발호출작동
    // -> 버튼클릭시 인터발 지우기/ 일정시간뒤 인터발 작동
    function goSlide() {
        // 광클 금지 설정
        if (stop) return; // 막기!
        stop = true; // 잠금!
        setTimeout(() => {
            stop = false; // 해제!
        }, SLIDE_TRANS_TIME);
        /////////////////////////////

        // 0. 인터발 지우기 함수 호출
        clearAuto();

        // 1. 오른쪽버튼 여부
        let isRbtn = this.classList.contains("ab2");
        // 호출 확인
        // console.log('오른쪽버튼',isRbtn,this);

        // 2. 버튼에 따른 전역슬라이드 번호 증감하기
        // (1) 오른쪽버튼일 경우 증가
        // -> 한계설정: snum이 개수와 같으면 첫번호 0
        if (isRbtn) snum === SLIDE_CNT - 1 ? (snum = 0) : snum++;
        // (2) 왼쪽버튼일 경우 감소
        // -> 한계설정: snum이 0보다 작으면 마지막순번
        else snum === 0 ? (snum = SLIDE_CNT - 1) : snum--;

        console.log("snum:" + snum);

        // 3. 슬라이드 순번 클래스 제어함수 호출하기
        setClass(slide, "on", snum);
        // 4. 블릿 순번 클래스 제어함수 호출하기
        setClass(indic, "on", snum);
    } /////goSlide 함수 //////////

    // 3. 클래스 제어 함수 만들기
    function setClass(target, className, seq) {
        // target - 변경할 요소대상
        // className - 변경할 클래스명
        // seq - 클래스가 들어갈 순번
       // console.log("대상:", target, "/클래스명:", className, "/순번:", seq);

        // 1. 타겟은 HTML 컬렉션이므로 forEach메서드로 순회함
        target.forEach((ele, idx) => {
            // 1-1. seq와 idx가 일치할 경우 클래스 넣기
            if (seq === idx) ele.classList.add(className);
            // 1-2. 기타의 경우 클래스 제거하기
            else ele.classList.remove(className);
        }); // forEach
    } ////// setClass 함수 ////////


    /// [ 블릿 클릭 이벤트 셋팅 구역 ] /////////
    // 대상: .indic li -> indic 변수
    // 1. 이벤트 설정하기: forEach메서드 사용

    indic.forEach((ele,idx)=>{// ele - 요소 / idx - 순번
      addEvt(ele,'click',()=>indicSlide(idx));
    }); //// forEach ///////


    // 2. 이벤트 처리함수 만들기
    function indicSlide(seq){ ///seq - 변경할 순번
      console.log('블릿클릭!',seq);

      // 0. 인터발 지우기 함수 호출
      clearAuto();

      // 1. 현재 슬라이드 순번 블릿 순번으로 업데이트
      snum =seq;
      // 2. 슬라이드 순번 클래스 제어함수 호출
      setClass(slide, "on", snum);
      // 3. 블릿 순번 클래스 제어함수 호출
      setClass(indic, "on", snum);
    } ///// indicSlide함수 ///////

    // [ 자동넘김 셋팅 구역 ] /////////////////
    // 인터발용 변수(지울목적)
    let autoI;
    // 타임아웃용 변수(지울목적)
    let autoT;
    // 자동넘김호출함수 최초호출하기
    // autoSlide();

    // [ 자동넘김호출함수 ] /////
    // function autoSlide() {
    //     // setInterval(함수,시간)
    //     // - 일정시간간격으로 함수를 호출
    //     // clearInterval(인터발변수)
    //     // - 변수에 담긴 인터발을 지움(멈춤)
    //     autoI = setInterval(() => {
    //         // 1. 현재 슬라이드 순번 증가
    //         snum === SLIDE_CNT - 1 ? (snum = 0) : snum++;
    //         // 2. 슬라이드 순번 클래스 제어함수 호출
    //         setClass(slide, "on", snum);
    //         // 3. 블릿 순번 클래스 제어함수 호출
    //         setClass(indic, "on", snum);
    //     }, 3000);
    // } /////// autoSlide 함수 /////////////

    /// [ 인터발 지우기함수 : 버튼조작시 호출함! ] ///////
    function clearAuto() {
        // 지우기 확인!
        console.log("인터발 지워!");
        // 1.인터발 지우기
        clearInterval(autoI);
        // 2.타임아웃 지우기 : 실행쓰나미 방지!!!
        clearTimeout(autoT);
        // 3.5초후 아무작동도 안하면 다시 인터발호출
        // autoT = setTimeout(() => {
        //     autoSlide();
        // }, 5000);
    } ////////// clearAuto ////////////
} /////////////// loadFn 함수 //////////////

}