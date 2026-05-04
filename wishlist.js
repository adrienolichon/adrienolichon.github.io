// ⚠️ À REMPLACER : Vos identifiants Supabase
const SUPABASE_URL = 'https://syxeszmebfizvshaypnq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_p5srmCHLdgYL-SsOtFeFlg_0CnvyH_H'; // Clé publique (pas JWT)

// Headers simples pour les requêtes Supabase
const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_ANON_KEY
};

// Récupérer les articles achetés depuis Supabase
async function loadPurchasedItems() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/wishlist_items?select=product_id&is_purchased=eq.true`,
      {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY
        }
      }
    );
    
    if (!response.ok) {
      console.error('Erreur GET:', response.status, await response.text());
      return [];
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data.map(item => item.product_id) : [];
  } catch (error) {
    console.error('Erreur chargement:', error);
    return [];
  }
}

// Marquer un article comme acheté dans Supabase
async function markAsPurchased(productId) {
  try {
    const visitorEmail = `visitor-${Date.now()}@wishlist.local`; // ID unique par session
    
    // D'abord, essayer de mettre à jour (si l'article existe déjà)
    const updateResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/wishlist_items?product_id=eq.${productId}`,
      {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify({
          is_purchased: true,
          purchased_at: new Date().toISOString(),
          purchased_by_email: visitorEmail
        })
      }
    );

    if (updateResponse.ok) {
      console.log('Article mis à jour:', productId);
      return true;
    }

    // Si la mise à jour échoue, insérer un nouvel article
    const insertResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/wishlist_items`,
      {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          product_id: productId,
          is_purchased: true,
          purchased_at: new Date().toISOString(),
          purchased_by_email: visitorEmail
        })
      }
    );

    if (insertResponse.ok) {
      console.log('Article inséré:', productId);
      return true;
    }
    
    console.error('Erreur insertion:', insertResponse.status, await insertResponse.text());
    return false;
  } catch (error) {
    console.error('Erreur sauvegarde:', error);
    return false;
  }
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', async function() {
  const purchasedIds = await loadPurchasedItems();
  
  // Appliquer la classe "purchased" aux articles achetés
  purchasedIds.forEach(id => {
    const card = document.querySelector(`[data-product-id="${id}"]`);
    if (card) {
      card.classList.add('purchased');
      const button = card.querySelector('.buy-button');
      button.disabled = true;
    }
  });
  
  // Ajouter les écouteurs de clic sur les boutons
  document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const card = this.closest('[data-product-id]');
      const productId = card.dataset.productId;
      const productName = card.querySelector('h2').textContent;
      
      // Déterminer le propriétaire (Alicia ou Adrien)
      let owner = 'Alicia';
      const section = card.closest('section');
      if (section && section.querySelector('h1').textContent.includes('Adrien')) {
        owner = 'Adrien';
      }
      
      // Afficher la confirmation native du navigateur
      const isConfirmed = confirm(
        `Es-tu sûr de marquer comme acheté ce produit pour ${owner} ?\n\n"${productName}"`
      );
      
      if (isConfirmed) {
        const success = await markAsPurchased(productId);
        if (success) {
          card.classList.add('purchased');
          this.disabled = true;
          this.textContent = '✓ Acheté';
        } else {
          alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
        }
      }
    });
  });
});
