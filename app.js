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
let productMedia = [];
let shopCategories = [];
let realtimeRefreshTimer = null;

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
  const saved = shopCategories.find(category => category.slug === cat);
  if (saved) return saved[`name_${lang}`] || saved.name_de || cat;
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

    // 2. Categories and products
    const { data: categoryData, error: categoryError } = await supabaseClient.from("categories").select("*").eq("active", true).order("sort_order");
    if (categoryError) throw categoryError;
    shopCategories = categoryData || [];

    const { data: productsData } = await supabaseClient.from("products").select("*").order("sort_order");
    if (productsData && productsData.length > 0) {
      data.products = productsData.map(p => ({
        ...p,
        name: { de: p.name_de, en: p.name_en, ps: p.name_ps, fa: p.name_fa },
        description: { de: p.description_de, en: p.description_en, ps: p.description_ps, fa: p.description_fa },
        oldPrice: p.old_price,
        image: p.image_url,
        tryOnImage: p.tryon_image_url || ""
      }));
    }

    const { data: mediaData } = await supabaseClient.from("product_media").select("*").order("sort_order");
    productMedia = mediaData || [];

    // 3. Gallery
    const { data: galleryData } = await supabaseClient.from("gallery").select("*").order("sort_order");
    if (galleryData && galleryData.length > 0) {
      data.gallery = galleryData;
    }
  } catch (err) {
    console.warn("Laden von Supabase fehlgeschlagen, verwende lokale/Standard-Daten.", err);
  } finally {
    applyLang();
  }
}

function applyBranding() {
  const logo = data.settings.logo_url || data.settings.logo || "assets/logo.gif";
  $$(".logo-spin, .footer-logo, .hero-logo").forEach(img => { img.src = logo; });

  if (data.settings.instagram) $("#instagramLink").href = data.settings.instagram;
  if (data.settings.tiktok) $("#tiktokLink").href = data.settings.tiktok;
  if (data.settings.email) $("#contactEmail").textContent = data.settings.email;
  const content = data.settings.content || {};
  $$('[data-content]').forEach(el => {
    const value = content[el.dataset.content];
    if (value) el.textContent = value;
  });
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
  const savedCategories = shopCategories.map(category => category.slug);
  const productCategories = data.products.map(product => product.category);
  const cats = ["all", ...new Set([...savedCategories, ...productCategories])];
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

  galleryEl.innerHTML = data.gallery.map((item, i) => {
    const src = typeof item === "string" ? item : item.image_url;
    return `
    <div class="gallery-item">
      ${item.media_type === "video"
        ? `<video controls playsinline preload="metadata" ${item.poster_url ? `poster="${esc(item.poster_url)}"` : ""}><source src="${esc(src)}"></video>`
        : `<img loading="lazy" src="${esc(src)}" alt="${esc(item.title || `AT Afghanen ${i + 1}`)}">`}
    </div>
  `}).join("");
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
    if (modal.id === "tryOnModal") clearTryOnPhoto();
  }
}

$$("[data-close]").forEach(b => b.onclick = () => closeModal(b));
$$(".modal-backdrop").forEach(b => b.onclick = () => closeModal(b));

function openProduct(id) {
  const p = data.products.find(x => x.id === id);
  if (!p) return;

  const media = [{ media_type: "image", url: p.image }, ...productMedia.filter(m => m.product_id === id)];
  const description = p.description?.[lang] || p.description?.de || uiText("detail");
  $("#productModalContent").innerHTML = `
    <div class="product-detail">
      <div><div class="product-main-media">${media[0].media_type === "video" ? `<video controls playsinline src="${esc(media[0].url)}"></video>` : `<img src="${esc(media[0].url)}" alt="${esc(name(p))}">`}</div>
      ${media.length > 1 ? `<div class="media-thumbs">${media.map((m, i) => `<button data-media="${i}">${m.media_type === "video" ? "▶" : `<img src="${esc(m.url)}" alt="">`}</button>`).join("")}</div>` : ""}</div>
      <div>
        <p class="eyebrow">${esc(categoryLabel(p.category))}</p>
        <h2>${esc(name(p))}</h2>
        <div class="price">
          <strong>€${Number(p.price).toFixed(0)}</strong>
          ${p.oldPrice ? `<span class="old-price">€${Number(p.oldPrice).toFixed(0)}</span>` : ""}
        </div>
        <p>${esc(description)}</p>
        <div class="size-row">
          ${["XS", "S", "M", "L", "XL"].map(s => `<button class="size-btn">${s}</button>`).join("")}
          <button class="size-btn" data-custom>${uiText("custom")}</button>
        </div>
        <button class="btn btn-gold full" id="modalAdd">${t("add")}</button>
        <button class="btn btn-ghost full tryon-open" id="modalTryOn">${tryOnText("open")}</button>
      </div>
    </div>
  `;

  $$('[data-media]').forEach(button => button.onclick = () => {
    const m = media[Number(button.dataset.media)];
    $(".product-main-media").innerHTML = m.media_type === "video"
      ? `<video controls autoplay playsinline src="${esc(m.url)}"></video>`
      : `<img src="${esc(m.url)}" alt="${esc(name(p))}">`;
  });

  $$("#productModalContent .size-btn").forEach(b => b.onclick = () => {
    $$("#productModalContent .size-btn").forEach(x => x.classList.remove("selected"));
    b.classList.add("selected");
  });

  $("#modalAdd").onclick = () => {
    addToCart(id);
    closeModal($("#productModalContent"));
  };
  $("#modalTryOn").onclick = () => {
    closeModal($("#productModalContent"));
    openTryOn(p);
  };

  openModal("#productModal");
}

