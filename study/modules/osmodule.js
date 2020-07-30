const os = require('os');

/*
os.tmpdir() : 임시 저장 폴더의 위치
os.endianness() : CPU의 endianness(BE 또는 LE)
os.hostname() : 호스트(컴퓨터) 이름
os.type() : 운영체제 이름
os.platform() : 운영체제 플랫폼
os.arch() : 운영체제 아키텍처
os.release() : 운영체제 버전
os.uptime() : 운영체제가 실행된 시간
os.loadavg() : 로드 에버리지 정보를 담은 배열
os.totalmem() : 시스템의 총 메모리
os.freemem() : 시스템의 가용 메모리
os.cpus() : CPU의 정보를 담은 객체. CPU의 세부 정보를 반환합니다.
os.networkInterfaces() : 네트워크 인터페이스 정보를 담은 배열
*/

console.log(os.tmpdir());
console.log(os.type());

const cpus = os.cpus();
for (let i = 0; i < cpus.length; i++) {
  console.log(`CPU[${i + 1}]`);
  console.log(`model :  + ${cpus[i].model}`);
  console.log(`speed : ${cpus[i].speed}`);
}
