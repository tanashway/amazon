const documents = [
  {
    file: "core_canvas.MD",
    title: "Core Message Canvas",
    kicker: "Messaging",
    summary: "Audience, promise, proof, objections, and positioning."
  },
  {
    file: "BrandBP.MD",
    title: "Brand Blueprint",
    kicker: "Brand",
    summary: "Personality, voice, visual direction, and launch priorities."
  },
  {
    file: "components_analysis.MD",
    title: "Component Analysis",
    kicker: "Product",
    summary: "Main kit pieces, add-ons, and recommended architecture."
  },
  {
    file: "listing_strategy.MD",
    title: "Amazon Listing Strategy",
    kicker: "Listing",
    summary: "Variation structure, default SKU, and image recommendations."
  },
  {
    file: "POD_POP.MD",
    title: "POD and POP",
    kicker: "Positioning",
    summary: "Category must-haves and true differentiation."
  },
  {
    file: "sourdough_workflow_for_listing.MD",
    title: "Sourdough Workflow Guide",
    kicker: "Education",
    summary: "Plain-English sourdough process guide for the listing team."
  }
];

const navList = document.querySelector("#navList");
const docSelect = document.querySelector("#docSelect");
const searchInput = document.querySelector("#searchInput");
const docKicker = document.querySelector("#docKicker");
const docTitle = document.querySelector("#docTitle");
const documentContent = document.querySelector("#documentContent");
const rawLink = document.querySelector("#rawLink");

let activeIndex = 0;
let activeMarkdown = "";

function initNavigation() {
  documents.forEach((doc, index) => {
    const button = document.createElement("button");
    button.className = "nav-button";
    button.type = "button";
    button.innerHTML = `<span>${doc.kicker}</span><strong>${doc.title}</strong>`;
    button.addEventListener("click", () => loadDocument(index));
    navList.appendChild(button);

    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = doc.title;
    docSelect.appendChild(option);
  });

  docSelect.addEventListener("change", event => {
    loadDocument(Number(event.target.value));
  });

  searchInput.addEventListener("input", () => {
    renderMarkdown(activeMarkdown, searchInput.value.trim());
  });
}

async function loadDocument(index) {
  activeIndex = index;
  const doc = documents[index];
  docKicker.textContent = doc.kicker;
  docTitle.textContent = doc.title;
  rawLink.href = `./${doc.file}`;
  docSelect.value = String(index);
  searchInput.value = "";

  [...navList.querySelectorAll(".nav-button")].forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });

  documentContent.innerHTML = "<p>Loading document...</p>";

  try {
    const response = await fetch(`./${doc.file}`);
    if (!response.ok) throw new Error(`Unable to load ${doc.file}`);
    activeMarkdown = await response.text();
    renderMarkdown(activeMarkdown);
  } catch (error) {
    documentContent.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

function renderMarkdown(markdown, query = "") {
  const highlighted = query ? highlight(markdown, query) : escapeHtml(markdown);
  const html = markdownToHtml(highlighted);
  documentContent.innerHTML = html;
}

function markdownToHtml(input) {
  const lines = input.split(/\r?\n/);
  const output = [];
  let listType = null;

  function closeList() {
    if (listType) {
      output.push(`</${listType}>`);
      listType = null;
    }
  }

  for (const line of lines) {
    if (/^# /.test(line)) {
      closeList();
      output.push(`<h1>${inline(line.replace(/^# /, ""))}</h1>`);
    } else if (/^## /.test(line)) {
      closeList();
      output.push(`<h2>${inline(line.replace(/^## /, ""))}</h2>`);
    } else if (/^### /.test(line)) {
      closeList();
      output.push(`<h3>${inline(line.replace(/^### /, ""))}</h3>`);
    } else if (/^!\[[^\]]*\]\([^)]+\)$/.test(line.trim())) {
      closeList();
      const match = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      const alt = match[1];
      const src = match[2];
      output.push(`<figure class="guide-image"><img src="${src}" alt="${alt}" loading="lazy"><figcaption>${alt}</figcaption></figure>`);
    } else if (/^- /.test(line)) {
      if (listType !== "ul") {
        closeList();
        output.push("<ul>");
        listType = "ul";
      }
      output.push(`<li>${inline(line.replace(/^- /, ""))}</li>`);
    } else if (/^\d+\. /.test(line)) {
      if (listType !== "ol") {
        closeList();
        output.push("<ol>");
        listType = "ol";
      }
      output.push(`<li>${inline(line.replace(/^\d+\. /, ""))}</li>`);
    } else if (line.trim() === "") {
      closeList();
    } else {
      closeList();
      output.push(`<p>${inline(line)}</p>`);
    }
  }

  closeList();
  return output.join("\n");
}

function inline(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function highlight(markdown, query) {
  const safe = escapeHtml(markdown);
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return safe.replace(new RegExp(`(${escapedQuery})`, "gi"), "<mark>$1</mark>");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

initNavigation();
loadDocument(0);
