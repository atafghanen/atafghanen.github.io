const db = window.supabaseClient;
const $ = s => document.querySelector(s);
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let state = { settings: {}, categories: [], products: [], gallery: [], media: [], orders: [] };

function notice(message, bad = false) {
  const el = $("#adminNotice");
  el.textContent = message;
  el.className = bad ? "notice bad" : "notice";
  clearTimeout(notice.timer);
  notice.timer = setTimeout(() => el.textContent = "", 4500);
}

async function requireAdmin() {
  const { data: { user } } = await db.auth.getUser();
  if (!user) return false;
  const { data } = await db.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!data) {
    await db.auth.signOut();
    throw new Error("Dieses Konto besitzt keine Admin-Berechtigung.");
  }
  return true;
}

async function loadAdmin() {
  try {
    if (!await requireAdmin()) return;
    const [settings, categories, products, gallery, media, orders] = await Promise.all([
      db.from("site_settings").select("*").eq("id", 1).single(),
      db.from("categories").select("*").order("sort_order"),
      db.from("products").select("*").order("sort_order"),
      db.from("gallery").select("*").order("sort_order"),
      db.from("product_media").select("*").order("sort_order"),
      db.from("orders").select("*").order("created_at", { ascending: false }).limit(50)
    ]);
    const failed = [settings,categories,products,gallery,media,orders].find(r => r.error);
    if (failed) throw failed.error;
    state = { settings: settings.data || {}, categories: categories.data || [], products: products.data || [], gallery: gallery.data || [], media: media.data || [], orders: orders.data || [] };
    renderAll();
  } catch (error) { notice(error.message, true); }
}

function renderAll() {
  const s = state.settings;
  [["instagram",s.instagram],["tiktok",s.tiktok],["email",s.email],["whatsapp",s.whatsapp]].forEach(([id,v]) => { if ($(`#${id}`)) $(`#${id}`).value = v || ""; });
  const content = s.content || {};
  ["hero_text","tailoring_text","story_text_1","story_text_2"].forEach(id => { if ($(`#${id}`)) $(`#${id}`).value = content[id] || ""; });
  renderCategories(); renderProducts(); renderGallery(); renderOrders();
  const preview = $("#logoPreview"); if (preview) preview.src = s.logo_url || "assets/logo.gif";
}

async function saveSettings() {
  const content = {};
  ["hero_text","tailoring_text","story_text_1","story_text_2"].forEach(id => content[id] = $(`#${id}`).value.trim());
  const payload = { id:1, instagram:$("#instagram").value.trim(), tiktok:$("#tiktok").value.trim(), email:$("#email").value.trim(), whatsapp:$("#whatsapp").value.replace(/\D/g,""), content, updated_at:new Date().toISOString() };
  const { error } = await db.from("site_settings").upsert(payload);
  if (error) return notice(error.message, true);
  state.settings = { ...state.settings, ...payload }; notice("Website-Inhalte gespeichert.");
}

function renderCategories() {
  $("#categories").innerHTML = state.categories.map(c => `<div class="editor-row category-row" data-id="${c.id}">
    <input data-k="name_de" value="${esc(c.name_de)}" placeholder="Deutsch"><input data-k="name_en" value="${esc(c.name_en)}" placeholder="Englisch">
    <input data-k="name_ps" value="${esc(c.name_ps)}" placeholder="Pashto"><input data-k="name_fa" value="${esc(c.name_fa)}" placeholder="Dari">
    <button data-save-category>Speichern</button><button class="delete" data-delete-category>Löschen</button></div>`).join("");
}

function categoryOptions(value) { return state.categories.map(c => `<option value="${esc(c.slug)}" ${c.slug === value ? "selected" : ""}>${esc(c.name_de)}</option>`).join(""); }

