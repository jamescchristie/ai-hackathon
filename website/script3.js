// document.addEventListener('DOMContentLoaded', () => {
//     const buttons = document.querySelectorAll('.gender-button, .size-button');

//     buttons.forEach(button => {
//         button.addEventListener('click', (e) => {
//             // Remove active from all buttons
//             buttons.forEach(btn => btn.classList.remove('active'));
//             // Add active to clicked button
//             e.target.classList.add('active');
//         });
//     });
// });

function init() {
  document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("images");
    const imagePreviewContainer = document.getElementById("imagePreview");

    imageInput.addEventListener("change", function () {
      // Clear the preview container
      imagePreviewContainer.innerHTML = "";

      // Loop through the selected files
      for (let i = 0; i < this.files.length; i++) {
        // Make sure the file is an image
        if (this.files[i].type.startsWith("image/")) {
          const reader = new FileReader();

          reader.onload = function (e) {
            // Create an image element and add it to the preview container
            const img = document.createElement("img");
            img.src = e.target.result;
            img.classList.add("preview-image");
            imagePreviewContainer.appendChild(img);
          };

          // Read the file as DataURL
          reader.readAsDataURL(this.files[i]);
        }
      }
    });
    const buttons = document.querySelectorAll(".gender-button, .size-button");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Remove active from all buttons
        buttons.forEach((btn) => btn.classList.remove("active"));
        // Add active to clicked button
        e.target.classList.add("active");
      });
    });
  });
}
