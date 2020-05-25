### 기능 목록 - 1단계
- [x] todo list에 todoItem을 키보드로 입력하여 추가하기
    - [x] todo list 데이터로 초기화하기
    - [x] 추가한 todo item에 css 적용하기
    - [x] 예외 처리: 빈 글자 입력이 안되도록 한다.
- [x] todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가)
    - [ ] toggle 안되는 문제
    - [x] 완료 시 (completed) 시 css 적용이 안 된다.
- [x] todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
    - [x] 확인 창
- [x] todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가)
    - [x] 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
    - [ ] 수정 창이 따로 나오는 문제
- [x] todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
- [x] todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

### 기능 목록 - 2단계
서버 연동
- [x] data 불러오기 
- [x] data 추가하기
- [ ] data 삭제하기 
- [ ] data 수정하기
- [ ] 통신 예외 처리