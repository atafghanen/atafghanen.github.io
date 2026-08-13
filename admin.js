/* =========================================================
   AT EVENING ELEGANCE
   ADMIN.JS
   ========================================================= */

/*
  Der Supabase-Client wird vom admin.html bereitgestellt.
  Dadurch müssen URL und Key hier NICHT erneut eingetragen werden.
*/

const supabaseClient =
  window.supabaseClient ||
  window.supabase?.createClient?.(
    window.SUPABASE_URL,
    window.SUPABASE_PUBLISHABLE_KEY
  );

const $ = (selector) => document.querySelector(selector);

let products = [];
let categories = [];
let gallery = [];
let settings = null;


/* =========================================================
   HILFSFUNKTIONEN
   ========================================================= */

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

function hasElement(selector) {
  return !!document.querySelector(selector);
}


/* =========================================================
   ADMIN LADEN
   ========================================================= */

async function loadAdmin() {

  if (!supabaseClient) {
    showError(
      "Supabase konnte nicht geladen werden. " +
      "Bitte admin.html prüfen."
    );
    return;
  }

  try {

    await loadSettings();
    await loadCategories();
    await loadProducts();
    await loadGallery();

    renderAll();

  } catch (error) {

    console.error(error);

    showError(
      "Die Daten konnten nicht geladen werden.\n\n" +
      (error.message || error)
    );
  }
}


/* =========================================================
   EINSTELLUNGEN
   ========================================================= */

async function loadSettings() {

  const { data, error } = await supabaseClient
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw error;

  settings = data || {};

  setValue(
    "#instagram",
    settings.instagram || ""
  );

  setValue(
    "#tiktok",
    settings.tiktok || ""
  );

  setValue(
    "#email",
    settings.email || "info@ateveningelegance.com"
  );

  setValue(
    "#whatsapp",
    settings.whatsapp || ""
  );
}


function setValue(selector, value) {

  const element = $(selector);

  if (element) {
    element.value = value;
  }
}


async function saveSettings() {

  const update = {
    instagram: getValue("#instagram"),
    tiktok: getValue("#tiktok"),
    email: getValue("#email"),
    whatsapp: getValue("#whatsapp"),
    updated_at: new Date().toISOString()
  };

  const { error } = await supabaseClient
    .from("site_settings")
    .update(update)
    .eq("id", 1);

  if (error) {

    showError(
      "Website-Einstellungen konnten nicht gespeichert werden.\n\n" +
      error.message
    );

    return;
  }

  settings = {
    ...settings,
    ...update
  };

  alert("Website-Einstellungen gespeichert.");
}


function getValue(selector) {

  const element = $(selector);

  return element
    ? element.value.trim()
    : "";
}


/* =========================================================
   KATEGORIEN
   ========================================================= */

async function loadCategories() {

  const { data, error } = await supabaseClient
    .from("categories")
    .select("*")
    .order("sort_order", {
      ascending: true
    });

  if (error) throw error;

  categories = data || [];
}


function renderCategories() {

  const container =
    $("#categories");

  if (!container) return;

  container.innerHTML =
    categories.map((category) => `

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
            data-category-de="${category.id}"
            value="${esc(category.name_de)}"
          >
        </label>

        <label>
          English
          <input
            data-category-en="${category.id}"
            value="${esc(category.name_en)}"
          >
        </label>

        <label>
          Pashto
          <input
            data-category-ps="${category.id}"
            value="${esc(category.name_ps)}"
          >
        </label>

        <label>
          Dari
          <input
            data-category-fa="${category.id}"
            value="${esc(category.name_fa)}"
          >
        </label>

        <div style="margin-top:10px">

          <button
            type="button"
            class="gold"
            data-save-category="${category.id}"
          >
            Kategorie speichern
          </button>

          <button
            type="button"
            class="delete"
            data-delete-category="${category.id}"
          >
            Kategorie löschen
          </button>

        </div>

      </div>

    `).join("");


  document
    .querySelectorAll("[data-save-category]")
    .forEach((button) => {

      button.onclick = () => {

        saveCategory(
          button.dataset.saveCategory
        );

      };

    });


  document
    .querySelectorAll("[data-delete-category]")
    .forEach((button) => {

      button.onclick = () => {

        deleteCategory(
          button.dataset.deleteCategory
        );

      };

    });
}


