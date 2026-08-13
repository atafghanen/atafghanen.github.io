/* =========================================================
   AT EVENING ELEGANCE
   KOMPLETTER ADMIN.JS
   ========================================================= */

const SUPABASE_URL =
  window.SUPABASE_URL ||
  "https://gaxpagykgrcgxebnsyai.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  window.SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_Cgg8Dun5Sua_VpXj39ahHA_piGaeN8f";

const supabaseClient =
  window.supabaseClient ||
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );

const $ = (selector) =>
  document.querySelector(selector);


/* =========================================================
   AKTUELLE WEBSITE-DATEN
   Diese Daten entsprechen den Bildern,
   die momentan auf deiner Website zu sehen sind.
   ========================================================= */

const CURRENT_PRODUCTS = [

  {
    name_de: "Goldene Afghan Couture",
    name_en: "Golden Afghan Couture",
    name_ps: "زرینه افغان کالي",
    name_fa: "لباس افغانی طلایی",
    category: "Abendkleider",
    price: 249,
    old_price: 299,
    image_url:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85"
  },

  {
    name_de: "Midnight Embroidery",
    name_en: "Midnight Embroidery",
    name_ps: "د شپې ګنډل",
    name_fa: "گلدوزی شبانه",
    category: "Bestickung",
    price: 289,
    old_price: null,
    image_url:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85"
  },

  {
    name_de: "Royal Burgundy",
    name_en: "Royal Burgundy",
    name_ps: "شاهي برګنډي",
    name_fa: "برگندی سلطنتی",
    category: "Festkleider",
    price: 319,
    old_price: 359,
    image_url:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85"
  },

  {
    name_de: "Desert Pearl",
    name_en: "Desert Pearl",
    name_ps: "د صحرا مرغلره",
    name_fa: "مروارید صحرا",
    category: "Festkleider",
    price: 279,
    old_price: null,
    image_url:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85"
  },

  {
    name_de: "Noir Silk",
    name_en: "Noir Silk",
    name_ps: "تور ورېښم",
    name_fa: "ابریشم مشکی",
    category: "Abendkleider",
    price: 229,
    old_price: 269,
    image_url:
      "https://images.unsplash.com/photo-1506629905607-d9d6f1b98f34?auto=format&fit=crop&w=900&q=85"
  },

  {
    name_de: "Heritage Gold",
    name_en: "Heritage Gold",
    name_ps: "د میراث سره زر",
    name_fa: "طلای میراث",
    category: "Tradition",
    price: 349,
    old_price: null,
    image_url:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=85"
  }

];


const CURRENT_GALLERY = [

  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",

  "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=1000&q=85",

  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",

  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",

  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",

  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85"

];


const CURRENT_CATEGORIES = [

  {
    slug: "abendkleider",
    name_de: "Abendkleider",
    name_en: "Evening Dresses",
    name_ps: "د ماښام کالي",
    name_fa: "لباس‌های شب"
  },

  {
    slug: "bestickung",
    name_de: "Bestickung",
    name_en: "Embroidery",
    name_ps: "ګنډنه",
    name_fa: "گلدوزی"
  },

  {
    slug: "festkleider",
    name_de: "Festkleider",
    name_en: "Celebration Dresses",
    name_ps: "د محفل کالي",
    name_fa: "لباس‌های مجلسی"
  },

  {
    slug: "tradition",
    name_de: "Tradition",
    name_en: "Traditional",
    name_ps: "دودیز",
    name_fa: "سنتی"
  }

];


/* =========================================================
   VARIABLEN
   ========================================================= */

let products = [];
let categories = [];
let gallery = [];
let settings = null;


/* =========================================================
   HILFSFUNKTIONEN
   ========================================================= */

