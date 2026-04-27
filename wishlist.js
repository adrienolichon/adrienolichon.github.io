// ⚠️ À REMPLACER : Vos identifiants Supabase
const SUPABASE_URL = 'https://syxeszmebfizvshaypnq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5eGVzem1lYmZpenZzaGF5cG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyOTg5MDYsImV4cCI6MjA5Mjg3NDkwNn0.aQmuD002TMefSwovBw6RWiQqbMVBYJUF4p3G36q-MbY';

// Headers pour les requêtes Supabase
const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
};

// Récupérer les articles achetés depuis Supabase
async function loadPurchasedItems() {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/wishlist_items?select=product_id&is_purchased=eq.true`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY
        }
      }
    );
    
    if (!response.ok) {
      console.error('Erreur GET:', response.status, response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.map(item => item.product_id);
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
