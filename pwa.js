(() => {
  if (!("serviceWorker" in navigator)) return;

  let installPrompt = null;
  const standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const button = document.getElementById("installAppButton");
  const socialBrowserPattern = /TikTok|musical_ly|Bytedance|BytedanceWebview|Aweme|Trill|Instagram|FBAN|FBAV|FB_IAB|FBIOS/i;
  const isSocialBrowser = () => socialBrowserPattern.test(navigator.userAgent) || /tiktok\.com|instagram\.com|facebook\.com/i.test(document.referrer);

  const copy = {
    de: {
      button:"App installieren", title:"Shop als App installieren",
      text:"Speichere AT Afghanen auf deinem Handy. Danach öffnet sich der Shop wie eine normale App.",
      ios:"iPhone: Tippe auf Teilen und dann auf „Zum Home-Bildschirm“.",
      android:"Android: Tippe unten auf „App installieren“.",
      install:"App installieren", continue:"Weiter zur Website",
      instruction:"Tippe unten auf Teilen und dann auf „Zum Home-Bildschirm“."
    },
    en: {
      button:"Install app", title:"Install the shop as an app",
      text:"Save AT Afghanen on your phone. The shop will then open like a normal app.",
      ios:"iPhone: Tap Share, then “Add to Home Screen”.",
      android:"Android: Tap “Install app” below.",
      install:"Install app", continue:"Continue to website",
      instruction:"Tap Share, then “Add to Home Screen”."
    },
    ps: {
      button:"اپ نصب کړئ", title:"پلورنځی د اپ په توګه نصب کړئ",
      text:"AT Afghanen په خپل موبایل کې وساتئ؛ وروسته به د عادي اپ په شان پرانیستل شي.",
      ios:"iPhone: د شریکولو تڼۍ ووهئ، بیا «Add to Home Screen» وټاکئ.",
      android:"Android: لاندې «اپ نصب کړئ» ووهئ.",
      install:"اپ نصب کړئ", continue:"وېبپاڼې ته دوام",
      instruction:"د شریکولو تڼۍ ووهئ، بیا «Add to Home Screen» وټاکئ."
    },
    fa: {
      button:"نصب اپلیکیشن", title:"فروشگاه را به‌صورت اپ نصب کنید",
      text:"AT Afghanen را روی موبایل خود ذخیره کنید؛ بعد از آن فروشگاه مانند یک اپ عادی باز می‌شود.",
      ios:"آیفون: روی دکمه اشتراک بزنید و سپس «Add to Home Screen» را انتخاب کنید.",
      android:"اندروید: در پایین روی «نصب اپلیکیشن» بزنید.",
      install:"نصب اپلیکیشن", continue:"ادامه به فروشگاه",
      instruction:"روی دکمه اشتراک بزنید و سپس «Add to Home Screen» را انتخاب کنید."
    }
  };

  const language = () => document.documentElement.lang || "fa";
  const words = () => copy[language()] || copy.fa;

  navigator.serviceWorker.register("./sw.js", {scope:"./"}).catch(error => {
    console.warn("PWA registration failed", error);
  });

  async function requestInstall() {
    if (installPrompt) {
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
    } else {
      alert(words().instruction);
    }
  }

  function updateLabel() {
    if (button) button.querySelector("span").textContent = words().button;
  }

  function dismissIntro(overlay) {
    localStorage.setItem("atAppIntroSeenV1", "1");
    overlay.classList.add("closing");
    setTimeout(() => overlay.remove(), 220);
  }

  function showIntro() {
    const isMobile = window.matchMedia("(max-width:820px)").matches;
    if (!isMobile || standalone || isSocialBrowser() || localStorage.getItem("atAppIntroSeenV1")) return;
    const t = words();
    const overlay = document.createElement("div");
    overlay.className = "app-intro";
    overlay.innerHTML = `
      <div class="app-intro-card" role="dialog" aria-modal="true" aria-labelledby="appIntroTitle">
        <button class="app-intro-close" type="button" aria-label="Close">×</button>
        <img src="assets/app-icon.svg" alt="AT Afghanen">
        <h2 id="appIntroTitle">${t.title}</h2>
        <p>${t.text}</p>
        <div class="app-intro-steps"><span>1</span><p>${t.ios}</p><span>2</span><p>${t.android}</p></div>
        <button class="app-intro-install" type="button">${t.install}</button>
        <button class="app-intro-continue" type="button">${t.continue}</button>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("visible"));
    overlay.querySelector(".app-intro-close").onclick = () => dismissIntro(overlay);
    overlay.querySelector(".app-intro-continue").onclick = () => dismissIntro(overlay);
    overlay.querySelector(".app-intro-install").onclick = requestInstall;
  }

  if (standalone && button) button.hidden = true;

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    if (button && !standalone) button.hidden = false;
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    if (button) button.hidden = true;
    const overlay = document.querySelector(".app-intro");
    if (overlay) dismissIntro(overlay);
  });

  if (button) {
    updateLabel();
    new MutationObserver(updateLabel).observe(document.documentElement, {attributes:true,attributeFilter:["lang"]});
    button.addEventListener("click", requestInstall);
  }

  function forceSocialBrowserNotice() {
    if (standalone || !isSocialBrowser() || document.querySelector(".browser-intro")) return;
    const banner = document.getElementById("socialBrowserBanner");
    if (banner) banner.hidden = true;
    document.documentElement.classList.add("social-webview");
    const socialCopy = {
      de:{title:"Im Browser öffnen",text:"Du bist gerade im TikTok- oder Instagram-Browser. Öffne den Shop in Safari oder Chrome, damit Installation, Bestellung und WhatsApp zuverlässig funktionieren.",step:"Tippe oben rechts auf ⋯ und wähle „Im Browser öffnen“.",copy:"Webseiten-Link kopieren",close:"Weiter zur Website",copied:"Link kopiert"},
      en:{title:"Open in your browser",text:"You are using the TikTok or Instagram browser. Open the shop in Safari or Chrome so installation, orders and WhatsApp work reliably.",step:"Tap ⋯ at the top right and choose “Open in browser”.",copy:"Copy website link",close:"Continue to website",copied:"Link copied"},
      ps:{title:"په براوزر کې یې پرانیزئ",text:"تاسو اوس د TikTok یا Instagram براوزر کاروئ. پلورنځی په Safari یا Chrome کې پرانیزئ، څو نصب، فرمایش او WhatsApp سم کار وکړي.",step:"پورته ښي لور ته ⋯ ووهئ او «Open in browser» وټاکئ.",copy:"د وېبپاڼې لینک کاپي",close:"وېبپاڼې ته دوام",copied:"لینک کاپي شو"},
      fa:{title:"در مرورگر باز کنید",text:"شما اکنون داخل مرورگر TikTok یا Instagram هستید. فروشگاه را در Safari یا Chrome باز کنید تا نصب اپ، سفارش و WhatsApp درست کار کند.",step:"بالا سمت راست روی ⋯ بزنید و «Open in browser» را انتخاب کنید.",copy:"کپی لینک وب‌سایت",close:"ادامه به فروشگاه",copied:"لینک کپی شد"}
    };
    const t = socialCopy[language()] || socialCopy.fa;
    const overlay = document.createElement("div");
    overlay.className = "browser-intro";
    overlay.innerHTML = `
      <div class="browser-intro-card" role="dialog" aria-modal="true" aria-labelledby="browserIntroTitle">
        <button class="browser-intro-close" type="button" aria-label="Close">×</button>
        <div class="browser-intro-icon">⋯</div>
        <p class="browser-intro-kicker">TIKTOK · INSTAGRAM</p>
        <h2 id="browserIntroTitle">${t.title}</h2>
        <p>${t.text}</p>
        <div class="browser-intro-step"><span>1</span><strong>${t.step}</strong></div>
        <button class="browser-intro-copy" type="button">${t.copy}</button>
        <button class="browser-intro-continue" type="button">${t.close}</button>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add("visible"));
    const dismiss = () => {
      overlay.classList.add("closing");
      setTimeout(() => overlay.remove(), 250);
    };
    overlay.querySelector(".browser-intro-close").onclick = dismiss;
    overlay.querySelector(".browser-intro-continue").onclick = dismiss;
    overlay.querySelector(".browser-intro-copy").onclick = async event => {
      try { await navigator.clipboard.writeText("https://atafghanen.github.io/"); }
      catch {
        const helper=document.createElement("textarea");
        helper.value="https://atafghanen.github.io/";
        document.body.appendChild(helper); helper.select(); document.execCommand("copy"); helper.remove();
      }
      event.currentTarget.textContent=t.copied;
    };
    setTimeout(() => { if (overlay.isConnected) dismiss(); }, 25000);
  }

  forceSocialBrowserNotice();
  setTimeout(showIntro, 450);
})();
