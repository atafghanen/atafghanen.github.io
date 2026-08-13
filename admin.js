const SUPABASE_URL = "https://gaxpagykgrcgxebnsyai.supabase.co";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const $ = (selector) => document.querySelector(selector);

let products = [];
let categories = [];
let gallery = [];
let settings = null;

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}

function showError(message) {
  console.error(message);
  alert(message);
}

/* =========================
   ADMIN LADEN
========================= */

async function loadAdmin() {
  try {
    await loadSettings();
    await loadCategories();
    await loadProducts();
    await loadGallery();

    renderAll();

  } catch (error) {
    console.error(error);
    showError("Die Daten konnten nicht geladen werden.");
  }
}

/* =========================
   EINSTELLUNGEN
========================= */

async function loadSettings() {
  const { data, error } = await supabaseClient
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw error;

  settings = data || {
    id: 1,
    instagram: "",
    tiktok: "",
    email: "info@ateveningelegance.com",
    whatsapp: "",
    logo_url: "assets/logo.gif"
  };

  $("#instagram").value = settings.instagram || "";
  $("#tiktok").value = settings.tiktok || "";
  $("#email").value = settings.email || "";
  $("#whatsapp").value = settings.whatsapp || "";
}

async function saveSettings() {
  const update = {
    instagram: $("#instagram").value.trim(),
    tiktok: $("#tiktok").value.trim(),
    email: $("#email").value.trim(),
    whatsapp: $("#whatsapp").value.trim(),
    updated_at: new Date().toISOString()
  };

  const { error } = await supabaseClient
    .from("site_settings")
    .update(update)
    .eq("id", 1);

  if (error) {
    showError("Website-Einstellungen konnten nicht gespeichert werden.");
    return;
  }

  settings = { ...settings, ...update };

  alert("Website-Einstellungen gespeichert.");
}

/* =========================
   KATEGORIEN
========================= */

async function loadCategories() {
  const { data, error } = await supabaseClient
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  categories = data || [];
}

function renderCategories() {
  $("#categories").innerHTML = categories.map((cat) => `
    <div class="category-editor" style="padding:15px;border-bottom:1px solid #ddd">

      <label>
        Deutsch
        <input
          data-category-de="${cat.id}"
          value="${esc(cat.name_de)}"
        >
      </label>

      <label>
        English
        <input
          data-category-en="${cat.id}"
          value="${esc(cat.name_en)}"
        >
      </label>

      <label>
        Pashto
        <input
          data-category-ps="${cat.id}"
          value="${esc(cat.name_ps)}"
        >
      </label>

      <label>
        Dari
        <input
          data-category-fa="${cat.id}"
          value="${esc(cat.name_fa)}"
        >
      </label>

      <button
        class="gold"
        data-save-category="${cat.id}"
      >
        Kategorie speichern
      </button>

      <button
        class="delete"
        data-delete-category="${cat.id}"
      >
        Löschen
      </button>

    </div>
  `).join("");

  document.querySelectorAll("[data-save-category]").forEach((button) => {
    button.onclick = () => saveCategory(button.dataset.saveCategory);
  });

  document.querySelectorAll("[data-delete-category]").forEach((button) => {
    button.onclick = () => deleteCategory(button.dataset.deleteCategory);
  });
}

async function saveCategory(id) {
  const category = categories.find((c) => c.id === id);
  if (!category) return;

  const update = {
    name_de: document.querySelector(`[data-category-de="${id}"]`).value.trim(),
    name_en: document.querySelector(`[data-category-en="${id}"]`).value.trim(),
    name_ps: document.querySelector(`[data-category-ps="${id}"]`).value.trim(),
    name_fa: document.querySelector(`[data-category-fa="${id}"]`).value.trim(),
    updated_at: new Date().toISOString()
  };

  const { error } = await supabaseClient
    .from("categories")
    .update(update)
    .eq("id", id);

  if (error) {
    showError("Kategorie konnte nicht gespeichert werden.");
    return;
  }

  Object.assign(category, update);

  await loadProducts();
  renderAll();

  alert("Kategorie gespeichert.");
}

async function addCategory() {
  const name = prompt("Wie soll die neue Kategorie heißen?");

  if (!name || !name.trim()) return;

  const cleanName = name.trim();

  const slug = cleanName
    .toLowerCase()
    .replace(/[ä]/g, "ae")
    .replace(/[ö]/g, "oe")
    .replace(/[ü]/g, "ue")
    .replace(/[ß]/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const { error } = await supabaseClient
    .from("categories")
    .insert({
      slug: slug || `category-${Date.now()}`,
      name_de: cleanName,
      name_en: cleanName,
      name_ps: cleanName,
      name_fa: cleanName,
      sort_order: categories.length,
      active: true
    });

  if (error) {
    showError("Kategorie konnte nicht erstellt werden.");
    return;
  }

  await loadCategories();
  renderCategories();

  alert("Kategorie hinzugefügt.");
}

async function deleteCategory(id) {
  const category = categories.find((c) => c.id === id);
  if (!category) return;

  const used = products.some((p) => p.category === category.slug);

  if (used) {
    alert(
      "Diese Kategorie wird noch von einem Produkt verwendet. " +
      "Ordne die Produkte zuerst einer anderen Kategorie zu."
    );
    return;
  }

  if (!confirm(`Kategorie "${category.name_de}" wirklich löschen?`)) {
    return;
  }

  const { error } = await supabaseClient
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) {
    showError("Kategorie konnte nicht gelöscht werden.");
    return;
  }

  await loadCategories();
  renderCategories();
}