let tryOnObjectUrl = "";
let poseLandmarkerPromise = null;
let tryOnState = { x: 0, y: 0, scale: 1, rotation: 0, dragging: false, startX: 0, startY: 0 };

async function getPoseLandmarker() {
  if (!poseLandmarkerPromise) {
    poseLandmarkerPromise = (async () => {
      const vision = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/+esm");
      const fileset = await vision.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm"
      );
      return vision.PoseLandmarker.createFromOptions(fileset, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "CPU"
        },
        runningMode: "IMAGE",
        numPoses: 1,
        minPoseDetectionConfidence: 0.45,
        minPosePresenceConfidence: 0.45
      });
    })();
  }
  return poseLandmarkerPromise;
}

async function autoFitTryOn() {
  const person = $("#tryOnPerson");
  const garment = $("#tryOnGarment");
  const stage = $(".tryon-stage");
  const status = $("#tryOnAutoStatus");
  if (!person?.src || person.hidden || !garment || !stage) return;

  try {
    status.textContent = tryOnText("detecting");
    const detector = await getPoseLandmarker();
    const result = detector.detect(person);
    const points = result.landmarks?.[0];
    if (!points) throw new Error("pose-not-found");

    const needed = [11,12,23,24,27,28].map(i => points[i]);
    if (needed.some(p => !p || (p.visibility ?? 1) < 0.35)) throw new Error("pose-not-clear");

    const stageW = stage.clientWidth;
    const stageH = stage.clientHeight;
    const imageScale = Math.min(stageW / person.naturalWidth, stageH / person.naturalHeight);
    const renderW = person.naturalWidth * imageScale;
    const renderH = person.naturalHeight * imageScale;
    const offsetX = (stageW - renderW) / 2;
    const offsetY = (stageH - renderH) / 2;
    const point = p => ({ x: offsetX + p.x * renderW, y: offsetY + p.y * renderH });

    const leftShoulder = point(points[11]), rightShoulder = point(points[12]);
    const leftHip = point(points[23]), rightHip = point(points[24]);
    const leftAnkle = point(points[27]), rightAnkle = point(points[28]);
    const topY = (leftShoulder.y + rightShoulder.y) / 2 - renderH * 0.025;
    const bottomY = (leftAnkle.y + rightAnkle.y) / 2;
    const hipX = (leftHip.x + rightHip.x) / 2;
    const shoulderX = (leftShoulder.x + rightShoulder.x) / 2;
    const targetX = (hipX + shoulderX) / 2;
    const targetY = (topY + bottomY) / 2;
    const targetHeight = Math.max(120, bottomY - topY);

    if (!garment.complete) await new Promise((resolve,reject) => {
      garment.addEventListener("load", resolve, { once:true });
      garment.addEventListener("error", reject, { once:true });
    });
    const baseHeight = Math.max(1, garment.offsetHeight);
    tryOnState.x = targetX - stageW / 2;
    tryOnState.y = targetY - stageH / 2;
    tryOnState.scale = Math.max(0.35, Math.min(2.2, targetHeight / baseHeight));
    tryOnState.rotation = 0;
    $("#tryOnScale").value = String(tryOnState.scale);
    $("#tryOnVertical").value = String(Math.max(-160, Math.min(160, tryOnState.y)));
    updateTryOnTransform();
    status.textContent = tryOnText("fitted");
  } catch (error) {
    console.warn("Automatische Körpererkennung nicht möglich", error);
    status.textContent = tryOnText("notFound");
  }
}

