var num = 1;

function foo() {
  var num = 2;

  function bar() {
    console.log(num);
  }
  return bar;
}

var baz = foo();
baz();

//  외부함수가 리턴되어 사라져야 하는데 사라지지 않고
// 내부함수의 참조로 인해 값을 유지하게 되는 것을 클로저
// 정확히는 내부 함수를 클로저 함수라고 부릅니다

function f(arg) {
  var n = function () {
    return arg;
  };
  arg++;
  return n;
}

var m = f(123);
console.log(m());
//---------------------------------
function fe() {
  var a = [];
  var i;

  for (i = 0; i < 3; i++) {
    a[i] = function () {
      return i;
    };
  }
  return a;
}

var b = fe();

console.log(b[0]());
console.log(b[1]());
console.log(b[2]());
// 3 3 3이 출력
// var b = fe();는 for문이 실행이 다 끝나고 나서 실제 참조가 이루어짐
// 따라서 i가 이미 3으로 증가했기 때문에 전부 3 이 출력

// 즉, 클로저는 그 순간의 값을 저장하는 것이 아니라 연결된 함수 범위에서
// 최종 처리된 값을 가지게 됩니다.

function f() {
  var a = [];
  var i;

  for (i = 0; i < 3; i++) {
    a[i] = (function (x) {
      return function () {
        return x;
      };
    })(i);
  }
  return a;
}

var b = f();

console.log(b[0]());
console.log(b[1]());
console.log(b[2]());
// 1, 2, 3 출력

/*
클로저를 사용하면 함수를 호출할 때마다 기존에 생성했던 값을 유지할 수 있기 때문에, 
전역 변수의 잘못된 사용 없이 깔끔한 코드 작성을 할 수 있습니다. 
또한, 외부에 해당 변수를 노출시키지 않아서 안정성을 보장해줍니다. 
이것은 "객체지향의 요소" 강좌에서 말했던 캡슐화와도 관련이 있는데, 
클로저를 통해서만 해당 변수를 참조할 수 있기 때문에 외부 사용자가 값을 변경할 수 없습니다.

하지만 클로저로 참조하는 변수는 프로그램 종료 시까지 계속 메모리에 할당되어 있기 때문에, 
메모리 누수로 인해 성능 저하의 원인이 될 수도 있으니 신중하게 사용해야 합니다.
*/
