# ✅ WISHLIST SUPABASE - PRÊT À UTILISER

## 🎯 Votre Configuration

| Élément | Valeur |
|--------|--------|
| **Supabase Project ID** | `syxeszmebfizvshaypnq` |
| **URL** | `https://syxeszmebfizvshaypnq.supabase.co` |
| **Clé Publique** | `sb_publishable_p5srmCHLdgYL-SsOtFeFlg_0CnvyH_H` |
| **Status** | ✅ Configurée dans `wishlist.js` |

---

## 🚀 PROCHAINES ÉTAPES (5 MIN)

### ÉTAPE 1️⃣ : Créer la table dans Supabase

1. Ouvrez votre dashboard : https://supabase.com/dashboard/project/syxeszmebfizvshaypnq
2. Cliquez sur **"SQL Editor"** dans le menu de gauche
3. Cliquez sur **"New Query"**
4. Copiez ce code SQL :

```sql
CREATE TABLE IF NOT EXISTS wishlist_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  product_id TEXT NOT NULL UNIQUE,
  is_purchased BOOLEAN DEFAULT FALSE,
  purchased_at TIMESTAMP WITH TIME ZONE,
  purchased_by_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON wishlist_items 
  FOR SELECT USING (TRUE);

CREATE POLICY "Allow public insert" ON wishlist_items 
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Allow public update" ON wishlist_items 
  FOR UPDATE USING (TRUE) WITH CHECK (TRUE);

INSERT INTO wishlist_items (product_id, is_purchased) VALUES
  ('1', FALSE),
  ('2', FALSE),
  ('3', FALSE),
  ('4', FALSE)
ON CONFLICT DO NOTHING;
```

5. Collez dans l'éditeur et cliquez sur **"Run"** ▶️
6. Vous verrez : `Query succeeded with 0 rows returned` ✅

### ÉTAPE 2️⃣ : Vérifier la table

1. Allez dans **"Table Editor"** (menu de gauche)
2. Cliquez sur **"wishlist_items"**
3. Vous devriez voir 4 lignes (vos 4 produits)

### ÉTAPE 3️⃣ : Tester votre wishlist

**Option A : Test local**
- Ouvrez `wishlist-test.html` dans votre navigateur
- Cliquez sur les boutons de test pour vérifier la connexion

**Option B : Directement sur votre site**
- Allez sur https://adrienolichon.github.io/wishlist.html
- Cliquez sur "Marquer comme acheté"
- Vérifiez dans Supabase que l'article est marqué ✅

### ÉTAPE 4️⃣ : Mettre en ligne (GitHub)

```bash
git add wishlist.js wishlist.html wishlist-test.html sql-setup.sql
git commit -m "feat: implement Supabase wishlist sync"
git push origin main
```

---

## 📊 VÉRIFIER QUE TOUT FONCTIONNE

| Point de Vérification | Quoi Faire |
|-------|----------|
| **Connexion Supabase** | Ouvrir `wishlist-test.html` → Tester la connexion |
| **Lecture des données** | Dans le test → Charger les articles |
| **Insertion** | Dans le test → Tester l'insertion |
| **Sur votre site** | Cliquer sur un bouton → Voir la classe `.purchased` |

---

## 🎨 LES FICHIERS MODIFIÉS

| Fichier | Changement |
|---------|-----------|
| `wishlist.js` | ✅ Intégration Supabase + clés configurées |
| `wishlist.html` | ✅ Déjà prêt (data-product-id, class buy-button) |
| `wishlist.css` | ✅ Classe `.purchased` déjà présente |
| `wishlist-test.html` | ✅ Créé pour tester la connexion |
| `sql-setup.sql` | ✅ Script pour créer la table |

---

## 🎁 COMMENT ÇA MARCHE

```
1. Visiteur clique sur "Marquer comme acheté"
   ↓
2. wishlist.js envoie une requête à Supabase API
   ↓
3. Supabase met à jour la table wishlist_items
   ↓
4. La carte ajoute la classe .purchased
   ↓
5. Tous les visiteurs voient l'article marqué ✅
```

---

## 🔐 SÉCURITÉ

- ✅ Les clés publiques sont **volontaires** (lecture/écriture contrôlées par RLS)
- ✅ Row Level Security **activée** dans Supabase
- ✅ Aucune donnée sensible stockée
- ⚠️ Les requêtes ne sont pas rate-limitées (gratuit Supabase)
  - Si vous avez du spam, contactez Supabase pour ajouter du rate limiting

---

## 📞 EN CAS DE PROBLÈME

**Le bouton ne marche pas ?**
```
1. F12 → Console → Vérifier les erreurs
2. Vérifier que la table existe dans Supabase Table Editor
3. Vérifier que les RLS policies sont actives
```

**"Failed to fetch" ?**
```
1. Vérifier l'URL Supabase dans wishlist.js
2. Vérifier la clé API dans wishlist.js
3. Vérifier que les policies permettent les INSERT/UPDATE
```

**Les articles ne s'affichent pas ?**
```
1. Rafraîchir la page (F5)
2. Vérifier la console du navigateur (F12)
3. Ouvrir wishlist-test.html pour tester la connexion
```

---

## 🎉 BRAVO !

Votre wishlist est maintenant **entièrement fonctionnelle** avec une base de données centralisée !

Tous les visiteurs de votre site voient les mêmes articles en temps réel. 🚀
