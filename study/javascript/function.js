function sum(a, b) {
  let c = a + b;
  return c;
}

let add = sum;
typeof add;
//"function"

add(1, 2);
// 3

const student = {
  name: 'goorm',
  age: 20,
};
/*
delete 키워드를 사용하면 메모리 공간에 
할당된 객체의 속성을 삭제할 수 있습니다. 
단, 객체 자체를 삭제할 수는 없으므로 주의해야 합니다. 
delete 연산이 성공했을 경우나 존재하지 않는 속성이라 
아무런 연산도 하지 못할 경우 true가 출력되고, 
실패할 경우 false가 출력됩니다
*/
console.log(student.name);

delete student.name;
// true

console.log(student.name);
//undefined

delete student;
// false

delete not_exist;
// true

console.log(student.age);

// "This is anonymous function!"
var f = function (a) {
  return 'This is anonymous function!';
};
console.log(f());

// callback function
//  특정 이벤트가 발생하면 호출되는 함수
// 이벤트가 발생했을 때, 해당 이벤트에 대응하는 특정한 동작을 하도록
// 어떤 함수를 호출하여야 할지 미리 지정해줄 수 있는 것
function one() {
  return 1;
}
function invoke_and_add(a, b) {
  return a() + b();
}
invoke_and_add(one, () => {
  return 2;
});
