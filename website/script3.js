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

// function init() {
  document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("image-upload");
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
    // const buttons = document.querySelectorAll(".gender-button, .size-button");

    // buttons.forEach((button) => {
    //   button.addEventListener("click", (e) => {
    //     // Remove active from all buttons
    //     buttons.forEach((btn) => btn.classList.remove("active"));
    //     // Add active to clicked button
    //     e.target.classList.add("active");
    //   });
    // });

    const genderButtons = Array.from(document.getElementsByClassName("gender-button"));
    const sizeButtons = Array.from(document.getElementsByClassName("size-button"));
    const allButtons = genderButtons.concat(sizeButtons);
  
    allButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Remove 'active' class from all buttons
        allButtons.forEach((btn) => btn.classList.remove("active"));
        // Add 'active' class to clicked button
        e.currentTarget.classList.add("active");
      });
    });
  });

