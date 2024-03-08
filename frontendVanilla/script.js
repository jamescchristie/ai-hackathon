// script.js
document.addEventListener('DOMContentLoaded', () => {
    const imageUploadInput = document.getElementById('imageUpload');
    const styleSelectInput = document.getElementById('styleSelect');
    const productContainer = document.getElementById('productContainer');
  
    imageUploadInput.addEventListener('change', handleImageUpload);
    styleSelectInput.addEventListener('change', handleStyleChange);
  
    function handleImageUpload(event) {
      // Handle the image file uploads here
      // For demonstration purposes, this will log the filenames
      const files = event.target.files;
      console.log('Uploaded files:', files);
    }
  
    function handleStyleChange(event) {
      // Handle the style selection here
      // This will need to trigger a request to the backend for product recommendations
      const style = event.target.value;
      console.log('Selected style:', style);
      
      // Mockup recommendation products
      displayRecommendations(style);
    }
  
    function displayRecommendations(style) {
      // This is where you would display product recommendations.
      // For now, we will just show a message.
      productContainer.innerHTML = `<p>Showing product recommendations for style: ${style}</p>`;
    }
  });
  