export default function (name) {
  let strCookie = document.cookie;
  let arrCookie = strCookie.split("; ");
  for (let i = 0; i < arrCookie.length; i++) {
    let arr = arrCookie[i].split("=");
    if (name === arr[0]) {
      return arr[1];
    }
  }
  return "";
}