/* =========================
   PRODUKTE
========================= */

async function loadProducts() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  products = data || [];
}

function categoryOptions(selected) {
  return categories.map((cat) => {
    const value = cat.slug;

    return `
      <option
        value="${esc(value)}"
        ${value === selected ? "selected" : ""}
      >
        ${esc(cat.name_de)}
      </option>
    `;
  }).join("");
}

function renderProducts() {
  $("#products").innerHTML = products.map((p) => `
    <div
      class="product-editor"
      style="padding:20px;border-bottom:1px solid #ddd"
    >

      <img
        src="${esc(p.image_url || "assets/logo.gif")}"
        alt=""
        style="width:140px;height:180px;object-fit:cover"
      >

      <label>
        Deutsch
        <input
          data-product-de="${p.id}"
          value="${esc(p.name_de)}"
        >
      </label>

      <label>
        English
        <input
          data-product-en="${p.id}"
          value="${esc(p.name_en)}"
        >
      </label>

      <label>
        Pashto
        <input
          data-product-ps="${p.id}"
          value="${esc(p.name_ps)}"
        >
      </label>

      <label>
        Dari
        <input
          data-product-fa="${p.id}"
          value="${esc(p.name_fa)}"
        >
      </label>

      <label>
        Kategorie
        <select data-product-category="${p.id}">
          ${categoryOptions(p.category)}
        </select>
      </label>

      <label>
        Preis €
        <input
          type="number"
          step="0.01"
          data-product-price="${p.id}"
          value="${esc(p.price)}"
        >
      </label>

      <label>
        Alter Preis €
        <input
          type="number"
          step="0.01"
          data-product-old-price="${p.id}"
          value="${esc(p.old_price ?? "")}"
        >
      </label>

      <label>
        Produktbild
        <input
          type="file"
          accept="image/*"
          data-product-file="${p.id}"
        >
      </label>

      <button
        class="gold"
        data-save-product="${p.id}"
      >
        Produkt speichern
      </button>

      <button
        class="delete"
        data-delete-product="${p.id}"
      >
        Produkt löschen
      </button>

    </div>
  `).join("");

  document.querySelectorAll("[data-save-product]").forEach((button) => {
    button.onclick = () => saveProduct(button.dataset.saveProduct);
  });

  document.querySelectorAll("[data-delete-product]").forEach((button) => {
    button.onclick = () => deleteProduct(button.dataset.deleteProduct);
  });

  document.querySelectorAll("[data-product-file]").forEach((input) => {
    input.onchange = () => uploadProductImage(
      input.dataset.productFile,
      input.files[0]
    );
  });
}

async function saveProduct(id) {
  const update = {
    name_de: document.querySelector(`[data-product-de="${id}"]`).value.trim(),
    name_en: document.querySelector(`[data-product-en="${id}"]`).value.trim(),
    name_ps: document.querySelector(`[data-product-ps="${id}"]`).value.trim(),
    name_fa: document.querySelector(`[data-product-fa="${id}"]`).value.trim(),
    category: document.querySelector(`[data-product-category="${id}"]`).value,
    price: Number(document.querySelector(`[data-product-price="${id}"]`).value),
    old_price: (() => {
      const value =
        document.querySelector(`[data-product-old-price="${id}"]`).value;

      return value === "" ? null : Number(value);
    })(),
    updated_at: new Date().toISOString()
  };

  const { error } = await supabaseClient
    .from("products")
    .update(update)
    .eq("id", id);

  if (error) {
    showError("Produkt konnte nicht gespeichert werden.");
    return;
  }

  await loadProducts();
  renderProducts();

  alert("Produkt gespeichert.");
}

async function addProduct() {
  const firstCategory = categories[0];

  if (!firstCategory) {
    alert("Bitte zuerst eine Kategorie erstellen.");
    return;
  }

  const { error } = await supabaseClient
    .from("products")
    .insert({
      name_de: "Neues Kleid",
      name_en: "New Dress",
      name_ps: "نوي کالي",
      name_fa: "لباس جدید",
      category: firstCategory.slug,
      price: 0,
      old_price: null,
      image_url: "assets/logo.gif",
      sort_order: products.length
    });

  if (error) {
    showError("Produkt konnte nicht hinzugefügt werden.");
    return;
  }

  await loadProducts();
  renderProducts();

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}

