# todo-list 상태 관리

## 1단계 - 요구사항
 - [x] todo list에 todoItem을 키보드로 입력하여 추가하기
 - [x] todo list의 체크박스를 클릭하여 complete 상태로 변경. (li tag 에 completed class 추가)
 - [x] todo list의 x버튼을 이용해서 해당 엘리먼트를 삭제
 - [x] todo list를 더블클릭했을 때 input 모드로 변경. (li tag 에 editing class 추가) 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
 - [x] todo list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
 - [x] todo list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

## 2단계 - 요구사항
 : fetch를 이용해 데이터 CRUD 하기: fetch를 이용해 Todo 목록 data를 불러오고, 특정 Todo를 삭제하고, 완료처리를 하는 것을 적용
 - [x] 불러오기
     - API: http://todo-api.roto.codes/:username
     - METHOD: GET
 - [x] 추가하기
     - API: http://todo-api.roto.codes/:username
     - METHOD: POST
 - [ ] 삭제하기
     - API: http://todo-api.roto.codes/:username/:todo_id
     - METHOD: DELETE
     - 서버에서 불러온 todo 데이터에 있는 _id를 이용해주세요
 - [ ] 토글
     - API: http://todo-api.roto.codes/:username/:todo_id
     - METHOD: PUT
     - 서버에서 불러온 todo 데이터에 있는 _id를 이용해주세요
     
 - Json Data
    ```json data
    {
      "_id": 할 일의 고유값 (숫자와 문자의 조합)
      "content": 할 일 (text)
      "isCompleted": 할 일의 완료여부
    }
