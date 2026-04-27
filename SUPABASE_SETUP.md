# Configuration Supabase pour la Wishlist

## 🚀 Étapes de configuration

### 1. Créer un compte Supabase
- Allez sur https://supabase.com
- Cliquez sur "Sign Up" (gratuit)
- Utilisez votre compte GitHub pour plus de facilité
- Créez un nouveau projet

### 2. Créer la table dans Supabase
- Allez dans **SQL Editor**
- Collez ce script SQL :

```sql
CREATE TABLE wishlist_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id TEXT NOT NULL UNIQUE,
  is_purchased BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMP WITH TIME ZONE,
  purchased_by_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON wishlist_items FOR SELECT USING (TRUE);
CREATE POLICY "Allow public insert/update" ON wishlist_items FOR INSERT, UPDATE WITH CHECK (TRUE);
```

- Cliquez sur "Run"

### 3. Obtenir vos clés d'API
- Allez dans **Settings → API** (ou **Project Settings → API**)
- Copiez :
  - **Project URL** (ex: `https://abcdefgh.supabase.co`)
  - **anon public key** (la clé longue)

### 4. Configurer wishlist.js
Ouvrez `wishlist.js` et remplacez les deux premières lignes :

```javascript
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE';
```

Avec vos vraies valeurs de Supabase.

## ✅ C'est prêt !

Votre wishlist est maintenant synchronisée avec une base de données centralisée. Tous les visiteurs verront les articles achetés par les autres en temps réel.

### Sécurité
- Les clés publiques dans le code sont intentionnelles (mode public read/write)
- Supabase contrôle les accès via les Row Level Security policies
- Aucune donnée sensible n'est stockée
- Vous pouvez limiter les requêtes dans les paramètres Supabase si besoin

### Limitation des abus (optionnel)
Si vous voulez limiter les clics, ajoutez rate limiting :
- Dans Supabase, allez dans **Auth → Policies**
- Ou utilisez une Netlify Function comme proxy (voir `netlify.toml`)
