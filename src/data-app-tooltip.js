(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const parser = new DOMParser();
    const tooltipTemplate = (text) => `<span class="tooltip">${text}</span>`

    document.querySelectorAll("[data-app-tooltip]").forEach((tooltipEl) => {
      const tooltip = tooltipEl.getAttribute("data-app-tooltip");
      const node = document.body.appendChild(parser.parseFromString(
        tooltipTemplate(tooltip),
        "text/html"
      ).body.firstChild);
      let elBounds = tooltipEl.getBoundingClientRect();
      let nodeBounds = node.getBoundingClientRect();
      node.style.left = `${elBounds.left + elBounds.width / 2 - nodeBounds.width / 2}px`;
      node.style.top = `${elBounds.top - nodeBounds.height - 10}px`;
      node.style.display = `none`;
      let showEventId = null;

      window.addEventListener('resize', () => {
        node.style.display = "block"
        let elBounds = tooltipEl.getBoundingClientRect();
        let nodeBounds = node.getBoundingClientRect();
        node.style.left = `${elBounds.left + elBounds.width / 2 - nodeBounds.width / 2}px`;
        node.style.top = `${elBounds.top - nodeBounds.height - 10}px`;
        node.style.display = `none`;
      })

      tooltipEl.addEventListener("mouseenter", () => {
        showEventId = setTimeout(() => (node.style.display = "block"), 300);
      });
      tooltipEl.addEventListener("mouseleave", () => {
        node.style.display = "none";
        clearTimeout(showEventId);
      });

    });
  });
})();
