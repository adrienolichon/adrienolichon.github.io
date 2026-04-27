#!/bin/bash

# Script pour vérifier que la wishlist Supabase est correctement configurée
# Usage: bash check-wishlist.sh

echo "🔍 Vérification de la configuration Wishlist Supabase"
echo "=================================================="

# Vérifier que les fichiers existent
echo ""
echo "1️⃣  Vérification des fichiers..."

FILES=(
    "wishlist.html"
    "wishlist.css"
    "wishlist.js"
    "wishlist-test.html"
    "sql-setup.sql"
    "README-WISHLIST.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file (MANQUANT)"
    fi
done

# Vérifier la configuration Supabase dans wishlist.js
echo ""
echo "2️⃣  Vérification de la configuration Supabase..."

if grep -q "syxeszmebfizvshaypnq" wishlist.js; then
    echo "   ✅ URL Supabase configurée"
else
    echo "   ❌ URL Supabase NON configurée"
fi

if grep -q "sb_publishable_" wishlist.js; then
    echo "   ✅ Clé API configurée"
else
    echo "   ❌ Clé API NON configurée"
fi

# Vérifier la structure HTML
echo ""
echo "3️⃣  Vérification de la structure HTML..."

if grep -q 'data-product-id' wishlist.html; then
    echo "   ✅ data-product-id présent"
else
    echo "   ❌ data-product-id MANQUANT"
fi

if grep -q 'class="buy-button"' wishlist.html; then
    echo "   ✅ Classe buy-button présente"
else
    echo "   ❌ Classe buy-button MANQUANTE"
fi

# Vérifier le CSS
echo ""
echo "4️⃣  Vérification du CSS..."

if grep -q 'purchased' wishlist.css; then
    echo "   ✅ Styles .purchased présents"
else
    echo "   ❌ Styles .purchased MANQUANTS"
fi

# Vérifier que wishlist.js est chargé
echo ""
echo "5️⃣  Vérification du chargement de wishlist.js..."

if grep -q 'src="wishlist.js"' wishlist.html; then
    echo "   ✅ wishlist.js chargé"
else
    echo "   ❌ wishlist.js NON chargé"
fi

echo ""
echo "=================================================="
echo "✅ Vérification complète !"
echo ""
echo "Prochaine étape :"
echo "1. Créez la table dans Supabase avec sql-setup.sql"
echo "2. Testez avec wishlist-test.html"
echo "3. Consultez README-WISHLIST.md pour plus d'infos"
