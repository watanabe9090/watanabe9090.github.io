(() => {
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll("[data-app-target]").forEach((starterEl, _) => {
            const dataAppTarget = starterEl.getAttribute("data-app-target");
            const targetEl = document.querySelector(`[data-app-name="${dataAppTarget}"]`);
            const { width, height } = targetEl.getBoundingClientRect();
        
            const toggleTerminal = (terminalEl) => {
              if (terminalEl.classList.contains("terminal--hide")) {
                terminalEl.classList.remove("terminal--hide");
                terminalEl.classList.add("terminal--show");
              } else {
                terminalEl.classList.add("terminal--hide");
                terminalEl.classList.remove("terminal--show");
              }
            };
            const changePositionVariable = (starterEl) => {
              var root = document.querySelector(":root");
              root.style.setProperty(
                "--data-hide-position-top",
                starterEl.getBoundingClientRect().top - height / 2 + "px"
              );
              root.style.setProperty(
                "--data-hide-position-left",
                starterEl.getBoundingClientRect().left - width / 2 + "px"
              );
            };
        
            changePositionVariable(starterEl);
            window.onresize = () => changePositionVariable(starterEl);
            starterEl.addEventListener("click", () => toggleTerminal(targetEl));
          });
    })
})();