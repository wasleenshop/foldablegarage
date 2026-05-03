-- ═══════════════════════════════════════════════════
-- Wasleen Foldable Garage — Initial Database Schema
-- ═══════════════════════════════════════════════════

-- ─── LEADS TABLE ───────────────────────────────────

CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  emirate text,
  property_type text,
  message text,
  source text NOT NULL DEFAULT 'contact',
  config jsonb,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- ─── ORDERS TABLE ──────────────────────────────────

CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id),
  paddle_transaction_id text UNIQUE,
  paddle_order_id text,
  config jsonb NOT NULL,
  total_amount int NOT NULL,
  currency text DEFAULT 'AED',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ─── PRODUCTS TABLE ────────────────────────────────

CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_ar text,
  description_en text,
  description_ar text,
  price_from int,
  specs jsonb,
  images text[],
  active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- ─── BLOG POSTS TABLE ──────────────────────────────

CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title_en text NOT NULL,
  title_ar text,
  content_en text NOT NULL,
  content_ar text,
  excerpt_en text,
  excerpt_ar text,
  meta_description_en text,
  meta_description_ar text,
  featured_image text,
  published_at timestamptz,
  tags text[],
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ─── REVIEWS TABLE ─────────────────────────────────

CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  location text NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL,
  content text NOT NULL,
  product_variant text,
  colour text,
  verified boolean DEFAULT false,
  helpful int DEFAULT 0,
  images text[],
  response text,
  status text DEFAULT 'approved',
  created_at timestamptz DEFAULT now()
);

-- ─── ENABLE ROW LEVEL SECURITY ─────────────────────

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- ─── RLS POLICIES ───────────────────────────────────

CREATE POLICY "Anyone can insert leads"
  ON leads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read active products"
  ON products FOR SELECT
  USING (active = true);

CREATE POLICY "Anyone can read published posts"
  ON blog_posts FOR SELECT
  USING (published_at IS NOT NULL);

CREATE POLICY "Anyone can read approved reviews"
  ON reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Anyone can insert reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Orders: Allow anonymous inserts (used by /api/quote) and reads (thank-you page)
CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read orders"
  ON orders FOR SELECT
  USING (true);

-- Orders: Allow updates from Paddle webhook (uses anon key via server client)
CREATE POLICY "Anyone can update orders"
  ON orders FOR UPDATE
  USING (true)
  WITH CHECK (true);
