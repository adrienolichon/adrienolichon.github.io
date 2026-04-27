-- Exécutez ce script dans votre Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/syxeszmebfizvshaypnq

CREATE TABLE IF NOT EXISTS wishlist_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id TEXT NOT NULL UNIQUE,
  is_purchased BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMP WITH TIME ZONE,
  purchased_by_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer Row Level Security
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Politique de lecture publique
CREATE POLICY "Allow public read" ON wishlist_items 
  FOR SELECT USING (TRUE);

-- Politique d'insertion publique
CREATE POLICY "Allow public insert" ON wishlist_items 
  FOR INSERT WITH CHECK (TRUE);

-- Politique de mise à jour publique
CREATE POLICY "Allow public update" ON wishlist_items 
  FOR UPDATE USING (TRUE) WITH CHECK (TRUE);

-- Insérer les 4 produits de la wishlist
INSERT INTO wishlist_items (product_id, is_purchased) VALUES
  ('1', FALSE),
  ('2', FALSE),
  ('3', FALSE),
  ('4', FALSE)
ON CONFLICT DO NOTHING;
