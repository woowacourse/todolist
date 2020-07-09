# Vue로 TodoList 하기

## 요구사항
- [X] Vue CIL을 이용해 Vue Project로 만들어 진행한다.
- [X] 제공해준 HTML, CSS를 이용해 Vue 컴포넌트를 만든다.
- [X] todo list에 todoItem을 키보드로 입력하여 추가하기
- [X] todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가)
- [X] todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
- [X] todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
- [X] todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
- [X] todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기
- [X] 우테코 사이트를 참고하여 CRUD에 대한 RESTAPI를 통신한다.

## 제약사항
- Eslint와 Prettier로 컨벤션 약속 정하기
- var 쓰지 말것 (let과 const만 쓰자)
- 일치연산자 == 쓰지 말 것
- for문 사용 자제하기
- nested한 조건문을 최대한 피한다.
- 한 메서드는 한 가지 기능만
- 문장이 2~3 문장 이상으로 길어지는 삼항 연산자는 그냥 if else 쓰자
- 예외 상황 처리하기

## 참고자료
[VueTodoMvc](https://kr.vuejs.org/v2/examples/todomvc.html)
