(() => {
  if (!("serviceWorker" in navigator)) return;

  let installPrompt = null;
  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const button = document.getElementById("installAppButton");

  const labels = {
    de: "App installieren",
    en: "Install app",
    ps: "اپ نصب کړئ",
    fa: "نصب اپلیکیشن"
  };
  const instructions = {
    de: "Tippe unten auf Teilen und dann auf „Zum Home-Bildschirm“.",
    en: "Tap Share, then “Add to Home Screen”.",
    ps: "د شریکولو تڼۍ ووهئ، بیا «Home Screen ته اضافه» وټاکئ.",
    fa: "روی دکمه اشتراک بزنید و سپس «Add to Home Screen» را انتخاب کنید."
  };

  function language() {
    return document.documentElement.lang || "fa";
  }
  function updateLabel() {
    if (button) button.querySelector("span").textContent = labels[language()] || labels.fa;
  }

  navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(error => {
    console.warn("PWA registration failed", error);
  });

  if (standalone && button) button.hidden = true;

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    if (button && !standalone) button.hidden = false;
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    if (button) button.hidden = true;
  });

  if (button) {
    updateLabel();
    new MutationObserver(updateLabel).observe(document.documentElement, {attributes:true,attributeFilter:["lang"]});
    button.addEventListener("click", async () => {
      if (installPrompt) {
        installPrompt.prompt();
        await installPrompt.userChoice;
        installPrompt = null;
      } else {
        alert(instructions[language()] || instructions.fa);
      }
    });
  }
})();
