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
    file: "customer_avatar_research.MD",
    title: "Customer Avatar Research",
    kicker: "Audience",
    summary: "Customer avatar framework applied to the baking brand."
  },
  {
    title: "Brand Audit",
    kicker: "Audit",
    summary: "6-point brand audit with score, rationale, and action items.",
    type: "brandAudit"
  },
  {
    title: "Components",
    kicker: "Visual Guide",
    summary: "Illustrated reference for every main kit piece and add-on.",
    type: "components"
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
const assetVersion = "68da2d9-components";

const brandAuditRows = [
  {
    element: "The Why",
    score: 3,
    rating: "Competent",
    rationale: "The brand now has a clear broader purpose around approachable home baking, but the final brand name, story, and founder/company origin still need to make the why feel more ownable.",
    action: "Write a tighter one-paragraph origin story and define why this brand deserves to exist beyond selling baking tools."
  },
  {
    element: "Core Values",
    score: 3,
    rating: "Competent",
    rationale: "Values are documented: clarity, useful completeness, approachable craft, honest confidence, thoughtful quality, and share-worthy joy. They still need to be turned into operating standards.",
    action: "Convert each value into 2-3 decision rules for sourcing, packaging, listing copy, inserts, support, and future product selection."
  },
  {
    element: "Core Beliefs",
    score: 3,
    rating: "Competent",
    rationale: "The brand has useful beliefs around learnable baking, clear guidance, good tools, and sharing. They are strong strategically but not yet expressed as memorable public-facing language.",
    action: "Create 5-7 short belief statements that can appear in A+ content, packaging, inserts, and the brand story."
  },
  {
    element: "Authority",
    score: 2,
    rating: "Needs Improvement",
    rationale: "The authority strategy is planned but not yet proven. The brand needs visible expertise assets such as recipes, troubleshooting, workflow guides, videos, quality checklists, and care instructions.",
    action: "Build a basic authority library: sourdough quick-start guide, starter care guide, basket care guide, blade safety guide, troubleshooting guide, and 3 short QR videos."
  },
  {
    element: "Character",
    score: 3,
    rating: "Competent",
    rationale: "The character is defined as a warm, capable baking mentor. The voice is clear, practical, and encouraging, but it still needs examples across Amazon copy, packaging, emails, and inserts.",
    action: "Create a copy bank with headlines, bullets, insert language, support replies, and forbidden claims so every team member writes in the same voice."
  },
  {
    element: "Design",
    score: 2,
    rating: "Needs Improvement",
    rationale: "The visual direction is defined, but no final brand identity exists yet. Colors, typography, logo, packaging system, image hierarchy, and future-product scalability still need design execution.",
    action: "Create 2-3 visual identity directions that work for a broader baking brand, not just sourdough, then test them against Amazon thumbnail readability."
  }
];

const componentGroups = [
  {
    title: "Main Workflow Pieces",
    intro: "These are the parts that should feel essential in the listing because they support the actual sourdough process from starter care to finished loaf.",
    items: [
      {
        name: "Starter Jar",
        role: "Create, feed, store, and monitor the living sourdough starter.",
        listing: "Show markings, feeding band, breathable cover, and fridge lid clearly.",
        image: "Images/components/starter-jar.png",
        type: "jar"
      },
      {
        name: "Round Banneton Basket",
        role: "Supports round loaves during final proofing and creates spiral texture.",
        listing: "Position as a must-have shaping tool for classic boule loaves.",
        image: "Images/components/round-banneton-basket.png",
        type: "roundBasket"
      },
      {
        name: "Oval Banneton Basket",
        role: "Supports longer batard-style loaves during final proofing.",
        listing: "Use it to explain why the kit supports more than one loaf shape.",
        image: "Images/components/oval-banneton-basket.png",
        type: "ovalBasket"
      },
      {
        name: "Linen Liners",
        role: "Reduce sticking inside baskets and make cleanup easier for beginners.",
        listing: "Pair visually with both banneton baskets.",
        image: "Images/components/linen-liners.png",
        type: "liners"
      },
      {
        name: "Dough Whisk",
        role: "Mixes wet, sticky sourdough dough with less effort than a spoon.",
        listing: "Show as the first mixing tool after starter care.",
        image: "Images/components/dough-whisk.png",
        type: "whisk"
      },
      {
        name: "Bench Scraper",
        role: "Divides, lifts, shapes, and moves dough on the work surface.",
        listing: "Important for sticky dough handling and cleaner counters.",
        image: "Images/components/bench-scraper.png",
        type: "benchScraper"
      },
      {
        name: "Bowl Scraper",
        role: "Scrapes dough from bowls and helps transfer dough without waste.",
        listing: "Explain as cleanup and dough-transfer support.",
        image: "Images/components/bowl-scraper.png",
        type: "bowlScraper"
      },
      {
        name: "Bread Lame",
        role: "Scores the dough before baking so the loaf expands cleanly.",
        listing: "Mention blade caution and protective cover.",
        image: "Images/components/bread-lame.png",
        type: "lame"
      },
      {
        name: "Silicone Bread Sling",
        role: "Helps lower dough into hot bakeware and lift bread after baking.",
        listing: "Make it feel like a safety and confidence feature, not filler.",
        image: "Images/components/silicone-bread-sling.png",
        type: "sling"
      }
    ]
  },
  {
    title: "Helpful Add-Ons",
    intro: "These items add convenience, creativity, cleaning, gifting, or perceived value. They should support the main story without overcrowding the hero claim.",
    items: [
      {
        name: "Cleaning Brush",
        role: "Brushes dried flour and dough from banneton baskets.",
        listing: "Use in a cleanup image with liners and baskets.",
        image: "Images/components/cleaning-brush.png",
        type: "cleaningBrush"
      },
      {
        name: "Flour Duster",
        role: "Applies a light, even layer of flour for proofing and decoration.",
        listing: "Useful in proofing and stencil images.",
        image: "Images/components/flour-duster.png",
        type: "flourDuster"
      },
      {
        name: "Decorative Stencils",
        role: "Create flour patterns on finished loaves before baking.",
        listing: "Best tied to gifting, creativity, and family baking.",
        image: "Images/components/bread-stencil.png",
        type: "stencils"
      },
      {
        name: "Silicone Spatula",
        role: "Helps stir starter, scrape jars, and handle sticky mixtures.",
        listing: "Show beside the starter jar for feeding support.",
        image: "Images/components/silicone-spatula.png",
        type: "spatula"
      },
      {
        name: "Silicone Cooking Brush",
        role: "Brushes oil, water, or wash evenly over dough when a recipe calls for it.",
        listing: "Show as a small convenience add-on, separate from the dry banneton cleaning brush.",
        image: "Images/components/sillicon_brush.png",
        type: "cookingBrush"
      },
      {
        name: "Measuring Cups And Spoons",
        role: "Help customers portion ingredients consistently.",
        listing: "Position as beginner-friendly organization, not professional precision.",
        image: "Images/components/measuring-cups-spoons.png",
        type: "measuring"
      },
      {
        name: "Recipe Book And Manual",
        role: "Guides beginners through starter care, dough prep, proofing, and baking.",
        listing: "This is a confidence builder and should appear in gift images.",
        image: "Images/3.png",
        type: "manual"
      },
      {
        name: "Bread Bags",
        role: "Make it easier to share, store, or gift finished loaves.",
        listing: "Use for the final gift/share image.",
        image: "Images/components/bread-bags.png",
        type: "breadBags"
      },
      {
        name: "Cooling Rack",
        role: "Lets baked bread cool properly before slicing.",
        listing: "Nice value add if included, but not a core sourdough tool.",
        image: "Images/components/cooling-rack.png",
        type: "coolingRack"
      },
      {
        name: "Gift Box",
        role: "Creates a premium unboxing and makes the kit gift-ready.",
        listing: "Important for holiday, birthday, and housewarming buyers.",
        image: "Images/3.png",
        type: "giftBox"
      }
    ]
  }
];

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
    const query = searchInput.value.trim();
    if (documents[activeIndex].type === "components") {
      documentContent.innerHTML = renderComponents(query);
      return;
    }
    if (documents[activeIndex].type === "brandAudit") {
      documentContent.innerHTML = renderBrandAudit(query);
      return;
    }
    renderMarkdown(activeMarkdown, query);
  });
}