function tryOnText(key) {
  const labels = {
    open: { de:"Virtuell anprobieren", en:"Virtual try-on", ps:"مجازی یې وازمویئ", fa:"پرو مجازی لباس" },
    eyebrow: { de:"KOSTENLOSE VORSCHAU", en:"FREE PREVIEW", ps:"وړیا مخکتنه", fa:"پیش‌نمایش رایگان" },
    hint: { de:"Links siehst du das Produkt. Rechts lädst du dein eigenes Ganzkörperfoto hoch.", en:"The product is shown on the left. Upload your own full-body photo on the right.", ps:"محصول په کیڼ اړخ کې وګورئ او خپل د ټول بدن انځور په ښي اړخ کې پورته کړئ.", fa:"محصول را در سمت چپ ببینید و عکس تمام‌قد خود را در سمت راست بارگذاری کنید." },
    privacy: { de:"🔒 Dein Foto wird nirgendwo gespeichert oder hochgeladen. Es bleibt nur auf deinem Handy bzw. Gerät und wird beim Schließen über das × sofort aus der Anprobe gelöscht.", en:"🔒 Your photo is never saved or uploaded. It stays only on your phone or device and is deleted from the preview immediately when you close it with ×.", ps:"🔒 ستاسو انځور هېڅ ځای نه ساتل کېږي او نه پورته کېږي. یوازې ستاسو په موبایل یا وسیله کې پاتې کېږي او د × په تړلو سره سمدستي له مخکتنې حذف کېږي.", fa:"🔒 عکس شما در هیچ‌جا ذخیره یا بارگذاری نمی‌شود. فقط روی موبایل یا دستگاه شما می‌ماند و با بستن پنجره از طریق × فوراً از پیش‌نمایش حذف می‌شود." },
    example: { de:"Beispiel", en:"Example", ps:"بېلګه", fa:"نمونه" },
    exampleHint: { de:"So sollte das Ganzkörperfoto der Person aussehen: von vorne, vollständig und gut beleuchtet.", en:"The person's full-body photo should look like this: front-facing, complete and well lit.", ps:"د شخص د ټول بدن انځور باید داسې وي: له مخ څخه، بشپړ او ښه روښانه.", fa:"عکس تمام‌قد شخص باید به این شکل باشد: از روبه‌رو، کامل و با نور مناسب." },
    upload: { de:"Ganzkörperfoto auswählen", en:"Choose a full-body photo", ps:"د ټول بدن انځور وټاکئ", fa:"عکس تمام‌قد را انتخاب کنید" },
    fallback: { de:"Für dieses ältere Produkt wurde noch kein freigestelltes Anprobe-Bild erzeugt. Im Admin-Bereich kannst du es automatisch erstellen.", en:"A cut-out try-on image has not yet been created for this older product. You can create it automatically in the admin area.", ps:"د دې پخواني محصول لپاره لا شفاف انځور نه دی جوړ شوی. په اډمین برخه کې یې په اوتومات ډول جوړولی شئ.", fa:"برای این محصول قدیمی هنوز تصویر بدون پس‌زمینه ساخته نشده است. می‌توانید آن را در بخش مدیریت به‌صورت خودکار ایجاد کنید." },
    empty: { de:"Hier erscheint dein Ganzkörperfoto.", en:"Your full-body photo will appear here.", ps:"ستاسو د ټول بدن انځور به دلته ښکاره شي.", fa:"عکس تمام‌قد شما اینجا نمایش داده می‌شود." },
    size: { de:"Größe", en:"Size", ps:"اندازه", fa:"اندازه" },
    height: { de:"Höhe", en:"Height", ps:"لوړوالی", fa:"ارتفاع" },
    rotateLeft: { de:"↶ Drehen", en:"↶ Rotate", ps:"↶ وڅرخوئ", fa:"↶ چرخش" },
    rotateRight: { de:"Drehen ↷", en:"Rotate ↷", ps:"وڅرخوئ ↷", fa:"چرخش ↷" },
    auto: { de:"Automatisch anpassen", en:"Fit automatically", ps:"اوتومات برابرول", fa:"تنظیم خودکار" },
    reset: { de:"Zurücksetzen", en:"Reset", ps:"بیا تنظیم", fa:"بازنشانی" },
    waiting: { de:"Nach dem Hochladen wird das Kleid automatisch angepasst.", en:"The dress will be fitted automatically after upload.", ps:"له پورته کولو وروسته به کالي په اوتومات ډول برابر شي.", fa:"پس از بارگذاری، لباس به‌صورت خودکار تنظیم می‌شود." },
    detecting: { de:"Körper wird automatisch erkannt …", en:"Detecting your body automatically …", ps:"بدن په اوتومات ډول پېژندل کېږي …", fa:"بدن به‌صورت خودکار شناسایی می‌شود …" },
    fitted: { de:"Automatisch angepasst. Du kannst das Kleid bei Bedarf noch verschieben.", en:"Fitted automatically. You can still move the dress if needed.", ps:"په اوتومات ډول برابر شو. که اړتیا وي کالي خوځولی شئ.", fa:"به‌صورت خودکار تنظیم شد. در صورت نیاز می‌توانید لباس را جابه‌جا کنید." },
    notFound: { de:"Körper nicht eindeutig erkannt. Bitte nutze ein Ganzkörperfoto von vorne oder passe das Kleid manuell an.", en:"Your body could not be detected clearly. Use a front-facing full-body photo or adjust the dress manually.", ps:"بدن روښانه ونه پېژندل شو. له مخ څخه د ټول بدن انځور وکاروئ یا کالي په لاس برابر کړئ.", fa:"بدن به‌وضوح شناسایی نشد. از عکس تمام‌قد روبه‌رو استفاده کنید یا لباس را دستی تنظیم کنید." }
  };
  return labels[key]?.[lang] || labels[key]?.de || key;
}