function renderProducts() {
  $("#products").innerHTML = state.products.map(p => {
    const media = state.media.filter(m => m.product_id === p.id);
    return `<article class="product-editor" data-id="${p.id}">
      <div class="product-preview"><img src="${esc(p.image_url)}" alt=""><label>Hauptbild<input type="file" accept="image/*" data-product-main></label></div>
      <div class="product-fields">
        <div class="input-grid"><input data-k="name_de" value="${esc(p.name_de)}" placeholder="Name Deutsch"><input data-k="name_en" value="${esc(p.name_en)}" placeholder="Name Englisch"><input data-k="name_ps" value="${esc(p.name_ps)}" placeholder="Name Pashto"><input data-k="name_fa" value="${esc(p.name_fa)}" placeholder="Name Dari"></div>
        <div class="input-grid"><textarea data-k="description_de" placeholder="Beschreibung Deutsch">${esc(p.description_de)}</textarea><textarea data-k="description_en" placeholder="Beschreibung Englisch">${esc(p.description_en)}</textarea><textarea data-k="description_ps" placeholder="Beschreibung Pashto">${esc(p.description_ps)}</textarea><textarea data-k="description_fa" placeholder="Beschreibung Dari">${esc(p.description_fa)}</textarea></div>
        <div class="input-grid compact"><select data-k="category">${categoryOptions(p.category)}</select><input data-k="price" type="number" step="0.01" value="${p.price}"><input data-k="old_price" type="number" step="0.01" value="${p.old_price || ""}" placeholder="Alter Preis"><label class="check"><input data-k="active" type="checkbox" ${p.active ? "checked" : ""}> Sichtbar</label></div>
        <div class="media-list">${media.map(m => `<div class="media-chip">${m.media_type === "video" ? `<video src="${esc(m.url)}"></video>` : `<img src="${esc(m.url)}" alt="">`}<button class="delete" data-delete-product-media="${m.id}">×</button></div>`).join("")}</div>
        <label class="upload">Weitere Fotos oder Videos<input type="file" multiple accept="image/*,video/mp4,video/webm,video/quicktime" data-product-media></label>
        <div class="row-actions"><button data-save-product>Produkt speichern</button><button class="delete" data-delete-product>Produkt löschen</button></div>
      </div></article>`;
  }).join("");
}

function renderGallery() {
  $("#gallery").innerHTML = `<div class="gallery-admin-grid">${state.gallery.map(m => `<div class="gallery-editor" data-id="${m.id}">
    ${m.media_type === "video" ? `<video controls src="${esc(m.image_url)}"></video>` : `<img src="${esc(m.image_url)}" alt="">`}
    <input data-k="title" value="${esc(m.title)}" placeholder="Titel / Bildbeschreibung"><button data-save-gallery>Speichern</button><button class="delete" data-delete-gallery>Löschen</button></div>`).join("")}</div>`;
}

function renderOrders() {
  $("#orders").innerHTML = state.orders.length ? state.orders.map(o => `<details class="order"><summary><strong>${esc(o.customer_name)}</strong><span>${new Date(o.created_at).toLocaleString("de-DE")}</span><b>€${Number(o.total).toFixed(2)}</b></summary><p>${esc(o.phone)} · ${esc(o.email)}</p><p>${esc(o.address)}</p><ul>${(o.items || []).map(i => `<li>${esc(i.name)} – ${i.quantity} × €${Number(i.unit_price).toFixed(2)}</li>`).join("")}</ul><p>${esc(o.notes)}</p></details>`).join("") : "<p>Noch keine Bestellanfragen.</p>";
}

async function upload(file, folder) {
  if (file.size > 50 * 1024 * 1024) throw new Error("Die Datei ist größer als 50 MB.");
  const ext = (file.name.split(".").pop() || "bin").toLowerCase();
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await db.storage.from("site-images").upload(path, file, { contentType:file.type, upsert:false });
  if (error) throw error;
  return db.storage.from("site-images").getPublicUrl(path).data.publicUrl;
}

async function addCategory() { const { error } = await db.from("categories").insert({ slug:`category-${Date.now()}`, name_de:"Neue Kategorie", name_en:"New category", name_ps:"", name_fa:"", sort_order:state.categories.length }); if (error) notice(error.message,true); else loadAdmin(); }
async function addProduct() { const { error } = await db.from("products").insert({ name_de:"Neues Produkt", name_en:"New product", category:state.categories[0]?.slug || "new", price:0, image_url:"https://placehold.co/800x1000/f3b6c8/76223b?text=AT+Elegance", sort_order:state.products.length }); if (error) notice(error.message,true); else loadAdmin(); }

