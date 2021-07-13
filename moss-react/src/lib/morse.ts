/**
 * 모스부호 해독에 필요한 표
 */
const morse: { [key: string]: string } = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  " ": "/",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "0": "-----",
};
/**
 * 모스부호 암호화
 */
export function encodeMorse(str: string) {
  return str
    .split("")
    .map((s) => morse[s.toLowerCase()] || "")
    .join(" ")
    .replace(/ +/g, " ");
}
/**
 * 모스부호 복호화
 */
export function decodeMorse(str: string) {
  const getAlphabet = (s: string) => {
    for (const [key, value] of Object.entries(morse)) {
      if (value === s) {
        return key;
      }
    }
    throw new Error("invalid character");
  };

  return str
    .split("   ")
    .map((s) => s.split(" ").map(getAlphabet).join(""))
    .join(" ");
}
// console.log(decodeMorse(".-- --- .-. -..   .-- --- .-. -.."));
// console.log(encodeMorse("dana1"));
