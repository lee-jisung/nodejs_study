function SoccerPlayer(name, position) {
  this.name = name;
  this.position = position;
  this.whatIsYourName = function () {
    return 'My name is ' + this.name;
  };
  this.whatIsYourPosition = function () {
    return 'My position is ' + this.position;
  };
}
var player = new SoccerPlayer('Park Ji Sung', 'Wing Forward');

player.whatIsYourName();
// "My name is Park Ji Sung"

player.whatIsYourPosition();
// "My position is Wing Forward"

player.constructor;

var player2 = new player.constructor('Koo Ja Cheol');
player2.name;
// "Koo Ja Cheol"

// instanceof 연산자를 이용하면 특정 객체가
// 어떤 생성자를 이용하여 만들어졌는지 테스트할 수 있습니다.
player instanceof SoccerPlayer;
// true

player instanceof Object;
// true