async function saveCategory(id) {

  const category =
    categories.find(
      (item) => String(item.id) === String(id)
    );

  if (!category) return;


  const update = {

    name_de:
      getValue(
        `[data-category-de="${id}"]`
      ),

    name_en:
      getValue(
        `[data-category-en="${id}"]`
      ),

    name_ps:
      getValue(
        `[data-category-ps="${id}"]`
      ),

    name_fa:
      getValue(
        `[data-category-fa="${id}"]`
      ),

    updated_at:
      new Date().toISOString()

  };


  const { error } =
    await supabaseClient
      .from("categories")
      .update(update)
      .eq("id", id);


  if (error) {

    showError(
      "Kategorie konnte nicht gespeichert werden.\n\n" +
      error.message
    );

    return;
  }


  await loadCategories();

  renderCategories();

  alert("Kategorie gespeichert.");
}


async function addCategory() {

  const name =
    prompt(
      "Name der neuen Kategorie:"
    );

  if (!name || !name.trim()) {
    return;
  }


  const cleanName =
    name.trim();


  let slug =
    cleanName
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");


  if (!slug) {
    slug =
      "category-" +
      Date.now();
  }


  const { error } =
    await supabaseClient
      .from("categories")
      .insert({

        slug: slug,

        name_de: cleanName,

        name_en: cleanName,

        name_ps: cleanName,

        name_fa: cleanName,

        sort_order:
          categories.length,

        active: true

      });


  if (error) {

    showError(
      "Kategorie konnte nicht erstellt werden.\n\n" +
      error.message
    );

    return;
  }


  await loadCategories();

  renderCategories();

  alert(
    "Kategorie wurde hinzugefügt."
  );
}


async function deleteCategory(id) {

  const category =
    categories.find(
      (item) => String(item.id) === String(id)
    );

  if (!category) return;


  const used =
    products.some(
      (product) =>
        product.category === category.slug
    );


  if (used) {

    alert(
      "Diese Kategorie wird noch von einem Produkt verwendet.\n\n" +
      "Ordne die Produkte zuerst einer anderen Kategorie zu."
    );

    return;
  }


  if (
    !confirm(
      `Kategorie "${category.name_de}" wirklich löschen?`
    )
  ) {
    return;
  }


  const { error } =
    await supabaseClient
      .from("categories")
      .delete()
      .eq("id", id);


  if (error) {

    showError(
      "Kategorie konnte nicht gelöscht werden.\n\n" +
      error.message
    );

    return;
  }


  await loadCategories();

  renderCategories();
}


/* =========================================================
   PRODUKTE
   ========================================================= */

async function loadProducts() {

  const { data, error } =
    await supabaseClient
      .from("products")
      .select("*")
      .order("sort_order", {
        ascending: true
      });


  if (error) throw error;

  products = data || [];
}


function categoryOptions(selected) {

  return categories
    .map((category) => {

      const selectedValue =
        category.slug === selected
          ? "selected"
          : "";

      return `
        <option
          value="${esc(category.slug)}"
          ${selectedValue}
        >
          ${esc(category.name_de)}
        </option>
      `;

    })
    .join("");
}