async function loadDocument(index) {
  activeIndex = index;
  const doc = documents[index];
  docKicker.textContent = doc.kicker;
  docTitle.textContent = doc.title;
  rawLink.href = doc.file ? `./${doc.file}` : "#";
  rawLink.style.display = doc.file ? "" : "none";
  docSelect.value = String(index);
  searchInput.value = "";

  [...navList.querySelectorAll(".nav-button")].forEach((button, buttonIndex) => {
    button.classList.toggle("active", buttonIndex === index);
  });

  documentContent.innerHTML = "<p>Loading document...</p>";

  if (doc.type === "components") {
    activeMarkdown = "";
    documentContent.innerHTML = renderComponents();
    return;
  }

  if (doc.type === "brandAudit") {
    activeMarkdown = "";
    documentContent.innerHTML = renderBrandAudit();
    return;
  }

  try {
    const response = await fetch(`./${doc.file}`);
    if (!response.ok) throw new Error(`Unable to load ${doc.file}`);
    activeMarkdown = await response.text();
    renderMarkdown(activeMarkdown);
  } catch (error) {
    documentContent.innerHTML = `<p>${escapeHtml(error.message)}</p>`;
  }
}

function renderBrandAudit(query = "") {
  const normalizedQuery = query.toLowerCase();
  const rows = normalizedQuery
    ? brandAuditRows.filter(row => [row.element, row.rating, row.rationale, row.action].join(" ").toLowerCase().includes(normalizedQuery))
    : brandAuditRows;
  const total = brandAuditRows.reduce((sum, row) => sum + row.score, 0);
  const max = brandAuditRows.length * 4;
  const percent = Math.round((total / max) * 100);

  return `
    <section class="audit-summary">
      <div>
        <p class="eyebrow">6-Point Brand Audit</p>
        <h2>Current Brand Readiness Score</h2>
        <p>
          This audit uses six core brand categories to evaluate the broader baking-products brand,
          with the sourdough kit treated as the first flagship product.
        </p>
      </div>
      <div class="audit-score">
        <span>${percent}</span>
        <strong>${total} / ${max} raw points</strong>
        <small>Final score out of 100</small>
      </div>
    </section>
    <div class="audit-table-wrap">
      <table class="audit-table">
        <thead>
          <tr>
            <th>Grading Element</th>
            <th>Score</th>
            <th>Current Assessment</th>
            <th>Action Item</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(renderAuditRow).join("") || `<tr><td colspan="4">No matching audit items found.</td></tr>`}
        </tbody>
      </table>
    </div>
    <section class="audit-actions">
      <h2>Priority Action Items</h2>
      <ol>
        <li>Finalize the broad baking brand name and avoid a name that traps the brand in sourdough only.</li>
        <li>Create a visual identity system that can stretch across bread, dough, pastry, decorating, gifting, and future kits.</li>
        <li>Build authority assets before launch: quick-start guide, starter care guide, troubleshooting content, and short videos.</li>
        <li>Turn the values into operating rules for product sourcing, packaging, claims, and customer support.</li>
        <li>Create a copy bank so Amazon listing, packaging, inserts, and support all sound like the same brand.</li>
      </ol>
    </section>
  `;
}

