const firstName = "Telman"; // Replace "Your" with your first name
const surname = "Mammadov"; // Replace "Surname" with your surname
const nameElement = document.getElementById("animatedText");
let isFirstName = true;

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function writeName(name, isFirstName) {
  function appendWithColor(text) {
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.style.color = getRandomColor();
        nameElement.appendChild(span);

        // Check if it's the last letter
        if (i === text.length - 1) {
          setTimeout(() => {
            deleteText();
          }, 1000); // Wait for a brief moment after displaying the name
        }
      }, 250 * i);
    }
  }

  function deleteText() {
    const spans = nameElement.querySelectorAll("span");
    for (let i = spans.length - 1; i >= 0; i--) {
      setTimeout(() => {
        spans[i].style.opacity = "0";
        setTimeout(() => {
          spans[i].remove();

          // When text is deleted, write the next name
          if (i === 0) {
            isFirstName = !isFirstName;
            const nextName = isFirstName ? firstName : surname;
            setTimeout(() => {
              writeName(nextName, isFirstName);
            }, 500);
          }
        }, 250);
      }, 250 * (spans.length - i));
    }
  }

  // Write the name with colored letters
  appendWithColor(name);
}

// Initial call to start the sequence
writeName(firstName, true);