function esc(value) {

  return String(value ?? "")
    .replace(/[&<>"']/g, (m) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[m]));

}


function value(selector) {

  const element = $(selector);

  return element
    ? element.value.trim()
    : "";

}


function setValue(selector, text) {

  const element = $(selector);

  if (element) {
    element.value = text || "";
  }

}


function error(message) {

  console.error(message);

  alert(message);

}


/* =========================================================
   START
   ========================================================= */

async function loadAdmin() {

  try {

    await loadSettings();

    await loadCategories();

    await ensureCurrentProducts();

    await ensureCurrentGallery();

    await loadProducts();

    await loadGallery();

    renderAll();

  }

  catch (e) {

    console.error(e);

    error(
      "Der Admin-Bereich konnte nicht geladen werden.\n\n" +
      e.message
    );

  }

}


/* =========================================================
   EINSTELLUNGEN
   ========================================================= */

async function loadSettings() {

  const result =
    await supabaseClient
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();


  if (result.error) {
    throw result.error;
  }


  settings =
    result.data || {};


  setValue(
    "#instagram",
    settings.instagram
  );

  setValue(
    "#tiktok",
    settings.tiktok
  );

  setValue(
    "#email",
    settings.email ||
    "info@ateveningelegance.com"
  );

  setValue(
    "#whatsapp",
    settings.whatsapp
  );

}


async function saveSettings() {

  const update = {

    instagram:
      value("#instagram"),

    tiktok:
      value("#tiktok"),

    email:
      value("#email"),

    whatsapp:
      value("#whatsapp"),

    updated_at:
      new Date().toISOString()

  };


  const result =
    await supabaseClient
      .from("site_settings")
      .upsert(
        {
          id: 1,
          ...update
        },
        {
          onConflict: "id"
        }
      );


  if (result.error) {

    error(
      "Einstellungen konnten nicht gespeichert werden.\n\n" +
      result.error.message
    );

    return;
  }


  alert(
    "Einstellungen gespeichert."
  );

}


/* =========================================================
   KATEGORIEN
   ========================================================= */

async function loadCategories() {

  const result =
    await supabaseClient
      .from("categories")
      .select("*")
      .order(
        "sort_order",
        {
          ascending: true
        }
      );


  if (result.error) {
    throw result.error;
  }


  categories =
    result.data || [];

}


async function ensureCurrentCategories() {

  for (
    let i = 0;
    i < CURRENT_CATEGORIES.length;
    i++
  ) {

    const category =
      CURRENT_CATEGORIES[i];


    const existing =
      await supabaseClient
        .from("categories")
        .select("id")
        .eq(
          "slug",
          category.slug
        )
        .maybeSingle();


    if (
      existing.error
    ) {
      throw existing.error;
    }


    if (!existing.data) {

      const result =
        await supabaseClient
          .from("categories")
          .insert({

            ...category,

            sort_order: i,

            active: true

          });


      if (result.error) {
        throw result.error;
      }

    }

  }

}


function renderCategories() {

  const container =
    $("#categories");

  if (!container) {
    return;
  }


  container.innerHTML =
    categories.map(
      (category) => `

        <div
          class="category-editor"
          style="
            padding:20px;
            margin-bottom:15px;
            border:1px solid #ddd;
            border-radius:10px;
          "
        >

          <label>
            Deutsch

            <input
              data-cat-de="${category.id}"
              value="${esc(category.name_de)}"
            >
          </label>

          <label>
            English

            <input
              data-cat-en="${category.id}"
              value="${esc(category.name_en)}"
            >
          </label>

          <label>
            Pashto

            <input
              data-cat-ps="${category.id}"
              value="${esc(category.name_ps)}"
            >
          </label>

          <label>
            Dari

            <input
              data-cat-fa="${category.id}"
              value="${esc(category.name_fa)}"
            >
          </label>

          <button
            type="button"
            class="gold"
            data-save-cat="${category.id}"
          >
            Speichern
          </button>

          <button
            type="button"
            class="delete"
            data-delete-cat="${category.id}"
          >
            Löschen
          </button>

        </div>

      `
    ).join("");


  document
    .querySelectorAll(
      "[data-save-cat]"
    )
    .forEach(
      (button) => {

        button.onclick =
          () =>
            saveCategory(
              button.dataset.saveCat
            );

      }
    );


  document
    .querySelectorAll(
      "[data-delete-cat]"
    )
    .forEach(
      (button) => {

        button.onclick =
          () =>
            deleteCategory(
              button.dataset.deleteCat
            );

      }
    );

}


async function addCategory() {

  const name =
    prompt(
      "Wie soll die Kategorie heißen?"
    );


  if (
    !name ||
    !name.trim()
  ) {
    return;
  }


  const clean =
    name.trim();


  const slug =
    clean
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .replace(
        /^-+|-+$/g,
        ""
      ) ||
      `category-${Date.now()}`;


  const result =
    await supabaseClient
      .from("categories")
      .insert({

        slug,

        name_de: clean,

        name_en: clean,

        name_ps: clean,

        name_fa: clean,

        sort_order:
          categories.length,

        active: true

      });


  if (result.error) {

    error(
      "Kategorie konnte nicht erstellt werden.\n\n" +
      result.error.message
    );

    return;
  }


  await loadCategories();

  renderCategories();

}


async function saveCategory(id) {

  const result =
    await supabaseClient
      .from("categories")
      .update({

        name_de:
          value(
            `[data-cat-de="${id}"]`
          ),

        name_en:
          value(
            `[data-cat-en="${id}"]`
          ),

        name_ps:
          value(
            `[data-cat-ps="${id}"]`
          ),

        name_fa:
          value(
            `[data-cat-fa="${id}"]`
          ),

        updated_at:
          new Date().toISOString()

      })
      .eq(
        "id",
        id
      );


  if (result.error) {

    error(
      "Kategorie konnte nicht gespeichert werden.\n\n" +
      result.error.message
    );

    return;
  }


  await loadCategories();

  renderCategories();

}


async function deleteCategory(id) {

  const category =
    categories.find(
      (c) =>
        String(c.id) ===
        String(id)
    );


  if (!category) {
    return;
  }


  const used =
    products.some(
      (p) =>
        p.category ===
        category.slug
    );


  if (used) {

    alert(
      "Diese Kategorie wird noch von einem Produkt verwendet."
    );

    return;
  }


  if (
    !confirm(
      "Kategorie wirklich löschen?"
    )
  ) {
    return;
  }


  const result =
    await supabaseClient
      .from("categories")
      .delete()
      .eq(
        "id",
        id
      );


  if (result.error) {

    error(
      "Kategorie konnte nicht gelöscht werden.\n\n" +
      result.error.message
    );

    return;
  }


  await loadCategories();

  renderCategories();

}


/* =========================================================
   PRODUKTE AUS DER AKTUELLEN WEBSITE ÜBERNEHMEN
   ========================================================= */

async function ensureCurrentProducts() {

  const existing =
    await supabaseClient
      .from("products")
      .select("id");


  if (existing.error) {
    throw existing.error;
  }


  /*
    Wenn bereits Produkte in Supabase
    vorhanden sind, werden keine doppelten
    Produkte angelegt.
  */

  if (
    existing.data &&
    existing.data.length > 0
  ) {

    return;

  }


  await ensureCurrentCategories();


  for (
    let i = 0;
    i < CURRENT_PRODUCTS.length;
    i++
  ) {

    const product =
      CURRENT_PRODUCTS[i];


    const result =
      await supabaseClient
        .from("products")
        .insert({

          ...product,

          sort_order: i

        });


    if (result.error) {
      throw result.error;
    }

  }

}


async function loadProducts() {

  const result =
    await supabaseClient
      .from("products")
      .select("*")
      .order(
        "sort_order",
        {
          ascending: true
        }
      );


  if (result.error) {
    throw result.error;
  }


  products =
    result.data || [];

}


function categoryOptions(
  selected
) {

  return categories
    .map(
      (category) => `

        <option
          value="${esc(category.slug)}"
          ${
            category.slug === selected
              ? "selected"
              : ""
          }
        >
          ${esc(category.name_de)}
        </option>

      `
    )
    .join("");

}


function renderProducts() {

  const container =
    $("#products");

  if (!container) {
    return;
  }


  container.innerHTML =
    products.map(
      (product) => `

        <div
          class="product-editor"
          style="
            padding:20px;
            margin-bottom:20px;
            border:1px solid #ddd;
            border-radius:10px;
          "
        >

          <img
            src="${esc(
              product.image_url ||
              "assets/logo.gif"
            )}"
            alt=""
            style="
              width:180px;
              height:230px;
              object-fit:cover;
              border-radius:8px;
              display:block;
              margin-bottom:15px;
            "
          >


          <label>
            Deutsch

            <input
              data-product-de="${product.id}"
              value="${esc(product.name_de)}"
            >
          </label>


          <label>
            English

            <input
              data-product-en="${product.id}"
              value="${esc(product.name_en)}"
            >
          </label>


          <label>
            Pashto

            <input
              data-product-ps="${product.id}"
              value="${esc(product.name_ps)}"
            >
          </label>


          <label>
            Dari

            <input
              data-product-fa="${product.id}"
              value="${esc(product.name_fa)}"
            >
          </label>


          <label>
            Kategorie

            <select
              data-product-category="${product.id}"
            >
              ${categoryOptions(
                product.category
              )}
            </select>

          </label>


          <label>
            Preis €

            <input
              type="number"
              step="0.01"
              data-product-price="${product.id}"
              value="${esc(product.price)}"
            >

          </label>


          <label>
            Alter Preis €

            <input
              type="number"
              step="0.01"
              data-product-old="${product.id}"
              value="${esc(
                product.old_price ?? ""
              )}"
            >

          </label>


          <label>
            Bild ändern

            <input
              type="file"
              accept="image/*"
              data-product-file="${product.id}"
            >

          </label>


          <div
            style="
              margin-top:15px;
            "
          >

            <button
              type="button"
              class="gold"
              data-save-product="${product.id}"
            >
              Produkt speichern
            </button>


            <button
              type="button"
              class="delete"
              data-delete-product="${product.id}"
            >
              Produkt löschen
            </button>

          </div>

        </div>

      `
    ).join("");


  document
    .querySelectorAll(
      "[data-save-product]"
    )
    .forEach(
      (button) => {

        button.onclick =
          () =>
            saveProduct(
              button.dataset.saveProduct
            );

      }
    );


  document
    .querySelectorAll(
      "[data-delete-product]"
    )
    .forEach(
      (button) => {

        button.onclick =
          () =>
            deleteProduct(
              button.dataset.deleteProduct
            );

      }
    );


  document
    .querySelectorAll(
      "[data-product-file]"
    )
    .forEach(
      (input) => {

        input.onchange =
          () =>
            uploadProductImage(
              input.dataset.productFile,
              input.files[0]
            );

      }
    );

}


async function saveProduct(id) {

  const result =
    await supabaseClient
      .from("products")
      .update({

        name_de:
          value(
            `[data-product-de="${id}"]`
          ),

        name_en:
          value(
            `[data-product-en="${id}"]`
          ),

        name_ps:
          value(
            `[data-product-ps="${id}"]`
          ),

        name_fa:
          value(
            `[data-product-fa="${id}"]`
          ),

        category:
          value(
            `[data-product-category="${id}"]`
          ),

        price:
          Number(
            value(
              `[data-product-price="${id}"]`
            ) || 0
          ),

        old_price:
          value(
            `[data-product-old="${id}"]`
          ) === ""
            ? null
            : Number(
                value(
                  `[data-product-old="${id}"]`
                )
              ),

        updated_at:
          new Date().toISOString()

      })
      .eq(
        "id",
        id
      );


  if (result.error) {

    error(
      "Produkt konnte nicht gespeichert werden.\n\n" +
      result.error.message
    );

    return;
  }


  await loadProducts();

  renderProducts();

  alert(
    "Produkt gespeichert."
  );

}


async function addProduct() {

  if (
    categories.length === 0
  ) {

    await ensureCurrentCategories();

    await loadCategories();

  }


  const category =
    categories[0];


  const result =
    await supabaseClient
      .from("products")
      .insert({

        name_de:
          "Neues Kleid",

        name_en:
          "New Dress",

        name_ps:
          "نوي کالي",

        name_fa:
          "لباس جدید",

        category:
          category.slug,

        price:
          0,

        old_price:
          null,

        image_url:
          "assets/logo.gif",

        sort_order:
          products.length

      });


  if (result.error) {

    error(
      "Produkt konnte nicht hinzugefügt werden.\n\n" +
      result.error.message
    );

    return;
  }


  await loadProducts();

  renderProducts();


  window.scrollTo({

    top:
      document.body.scrollHeight,

    behavior:
      "smooth"

  });

}


async function deleteProduct(id) {

  const product =
    products.find(
      (p) =>
        String(p.id) ===
        String(id)
    );


  if (!product) {
    return;
  }


  if (
    !confirm(
      `"${product.name_de}" wirklich löschen?`
    )
  ) {
    return;
  }


  const result =
    await supabaseClient
      .from("products")
      .delete()
      .eq(
        "id",
        id
      );


  if (result.error) {

    error(
      "Produkt konnte nicht gelöscht werden.\n\n" +
      result.error.message
    );

    return;
  }


  await loadProducts();

  renderProducts();

}


/* =========================================================
   STORAGE
   ========================================================= */

async function uploadFile(
  file,
  folder
) {

  if (!file) {
    return null;
  }


  const extension =
    (
      file.name
        .split(".")
        .pop() ||
      "jpg"
    ).toLowerCase();


  const filename =
    `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .substring(2)}.${extension}`;


  const result =
    await supabaseClient
      .storage
      .from("site-images")
      .upload(
        filename,
        file,
        {
          cacheControl:
            "3600",

          upsert:
            false
        }
      );


  if (result.error) {
    throw result.error;
  }


  const publicUrl =
    supabaseClient
      .storage
      .from("site-images")
      .getPublicUrl(
        filename
      );


  return publicUrl
    .data
    .publicUrl;

}


/* =========================================================
   PRODUKTBILD ÄNDERN
   ========================================================= */

async function uploadProductImage(
  id,
  file
) {

  if (!file) {
    return;
  }


  try {

    const url =
      await uploadFile(
        file,
        "products"
      );


    const result =
      await supabaseClient
        .from("products")
        .update({

          image_url:
            url,

          updated_at:
            new Date().toISOString()

        })
        .eq(
          "id",
          id
        );


    if (result.error) {
      throw result.error;
    }


    await loadProducts();

    renderProducts();


    alert(
      "Produktbild wurde geändert."
    );

  }

  catch (e) {

    error(
      "Produktbild konnte nicht hochgeladen werden.\n\n" +
      e.message
    );

  }

}


/* =========================================================
   GALERIE
   ========================================================= */

async function ensureCurrentGallery() {

  const existing =
    await supabaseClient
      .from("gallery")
      .select("id");


  if (existing.error) {
    throw existing.error;
  }


  if (
    existing.data &&
    existing.data.length > 0
  ) {

    return;

  }


  for (
    let i = 0;
    i < CURRENT_GALLERY.length;
    i++
  ) {

    const result =
      await supabaseClient
        .from("gallery")
        .insert({

          image_url:
            CURRENT_GALLERY[i],

          sort_order:
            i

        });


    if (result.error) {
      throw result.error;
    }

  }

}


async function loadGallery() {

  const result =
    await supabaseClient
      .from("gallery")
      .select("*")
      .order(
        "sort_order",
        {
          ascending: true
        }
      );


  if (result.error) {
    throw result.error;
  }


  gallery =
    result.data || [];

}


function renderGallery() {

  const container =
    $("#gallery");

  if (!container) {
    return;
  }


  if (
    gallery.length === 0
  ) {

    container.innerHTML = `
      <p>
        Noch keine Bilder vorhanden.
      </p>
    `;

    return;

  }


  container.innerHTML =
    gallery.map(
      (item, index) => `

        <div
          class="gallery-editor"
          style="
            padding:20px;
            margin-bottom:20px;
            border:1px solid #ddd;
            border-radius:10px;
          "
        >

          <img
            src="${esc(item.image_url)}"
            alt=""
            style="
              width:240px;
              height:180px;
              object-fit:cover;
              border-radius:8px;
              display:block;
              margin-bottom:15px;
            "
          >

          <p>
            Galerie-Bild ${index + 1}
          </p>


          <input
            type="file"
            accept="image/*"
            data-gallery-file="${item.id}"
          >


          <button
            type="button"
            class="delete"
            data-delete-gallery="${item.id}"
          >
            Bild löschen
          </button>

        </div>

      `
    ).join("");


  document
    .querySelectorAll(
      "[data-gallery-file]"
    )
    .forEach(
      (input) => {

        input.onchange =
          () =>
            uploadGalleryImage(
              input.dataset.galleryFile,
              input.files[0]
            );

      }
    );


  document
    .querySelectorAll(
      "[data-delete-gallery]"
    )
    .forEach(
      (button) => {

        button.onclick =
          () =>
            deleteGallery(
              button.dataset.deleteGallery
            );

      }
    );

}


async function addGallery() {

  const input =
    document.createElement(
      "input"
    );


  input.type =
    "file";

  input.accept =
    "image/*";


  input.onchange =
    async () => {

      const file =
        input.files[0];


      if (!file) {
        return;
      }


      try {

        const url =
          await uploadFile(
            file,
            "gallery"
          );


        const result =
          await supabaseClient
            .from("gallery")
            .insert({

              image_url:
                url,

              sort_order:
                gallery.length

            });


        if (result.error) {
          throw result.error;
        }


        await loadGallery();

        renderGallery();

      }

      catch (e) {

        error(
          "Bild konnte nicht hinzugefügt werden.\n\n" +
          e.message
        );

      }

    };


  input.click();

}


async function uploadGalleryImage(
  id,
  file
) {

  if (!file) {
    return;
  }


  try {

    const url =
      await uploadFile(
        file,
        "gallery"
      );


    const result =
      await supabaseClient
        .from("gallery")
        .update({

          image_url:
            url

        })
        .eq(
          "id",
          id
        );


    if (result.error) {
      throw result.error;
    }


    await loadGallery();

    renderGallery();


    alert(
      "Galeriebild wurde geändert."
    );

  }

  catch (e) {

    error(
      "Galeriebild konnte nicht geändert werden.\n\n" +
      e.message
    );

  }

}


async function deleteGallery(id) {

  if (
    !confirm(
      "Dieses Bild wirklich löschen?"
    )
  ) {
    return;
  }


  const result =
    await supabaseClient
      .from("gallery")
      .delete()
      .eq(
        "id",
        id
      );


  if (result.error) {

    error(
      "Bild konnte nicht gelöscht werden.\n\n" +
      result.error.message
    );

    return;
  }


  await loadGallery();

  renderGallery();

}


/* =========================================================
   LOGO
   ========================================================= */

async function uploadLogo() {

  const input =
    $("#logoFile");

  if (
    !input ||
    !input.files ||
    !input.files[0]
  ) {
    return;
  }


  try {

    const url =
      await uploadFile(
        input.files[0],
        "logo"
      );


    const result =
      await supabaseClient
        .from("site_settings")
        .upsert(
          {
            id: 1,
            logo_url: url,
            updated_at:
              new Date().toISOString()
          },
          {
            onConflict: "id"
          }
        );


    if (result.error) {
      throw result.error;
    }


    alert(
      "Logo wurde geändert."
    );

  }

  catch (e) {

    error(
      "Logo konnte nicht hochgeladen werden.\n\n" +
      e.message
    );

  }

}


/* =========================================================
   RENDER
   ========================================================= */

function renderAll() {

  renderCategories();

  renderProducts();

  renderGallery();

}


/* =========================================================
   BUTTONS
   ========================================================= */

function setupButtons() {

  const saveButton =
    $("#saveSettings") ||
    $("#saveBtn");


  if (saveButton) {

    saveButton.onclick =
      saveSettings;

  }


  const categoryButton =
    $("#addCategory");


  if (categoryButton) {

    categoryButton.onclick =
      addCategory;

  }


  const productButton =
    $("#addProduct");


  if (productButton) {

    productButton.onclick =
      addProduct;

  }


  const galleryButton =
    $("#addGallery");


  if (galleryButton) {

    galleryButton.onclick =
      addGallery;

  }


  const logoInput =
    $("#logoFile");


  if (logoInput) {

    logoInput.onchange =
      uploadLogo;

  }

}


/* =========================================================
   GLOBAL
   ========================================================= */

window.loadAdmin =
  loadAdmin;


/* =========================================================
   START
   ========================================================= */

setupButtons();


(async function start() {

  try {

    const session =
      await supabaseClient
        .auth
        .getSession();


    if (
      session.data &&
      session.data.session
    ) {

      await loadAdmin();

    }

  }

  catch (e) {

    console.error(e);

  }

})();