function updateTryOnTransform() {
  const garment = $("#tryOnGarment");
  if (garment) garment.style.transform = `translate(${tryOnState.x}px,${tryOnState.y}px) translate(-50%,-50%) scale(${tryOnState.scale}) rotate(${tryOnState.rotation}deg)`;
}

function resetTryOn() {
  tryOnState = { x:0, y:0, scale:1, rotation:0, dragging:false, startX:0, startY:0 };
  $("#tryOnScale").value = "1";
  $("#tryOnVertical").value = "0";
  updateTryOnTransform();
}

function clearTryOnPhoto() {
  if (tryOnObjectUrl) {
    URL.revokeObjectURL(tryOnObjectUrl);
    tryOnObjectUrl = "";
  }
  const input = $("#tryOnPhoto");
  const person = $("#tryOnPerson");
  const garment = $("#tryOnGarment");
  const empty = $("#tryOnEmpty");
  if (input) input.value = "";
  if (person) {
    person.removeAttribute("src");
    person.hidden = true;
    person.onload = null;
  }
  if (garment) garment.hidden = true;
  if (empty) empty.hidden = false;
  const status = $("#tryOnAutoStatus");
  if (status) status.textContent = tryOnText("waiting");
  resetTryOn();
}

function openTryOn(product) {
  $("#tryOnTitle").textContent = name(product);
  $("#tryOnEyebrow").textContent = tryOnText("eyebrow");
  $("#tryOnUploadLabel").textContent = tryOnText("upload");
  $("#tryOnHint").textContent = tryOnText("hint");
  $("#tryOnPrivacy").textContent = tryOnText("privacy");
  $("#tryOnExampleTitle").textContent = tryOnText("example");
  $("#tryOnExampleHint").textContent = tryOnText("exampleHint");
  $("#tryOnFallback").textContent = tryOnText("fallback");
  $("#tryOnEmpty").textContent = tryOnText("empty");
  $("#tryOnSizeLabel").textContent = tryOnText("size");
  $("#tryOnHeightLabel").textContent = tryOnText("height");
  $("#tryOnRotateLeft").textContent = tryOnText("rotateLeft");
  $("#tryOnRotateRight").textContent = tryOnText("rotateRight");
  $("#tryOnAutoFit").textContent = tryOnText("auto");
  $("#tryOnReset").textContent = tryOnText("reset");
  $("#tryOnAutoStatus").textContent = tryOnText("waiting");
  $("#tryOnExampleImage").alt = tryOnText("exampleHint");
  const garment = $("#tryOnGarment");
  garment.src = product.tryOnImage || product.image;
  garment.classList.toggle("uncut", !product.tryOnImage);
  $("#tryOnFallback").hidden = Boolean(product.tryOnImage);
  resetTryOn();
  openModal("#tryOnModal");
}

