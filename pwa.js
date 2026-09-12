(() => {
  if (!("serviceWorker" in navigator)) return;

  let installPrompt = null;
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true ||
    new URLSearchParams(location.search).get("source") === "pwa";
  const button = document.getElementById("installAppButton");

  const labels = {
    de:"App installieren", en:"Install app", ps:"اپ نصب کړئ", fa:"نصب اپلیکیشن"
  };
  const content = {
    de:{
      title:"Shop als App installieren",
      text:"Speichere AT Afghanen auf deinem Handy. Danach öffnet sich der Shop wie eine normale App.",
      ios:"iPhone: Tippe auf Teilen und dann auf „Zum Home-Bildschirm“.",
      android:"Android: Tippe unten auf „App installieren“.",
      install:"App installieren",continue:"Weiter zur Website",
      instruction:"Tippe auf Teilen und dann auf „Zum Home-Bildschirm“."
    },
    en:{
      title:"Install the shop as an app",
      text:"Save AT Afghanen on your phone. The shop will then open like a normal app.",
      ios:"iPhone: Tap Share, then “Add to Home Screen”.",
      android:"Android: Tap “Install app” below.",
      install:"Install app",continue:"Continue to website",
      instruction:"Tap Share, then “Add to Home Screen”."
    },
    ps:{
      title:"پلورنځی د اپ په توګه نصب کړئ",
      text:"AT Afghanen په خپل موبایل کې وساتئ؛ وروسته به د عادي اپ په شان پرانیستل شي.",
      ios:"iPhone: د شریکولو تڼۍ ووهئ، بیا «Add to Home Screen» وټاکئ.",
      android:"Android: لاندې «اپ نصب کړئ» ووهئ.",
      install:"اپ نصب کړئ",continue:"وېبپاڼې ته دوام",
      instruction:"د شریکولو تڼۍ ووهئ، بیا «Add to Home Screen» وټاکئ."
    },
    fa:{
      title:"فروشگاه را به‌صورت اپ نصب کنید",
      text:"AT Afghanen را روی موبایل خود ذخیره کنید؛ بعد از آن فروشگاه مانند یک اپ عادی باز می‌شود.",
      ios:"آیفون: روی دکمه اشتراک بزنید و سپس «Add to Home Screen» را انتخاب کنید.",
      android:"اندروید: در پایین روی «نصب اپلیکیشن» بزنید.",
      install:"نصب اپلیکیشن",continue:"ادامه به فروشگاه",
      instruction:"روی دکمه اشتراک بزنید و سپس «Add to Home Screen» را انتخاب کنید."
    }
  };

  const language=()=>document.documentElement.lang||"fa";
  const words=()=>content[language()]||content.fa;

  navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(error=>{
    console.warn("PWA registration failed",error);
  });

  async function requestInstall(status){
    if(installPrompt){
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt=null;
    }else if(status){
      status.textContent=words().instruction;
      status.hidden=false;
    }else{
      alert(words().instruction);
    }
  }

  function updateLabel(){
    if(button) button.querySelector("span").textContent=labels[language()]||labels.fa;
  }

  function showIntro(){
    const mobile=window.matchMedia("(max-width:820px)").matches||navigator.maxTouchPoints>0;
    if(!mobile||standalone||localStorage.getItem("atSimpleAppIntroV2")) return;
    const t=words();
    const overlay=document.createElement("div");
    overlay.className="app-intro";
    overlay.innerHTML=`
      <div class="app-intro-card" role="dialog" aria-modal="true" aria-labelledby="appIntroTitle">
        <button class="app-intro-close" type="button" aria-label="Close">×</button>
        <img src="assets/app-icon.svg" alt="AT Afghanen">
        <h2 id="appIntroTitle">${t.title}</h2>
        <p>${t.text}</p>
        <div class="app-intro-steps"><span>1</span><p>${t.ios}</p><span>2</span><p>${t.android}</p></div>
        <p class="app-guide-status" hidden></p>
        <button class="app-intro-install" type="button">${t.install}</button>
        <button class="app-intro-continue" type="button">${t.continue}</button>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>overlay.classList.add("visible"));
    const dismiss=()=>{
      localStorage.setItem("atSimpleAppIntroV2","1");
      overlay.classList.add("closing");
      setTimeout(()=>overlay.remove(),220);
    };
    overlay.querySelector(".app-intro-close").onclick=dismiss;
    overlay.querySelector(".app-intro-continue").onclick=dismiss;
    overlay.querySelector(".app-intro-install").onclick=()=>requestInstall(overlay.querySelector(".app-guide-status"));
  }

  if(standalone&&button) button.hidden=true;
  window.addEventListener("beforeinstallprompt",event=>{
    event.preventDefault();installPrompt=event;
    if(button&&!standalone)button.hidden=false;
  });
  window.addEventListener("appinstalled",()=>{
    installPrompt=null;
    if(button)button.hidden=true;
    document.querySelector(".app-intro")?.remove();
  });
  if(button){
    updateLabel();
    new MutationObserver(updateLabel).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
    button.addEventListener("click",()=>requestInstall());
  }
  setTimeout(showIntro,400);
})();
