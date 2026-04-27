-- ⚠️ EXÉCUTEZ CECI DANS SUPABASE SQL EDITOR POUR RÉPARER LES RLS POLICIES

-- Supprimer les anciennes policies
DROP POLICY IF EXISTS "Allow public read" ON wishlist_items;
DROP POLICY IF EXISTS "Allow public insert" ON wishlist_items;
DROP POLICY IF EXISTS "Allow public update" ON wishlist_items;

-- Recréer les policies correctes
CREATE POLICY "Allow public read" 
  ON wishlist_items FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert" 
  ON wishlist_items FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update" 
  ON wishlist_items FOR UPDATE 
  USING (true) WITH CHECK (true);

-- Vérifier que la table est en RLS
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

-- Vérifier les données
SELECT * FROM wishlist_items;
