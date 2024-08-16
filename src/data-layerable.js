(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const dataLayerableEls = document.querySelectorAll("[data-layerable]");
    const prioritize = (priority) => {
      dataLayerableEls.forEach(
        (el) => (el.style["z-index"] = priority.isEqualNode(el) ? 10 : 0)
      );
    };
    dataLayerableEls.forEach((el, _) => {
      const attr = el.getAttribute("data-layerable");
      const event = attr === "1" ? "mouseenter" : "mousedown";
      el.addEventListener(event, () => prioritize(el));
    });
  });
})();
