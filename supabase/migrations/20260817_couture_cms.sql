-- AT Evening Elegance: secure single-admin CMS, media and order requests.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

insert into public.admin_users (user_id)
select id from auth.users order by created_at asc limit 1
on conflict do nothing;

alter table public.admin_users enable row level security;

alter table public.products
  add column if not exists description_de text not null default '',
  add column if not exists description_en text not null default '',
  add column if not exists description_ps text not null default '',
  add column if not exists description_fa text not null default '',
  add column if not exists active boolean not null default true;

alter table public.gallery
  add column if not exists media_type text not null default 'image'
    check (media_type in ('image', 'video')),
  add column if not exists title text not null default '',
  add column if not exists poster_url text not null default '';

alter table public.site_settings
  add column if not exists content jsonb not null default '{}'::jsonb;

create table if not exists public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  url text not null,
  poster_url text not null default '',
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists product_media_product_id_idx on public.product_media(product_id);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null default '',
  email text not null default '',
  address text not null default '',
  notes text not null default '',
  items jsonb not null,
  total numeric(12,2) not null default 0,
  status text not null default 'whatsapp_opened',
  created_at timestamptz not null default now()
);

alter table public.product_media enable row level security;
alter table public.orders enable row level security;

-- Remove legacy broad write rules. Authenticated is not sufficient authorization.
do $$
declare p record;
begin
  for p in
    select schemaname, tablename, policyname
    from pg_policies
    where (schemaname = 'public' and tablename in ('products','gallery','site_settings','categories'))
       or (schemaname = 'storage' and tablename = 'objects')
  loop
    execute format('drop policy if exists %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

-- Public storefront reads.
create policy products_public_read on public.products for select to anon, authenticated using (active or exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy gallery_public_read on public.gallery for select to anon, authenticated using (true);
create policy settings_public_read on public.site_settings for select to anon, authenticated using (true);
create policy categories_public_read on public.categories for select to anon, authenticated using (active or exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy product_media_public_read on public.product_media for select to anon, authenticated using (true);

-- Only the allowlisted owner can manage CMS data.
create policy admin_users_self_read on public.admin_users for select to authenticated using (user_id = (select auth.uid()));

create policy products_admin_insert on public.products for insert to authenticated with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy products_admin_update on public.products for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy products_admin_delete on public.products for delete to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

create policy gallery_admin_insert on public.gallery for insert to authenticated with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy gallery_admin_update on public.gallery for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy gallery_admin_delete on public.gallery for delete to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

create policy settings_admin_insert on public.site_settings for insert to authenticated with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy settings_admin_update on public.site_settings for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

create policy categories_admin_insert on public.categories for insert to authenticated with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy categories_admin_update on public.categories for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy categories_admin_delete on public.categories for delete to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

create policy product_media_admin_insert on public.product_media for insert to authenticated with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy product_media_admin_update on public.product_media for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy product_media_admin_delete on public.product_media for delete to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

-- Visitors may save a WhatsApp order request; only the owner may read/update it.
create policy orders_public_insert on public.orders for insert to anon, authenticated with check (jsonb_array_length(items) between 1 and 100 and total >= 0);
create policy orders_admin_read on public.orders for select to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy orders_admin_update on public.orders for update to authenticated using (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

-- Public assets, but uploads/replacements/deletes only by the owner.
create policy site_media_public_read on storage.objects for select to anon, authenticated using (bucket_id = 'site-images');
create policy site_media_admin_insert on storage.objects for insert to authenticated with check (bucket_id = 'site-images' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy site_media_admin_update on storage.objects for update to authenticated using (bucket_id = 'site-images' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid()))) with check (bucket_id = 'site-images' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));
create policy site_media_admin_delete on storage.objects for delete to authenticated using (bucket_id = 'site-images' and exists (select 1 from public.admin_users a where a.user_id = (select auth.uid())));

update storage.buckets
set file_size_limit = 52428800,
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','video/quicktime']
where id = 'site-images';

grant usage on schema public to anon, authenticated;
grant select on public.products, public.gallery, public.site_settings, public.categories, public.product_media to anon, authenticated;
grant insert on public.orders to anon, authenticated;
grant select, insert, update, delete on public.products, public.gallery, public.site_settings, public.categories, public.product_media, public.orders to authenticated;
grant select on public.admin_users to authenticated;

-- Remove broad default anon grants; RLS remains a second layer of protection.
revoke all privileges on public.admin_users, public.products, public.gallery, public.site_settings, public.categories, public.product_media, public.orders from anon;
grant select on public.products, public.gallery, public.site_settings, public.categories, public.product_media to anon;
grant insert on public.orders to anon;