function renderAuditRow(row) {
  return `
    <tr>
      <th scope="row">${row.element}</th>
      <td><span class="audit-pill score-${row.score}">${row.score}/4</span><small>${row.rating}</small></td>
      <td>${row.rationale}</td>
      <td>${row.action}</td>
    </tr>
  `;
}

function renderComponents(query = "") {
  const normalizedQuery = query.toLowerCase();
  const groups = componentGroups
    .map(group => {
      const items = normalizedQuery
        ? group.items.filter(item => [item.name, item.role, item.listing].join(" ").toLowerCase().includes(normalizedQuery))
        : group.items;

      if (items.length === 0) return "";

      return `
      <section class="component-section">
        <div class="component-section-header">
          <h2>${group.title}</h2>
          <p>${group.intro}</p>
        </div>
        <div class="component-grid">
          ${items.map(renderComponentCard).join("")}
        </div>
      </section>
    `;
    })
    .filter(Boolean)
    .join("");

  return `
    <div class="components-intro">
      <p>
        This tab is the quick visual reference for the kit. Use it when writing listing copy,
        briefing image designers, checking supplier samples, or explaining what belongs in each variation.
      </p>
    </div>
    ${groups || `<p>No matching components found.</p>`}
  `;
}

function renderComponentCard(item) {
  return `
    <article class="component-card">
      <div class="component-art">
        <img src="${item.image}?v=${assetVersion}" alt="${item.name}" loading="lazy" onerror="this.hidden=true; this.nextElementSibling.hidden=false;">
        <div class="component-fallback" hidden aria-hidden="true">${componentSvg(item.type)}</div>
      </div>
      <div class="component-copy">
        <h3>${item.name}</h3>
        <p>${item.role}</p>
        <p><strong>Listing note:</strong> ${item.listing}</p>
      </div>
    </article>
  `;
}

