// Récupérer les données du localStorage
function loadPurchasedItems() {
  const purchased = localStorage.getItem('purchased-items');
  return purchased ? JSON.parse(purchased) : [];
}

// Sauvegarder les données dans localStorage
function savePurchasedItems(items) {
  localStorage.setItem('purchased-items', JSON.stringify(items));
}

// Au chargement de la page, restaurer l'état des articles achetés
document.addEventListener('DOMContentLoaded', function() {
  const purchasedIds = loadPurchasedItems();
  
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
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const card = this.closest('.card');
      const productId = card.getAttribute('data-product-id');
      
      // Vérifier si déjà acheté
      if (!card.classList.contains('purchased')) {
        // Ajouter la classe
        card.classList.add('purchased');
        this.disabled = true;
        
        // Sauvegarder dans localStorage
        const purchasedItems = loadPurchasedItems();
        purchasedItems.push(productId);
        savePurchasedItems(purchasedItems);
      }
    });
  });
});
