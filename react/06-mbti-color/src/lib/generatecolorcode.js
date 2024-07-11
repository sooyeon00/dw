function generateRandomHex() {
  const num = Math.floor(Math.random() * 256);
  const hex = num.toString(16).padStart(2, "0").toUpperCase();
  // 문자열의 갯수(길이)가 파라미터 숫자보다 작으면=> 0으로

  return hex;
}

export default function generateColorCode() {
  const colorCode = `#${generateRandomHex()}${generateRandomHex()}${generateRandomHex()}`;
  return colorCode;
}
// export 만 쓸때는 여러개 함수를 외부로 내보낼 때 사용.
// default 파일 호출했을 때 무조건 나오는건 붙어 있는 함수 하나의 함수에게만 사용할 수 있음.
