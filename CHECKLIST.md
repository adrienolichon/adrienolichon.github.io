---
# WISHLIST SUPABASE - CHECKLIST DE MISE EN PLACE
---

# ✅ CHECKLIST COMPLÈTE

## Phase 1 : Configuration Supabase (5 min)

- [ ] Accédez à https://supabase.com/dashboard/project/syxeszmebfizvshaypnq
- [ ] Allez dans **SQL Editor**
- [ ] Créez une **New Query**
- [ ] Copiez le contenu de `sql-setup.sql`
- [ ] Exécutez la requête (bouton ▶️)
- [ ] Confirmez que la table `wishlist_items` est créée
  - [ ] Allez dans **Table Editor**
  - [ ] Vérifiez qu'il y a 4 lignes (les produits)

## Phase 2 : Test Local (3 min)

- [ ] Ouvrez `wishlist-test.html` dans votre navigateur
- [ ] Cliquez sur **"Tester la connexion"**
  - [ ] Doit afficher ✅ "Connexion réussie"
- [ ] Cliquez sur **"Charger les articles"**
  - [ ] Doit afficher les 4 produits en JSON
- [ ] Cliquez sur **"Tester l'insertion"**
  - [ ] Doit afficher ✅ "Insertion réussie"

## Phase 3 : Test sur le Site (5 min)

- [ ] Ouvrez https://adrienolichon.github.io/wishlist.html (ou votre URL locale)
- [ ] Attendez que la page charge complètement
- [ ] Cliquez sur **"Marquer comme acheté"** d'un produit
- [ ] Vérifications :
  - [ ] Le bouton devient grisé
  - [ ] La carte affiche "✓ Article déjà acheté par quelqu'un"
  - [ ] La carte devient semi-transparente
- [ ] Rafraîchissez la page (F5)
  - [ ] L'état est conservé ✅

## Phase 4 : Multi-navigateurs (2 min)

- [ ] Ouvrez wishlist.html dans 2 navigateurs différents (ou incognito)
- [ ] Dans le navigateur A : cliquez sur "Marquer comme acheté"
- [ ] Rafraîchissez le navigateur B (F5)
  - [ ] Le produit devrait être marqué comme acheté ✅
- [ ] Cela confirme que la DB est partagée

## Phase 5 : Publication GitHub (2 min)

```bash
# Terminal
cd /Users/adrien/Library/Mobile\ Documents/com~apple~CloudDocs/Design/Web/WebsiteGithub/adrienolichon.github.io

git add .
git commit -m "feat: add Supabase wishlist sync"
git push origin main
```

- [ ] Push réussi
- [ ] Attendez 1-2 min que GitHub Pages se mette à jour
- [ ] Testez votre site en ligne

## Phase 6 : Tests Finaux (1 min)

- [ ] Ouvrez votre site en ligne
- [ ] Testez le clic sur "Marquer comme acheté"
- [ ] Partagez le lien à un ami et demandez de cliquer
- [ ] Vérifiez que vous voyez les changements en temps réel

---

## 🐛 Troubleshooting

### Le test "Connexion" échoue ❌

```
Causes possibles :
1. L'URL Supabase n'est pas correcte
2. La clé API a expiré
3. CORS bloqué (rare sur GitHub Pages)

Solution :
- Vérifiez que wishlist.js a exactement :
  const SUPABASE_URL = 'https://syxeszmebfizvshaypnq.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_p5srmCHLdgYL-SsOtFeFlg_0CnvyH_H';
```

### Le test "Charger les articles" affiche un tableau vide 📭

```
Causes possibles :
1. La table n'existe pas dans Supabase
2. Les données n'ont pas été insérées
3. Les RLS policies sont trop restrictives

Solution :
1. Allez dans Supabase Table Editor
2. Vérifiez que wishlist_items existe et a 4 lignes
3. Si non : exécutez à nouveau sql-setup.sql
```

### Le bouton ne marque pas comme acheté 🔘

```
Causes possibles :
1. L'article ne s'insère pas dans la DB
2. Les RLS policies sont trop restrictives
3. La page n'est pas correctement chargée

Solution :
1. F12 → Console → Vérifier les erreurs
2. Vérifiez les RLS policies dans Supabase :
   - SELECT: Allow public read ✅
   - INSERT: Allow public insert ✅
   - UPDATE: Allow public update ✅
```

### Les changements ne se synchronisent pas entre navigateurs 🔄

```
Causes possibles :
1. Vous ne rafraîchissez pas la page
2. La lecture depuis Supabase ne fonctionne pas

Solution :
1. Vérifiez que loadPurchasedItems() retourne les bonnes données
2. Ouvrez wishlist-test.html → "Charger les articles"
3. Vérifiez que la liste est correcte
```

---

## 📊 Dashboard Supabase

Pour monitorer votre wishlist en temps réel :

1. Allez sur https://supabase.com/dashboard/project/syxeszmebfizvshaypnq
2. **Table Editor** → `wishlist_items` pour voir les données
3. **SQL Editor** pour exécuter des requêtes
4. **Analytics** pour voir les statistiques d'utilisation

---

## 🎯 Résultat Final

Une fois tous les tests passés ✅, vous avez :

- ✅ Une wishlist en temps réel
- ✅ Une base de données centralisée
- ✅ Aucun backend à maintenir
- ✅ Scalable gratuitement jusqu'à 500K requêtes/mois
- ✅ Sécurisé avec les RLS policies

**Bravo ! 🎉**