function setupTryOn() {
  const input = $("#tryOnPhoto");
  const person = $("#tryOnPerson");
  const empty = $("#tryOnEmpty");
  const garment = $("#tryOnGarment");
  if (!input || !garment) return;

  input.onchange = () => {
    const file = input.files?.[0];
    if (!file) return;
    if (tryOnObjectUrl) URL.revokeObjectURL(tryOnObjectUrl);
    tryOnObjectUrl = URL.createObjectURL(file);
    person.onload = () => autoFitTryOn();
    person.src = tryOnObjectUrl;
    person.hidden = false;
    empty.hidden = true;
    garment.hidden = false;
    resetTryOn();
  };
  $("#tryOnScale").oninput = event => { tryOnState.scale = Number(event.target.value); updateTryOnTransform(); };
  $("#tryOnVertical").oninput = event => { tryOnState.y = Number(event.target.value); updateTryOnTransform(); };
  $("#tryOnRotateLeft").onclick = () => { tryOnState.rotation -= 5; updateTryOnTransform(); };
  $("#tryOnRotateRight").onclick = () => { tryOnState.rotation += 5; updateTryOnTransform(); };
  $("#tryOnReset").onclick = resetTryOn;
  $("#tryOnAutoFit").onclick = autoFitTryOn;

  garment.addEventListener("pointerdown", event => {
    tryOnState.dragging = true;
    tryOnState.startX = event.clientX - tryOnState.x;
    tryOnState.startY = event.clientY - tryOnState.y;
    garment.setPointerCapture(event.pointerId);
  });
  garment.addEventListener("pointermove", event => {
    if (!tryOnState.dragging) return;
    tryOnState.x = event.clientX - tryOnState.startX;
    tryOnState.y = event.clientY - tryOnState.startY;
    $("#tryOnVertical").value = String(Math.max(-160, Math.min(160, tryOnState.y)));
    updateTryOnTransform();
  });
  garment.addEventListener("pointerup", () => { tryOnState.dragging = false; });
  garment.addEventListener("pointercancel", () => { tryOnState.dragging = false; });
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

async function sendOrderToWhatsApp(form) {
  const items = cart.map(id => data.products.find(p => p.id === id)).filter(Boolean);
  if (!items.length) {
    renderCart();
    return;
  }

  const grouped = items.reduce((map, p) => map.set(p.id, { product: p, qty: (map.get(p.id)?.qty || 0) + 1 }), new Map());
  const lines = [...grouped.values()].map(({ product: p, qty }) => `• ${name(p)} | ${qty} × €${Number(p.price).toFixed(2)} = €${(qty * Number(p.price)).toFixed(2)}`).join("\n");
  const total = items.reduce((s, p) => s + Number(p.price), 0);
  const fd = new FormData(form);
  const customer = {
    name: String(fd.get("name") || "").trim(), phone: String(fd.get("phone") || "").trim(),
    email: String(fd.get("email") || "").trim(), address: String(fd.get("address") || "").trim(),
    notes: String(fd.get("message") || "").trim()
  };
  const msg = `AT Afghanen – Bestellung\n\nKundin/Kunde: ${customer.name}\nTelefon: ${customer.phone}\nE-Mail: ${customer.email}\nAdresse: ${customer.address}\n\nWARENKORB\n${lines}\n\nGesamt: €${total.toFixed(2)}\n\nNotiz: ${customer.notes || "–"}`;

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

  const orderItems = [...grouped.values()].map(({ product: p, qty }) => ({ product_id: p.id, name: name(p), quantity: qty, unit_price: Number(p.price) }));
  if (supabaseClient) {
    const { error } = await supabaseClient.from("orders").insert({ customer_name: customer.name, phone: customer.phone, email: customer.email, address: customer.address, notes: customer.notes, items: orderItems, total });
    if (error) console.warn("Bestellung konnte nicht protokolliert werden", error);
  }
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
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
  if (orderBtn) orderBtn.onclick = () => {
    if (!cart.length) return;
    closeModal(orderBtn);
    openRequest();
  };

  const requestForm = $("#requestForm");
  if (requestForm) {
    requestForm.onsubmit = async e => {
      e.preventDefault();
      await sendOrderToWhatsApp(e.target);
    };
  }

  updateCartCount();
  setupTryOn();
  loadDataFromSupabase();

  if (supabaseClient) {
    supabaseClient.channel("shop-live-updates")
      .on("postgres_changes", { event:"*", schema:"public", table:"site_settings" }, scheduleShopRefresh)
      .on("postgres_changes", { event:"*", schema:"public", table:"categories" }, scheduleShopRefresh)
      .on("postgres_changes", { event:"*", schema:"public", table:"products" }, scheduleShopRefresh)
      .on("postgres_changes", { event:"*", schema:"public", table:"product_media" }, scheduleShopRefresh)
      .on("postgres_changes", { event:"*", schema:"public", table:"gallery" }, scheduleShopRefresh)
      .subscribe();
  }
}

function scheduleShopRefresh() {
  clearTimeout(realtimeRefreshTimer);
  realtimeRefreshTimer = setTimeout(loadDataFromSupabase, 250);
}

setup();

