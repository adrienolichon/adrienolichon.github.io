// ⚠️ À REMPLACER : Vos identifiants Supabase
const SUPABASE_URL = 'https://syxeszmebfizvshaypnq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_p5srmCHLdgYL-SsOtFeFlg_0CnvyH_H'; // Clé publique (pas JWT)

// Headers simples pour les requêtes Supabase
const headers = {
  'apikey': SUPABASE_ANON_KEY
};

// Récupérer les articles achetés depuis Supabase
async function loadPurchasedItems() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/wishlist_items?select=product_id&is_purchased=eq.true`,
      {
        method: 'GET',
        headers: headers
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
        headers,
        body: JSON.stringify({
          is_purchased: true,
          purchased_at: new Date().toISOString(),
          purchased_by_email: visitorEmail
        })
      }
    );

    if (updateResponse.ok) {
      return true;
    }

    // Si la mise à jour échoue, insérer un nouvel article
    const insertResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/wishlist_items`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          product_id: productId,
          is_purchased: true,
          purchased_at: new Date().toISOString(),
          purchased_by_email: visitorEmail
        })
      }
    );

    return insertResponse.ok;
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

  // Ajouter les event listeners aux boutons
  document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();
      
      const card = this.closest('.card');
      const productId = card.getAttribute('data-product-id');
      
      // Vérifier si déjà acheté
      if (!card.classList.contains('purchased')) {
        this.disabled = true;
        this.textContent = 'Sauvegarde...';
        
        // Marquer comme acheté dans Supabase
        const success = await markAsPurchased(productId);
        
        if (success) {
          card.classList.add('purchased');
          this.textContent = 'Acheté !';
        } else {
          this.disabled = false;
          this.textContent = 'Marquer comme acheté';
          alert('Erreur de sauvegarde');
        }
      }
    });
  });
});
