# 🎁 Wishlist avec Supabase - Guide d'installation

## ✅ Configuration effectuée

Votre wishlist est maintenant connectée à une base de données Supabase centralisée.

### 📋 Ce qui a été configuré :

1. **Identifiants Supabase** 
   - ✅ URL : `https://syxeszmebfizvshaypnq.supabase.co`
   - ✅ Clé publique : `sb_publishable_p5srmCHLdgYL-SsOtFeFlg_0CnvyH_H`
   - ✅ Intégré dans `wishlist.js`

2. **Table Supabase**
   - Prête à être créée avec le script `sql-setup.sql`

## 🚀 Étapes finales (5 minutes)

### Étape 1 : Créer la table Supabase

1. Allez sur https://supabase.com/dashboard/project/syxeszmebfizvshaypnq
2. Cliquez sur **SQL Editor** (icône à gauche)
3. Cliquez sur **"New Query"**
4. Ouvrez le fichier `sql-setup.sql` de ce projet
5. Copiez-collez le contenu entièrement dans l'éditeur
6. Cliquez sur le bouton **"Run"** (triangle ▶️)

**Résultat attendu** : Vous verrez "Success" avec 0 lignes retournées

### Étape 2 : Vérifier la table

1. Dans le sidebar Supabase, allez dans **Table Editor**
2. Vous devriez voir `wishlist_items` avec 4 lignes (les 4 produits)

### Étape 3 : Tester sur votre site

1. Poussez les changements sur GitHub : 
   ```bash
   git add .
   git commit -m "feat: add Supabase wishlist sync"
   git push origin main
   ```

2. Allez sur votre site : https://adrienolichon.github.io/wishlist.html

3. Testez en cliquant sur "Marquer comme acheté"

## 🎯 Comment ça marche

- **Clic sur le bouton** → Envoie une requête à Supabase
- **Supabase met à jour** la base de données
- **Tous les visiteurs voient** l'article comme acheté

## 🔐 Sécurité

- ✅ Les clés publiques dans le code sont volontaires (lecture/écriture contrôlées)
- ✅ Row Level Security activée dans Supabase
- ✅ Aucune donnée sensible stockée
- ⚠️ Si vous voulez limiter les abus, contactez Supabase pour rate limiting

## 📊 Dashboard Supabase

Accédez à votre dashboard : https://supabase.com/dashboard/project/syxeszmebfizvshaypnq

Vous pouvez :
- Voir les achats en temps réel dans **Table Editor**
- Consulter les logs dans **Analytics**
- Monitorer l'utilisation dans **Usage**

## ❌ Troubleshooting

**Le bouton ne fait rien ?**
- Ouvrez la console du navigateur (F12)
- Vérifiez s'il y a une erreur CORS
- Vérifiez que la table existe dans Supabase

**"Failed to fetch" ?**
- Vérifiez que votre URL Supabase est correcte
- Vérifiez les RLS policies dans Supabase

**Les articles n'apparaissent pas comme achetés ?**
- Actualisez la page (F5)
- Vérifiez dans le SQL Editor que les données sont bien sauvegardées

## 📞 Support

Pour toute question sur Supabase : https://supabase.com/docs
