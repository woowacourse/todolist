## 투두리스트 상태 관리하기

#### 요구사항
- [x] list에 todoItem을 키보드로 입력하여 추가하기
- [x] list의 체크박스를 클릭하여 complete 상태로 변경.
  - [x] li tag 에 completed class 추가
- [x] list의 x버튼을 이용해서 해당 엘리먼트를 삭제
- [x] list를 더블클릭했을 때 input 모드로 변경.
  - [x] li tag 에 editing class 추가
  - [x] 단 이때 수정을 완료하지 않은 상태에서 esc키를 누르면 수정되지 않은 채로 다시 view 모드로 복귀
  - [x] ENTER를 누르면 반영
- [x] list의 item갯수를 count한 갯수를 리스트의 하단에 보여주기
- [x] list의 상태값을 확인하여, 해야할 일과, 완료한 일을 클릭하면 해당 상태의 아이템만 보여주기

#### 조건

- 타인의 코드를 많이 볼 것

  - 단순한 Copy & Paste가 아닌, 타인의 코드를 이해하고 필요한 부분을 발췌해서 사용하려면 코드를 이해해야 함
  
  - 많이 읽고 작성해 볼 것

- 직접 타이핑해보기

  - 처음 써보는 API를 그대로 Copy & Paste 하지 말고 직접 타이핑 할 것

## 투두리스트 Ajax 통신하기

#### 요구사항
- [x] fetch를 이용해 데이터 CRUD 하기
  - [x] fetch를 이용해 Todo 목록 data를 불러오고, 특정 Todo를 삭제하고, 완료처리를 하는 것을 적용
  - json data
    ```json
    {
      "_id": 할 일의 고유값. 숫자와 문자가 섞여있는 문자로 되어있음,
      "content": 할 일 text,
      "isCompleted": 할 일의 완료여부
    }
    ```
    
  1. 불러오기
    - API : `http://todo-index.roto.codes/:username`
    > api에는 `username`이 들어갑니다. 본인의 `username`이 들어가게 넣어주세요

    ``` json
    fetch('http://todo-index.roto.codes/jamie9504').then()...
    ```

  2. 추가하기
    - API : `http://todo-index.roto.codes/:username`
    > api에는 `username`이 들어갑니다. 본인의 `username`이 들어가게 넣어주세요
    
    ``` json
    fetch('https://todo-index.roto.codes/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: 'mission review 하기'
      })
    }).then(function(){
      ....
    })
    ```
  
  3. 삭제하기
    - API : `http://todo-index.roto.codes/:username/:todo_id`
    > 서버에서 불러온 todo 데이터에 있는 _id 이용

    ``` json
    fetch('https://todo-index.roto.codes/roto/5d11cf671e050d3f7c583166', {
      method: 'DELETE'
    }).then(function(){
      ....
    })
    ```
  
  4. 토글 
    - API: `http://todo-index.roto.codes/:username/:todo_id`
    > 서버에서 불러온 todo 데이터에 있는 _id 이용
      
    ``` json
    fetch('https://todo-index.roto.codes/roto/5d11cf671e050d3f7c583166/toggle', {
      method: 'PUT'
    }).then(function(){
      ....
    })
    ```

#### 조건
- Ajax요청하는 부분을 객체로 분리
  - 실제 현장에서는 api가 변경되는 일이 잦으므로, 한 객체에서 index 요청하는 부분을 관리해서 사용