function componentSvg(type) {
  const common = 'viewBox="0 0 220 160" role="img" focusable="false"';
  const svgs = {
    jar: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><rect x="78" y="35" width="64" height="96" rx="15" fill="#f7efe1" stroke="#344b39" stroke-width="4"/><path d="M86 55h48M86 75h40M86 95h46M86 115h36" stroke="#657b5f" stroke-width="3"/><rect x="72" y="24" width="76" height="18" rx="9" fill="#d2a756"/><path d="M76 36c20 14 48 14 68 0" fill="none" stroke="#a95e42" stroke-width="5"/><circle cx="110" cy="93" r="4" fill="#a95e42"/><circle cx="118" cy="103" r="3" fill="#a95e42"/><path d="M158 50v78" stroke="#a95e42" stroke-width="7" stroke-linecap="round"/></svg>`,
    roundBasket: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><ellipse cx="110" cy="88" rx="72" ry="44" fill="#efe0c2" stroke="#344b39" stroke-width="4"/><ellipse cx="110" cy="88" rx="54" ry="31" fill="none" stroke="#d2a756" stroke-width="5"/><ellipse cx="110" cy="88" rx="34" ry="18" fill="none" stroke="#a95e42" stroke-width="4"/><path d="M45 88c36-25 94-25 130 0M54 104c30-18 82-18 112 0" fill="none" stroke="#b88746" stroke-width="3"/></svg>`,
    ovalBasket: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><ellipse cx="110" cy="88" rx="86" ry="36" fill="#efe0c2" stroke="#344b39" stroke-width="4"/><ellipse cx="110" cy="88" rx="66" ry="24" fill="none" stroke="#d2a756" stroke-width="5"/><path d="M38 88c42-21 102-21 144 0M52 101c34-13 82-13 116 0" fill="none" stroke="#b88746" stroke-width="3"/></svg>`,
    liners: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><path d="M54 42h112l14 82H40z" fill="#f1ece2" stroke="#344b39" stroke-width="4"/><path d="M64 50c14 20 14 44 0 66M92 50c14 20 14 44 0 66M120 50c14 20 14 44 0 66M148 50c14 20 14 44 0 66" stroke="#d2d0c8" stroke-width="3" fill="none"/><path d="M50 42c34 16 86 16 120 0" stroke="#d2a756" stroke-width="5" fill="none"/></svg>`,
    whisk: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><rect x="104" y="89" width="24" height="58" rx="10" fill="#c99452" stroke="#344b39" stroke-width="3"/><path d="M116 91c-44-28-42-62 0-62s44 34 0 62M116 91c-20-22-18-54 0-62s20 40 0 62M116 91c20-22 18-54 0-62s-20 40 0 62" fill="none" stroke="#657b5f" stroke-width="4"/></svg>`,
    benchScraper: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><path d="M54 55h112v62H54z" fill="#d8dde0" stroke="#344b39" stroke-width="4"/><rect x="70" y="39" width="80" height="24" rx="8" fill="#c99452" stroke="#344b39" stroke-width="3"/><path d="M72 99h76" stroke="#a8b0ad" stroke-width="3"/><path d="M72 82h56" stroke="#a8b0ad" stroke-width="3"/></svg>`,
    bowlScraper: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><path d="M60 48h100c14 0 25 11 25 25v46H80c-25 0-45-20-45-45 0-14 11-26 25-26z" fill="#e8ece8" stroke="#344b39" stroke-width="4"/><path d="M65 74h88" stroke="#d2a756" stroke-width="4"/></svg>`,
    lame: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><rect x="106" y="36" width="26" height="96" rx="13" fill="#c99452" stroke="#344b39" stroke-width="4"/><path d="M95 46c48 28 48 58 0 86" stroke="#657b5f" stroke-width="6" fill="none"/><path d="M72 48h46l-14 22H58z" fill="#d8dde0" stroke="#344b39" stroke-width="3"/><rect x="144" y="82" width="34" height="20" rx="4" fill="#a95e42"/></svg>`,
    sling: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><path d="M48 92h124l-18 32H66z" fill="#f6d9b5" stroke="#344b39" stroke-width="4"/><path d="M62 92c-14-26-2-48 22-38M158 92c14-26 2-48-22-38" fill="none" stroke="#a95e42" stroke-width="9" stroke-linecap="round"/><path d="M84 82h52" stroke="#d2a756" stroke-width="5"/></svg>`,
    cleaningBrush: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><rect x="58" y="98" width="112" height="18" rx="9" fill="#c99452" stroke="#344b39" stroke-width="3"/><path d="M70 92V52M88 94V46M106 94V50M124 94V45M142 92V54M160 90V60" stroke="#d8dde0" stroke-width="8" stroke-linecap="round"/></svg>`,
    flourDuster: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><circle cx="102" cy="82" r="36" fill="#d8dde0" stroke="#344b39" stroke-width="4"/><path d="M134 70l42-22M137 84l48 2M130 99l40 27" stroke="#a95e42" stroke-width="5" stroke-linecap="round"/><circle cx="92" cy="72" r="4" fill="#fff"/><circle cx="110" cy="84" r="4" fill="#fff"/><circle cx="94" cy="99" r="4" fill="#fff"/></svg>`,
    stencils: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><rect x="44" y="34" width="132" height="92" rx="8" fill="#e8ece8" stroke="#344b39" stroke-width="4"/><path d="M78 86c20-46 44-46 64 0M82 87c18 30 38 30 56 0" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M110 46v74M74 78h72" stroke="#d2a756" stroke-width="3"/></svg>`,
    spatula: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><path d="M105 36c20 0 34 12 34 30 0 14-9 24-22 28v45h-24V94C80 90 71 80 71 66c0-18 14-30 34-30z" fill="#a95e42" stroke="#344b39" stroke-width="4"/><path d="M105 96v42" stroke="#f6d9b5" stroke-width="5"/></svg>`,
    cookingBrush: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><rect x="100" y="35" width="20" height="74" rx="10" fill="#d2a756" stroke="#344b39" stroke-width="3"/><path d="M82 108h56l-10 28H92z" fill="#d2a756" stroke="#344b39" stroke-width="4"/><path d="M92 112v25M104 112v25M116 112v25M128 112v25" stroke="#a95e42" stroke-width="3"/></svg>`,
    measuring: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><circle cx="70" cy="78" r="24" fill="#d2a756" stroke="#344b39" stroke-width="4"/><circle cx="116" cy="88" r="18" fill="#d2a756" stroke="#344b39" stroke-width="4"/><circle cx="154" cy="98" r="14" fill="#d2a756" stroke="#344b39" stroke-width="4"/><path d="M88 90l70 38M130 100l36 28M165 107l20 16" stroke="#344b39" stroke-width="5" stroke-linecap="round"/></svg>`,
    manual: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><path d="M58 32h58c13 0 24 11 24 24v74H82c-13 0-24-11-24-24z" fill="#fff" stroke="#344b39" stroke-width="4"/><path d="M140 56c0-13 11-24 24-24h18v98h-42z" fill="#f4f1e9" stroke="#344b39" stroke-width="4"/><path d="M78 62h38M78 82h46M78 102h34" stroke="#a95e42" stroke-width="4"/><path d="M154 62h18M154 82h18" stroke="#d2a756" stroke-width="4"/></svg>`,
    breadBags: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><path d="M66 38h86l12 92H54z" fill="#f1dcc0" stroke="#344b39" stroke-width="4"/><path d="M74 50h70M78 74h62M82 98h54" stroke="#a95e42" stroke-width="4"/><path d="M82 38c0-18 56-18 56 0" fill="none" stroke="#d2a756" stroke-width="5"/></svg>`,
    coolingRack: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><rect x="48" y="48" width="124" height="76" rx="6" fill="none" stroke="#344b39" stroke-width="4"/><path d="M68 48v76M88 48v76M108 48v76M128 48v76M148 48v76M48 68h124M48 88h124M48 108h124" stroke="#657b5f" stroke-width="3"/></svg>`,
    giftBox: `<svg ${common}><rect width="220" height="160" fill="#fbfaf6"/><rect x="54" y="62" width="112" height="68" fill="#f1dcc0" stroke="#344b39" stroke-width="4"/><rect x="46" y="48" width="128" height="24" rx="3" fill="#d2a756" stroke="#344b39" stroke-width="4"/><path d="M110 48v82M46 72h128" stroke="#a95e42" stroke-width="6"/><path d="M110 48c-32-28-58-9-33 10M110 48c32-28 58-9 33 10" fill="none" stroke="#a95e42" stroke-width="5"/></svg>`
  };

  return svgs[type] || svgs.giftBox;
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
