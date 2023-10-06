const now = new Date();

//오늘 날짜 보여줌
export default [
  {
    id: 0,
    title: "오늘",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  }

];
