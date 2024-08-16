document.addEventListener("DOMContentLoaded", () => {
  const queryAll = (q) => document.querySelectorAll(q);
  const query = (q) => document.querySelector(q);

  window.mouse = window.mouse ? window.mouse : {};
  document.onmouseup = () => {
    if (window.mouse && window.mouse.target) {
      window.mouse.target.style.cursor = "default";
    }
    window.mouse.down = false;
  };

  document.ontouchstart;

  document.onmousedown = (ev) => {
    window.mouse = {
      ...window.mouse,
      target:
        ev &&
        ev.target &&
        typeof ev.target.className === "string" &&
        ev.target.className.includes("terminal__bar") &&
        !ev.target.className.includes("button")
          ? ev.target.closest(".terminal")
          : null,
      down: true,
    };
  };
  document.onmousemove = (ev) => {
    window.mouse = {
      ...window.mouse,
      lastX: window.mouse.x ? window.mouse.x : ev.clientX,
      lastY: window.mouse.y ? window.mouse.y : ev.clientY,
      x: ev.clientX,
      y: ev.clientY,
    };
    if (window.mouse.target && window.mouse.down) {
      window.mouse.target.style.cursor = "grabbing";
      const deltaX = window.mouse.lastX - window.mouse.x;
      const deltaY = window.mouse.lastY - window.mouse.y;
      const { x, y } = window.mouse.target.getBoundingClientRect();
      const { width, height } = query(".terminal__bar").getBoundingClientRect();
      const newY =
        y - deltaY < 0
          ? 0
          : y - deltaY > window.innerHeight - height
          ? window.innerHeight - height
          : y - deltaY;
      const newX =
        x - deltaX < 0
          ? 0
          : x - deltaX > window.innerHeight
          ? window.innerHeight
          : x - deltaX;
      window.mouse.target.style.top = `${newY}px`;
      window.mouse.target.style.left = `${newX}px`;
    }
  };
});
