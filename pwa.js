(() => {
  if (!("serviceWorker" in navigator)) return;

  let installPrompt = null;
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true ||
    new URLSearchParams(location.search).get("source") === "pwa";
  const button = document.getElementById("installAppButton");

  const copy = {
    de:{
      button:"App installieren",title:"AT Afghanen als App nutzen",
      intro:"Du kannst unseren Shop als App installieren oder ganz normal im Browser öffnen.",
      socialTitle:"Über TikTok oder Instagram geöffnet?",
      socialText:"Tippe oben rechts auf ⋯ und wähle „Im Browser öffnen“. Danach öffnet sich der Shop in Safari oder Chrome.",
      installTitle:"App installieren",
      installText:"Auf dem iPhone: Teilen → „Zum Home-Bildschirm“. Auf Android kannst du direkt „App installieren“ wählen.",
      browserTitle:"Ohne App weitermachen",
      browserText:"Du möchtest nichts installieren? Öffne den Link einfach in Safari oder Chrome und benutze den Shop ganz normal.",
      install:"App installieren",copyLink:"Webseiten-Link kopieren",continue:"Weiter zur Website",copied:"Link kopiert",
      instruction:"Öffne die Seite zuerst in Safari oder Chrome. Tippe danach auf Teilen und „Zum Home-Bildschirm“."
    },
    en:{
      button:"Install app",title:"Use AT Afghanen as an app",
      intro:"Install our shop as an app or use it normally in your browser.",
      socialTitle:"Opened from TikTok or Instagram?",
      socialText:"Tap ⋯ at the top right and choose “Open in browser”. The shop will then open in Safari or Chrome.",
      installTitle:"Install the app",
      installText:"On iPhone: Share → “Add to Home Screen”. On Android, choose “Install app”.",
      browserTitle:"Continue without the app",
      browserText:"Do not want to install anything? Open the link in Safari or Chrome and use the shop normally.",
      install:"Install app",copyLink:"Copy website link",continue:"Continue to website",copied:"Link copied",
      instruction:"Open the site in Safari or Chrome first, then tap Share and “Add to Home Screen”."
    },
    ps:{
      button:"اپ نصب کړئ",title:"AT Afghanen د اپ په توګه وکاروئ",
      intro:"زموږ پلورنځی د اپ په توګه نصب کړئ یا یې په عادي براوزر کې وکاروئ.",
      socialTitle:"له TikTok یا Instagram څخه مو پرانیستی؟",
      socialText:"پورته ښي لور ته ⋯ ووهئ او «Open in browser» وټاکئ. بیا به پلورنځی په Safari یا Chrome کې پرانیستل شي.",
      installTitle:"اپ نصب کړئ",
      installText:"په iPhone کې: Share → «Add to Home Screen». په Android کې «Install app» وټاکئ.",
      browserTitle:"له اپ پرته دوام",
      browserText:"که اپ نه نصبوی، لینک په Safari یا Chrome کې پرانیزئ او پلورنځی عادي وکاروئ.",
      install:"اپ نصب کړئ",copyLink:"لینک کاپي کړئ",continue:"وېبپاڼې ته دوام",copied:"لینک کاپي شو",
      instruction:"لومړی پاڼه په Safari یا Chrome کې پرانیزئ، بیا Share او «Add to Home Screen» وټاکئ."
    },
    fa:{
      button:"نصب اپلیکیشن",title:"استفاده از AT Afghanen به‌صورت اپ",
      intro:"می‌توانید فروشگاه ما را به‌صورت اپ نصب کنید یا آن را عادی در مرورگر باز کنید.",
      socialTitle:"از طریق TikTok یا Instagram باز کرده‌اید؟",
      socialText:"بالا سمت راست روی ⋯ بزنید و «Open in browser» را انتخاب کنید. سپس فروشگاه در Safari یا Chrome باز می‌شود.",
      installTitle:"نصب اپلیکیشن",
      installText:"در آیفون: Share ← «Add to Home Screen». در اندروید گزینه «Install app» را انتخاب کنید.",
      browserTitle:"ادامه بدون اپ",
      browserText:"اگر نمی‌خواهید اپ نصب کنید، لینک را در Safari یا Chrome باز کنید و عادی از فروشگاه استفاده کنید.",
      install:"نصب اپلیکیشن",copyLink:"کپی لینک وب‌سایت",continue:"ادامه به فروشگاه",copied:"لینک کپی شد",
      instruction:"ابتدا صفحه را در Safari یا Chrome باز کنید؛ سپس Share و «Add to Home Screen» را انتخاب کنید."
    }
  };

  const language = () => document.documentElement.lang || "fa";
  const words = () => copy[language()] || copy.fa;

  navigator.serviceWorker.register("./sw.js",{scope:"./"}).catch(error => console.warn("PWA registration failed",error));

  function updateLabel(){
    if(button) button.querySelector("span").textContent=words().button;
  }

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

  function showUnifiedGuide(){
    const mobile=window.matchMedia("(max-width:820px)").matches || navigator.maxTouchPoints>0;
    if(!mobile || standalone || sessionStorage.getItem("atUnifiedAppGuideV1")) return;
    const t=words();
    const overlay=document.createElement("div");
    overlay.className="app-intro";
    overlay.innerHTML=`
      <div class="app-intro-card app-guide-card" role="dialog" aria-modal="true" aria-labelledby="appGuideTitle">
        <button class="app-intro-close" type="button" aria-label="Close">×</button>
        <img src="assets/app-icon.svg" alt="AT Afghanen">
        <h2 id="appGuideTitle">${t.title}</h2>
        <p>${t.intro}</p>
        <div class="app-guide-options">
          <section><span>1</span><div><strong>${t.socialTitle}</strong><p>${t.socialText}</p></div></section>
          <section><span>2</span><div><strong>${t.installTitle}</strong><p>${t.installText}</p></div></section>
          <section><span>3</span><div><strong>${t.browserTitle}</strong><p>${t.browserText}</p></div></section>
        </div>
        <p class="app-guide-status" hidden></p>
        <button class="app-intro-install" type="button">${t.install}</button>
        <button class="app-guide-copy" type="button">${t.copyLink}</button>
        <button class="app-intro-continue" type="button">${t.continue}</button>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(()=>overlay.classList.add("visible"));
    const dismiss=()=>{
      sessionStorage.setItem("atUnifiedAppGuideV1","1");
      overlay.classList.add("closing");
      setTimeout(()=>overlay.remove(),230);
    };
    overlay.querySelector(".app-intro-close").onclick=dismiss;
    overlay.querySelector(".app-intro-continue").onclick=dismiss;
    overlay.querySelector(".app-intro-install").onclick=()=>requestInstall(overlay.querySelector(".app-guide-status"));
    overlay.querySelector(".app-guide-copy").onclick=async event=>{
      try{await navigator.clipboard.writeText("https://atafghanen.github.io/");}
      catch{
        const helper=document.createElement("textarea");
        helper.value="https://atafghanen.github.io/";
        document.body.appendChild(helper);helper.select();document.execCommand("copy");helper.remove();
      }
      event.currentTarget.textContent=t.copied;
    };
    setTimeout(()=>{if(overlay.isConnected)dismiss();},120000);
  }

  if(standalone && button) button.hidden=true;
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
  setTimeout(showUnifiedGuide,350);
})();
