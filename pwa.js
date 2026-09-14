(() => {
  let installPrompt=null;
  const socialBrowser=/TikTok|musical_ly|Bytedance|BytedanceWebview|Aweme|Trill|Instagram|FBAN|FBAV|FB_IAB|FBIOS/i.test(navigator.userAgent)||/tiktok\.com|instagram\.com|facebook\.com/i.test(document.referrer);
  const standalone=!socialBrowser&&(matchMedia("(display-mode: standalone)").matches||navigator.standalone===true||new URLSearchParams(location.search).get("source")==="pwa");
  const button=document.getElementById("installAppButton");

  const copy={
    de:{button:"App installieren",title:"Shop als App installieren",text:"Speichere AT Afghanen auf deinem Handy. Danach öffnet sich der Shop wie eine normale App.",socialTitle:"Über TikTok oder Instagram geöffnet?",social:"Tippe oben rechts auf ⋯ und wähle „Im Browser öffnen“. Nutze danach Safari oder Chrome.",ios:"iPhone: Teilen → „Zum Home-Bildschirm“.",android:"Android: „App installieren“ auswählen.",install:"App installieren",next:"Weiter zur Website",instruction:"Öffne die Seite in Safari oder Chrome. Tippe dann auf Teilen und „Zum Home-Bildschirm“."},
    en:{button:"Install app",title:"Install the shop as an app",text:"Save AT Afghanen on your phone. The shop will then open like a normal app.",socialTitle:"Opened through TikTok or Instagram?",social:"Tap ⋯ at the top right and choose “Open in browser”. Then use Safari or Chrome.",ios:"iPhone: Share → “Add to Home Screen”.",android:"Android: Choose “Install app”.",install:"Install app",next:"Continue to website",instruction:"Open the site in Safari or Chrome. Then tap Share and “Add to Home Screen”."},
    ps:{button:"اپ نصب کړئ",title:"پلورنځی د اپ په توګه نصب کړئ",text:"AT Afghanen په خپل موبایل کې وساتئ؛ وروسته به د عادي اپ په شان پرانیستل شي.",socialTitle:"له TikTok یا Instagram څخه مو پرانیستی؟",social:"پورته ښي لور ته ⋯ ووهئ او «Open in browser» وټاکئ. بیا Safari یا Chrome وکاروئ.",ios:"iPhone: Share → «Add to Home Screen».",android:"Android: «Install app» وټاکئ.",install:"اپ نصب کړئ",next:"وېبپاڼې ته دوام",instruction:"پاڼه په Safari یا Chrome کې پرانیزئ، بیا Share او «Add to Home Screen» وټاکئ."},
    fa:{button:"نصب اپلیکیشن",title:"فروشگاه را به‌صورت اپ نصب کنید",text:"AT Afghanen را روی موبایل خود ذخیره کنید؛ سپس فروشگاه مانند یک اپ عادی باز می‌شود.",socialTitle:"از طریق TikTok یا Instagram باز کرده‌اید؟",social:"بالا سمت راست روی ⋯ بزنید و «Open in browser» را انتخاب کنید. سپس از Safari یا Chrome استفاده کنید.",ios:"آیفون: Share ← «Add to Home Screen».",android:"اندروید: «Install app» را انتخاب کنید.",install:"نصب اپلیکیشن",next:"ادامه به فروشگاه",instruction:"صفحه را در Safari یا Chrome باز کنید؛ سپس Share و «Add to Home Screen» را انتخاب کنید."}
  };

  let selectedLanguage=document.documentElement.lang||"fa";
  const words=()=>copy[selectedLanguage]||copy.fa;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js?v=18",{scope:"./"}).catch(error=>console.warn("PWA registration failed",error));
  }

  function updateButton(){
    if(button)button.querySelector("span").textContent=(copy[document.documentElement.lang]||copy.fa).button;
  }

  async function requestInstall(status){
    if(installPrompt){
      installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt=null;
    }else if(status){
      status.textContent=words().instruction;
      status.hidden=false;
    }else alert((copy[document.documentElement.lang]||copy.fa).instruction);
  }

  function updateGuide(overlay){
    const t=words();
    overlay.dir=selectedLanguage==="fa"||selectedLanguage==="ps"?"rtl":"ltr";
    overlay.querySelector("#appIntroTitle").textContent=t.title;
    overlay.querySelector("#appIntroText").textContent=t.text;
    overlay.querySelector("#appSocialTitle").textContent=t.socialTitle;
    overlay.querySelector("#appSocialText").textContent=t.social;
    overlay.querySelector("#appIosText").textContent=t.ios;
    overlay.querySelector("#appAndroidText").textContent=t.android;
    overlay.querySelector(".app-intro-install").textContent=t.install;
    overlay.querySelector(".app-intro-continue").textContent=t.next;
    const status=overlay.querySelector(".app-guide-status");
    status.hidden=true;
  }

  function showIntro(){
    if(document.getElementById("appIntroStatic"))return;
    const mobile=matchMedia("(max-width:820px)").matches||navigator.maxTouchPoints>0;
    if(!mobile||standalone)return;
    selectedLanguage=document.documentElement.lang||"fa";
    const overlay=document.createElement("div");
    overlay.className="app-intro";
    overlay.innerHTML=`
      <div class="app-intro-card app-intro-compact" role="dialog" aria-modal="true" aria-labelledby="appIntroTitle">
        <select class="app-intro-language" aria-label="Language">
          <option value="de">DE</option><option value="en">EN</option><option value="ps">پښتو</option><option value="fa">دری</option>
        </select>
        <button class="app-intro-close" type="button" aria-label="Close">×</button>
        <img src="assets/app-icon.svg" alt="AT Afghanen">
        <h2 id="appIntroTitle"></h2>
        <p id="appIntroText"></p>
        <div class="app-social-tip"><strong id="appSocialTitle"></strong><span id="appSocialText"></span></div>
        <div class="app-intro-steps"><span>1</span><p id="appIosText"></p><span>2</span><p id="appAndroidText"></p></div>
        <p class="app-guide-status" hidden></p>
        <button class="app-intro-install" type="button"></button>
        <button class="app-intro-continue" type="button"></button>
      </div>`;
    document.body.appendChild(overlay);
    const languageSelect=overlay.querySelector(".app-intro-language");
    languageSelect.value=selectedLanguage;
    updateGuide(overlay);
    requestAnimationFrame(()=>overlay.classList.add("visible"));
    const dismiss=()=>{
      overlay.classList.add("closing");
      setTimeout(()=>overlay.remove(),220);
    };
    overlay.querySelector(".app-intro-close").onclick=dismiss;
    overlay.querySelector(".app-intro-continue").onclick=dismiss;
    overlay.querySelector(".app-intro-install").onclick=()=>requestInstall(overlay.querySelector(".app-guide-status"));
    languageSelect.onchange=event=>{
      selectedLanguage=event.target.value;
      const siteLanguage=document.getElementById("languageSelect");
      if(siteLanguage){siteLanguage.value=selectedLanguage;siteLanguage.dispatchEvent(new Event("change",{bubbles:true}));}
      document.documentElement.lang=selectedLanguage;
      document.documentElement.dir=selectedLanguage==="fa"||selectedLanguage==="ps"?"rtl":"ltr";
      updateGuide(overlay);
      updateButton();
    };
  }

  if(standalone&&button)button.hidden=true;
  addEventListener("beforeinstallprompt",event=>{event.preventDefault();installPrompt=event;if(button&&!standalone)button.hidden=false;});
  addEventListener("appinstalled",()=>{installPrompt=null;if(button)button.hidden=true;document.querySelector(".app-intro")?.remove();});
  if(button){
    updateButton();
    new MutationObserver(updateButton).observe(document.documentElement,{attributes:true,attributeFilter:["lang"]});
    button.onclick=()=>requestInstall();
  }
  setTimeout(showIntro,400);
})();