function renderProducts() {

  const container =
    $("#products");

  if (!container) return;


  if (!products.length) {

    container.innerHTML = `
      <p>
        Noch keine Produkte vorhanden.
      </p>
    `;

    return;
  }


  container.innerHTML =
    products.map((product) => `

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
            width:160px;
            height:210px;
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
            data-product-old-price="${product.id}"
            value="${esc(
              product.old_price ?? ""
            )}"
          >

        </label>


        <label>
          Neues Produktbild

          <input
            type="file"
            accept="image/*"
            data-product-file="${product.id}"
          >

        </label>


        <div style="margin-top:15px">

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

    `).join("");


  document
    .querySelectorAll("[data-save-product]")
    .forEach((button) => {

      button.onclick = () => {

        saveProduct(
          button.dataset.saveProduct
        );

      };

    });


  document
    .querySelectorAll("[data-delete-product]")
    .forEach((button) => {

      button.onclick = () => {

        deleteProduct(
          button.dataset.deleteProduct
        );

      };

    });


  document
    .querySelectorAll("[data-product-file]")
    .forEach((input) => {

      input.onchange = () => {

        const file =
          input.files &&
          input.files[0];

        uploadProductImage(
          input.dataset.productFile,
          file
        );

      };

    });
}


async function saveProduct(id) {

  const priceValue =
    getValue(
      `[data-product-price="${id}"]`
    );


  const oldPriceValue =
    getValue(
      `[data-product-old-price="${id}"]`
    );


  const update = {

    name_de:
      getValue(
        `[data-product-de="${id}"]`
      ),

    name_en:
      getValue(
        `[data-product-en="${id}"]`
      ),

    name_ps:
      getValue(
        `[data-product-ps="${id}"]`
      ),

    name_fa:
      getValue(
        `[data-product-fa="${id}"]`
      ),

    category:
      getValue(
        `[data-product-category="${id}"]`
      ),

    price:
      priceValue === ""
        ? 0
        : Number(priceValue),

    old_price:
      oldPriceValue === ""
        ? null
        : Number(oldPriceValue),

    updated_at:
      new Date().toISOString()

  };


  const { error } =
    await supabaseClient
      .from("products")
      .update(update)
      .eq("id", id);


  if (error) {

    showError(
      "Produkt konnte nicht gespeichert werden.\n\n" +
      error.message
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

  if (!categories.length) {

    alert(
      "Bitte zuerst eine Kategorie erstellen."
    );

    return;
  }


  const category =
    categories[0];


  const { error } =
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


  if (error) {

    showError(
      "Produkt konnte nicht hinzugefügt werden.\n\n" +
      error.message
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
      (item) =>
        String(item.id) === String(id)
    );


  if (!product) return;


  if (
    !confirm(
      `Produkt "${product.name_de}" wirklich löschen?`
    )
  ) {
    return;
  }


  const { error } =
    await supabaseClient
      .from("products")
      .delete()
      .eq("id", id);


  if (error) {

    showError(
      "Produkt konnte nicht gelöscht werden.\n\n" +
      error.message
    );

    return;
  }


  await loadProducts();

  renderProducts();
}


/* =========================================================
   STORAGE / BILDER
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
    )
    .toLowerCase();


  const filename =
    `${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${extension}`;


  const { error } =
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


  if (error) {
    throw error;
  }


  const publicData =
    supabaseClient
      .storage
      .from("site-images")
      .getPublicUrl(
        filename
      );


  return publicData
    .data
    .publicUrl;
}


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


    const { error } =
      await supabaseClient
        .from("products")
        .update({

          image_url:
            url,

          updated_at:
            new Date().toISOString()

        })
        .eq("id", id);


    if (error) {
      throw error;
    }


    await loadProducts();

    renderProducts();


    alert(
      "Produktbild wurde geändert."
    );


  } catch (error) {

    console.error(error);

    showError(
      "Bild konnte nicht hochgeladen werden.\n\n" +
      error.message
    );
  }
}


/* =========================================================
   GALERIE
   ========================================================= */

async function loadGallery() {

  const { data, error } =
    await supabaseClient
      .from("gallery")
      .select("*")
      .order("sort_order", {
        ascending: true
      });


  if (error) throw error;

  gallery = data || [];
}


function renderGallery() {

  const container =
    $("#gallery");

  if (!container) return;


  if (!gallery.length) {

    container.innerHTML = `
      <p>
        Noch keine Galerie-Bilder vorhanden.
      </p>
    `;

    return;
  }


  container.innerHTML =
    gallery.map((item) => `

      <div
        class="gallery-editor"
        style="
          padding:15px;
          margin-bottom:15px;
          border-bottom:1px solid #ddd;
        "
      >

        <img
          src="${esc(item.image_url)}"
          alt=""
          style="
            width:200px;
            height:150px;
            object-fit:cover;
            border-radius:8px;
            display:block;
            margin-bottom:10px;
          "
        >


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

    `).join("");


  document
    .querySelectorAll("[data-gallery-file]")
    .forEach((input) => {

      input.onchange = () => {

        uploadGalleryImage(
          input.dataset.galleryFile,
          input.files &&
          input.files[0]
        );

      };

    });


  document
    .querySelectorAll("[data-delete-gallery]")
    .forEach((button) => {

      button.onclick = () => {

        deleteGallery(
          button.dataset.deleteGallery
        );

      };

    });
}


function chooseFile(
  accept
) {

  return new Promise(
    (resolve) => {

      const input =
        document.createElement(
          "input"
        );

      input.type =
        "file";

      input.accept =
        accept;

      input.onchange =
        () => {

          resolve(
            input.files &&
            input.files[0]
              ? input.files[0]
              : null
          );

        };


      input.click();

    }
  );
}


async function addGallery() {

  try {

    const file =
      await chooseFile(
        "image/*"
      );


    if (!file) {
      return;
    }


    const url =
      await uploadFile(
        file,
        "gallery"
      );


    if (!url) {
      return;
    }


    const { error } =
      await supabaseClient
        .from("gallery")
        .insert({

          image_url:
            url,

          sort_order:
            gallery.length

        });


    if (error) {
      throw error;
    }


    await loadGallery();

    renderGallery();


  } catch (error) {

    console.error(error);

    showError(
      "Galeriebild konnte nicht hinzugefügt werden.\n\n" +
      error.message
    );
  }
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


    const { error } =
      await supabaseClient
        .from("gallery")
        .update({

          image_url:
            url

        })
        .eq("id", id);


    if (error) {
      throw error;
    }


    await loadGallery();

    renderGallery();


    alert(
      "Galeriebild wurde geändert."
    );


  } catch (error) {

    console.error(error);

    showError(
      "Galeriebild konnte nicht geändert werden.\n\n" +
      error.message
    );
  }
}


async function deleteGallery(
  id
) {

  if (
    !confirm(
      "Dieses Bild wirklich löschen?"
    )
  ) {
    return;
  }


  const { error } =
    await supabaseClient
      .from("gallery")
      .delete()
      .eq("id", id);


  if (error) {

    showError(
      "Galeriebild konnte nicht gelöscht werden.\n\n" +
      error.message
    );

    return;
  }


  await loadGallery();

  renderGallery();
}


/* =========================================================
   BUTTONS
   ========================================================= */

function setupButtons() {

  /*
    Beide möglichen IDs werden unterstützt,
    damit es mit deinem bisherigen HTML funktioniert.
  */

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

}


/* =========================================================
   AUTH
   ========================================================= */

async function startAdminAfterLogin() {

  if (!supabaseClient) {
    return;
  }


  const {
    data,
    error
  } =
    await supabaseClient
      .auth
      .getSession();


  if (error) {

    console.error(error);

    return;
  }


  if (data.session) {

    await loadAdmin();

  }

}


/*
  Falls dein admin.html den Login bereits übernimmt,
  reagiert dieser Listener automatisch auf Login/Logout.
*/

if (
  supabaseClient &&
  supabaseClient.auth
) {

  supabaseClient.auth
    .onAuthStateChange(
      (event, session) => {

        if (session) {

          setTimeout(
            () => loadAdmin(),
            0
          );

        }

      }
    );

}


/* =========================================================
   START
   ========================================================= */

setupButtons();

startAdminAfterLogin();
