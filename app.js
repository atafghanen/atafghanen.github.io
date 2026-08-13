const DEFAULT_DATA = {
  settings: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
    email: "info@ateveningelegance.com",
    whatsapp: "491700000000",
    logo: "assets/logo.gif"
  },
  products: [
    { id: "p1", name: { de: "Goldene Afghan Couture", en: "Golden Afghan Couture", ps: "زرینه افغان کالي", fa: "لباس افغانی طلایی" }, category: "Abendkleider", price: 249, oldPrice: 299, image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85" },
    { id: "p2", name: { de: "Midnight Embroidery", en: "Midnight Embroidery", ps: "د شپې ګنډل", fa: "گلدوزی شبانه" }, category: "Bestickung", price: 289, oldPrice: null, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85" },
    { id: "p3", name: { de: "Royal Burgundy", en: "Royal Burgundy", ps: "شاهي برګنډي", fa: "برگندی سلطنتی" }, category: "Festkleider", price: 319, oldPrice: 359, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85" },
    { id: "p4", name: { de: "Desert Pearl", en: "Desert Pearl", ps: "د صحرا مرغلره", fa: "مروارید صحرا" }, category: "Festkleider", price: 279, oldPrice: null, image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85" },
    { id: "p5", name: { de: "Noir Silk", en: "Noir Silk", ps: "تور ورېښم", fa: "ابریشم مشکی" }, category: "Abendkleider", price: 229, oldPrice: 269, image: "https://images.unsplash.com/photo-1506629905607-d9d6f1b98f34?auto=format&fit=crop&w=900&q=85" },
    { id: "p6", name: { de: "Heritage Gold", en: "Heritage Gold", ps: "د میراث سره زر", fa: "طلای میراث" }, category: "Tradition", price: 349, oldPrice: null, image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85" }
  ],
  gallery: [
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85"
  ]
};

const translations = {
  de: { announcement: "Weltweiter Versand · Maßanfertigung nach deinen Maßen", "nav.home": "Startseite", "nav.collection": "Kollektion", "nav.tailoring": "Maßanfertigung", "nav.story": "Über uns", "nav.gallery": "Galerie", "nav.contact": "Kontakt", "hero.eyebrow": "AFGHAN FASHION · SEIT 2022", "hero.title": "Zeitlose Schönheit.<br><span>Für dich gemacht.</span>", "hero.text": "Afghanische Eleganz, neu interpretiert – mit Liebe zum Detail, eigener Schneiderei und weltweiter Lieferung.", "hero.cta": "Kollektion entdecken", "hero.custom": "Maßanfertigung", "hero.cardTop": "AT", "hero.cardBottom": "Afghan Couture", "collection.eyebrow": "THE COLLECTION", "collection.title": "Eleganz, die bleibt.", "collection.intro": "Entdecke ausgewählte afghanische Kleider. Verfügbar aus unserem Lager oder individuell nach deinen Maßen gefertigt.", "tailoring.eyebrow": "PERSONAL TAILORING", "tailoring.title": "Dein Kleid.<br>Deine Maße.<br>Dein Auftritt.", "tailoring.text": "Du möchtest etwas ganz Besonderes? Wir fertigen ausgewählte Designs individuell nach deinen Maßen an. Gemeinsam besprechen wir Schnitt, Stoff, Farben und Details.", "tailoring.item1": "Individuelle Maße", "tailoring.item2": "Ausgewählte Stoffe", "tailoring.item3": "Handveredelte Details", "tailoring.item4": "Weltweite Lieferung", "tailoring.cta": "Anfrage senden", "story.eyebrow": "OUR STORY", "story.title": "Tradition trifft moderne Eleganz.", "story.text1": "Seit 2022 widmen wir uns der Herstellung und Lieferung hochwertiger afghanischer Kleidung. Mit eigenen Schneidereien in Afghanistan verbinden wir traditionelle Handwerkskunst mit einem modernen Anspruch.", "story.text2": "Dabei möchten wir schöne Mode zugänglich halten und gleichzeitig Arbeitsplätze schaffen und Familien vor Ort unterstützen.", "stats.since": "Seitdem aktiv", "stats.designs": "Design-Möglichkeiten", "stats.shipping": "Weltweiter Versand", "gallery.eyebrow": "AT MOMENTS", "gallery.title": "Details. Stoffe. Handwerk.", "gallery.intro": "Unsere Galerie kann jederzeit um neue Bilder erweitert werden.", "cta.eyebrow": "READY FOR YOUR LOOK?", "cta.title": "Ein Kleid, das zu dir gehört.", "cta.button": "Bestellanfrage starten", "footer.tagline": "Timeless beauty, made for you.", "footer.explore": "Entdecken", "footer.contact": "Kontakt", "footer.editor": "Website Editor →", "footer.rights": "Alle Rechte vorbehalten.", "cart.eyebrow": "YOUR SELECTION", "cart.title": "Warenkorb", "cart.total": "Gesamt", "cart.order": "Bestellanfrage senden", "request.eyebrow": "PERSONAL REQUEST", "request.title": "Bestellanfrage", "request.note": "Fülle das Formular aus. Es öffnet sich anschließend eine vorbereitete E-Mail mit deiner Anfrage.", "request.name": "Name", "request.email": "E-Mail", "request.size": "Größe / Maße", "request.message": "Nachricht", "request.submit": "Anfrage vorbereiten", all: "Alle", add: "In den Warenkorb", details: "Details", sale: "Angebot" },
  en: { announcement: "Worldwide shipping · Custom tailoring to your measurements", "nav.home": "Home", "nav.collection": "Collection", "nav.tailoring": "Custom Tailoring", "nav.story": "Our Story", "nav.gallery": "Gallery", "nav.contact": "Contact", "hero.eyebrow": "AFGHAN FASHION · SINCE 2022", "hero.title": "Timeless beauty.<br><span>Made for you.</span>", "hero.text": "Afghan elegance, reimagined – with attention to detail, our own tailoring and worldwide delivery.", "hero.cta": "Explore collection", "hero.custom": "Custom tailoring", "hero.cardTop": "AT", "hero.cardBottom": "Afghan Couture", "collection.eyebrow": "THE COLLECTION", "collection.title": "Elegance that lasts.", "collection.intro": "Discover selected Afghan dresses. Available from stock or individually tailored to your measurements.", "tailoring.eyebrow": "PERSONAL TAILORING", "tailoring.title": "Your dress.<br>Your measurements.<br>Your moment.", "tailoring.text": "Looking for something truly special? We tailor selected designs to your measurements. We discuss cut, fabric, colors and details together.", "tailoring.item1": "Personal measurements", "tailoring.item2": "Selected fabrics", "tailoring.item3": "Hand-finished details", "tailoring.item4": "Worldwide delivery", "tailoring.cta": "Send request", "story.eyebrow": "OUR STORY", "story.title": "Tradition meets modern elegance.", "story.text1": "Since 2022, we have focused on creating and delivering high-quality Afghan clothing. With our own tailoring workshops in Afghanistan, we connect traditional craftsmanship with a modern vision.", "story.text2": "We want beautiful fashion to remain accessible while creating jobs and supporting families locally.", "stats.since": "Active since", "stats.designs": "Design possibilities", "stats.shipping": "Worldwide shipping", "gallery.eyebrow": "AT MOMENTS", "gallery.title": "Details. Fabrics. Craft.", "gallery.intro": "Our gallery can be expanded with as many new images as you like.", "cta.eyebrow": "READY FOR YOUR LOOK?", "cta.title": "A dress that belongs to you.", "cta.button": "Start an order request", "footer.tagline": "Timeless beauty, made for you.", "footer.explore": "Explore", "footer.contact": "Contact", "footer.editor": "Website Editor →", "footer.rights": "All rights reserved.", "cart.eyebrow": "YOUR SELECTION", "cart.title": "Shopping bag", "cart.total": "Total", "cart.order": "Send order request", "request.eyebrow": "PERSONAL REQUEST", "request.title": "Order request", "request.note": "Complete the form. Your email app will open with a prepared request.", "request.name": "Name", "request.email": "Email", "request.size": "Size / measurements", "request.message": "Message", "request.submit": "Prepare request", all: "All", add: "Add to bag", details: "Details", sale: "Sale" },
  ps: { announcement: "نړیوال لېږد · ستاسو د اندازې مطابق ګنډل", "nav.home": "کور", "nav.collection": "ټولګه", "nav.tailoring": "د اندازې مطابق", "nav.story": "زموږ کیسه", "nav.gallery": "ګالري", "nav.contact": "اړیکه", "hero.eyebrow": "افغان فېشن · له ۲۰۲۲ راهیسې", "hero.title": "تلپاتې ښکلا.<br><span>ستاسو لپاره جوړه شوې.</span>", "hero.text": "افغانه ښکلا په نوې بڼه – د جزئیاتو، خپلې ګنډلو خونې او نړیوال لېږد سره.", "hero.cta": "ټولګه وګورئ", "hero.custom": "د اندازې مطابق", "hero.cardTop": "AT", "hero.cardBottom": "افغان کوتور", "collection.eyebrow": "ټولګه", "collection.title": "هغه ښکلا چې پاتې کېږي.", "collection.intro": "غوره شوي افغان کالي وګورئ؛ له سټاک څخه یې واخلئ یا د خپلو اندازو مطابق یې جوړ کړئ.", "tailoring.eyebrow": "شخصي ګنډنه", "tailoring.title": "ستاسو کالي.<br>ستاسو اندازه.<br>ستاسو شېبه.", "tailoring.text": "یو ځانګړی لباس غواړئ؟ موږ غوره ډیزاینونه ستاسو د اندازې مطابق جوړوو او د ټوکر، رنګ او جزئیاتو په اړه یوځای پرېکړه کوو.", "tailoring.item1": "شخصي اندازه", "tailoring.item2": "غوره ټوکرونه", "tailoring.item3": "لاس جوړ جزئیات", "tailoring.item4": "نړیوال لېږد", "tailoring.cta": "غوښتنه واستوئ", "story.eyebrow": "زموږ کیسه", "story.title": "دود او عصري ښکلا.", "story.text1": "له ۲۰۲۲ راهیسې موږ د لوړ کیفیت افغان جامو په جوړولو او نړیوال لېږد تمرکز کوو. په افغانستان کې خپلې ګنډلو خونې لرو او دودیز هنر له عصري لید سره یوځای کوو.", "story.text2": "زموږ هدف دا دی چې ښکلې جامې د لاسرسي وړ وساتو، د کار زمینه برابره کړو او له کورنیو ملاتړ وکړو.", "stats.since": "له دې وخته فعال", "stats.designs": "د ډیزاین امکانات", "stats.shipping": "نړیوال لېږد", "gallery.eyebrow": "AT شېبې", "gallery.title": "جزئیات. ټوکر. هنر.", "gallery.intro": "ګالري هر وخت د ډېرو انځورونو سره غځېدای شي.", "cta.eyebrow": "ستاسو د اندازې لپاره؟", "cta.title": "یو لباس چې ستاسو وي.", "cta.button": "د غوښتنې پیل", "footer.tagline": "تلپاتې ښکلا، ستاسو لپاره جوړه شوې.", "footer.explore": "وپلټئ", "footer.contact": "اړیکه", "footer.editor": "د ویبپاڼې اېډیټر →", "footer.rights": "ټول حقوق خوندي دي.", "cart.eyebrow": "ستاسو انتخاب", "cart.title": "د پېرود کڅوړه", "cart.total": "ټول", "cart.order": "د غوښتنې لېږل", "request.eyebrow": "شخصي غوښتنه", "request.title": "د فرمایش غوښتنه", "request.note": "فورمه ډکه کړئ؛ وروسته به ستاسو د غوښتنې لپاره چمتو ایمیل پرانیستل شي.", "request.name": "نوم", "request.email": "ایمیل", "request.size": "اندازه", "request.message": "پیغام", "request.submit": "غوښتنه چمتو کړئ", all: "ټول", add: "کڅوړې ته اضافه", details: "جزئیات", sale: "تخفیف" },
  fa: { announcement: "ارسال به سراسر جهان · دوخت مطابق اندازه شما", "nav.home": "خانه", "nav.collection": "مجموعه", "nav.tailoring": "دوخت سفارشی", "nav.story": "درباره ما", "nav.gallery": "گالری", "nav.contact": "تماس", "hero.eyebrow": "فیشن افغانی · از ۲۰۲۲", "hero.title": "زیبایی ماندگار.<br><span>برای شما ساخته شده.</span>", "hero.text": "ظرافت افغانی با نگاهی نو؛ با توجه به جزئیات، خیاطی اختصاصی و ارسال به سراسر جهان.", "hero.cta": "مشاهده مجموعه", "hero.custom": "دوخت سفارشی", "hero.cardTop": "AT", "hero.cardBottom": "کوتور افغانی", "collection.eyebrow": "مجموعه", "collection.title": "ظرافتی که می‌ماند.", "collection.intro": "لباس‌های منتخب افغانی را ببینید؛ از موجودی آماده سفارش دهید یا مطابق اندازه خود سفارش دهید.", "tailoring.eyebrow": "دوخت اختصاصی", "tailoring.title": "لباس شما.<br>اندازه شما.<br>لحظه شما.", "tailoring.text": "لباس خاصی می‌خواهید؟ طرح‌های منتخب را مطابق اندازه شما می‌دوزیم و درباره برش، پارچه، رنگ و جزئیات با هم تصمیم می‌گیریم.", "tailoring.item1": "اندازه‌گیری شخصی", "tailoring.item2": "پارچه‌های منتخب", "tailoring.item3": "جزئیات دست‌دوز", "tailoring.item4": "ارسال جهانی", "tailoring.cta": "ارسال درخواست", "story.eyebrow": "داستان ما", "story.title": "سنت در کنار ظرافت مدرن.", "story.text1": "از سال ۲۰۲۲ روی تولید و ارسال لباس‌های باکیفیت افغانی تمرکز داریم. با خیاطی‌های خود در افغانستان، هنر سنتی را با دیدگاه مدرن ترکیب می‌کنیم.", "story.text2": "هدف ما ارائه لباس زیبا با قیمت منصفانه و همزمان ایجاد فرصت‌های کاری و حمایت از خانواده‌ها در افغانستان است.", "stats.since": "فعال از", "stats.designs": "امکانات طراحی", "stats.shipping": "ارسال جهانی", "gallery.eyebrow": "لحظه‌های AT", "gallery.title": "جزئیات. پارچه. هنر.", "gallery.intro": "گالری را می‌توان بدون محدودیت با تصاویر جدید گسترش داد.", "cta.eyebrow": "آماده استایل شما؟", "cta.title": "لباسی که متعلق به شماست.", "cta.button": "شروع درخواست سفارش", "footer.tagline": "زیبایی ماندگار، برای شما ساخته شده.", "footer.explore": "کاوش", "footer.contact": "تماس", "footer.editor": "ویرایشگر وب‌سایت →", "footer.rights": "تمام حقوق محفوظ است.", "cart.eyebrow": "انتخاب شما", "cart.title": "سبد خرید", "cart.total": "مجموع", "cart.order": "ارسال درخواست سفارش", "request.eyebrow": "درخواست شخصی", "request.title": "درخواست سفارش", "request.note": "فرم را پر کنید؛ سپس یک ایمیل آماده برای درخواست شما باز می‌شود.", "request.name": "نام", "request.email": "ایمیل", "request.size": "سایز / اندازه‌ها", "request.message": "پیام", "request.submit": "آماده‌سازی درخواست", all: "همه", add: "افزودن به سبد", details: "جزئیات", sale: "پیشنهاد" }
};

let data = JSON.parse(localStorage.getItem("atEEData") || "null") || DEFAULT_DATA;
let lang = localStorage.getItem("atEELang") || "de";
let cart = JSON.parse(localStorage.getItem("atEECart") || "[]");
let currentCategory = "all";

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

// Supabase Init
const SUPABASE_URL = "https://gaxpagykgrcgxebnsyai.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Cgg8Dun5Sua_VpXj39ahHA_piGaeN8f";
let supabaseClient = null;

if (window.supabase) {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

function t(key) {
  return (translations[lang] && translations[lang][key]) || translations.de[key] || key;
}

function categoryLabel(cat) {
  const map = {
    "Abendkleider": { de: "Abendkleider", en: "Evening Dresses", ps: "د ماښام کالي", fa: "لباس‌های شب" },
    "Bestickung": { de: "Bestickung", en: "Embroidery", ps: "ګنډنه", fa: "گلدوزی" },
    "Festkleider": { de: "Festkleider", en: "Celebration Dresses", ps: "د محفل کالي", fa: "لباس‌های مجلسی" },
    "Tradition": { de: "Tradition", en: "Traditional", ps: "دودیز", fa: "سنتی" }
  };
  return map[cat]?.[lang] || cat;
}

function uiText(key) {
  const m = {
    custom: { de: "Maßanfertigung", en: "Custom", ps: "د اندازې مطابق", fa: "سفارشی" },
    stock: { de: "Aus Lager", en: "In stock", ps: "له سټاک څخه", fa: "موجود" },
    detail: {
      de: "Dieses Design kann aus dem Lager bestellt oder individuell nach Maß angefertigt werden.",
      en: "This design can be ordered from stock or tailored to your measurements.",
      ps: "دا ډیزاین له سټاک څخه اخیستل کېدای شي یا ستاسو د اندازې مطابق جوړېدای شي.",
      fa: "این طرح از موجودی یا مطابق اندازه شما قابل سفارش است."
    },
    empty: { de: "Dein Warenkorb ist leer.", en: "Your bag is empty.", ps: "ستاسو کڅوړه تشه ده.", fa: "سبد خرید شما خالی است." }
  };
  return m[key]?.[lang] || m[key]?.de || key;
}

function saveCart() {
  localStorage.setItem("atEECart", JSON.stringify(cart));
}

// Daten aus Supabase laden (falls vorhanden)
async function loadDataFromSupabase() {
  if (!supabaseClient) return;

  try {
    // 1. Settings
    const { data: settingsData } = await supabaseClient.from("site_settings").select("*").single();
    if (settingsData) {
      data.settings = { ...data.settings, ...settingsData };
    }

    // 2. Products
    const { data: productsData } = await supabaseClient.from("products").select("*");
    if (productsData && productsData.length > 0) {
      data.products = productsData;
    }

    // 3. Gallery
    const { data: galleryData } = await supabaseClient.from("gallery").select("*");
    if (galleryData && galleryData.length > 0) {
      data.gallery = galleryData.map(item => item.url || item.image_url || item);
    }
  } catch (err) {
    console.warn("Laden von Supabase fehlgeschlagen, verwende lokale/Standard-Daten.", err);
  } finally {
    applyLang();
  }
}

function applyBranding() {
  const logo = data.settings.logo || "assets/logo.gif";
  $$(".logo-spin, .footer-logo, .hero-logo").forEach(img => { img.src = logo; });

  if (data.settings.instagram) $("#instagramLink").href = data.settings.instagram;
  if (data.settings.tiktok) $("#tiktokLink").href = data.settings.tiktok;
}

function applyLang() {
  applyBranding();
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ps" || lang === "fa") ? "rtl" : "ltr";
  localStorage.setItem("atEELang", lang);

  $$("[data-i18n]").forEach(el => el.innerHTML = t(el.dataset.i18n));
  $$("[data-placeholder]").forEach(el => el.placeholder = t(el.dataset.placeholder));

  renderFilters();
  renderProducts();
  renderGallery();
  renderCart();
}

function renderFilters() {
  const cats = ["all", ...new Set(data.products.map(p => p.category))];
  const filtersEl = $("#categoryFilters");
  if (!filtersEl) return;

  filtersEl.innerHTML = cats.map(c => `
    <button class="filter ${c === currentCategory ? "active" : ""}" data-cat="${esc(c)}">
      ${c === "all" ? t("all") : esc(categoryLabel(c))}
    </button>
  `).join("");

  $$("#categoryFilters .filter").forEach(b => {
    b.onclick = () => {
      currentCategory = b.dataset.cat;
      renderFilters();
      renderProducts();
    };
  });
}

function renderProducts() {
  const gridEl = $("#productGrid");
  if (!gridEl) return;

  const list = currentCategory === "all" ? data.products : data.products.filter(p => p.category === currentCategory);

  gridEl.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-image">
        <img loading="lazy" src="${esc(p.image)}" alt="${esc(name(p))}">
        ${p.oldPrice ? `<span class="sale">${t("sale")}</span>` : ""}
      </div>
      <div class="product-info">
        <div class="product-cat">${esc(categoryLabel(p.category))}</div>
        <div class="product-name">${esc(name(p))}</div>
        <div class="price">
          <strong>€${Number(p.price).toFixed(0)}</strong>
          ${p.oldPrice ? `<span class="old-price">€${Number(p.oldPrice).toFixed(0)}</span>` : ""}
        </div>
        <div class="product-actions">
          <button class="small-btn" data-details="${p.id}">${t("details")}</button>
          <button class="small-btn primary" data-add="${p.id}">${t("add")}</button>
        </div>
      </div>
    </article>
  `).join("");

  $$("[data-details]").forEach(b => b.onclick = () => openProduct(b.dataset.details));
  $$("[data-add]").forEach(b => b.onclick = () => addToCart(b.dataset.add));
}

function name(p) {
  if (typeof p.name === "object" && p.name !== null) {
    return p.name[lang] || p.name.de || Object.values(p.name)[0] || "";
  }
  return p.name || "";
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, m => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[m]));
}

function renderGallery() {
  const galleryEl = $("#galleryGrid");
  if (!galleryEl) return;

  galleryEl.innerHTML = data.gallery.map((src, i) => `
    <div class="gallery-item">
      <img loading="lazy" src="${esc(src)}" alt="AT Evening Elegance ${i + 1}">
    </div>
  `).join("");
}

function openModal(id) {
  const modal = $(id);
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
}

function closeModal(el) {
  const modal = el.closest(".modal");
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
}

$$("[data-close]").forEach(b => b.onclick = () => closeModal(b));
$$(".modal-backdrop").forEach(b => b.onclick = () => closeModal(b));

function openProduct(id) {
  const p = data.products.find(x => x.id === id);
  if (!p) return;

  $("#productModalContent").innerHTML = `
    <div class="product-detail">
      <img src="${esc(p.image)}" alt="${esc(name(p))}">
      <div>
        <p class="eyebrow">${esc(categoryLabel(p.category))}</p>
        <h2>${esc(name(p))}</h2>
        <div class="price">
          <strong>€${Number(p.price).toFixed(0)}</strong>
          ${p.oldPrice ? `<span class="old-price">€${Number(p.oldPrice).toFixed(0)}</span>` : ""}
        </div>
        <p>${uiText("detail")}</p>
        <div class="size-row">
          ${["XS", "S", "M", "L", "XL"].map(s => `<button class="size-btn">${s}</button>`).join("")}
          <button class="size-btn" data-custom>${uiText("custom")}</button>
        </div>
        <button class="btn btn-gold full" id="modalAdd">${t("add")}</button>
      </div>
    </div>
  `;

  $$("#productModalContent .size-btn").forEach(b => b.onclick = () => {
    $$("#productModalContent .size-btn").forEach(x => x.classList.remove("selected"));
    b.classList.add("selected");
  });

  $("#modalAdd").onclick = () => {
    addToCart(id);
    closeModal($("#productModalContent"));
  };

  openModal("#productModal");
}

function addToCart(id) {
  cart.push(id);
  saveCart();
  updateCartCount();
  openModal("#cartModal");
  renderCart();
}

function updateCartCount() {
  const countEl = $("#cartCount");
  if (countEl) countEl.textContent = cart.length;
}

function renderCart() {
  const items = cart.map(id => data.products.find(p => p.id === id)).filter(Boolean);
  const cartItemsEl = $("#cartItems");

  if (cartItemsEl) {
    cartItemsEl.innerHTML = items.length ? items.map((p, i) => `
      <div class="cart-row">
        <img src="${esc(p.image)}">
        <div>
          <h4>${esc(name(p))}</h4>
          <small>€${Number(p.price).toFixed(0)}</small>
        </div>
        <button class="cart-remove" data-remove="${i}">×</button>
      </div>
    `).join("") : `<p class="modal-note">${uiText("empty")}</p>`;
  }

  const total = items.reduce((s, p) => s + Number(p.price), 0);
  const cartTotalEl = $("#cartTotal");
  if (cartTotalEl) cartTotalEl.textContent = `€${total.toFixed(0)}`;

  $$("[data-remove]").forEach(b => b.onclick = () => {
    cart.splice(Number(b.dataset.remove), 1);
    saveCart();
    renderCart();
    updateCartCount();
  });
}

function openRequest() {
  openModal("#requestModal");
}

function sendOrderToWhatsApp() {
  const items = cart.map(id => data.products.find(p => p.id === id)).filter(Boolean);
  if (!items.length) {
    renderCart();
    return;
  }

  const lines = items.map((p, i) => `${i + 1}. ${name(p)} – €${Number(p.price).toFixed(0)}`).join("\n");
  const total = items.reduce((s, p) => s + Number(p.price), 0);
  const msg = `AT Evening Elegance – Bestellanfrage\n\n${lines}\n\nGesamt: €${total.toFixed(0)}\n\nIch möchte diese Bestellung gerne anfragen. Bitte bestätigen Sie Verfügbarkeit, Größe/Maße und Versand.`;

  const number = (data.settings.whatsapp || "").replace(/[^0-9]/g, "");
  if (!number) {
    alert(
      lang === "de" ? "Bitte zuerst die WhatsApp-Nummer im Editor eintragen." :
      lang === "en" ? "Please add the WhatsApp number in the editor first." :
      lang === "ps" ? "مهرباني وکړئ لومړی په اېډیټر کې د WhatsApp شمېره ولیکئ." :
      "لطفاً ابتدا شماره واتساپ را در ویرایشگر وارد کنید."
    );
    return;
  }

  window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, "_blank");
}

function setup() {
  lang = localStorage.getItem("atEELang") || "de";
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const langSelect = $("#languageSelect");
  if (langSelect) {
    langSelect.value = lang;
    langSelect.onchange = e => {
      lang = e.target.value;
      applyLang();
    };
  }

  const menuBtn = $("#menuButton");
  if (menuBtn) {
    menuBtn.onclick = () => $("#mainNav")?.classList.toggle("open");
  }

  $$("#mainNav a").forEach(a => a.onclick = () => $("#mainNav")?.classList.remove("open"));

  const cartBtn = $("#cartButton");
  if (cartBtn) {
    cartBtn.onclick = () => {
      renderCart();
      openModal("#cartModal");
    };
  }

  const tailoringBtn = $("#tailoringButton");
  if (tailoringBtn) tailoringBtn.onclick = openRequest;

  const ctaBtn = $("#ctaButton");
  if (ctaBtn) ctaBtn.onclick = openRequest;

  const orderBtn = $("#orderButton");
  if (orderBtn) orderBtn.onclick = sendOrderToWhatsApp;

  const requestForm = $("#requestForm");
  if (requestForm) {
    requestForm.onsubmit = e => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const items = cart.map(id => name(data.products.find(p => p.id === id))).filter(Boolean).join(", ");
      const subject = encodeURIComponent(lang === "de" ? "Bestellanfrage – AT Evening Elegance" : "Order request – AT Evening Elegance");
      const body = encodeURIComponent(`Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\nSize: ${fd.get("size")}\nProducts: ${items}\n\n${fd.get("message")}`);
      location.href = `mailto:${data.settings.email || "info@ateveningelegance.com"}?subject=${subject}&body=${body}`;
    };
  }

  updateCartCount();
  loadDataFromSupabase();
}

setup();
