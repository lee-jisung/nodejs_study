/*
util.format(format, [...]) : console.log() 메소드와 비슷한 기능이지만 
console.log()는 화면에 출력하고 util.format은 문자열로 반환합니다. 
printf와 같은 형식으로 첫 아규먼트를 사용해서 포맷팅된 문자열을 반환합니다.
플레이스 홀더는 다음과 같은 아규먼트의 값으로 대체됩니다.
   %s : 문자열
   %d : 숫자(정수부터 소수까지 표현 가능)
   %j : JSON
   % : 퍼센트 기호('%'). 이 기호는 플레이스홀더를 사용하지 않습니다.
util.debug(string) : 프로그램의 실행을 멈추고 즉각적으로 string을 출력합니다.
util.log(string) : 타임스탬프 시간과 함께 string을 출력합니다.
util.isArray(object) : 주어진 object가 Array이면 true, 아니면 false를 리턴합니다.
util.isRegExp(object) : 주어진 object가 RegExp이면 true, 아니면 false를 리턴합니다.
util.isDate(object) : 주어진 object가 Date이면 true, 아니면 false를 리턴합니다.
util.isError(object) : 주어진 object가 Error이면 true, 아니면 false를 리턴합니다.
*/

const util = require('util');
let data = util.format('%d, %s, %j', 6, 'chapter', { content: 'module' });

console.log(data);
util.log('message');

// inheritance
function Foo() {
  // 코드
}

// create foo object with bar() function
Foo.prototype = {
  bar: function () {
    console.log('Foo_bar 실행');
  },
};

function Bar() {}

util.inherits(Bar, Foo);

Bar.prototype.baz = function () {
  console.log('Bar_baz 실행');
};

Foo.prototype.bar();
Bar.prototype.bar();
Bar.prototype.baz();
