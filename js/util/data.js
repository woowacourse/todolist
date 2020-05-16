export const DEFAULT_DATA = [
  { id: "82b562be-7a39-4bd6-9b27-7e99e08ab508", title: "Java 공부하기" },
  { id: "d27e04b9-45b8-4714-8cef-0911468e8f71", title: "JavaScript 공부하기", status: "completed" },
  { id: "d123738d-54c1-4270-b92d-5dec021e486c", title: "Spring 공부하기" },
  { id: "e9afabc7-a2f8-419b-b01c-b8e519818554", title: "React 공부하기" }
];

export const FILTERS = (filter) => [
  {
    type: "all",
    name: "전체보기",
    selected: filter === "all"
  },
  {
    type: "active",
    name: "해야할 일",
    selected: filter === "active"
  },
  {
    type: "completed",
    name: "완료한 일",
    selected: filter === "completed"
  }
];
