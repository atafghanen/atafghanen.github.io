const DEFAULT_DATA={
  settings:{
    instagram:"https://instagram.com/",
    tiktok:"https://tiktok.com/",
    email:"info@ateveningelegance.com",
    whatsapp:"491700000000",
    logo:"assets/logo.gif"
  },
  products:[],
  gallery:[]
};

let data=JSON.parse(localStorage.getItem("atEEData")||"null")||DEFAULT_DATA;

const $=s=>document.querySelector(s);

function esc(s){
  return String(s??"").replace(/[&<>"']/g,m=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

function save(show=true){
  localStorage.setItem("atEEData",JSON.stringify(data));
  if(show) alert("Gespeichert. Öffne die Website neu, um die Änderungen zu sehen.");
}

function fileToDataURL(file){
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.onerror=reject;
    reader.readAsDataURL(file);
  });
}

function render(){
  $("#instagram").value=data.settings.instagram||"";
  $("#tiktok").value=data.settings.tiktok||"";
  $("#email").value=data.settings.email||"";
  $("#whatsapp").value=data.settings.whatsapp||"";
  $("#logoPreview").src=data.settings.logo||"assets/logo.gif";

  $("#products").innerHTML=data.products.map((p,i)=>`
    <div class="product-editor" data-product-row="${i}">
      <img src="${esc(p.image)}" alt="">
      <div class="langs">
        <label>Deutsch
          <input data-p="${i}" data-k="de" value="${esc(p.name?.de)}">
        </label>
        <label>English
          <input data-p="${i}" data-k="en" value="${esc(p.name?.en)}">
        </label>
        <label>Pashto
          <input data-p="${i}" data-k="ps" value="${esc(p.name?.ps)}">
        </label>
        <label>Dari
          <input data-p="${i}" data-k="fa" value="${esc(p.name?.fa)}">
        </label>
      </div>
      <label>Kategorie
        <input data-p="${i}" data-field="category" value="${esc(p.category)}">
      </label>
      <label>Preis
        <input type="number" data-p="${i}" data-field="price" value="${esc(p.price)}">
      </label>
      <label>Alter Preis
        <input type="number" data-p="${i}" data-field="oldPrice" value="${esc(p.oldPrice??"")}">
      </label>
      <label>Produktbild
        <input data-p="${i}" data-field="image" value="${esc(p.image)}">
        <input type="file" accept="image/*" data-pfile="${i}">
        <small>Bild vom Gerät auswählen</small>
      </label>
      <div class="product-controls">
        <button class="gold save-product" data-save-product="${i}">Ändern speichern</button>
        <button class="delete delete-product" data-del="${i}">Produkt löschen</button>
      </div>
    </div>
  `).join("");

  $("#gallery").innerHTML=data.gallery.map((src,i)=>`
    <div class="gallery-editor" data-gallery-row="${i}">
      <img src="${esc(src)}" alt="">
      <div>
        <input data-g="${i}" value="${esc(src)}">
        <input type="file" accept="image/*" data-gfile="${i}">
        <small>Bild ersetzen</small>
      </div>
      <button class="delete delete-gallery" data-gdel="${i}">Bild löschen</button>
    </div>
  `).join("");

  // Product text / fields
  document.querySelectorAll("[data-p][data-k]").forEach(el=>{
    el.addEventListener("input",()=>{
      const i=Number(el.dataset.p);
      data.products[i].name=data.products[i].name||{};
      data.products[i].name[el.dataset.k]=el.value;
    });
  });

  document.querySelectorAll("[data-p][data-field]").forEach(el=>{
    el.addEventListener("input",()=>{
      const i=Number(el.dataset.p);
      const field=el.dataset.field;
      if(field==="price"||field==="oldPrice"){
        data.products[i][field]=el.value===""?null:Number(el.value);
      }else{
        data.products[i][field]=el.value;
      }
    });
  });

  // Product image upload
  document.querySelectorAll("[data-pfile]").forEach(el=>{
    el.addEventListener("change",async()=>{
      const i=Number(el.dataset.pfile);
      const file=el.files?.[0];
      if(!file)return;
      data.products[i].image=await fileToDataURL(file);
      save(false);
      render();
    });
  });

  // Product deletion – uses the exact index and immediately saves.
  document.querySelectorAll("[data-del]").forEach(el=>{
    el.addEventListener("click",()=>{
      const i=Number(el.dataset.del);
      if(!Number.isInteger(i)||!data.products[i])return;
      if(confirm("Dieses Produkt wirklich löschen?")){
        data.products.splice(i,1);
        save(false);
        render();
      }
    });
  });

  // Product explicit save button
  document.querySelectorAll("[data-save-product]").forEach(el=>{
    el.addEventListener("click",()=>{
      save(true);
    });
  });

  // Gallery URL changes
  document.querySelectorAll("[data-g]").forEach(el=>{
    el.addEventListener("input",()=>{
      data.gallery[Number(el.dataset.g)]=el.value;
    });
  });

  // Gallery upload / replace
  document.querySelectorAll("[data-gfile]").forEach(el=>{
    el.addEventListener("change",async()=>{
      const i=Number(el.dataset.gfile);
      const file=el.files?.[0];
      if(!file)return;
      data.gallery[i]=await fileToDataURL(file);
      save(false);
      render();
    });
  });

  // Gallery deletion
  document.querySelectorAll("[data-gdel]").forEach(el=>{
    el.addEventListener("click",()=>{
      const i=Number(el.dataset.gdel);
      if(!Number.isInteger(i)||data.gallery[i]===undefined)return;
      if(confirm("Dieses Galerie-Bild wirklich löschen?")){
        data.gallery.splice(i,1);
        save(false);
        render();
      }
    });
  });
}

$("#instagram").addEventListener("input",e=>data.settings.instagram=e.target.value);
$("#tiktok").addEventListener("input",e=>data.settings.tiktok=e.target.value);
$("#email").addEventListener("input",e=>data.settings.email=e.target.value);
$("#whatsapp").addEventListener("input",e=>data.settings.whatsapp=e.target.value);

$("#logoFile").addEventListener("change",async e=>{
  const file=e.target.files?.[0];
  if(!file)return;
  data.settings.logo=await fileToDataURL(file);
  $("#logoPreview").src=data.settings.logo;
  save(false);
});

$("#saveBtn").addEventListener("click",()=>save(true));

$("#addProduct").addEventListener("click",()=>{
  data.products.push({
    id:"p"+Date.now()+Math.random().toString(36).slice(2,6),
    name:{
      de:"Neues Kleid",
      en:"New Dress",
      ps:"نوي کالي",
      fa:"لباس جدید"
    },
    category:"Neue Kategorie",
    price:0,
    oldPrice:null,
    image:"assets/logo.gif"
  });
  save(false);
  render();
  window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
});

$("#addGallery").addEventListener("click",()=>{
  data.gallery.push("assets/logo.gif");
  save(false);
  render();
  window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"});
});

render();