async function deleteProduct(id) {
  const product = products.find((p) => p.id === id);

  if (!product) return;

  if (!confirm(
    `Produkt "${product.name_de}" wirklich löschen?`
  )) {
    return;
  }

  const { error } = await supabaseClient
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    showError("Produkt konnte nicht gelöscht werden.");
    return;
  }

  await loadProducts();
  renderProducts();
}

/* =========================
   BILDER HOCHLADEN
========================= */

async function uploadFile(file, folder) {
  if (!file) return null;

  const extension =
    file.name.split(".").pop().toLowerCase();

  const filename =
    `${folder}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabaseClient
    .storage
    .from("site-images")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    console.error(error);
    throw error;
  }

  const { data } =
    supabaseClient
      .storage
      .from("site-images")
      .getPublicUrl(filename);

  return data.publicUrl;
}

async function uploadProductImage(id, file) {
  if (!file) return;

  try {
    const url = await uploadFile(file, "products");

    const { error } = await supabaseClient
      .from("products")
      .update({
        image_url: url,
        updated_at: new Date().toISOString()
      })
      .eq("id", id);

    if (error) throw error;

    await loadProducts();
    renderProducts();

    alert("Produktbild hochgeladen.");
  } catch (error) {
    console.error(error);
    showError(
      "Bild konnte nicht hochgeladen werden. " +
      "Bitte prüfe den Storage-Bucket und die Berechtigungen."
    );
  }
}

/* =========================
   GALERIE
========================= */

async function loadGallery() {
  const { data, error } = await supabaseClient
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  gallery = data || [];
}

function renderGallery() {
  $("#gallery").innerHTML = gallery.map((item) => `
    <div
      class="gallery-editor"
      style="padding:15px;border-bottom:1px solid #ddd"
    >

      <img
        src="${esc(item.image_url)}"
        alt=""
        style="width:180px;height:140px;object-fit:cover"
      >

      <input
        type="file"
        accept="image/*"
        data-gallery-file="${item.id}"
      >

      <button
        class="delete"
        data-delete-gallery="${item.id}"
      >
        Bild löschen
      </button>

    </div>
  `).join("");

  document.querySelectorAll("[data-gallery-file]").forEach((input) => {
    input.onchange = () => uploadGalleryImage(
      input.dataset.galleryFile,
      input.files[0]
    );
  });

  document.querySelectorAll("[data-delete-gallery]").forEach((button) => {
    button.onclick = () => deleteGallery(
      button.dataset.deleteGallery
    );
  });
}

async function addGallery() {
  try {
    const url = await uploadFile(
      await chooseFile("image/*"),
      "gallery"
    );

    if (!url) return;

    const { error } = await supabaseClient
      .from("gallery")
      .insert({
        image_url: url,
        sort_order: gallery.length
      });

    if (error) throw error;

    await loadGallery();
    renderGallery();

  } catch (error) {
    console.error(error);
    showError("Galeriebild konnte nicht hinzugefügt werden.");
  }
}

function chooseFile(accept) {
  return new Promise((resolve) => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = accept;

    input.onchange = () => {
      resolve(input.files[0] || null);
    };

    input.click();
  });
}

async function uploadGalleryImage(id, file) {
  if (!file) return;

  try {
    const url = await uploadFile(file, "gallery");

    const { error } = await supabaseClient
      .from("gallery")
      .update({
        image_url: url
      })
      .eq("id", id);

    if (error) throw error;

    await loadGallery();
    renderGallery();

    alert("Galeriebild geändert.");

  } catch (error) {
    console.error(error);
    showError("Galeriebild konnte nicht geändert werden.");
  }
}

async function deleteGallery(id) {
  if (!confirm("Dieses Bild wirklich löschen?")) return;

  const { error } = await supabaseClient
    .from("gallery")
    .delete()
    .eq("id", id);

  if (error) {
    showError("Galeriebild konnte nicht gelöscht werden.");
    return;
  }

  await loadGallery();
  renderGallery();
}

/* =========================
   ALLES RENDERN
========================= */

function renderAll() {
  renderCategories();
  renderProducts();
  renderGallery();
}

/* =========================
   BUTTONS
========================= */

$("#saveSettings").addEventListener(
  "click",
  saveSettings
);

$("#addCategory").addEventListener(
  "click",
  addCategory
);

$("#addProduct").addEventListener(
  "click",
  addProduct
);

$("#addGallery").addEventListener(
  "click",
  addGallery
);

/*
  Videos und Bestellungen kommen im nächsten Schritt.
  Wir lassen die Bereiche momentan bewusst leer,
  damit nichts an deiner bestehenden Datenbank kaputtgeht.
*/

const videoBox = $("#videos");

if (videoBox) {
  videoBox.innerHTML =
    "<p>Videoverwaltung wird als nächster Schritt eingerichtet.</p>";
}

const ordersBox = $("#orders");

if (ordersBox) {
  ordersBox.innerHTML =
    "<p>Bestellverwaltung wird als nächster Schritt eingerichtet.</p>";
}
