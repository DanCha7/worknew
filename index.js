document.addEventListener("DOMContentLoaded", () => {
  const wordForm = document.getElementById("wordForm");
  const wordInput = document.getElementById("wordInput");
  const rusBlock = document.getElementById("rusBlock");
  const engBlock = document.getElementById("engBlock");
  const resetBtn = document.getElementById("resetBtn");

  function transliterate(text) {
    const translitMap = {
      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "Yo",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "Y",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "Kh",
      Ц: "Ts",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Shch",
      Ъ: " ",
      Ы: "Y",
      Ь: " ",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "kh",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: " ",
      ы: "y",
      ь: " ",
      э: "e",
      ю: "yu",
      я: "ya",
    };
    return text
      .split("")
      .map((char) => translitMap[char] || char)
      .join("");
  }

  wordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputText = wordInput.value.trim();
    if (inputText) {
      const transliteratedText = transliterate(inputText);

      const newRusEntry = document.createElement("div");
      newRusEntry.className = "entry";
      const displayText =
        inputText.length > 7 ? inputText.substring(0, 7) + "..." : inputText;
      newRusEntry.innerHTML = `<div class="rus" title="${inputText}">${
        rusBlock.querySelectorAll(".entry").length + 1
      } ${displayText}</div>`;
      if (inputText.length > 7) {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = inputText;
        newRusEntry.appendChild(tooltip);
      }
      rusBlock.appendChild(newRusEntry);

      const newEngEntry = document.createElement("div");
      newEngEntry.className = "entry";
      const displayEngText =
        transliteratedText.length > 7
          ? transliteratedText.substring(0, 7) + "..."
          : transliteratedText;
      newEngEntry.innerHTML = `<div class="eng" title="${transliteratedText}">${displayEngText}</div>`;
      if (transliteratedText.length > 7) {
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = transliteratedText;
        newEngEntry.appendChild(tooltip);
      }
      newEngEntry.innerHTML += `<button class="button__delete__stroke" onclick="deleteEntry(this)">
                <img class="delete__btn__block" src="/images/icon.svg" alt="Удалить" />
            </button>`;
      engBlock.appendChild(newEngEntry);

      wordInput.value = "";
    }
  });

  resetBtn.addEventListener("click", () => {
    while (rusBlock.children.length > 1) {
      rusBlock.removeChild(rusBlock.lastChild);
    }
    while (engBlock.children.length > 1) {
      engBlock.removeChild(engBlock.lastChild);
    }
  });

  window.deleteEntry = function (btn) {
    const entry = btn.closest(".entry");
    const rusText = entry.previousElementSibling;
    const index = Array.from(engBlock.children).indexOf(entry);
    if (rusText) {
      rusBlock.removeChild(rusBlock.children[index]);
      engBlock.removeChild(entry);
      updateLineNumbers(rusBlock);
      updateLineNumbers(engBlock);
    }
  };

  function updateLineNumbers(block) {
    const entries = block.querySelectorAll(".entry");
    entries.forEach((entry, index) => {
      const rusDiv = entry.querySelector(".rus");
      if (rusDiv) {
        rusDiv.innerHTML = `${index + 1} ${rusDiv.innerHTML.substring(
          rusDiv.innerHTML.indexOf(" ") + 1
        )}`;
      }
    });
  }
});