async function addGallery(files) {
  for (const file of files) { const url = await upload(file, file.type.startsWith("video/") ? "videos" : "gallery"); const { error } = await db.from("gallery").insert({ image_url:url, media_type:file.type.startsWith("video/") ? "video" : "image", title:file.name, sort_order:state.gallery.length++ }); if (error) throw error; }
  await loadAdmin(); notice("Medien hochgeladen.");
}

document.addEventListener("click", async event => {
  const button = event.target.closest("button"); if (!button) return;
  try {
    if (button.id === "saveSettings") return saveSettings();
    if (button.id === "addCategory") return addCategory();
    if (button.id === "addProduct") return addProduct();
    const row = button.closest("[data-id]"); const id = row?.dataset.id;
    if (button.hasAttribute("data-save-category")) { const payload={}; row.querySelectorAll("[data-k]").forEach(i=>payload[i.dataset.k]=i.value.trim()); const {error}=await db.from("categories").update(payload).eq("id",id); if(error)throw error; notice("Kategorie gespeichert."); }
    if (button.hasAttribute("data-delete-category") && confirm("Kategorie wirklich löschen?")) { const {error}=await db.from("categories").delete().eq("id",id); if(error)throw error; loadAdmin(); }
    if (button.hasAttribute("data-save-product")) { const payload={}; row.querySelectorAll("[data-k]").forEach(i=>payload[i.dataset.k]=i.type==="checkbox"?i.checked:(i.type==="number"?(i.value===""?null:Number(i.value)):i.value.trim())); const {error}=await db.from("products").update(payload).eq("id",id); if(error)throw error; notice("Produkt gespeichert."); }
    if (button.hasAttribute("data-delete-product") && confirm("Produkt und alle zusätzlichen Medien löschen?")) { const {error}=await db.from("products").delete().eq("id",id); if(error)throw error; loadAdmin(); }
    if (button.dataset.deleteProductMedia && confirm("Medium löschen?")) { const {error}=await db.from("product_media").delete().eq("id",button.dataset.deleteProductMedia); if(error)throw error; loadAdmin(); }
    if (button.hasAttribute("data-save-gallery")) { const title=row.querySelector('[data-k="title"]').value.trim(); const {error}=await db.from("gallery").update({title}).eq("id",id); if(error)throw error; notice("Galerieeintrag gespeichert."); }
    if (button.hasAttribute("data-delete-gallery") && confirm("Foto/Video löschen?")) { const {error}=await db.from("gallery").delete().eq("id",id); if(error)throw error; loadAdmin(); }
  } catch (error) { notice(error.message,true); }
});

document.addEventListener("change", async event => {
  try {
    if (event.target.id === "galleryUpload") return addGallery([...event.target.files]);
    if (event.target.id === "logoFile" && event.target.files[0]) { const url=await upload(event.target.files[0],"brand"); const {error}=await db.from("site_settings").update({logo_url:url}).eq("id",1); if(error)throw error; await loadAdmin(); notice("Logo ersetzt."); }
    const product = event.target.closest(".product-editor");
    if (product && event.target.matches("[data-product-main]") && event.target.files[0]) { const url=await upload(event.target.files[0],"products"); const {error}=await db.from("products").update({image_url:url}).eq("id",product.dataset.id); if(error)throw error; await loadAdmin(); notice("Hauptbild ersetzt."); }
    if (product && event.target.matches("[data-product-media]")) { for(const file of event.target.files){ const url=await upload(file,"products"); const {error}=await db.from("product_media").insert({product_id:product.dataset.id,media_type:file.type.startsWith("video/")?"video":"image",url,alt_text:file.name,sort_order:state.media.filter(m=>m.product_id===product.dataset.id).length}); if(error)throw error; } await loadAdmin(); notice("Produktmedien hochgeladen."); }
  } catch (error) { notice(error.message,true); }
});

window.loadAdmin = loadAdmin;
