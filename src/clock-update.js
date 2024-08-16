(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const currentDate = () => {
      const date = new Date();
      const seconds = (date.getSeconds() < 10 ? "0" : 0) + date.getSeconds();
      const minutes = (date.getMinutes() < 10 ? "0" : 0) + date.getMinutes();
      const hours = (date.getHours() < 10 ? "0" : 0) + date.getHours();
      const day = (date.getDate() < 10 ? "0" : 0) + date.getDate();
      const month = (date.getMonth() < 9 ? "0" : 0) + (date.getMonth() + 1);
      const year = date.getFullYear();
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
    const clockEl = document.querySelector("#clock");
    clockEl.innerHTML = currentDate();
    setInterval(() => (clockEl.innerHTML = currentDate()), 1000);
  });
})();
