// emitter.addListener(event, listener) : on() 메소드와 같습니다. 이벤트를 생성하는 메소드입니다.
// emitter.on(event, listener) : addListener()과 동일합니다. 이벤트를 생성하는 메소드입니다.
// emitter.once(event, listener) : 이벤트를 한 번만 연결한 후 제거합니다.
// emitter.removeListener(event, listener) : 특정 이벤트의 특정 이벤트 핸들러를 제거합니다.
//               이 메소드를 이용해 리스너를 삭제하면 리스너 배열의 인덱스가 갱신되니 주의해야 합니다.
// emitter.removeAllListeners([event]) : 모든 이벤트 핸들러를 제거합니다.
// emitter.setMaxListeners(n) : n으로 한 이벤트에 최대허용 개수를 정해줍니다.
//                    node.js는 기본값으로 한 이벤트에 10개의 이벤트 핸들러를 작성할 수 있는데,
//                    11개 이상을 사용하고 싶다면 n값을 넘겨주면 됩니다.
//                    n값으로 0을 넘겨 주면 연결 개수 제한이 사라집니다.
// emitter.emit(eventName[, ...args]) : 이벤트를 발생시킵니다.

const EventEmitter = require('events');
let custom_event = new EventEmitter();

custom_event.on('call', () => {
  console.log('event call');
});

custom_event.emit('call');

//remove event
custom_event.removeAllListeners();
custom_event.emit('call'); // noting happen
