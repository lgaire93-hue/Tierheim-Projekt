
const animals = [
  {
    id: "milo",
    name: "Milo",
    type: "Hund",
    age: "3 Jahre",
    sex: "männlich",
    tag: "Ein Freund für draußen",
    img: "photo-1552053831-71594a27632d",

    desc:
      "Neugierig, freundlich und am liebsten an deiner Seite.",

    detail:
      "Milo steht beispielhaft für einen aktiven Hund, der " +
      "gemeinsame Spaziergänge und Beschäftigung liebt. " +
      "Ein ruhiger Tagesrhythmus und geduldige Menschen würden " +
      "zu diesem Beispielprofil passen."
  },

  {
    id: "luna",
    name: "Luna",
    type: "Katze",
    age: "5 Jahre",
    sex: "weiblich",
    tag: "Leise Pfoten, großes Herz",
    img: "photo-1514888286974-6c03e2ca1dba",

    desc:
      "Eine sanfte Seele mit einer Vorliebe für sonnige Fensterplätze.",

    detail:
      "Luna ist ein Beispiel für eine Katze, die zunächst Abstand " +
      "braucht und selbst entscheiden möchte, wann Nähe entsteht. " +
      "Ein geschützter Rückzugsort ist ihr wichtig."
  },

  {
    id: "oskar",
    name: "Oskar & Fritzi",
    type: "Kleintier",
    age: "2 Jahre",
    sex: "ein Paar",
    tag: "Nur gemeinsam",
    img: "photo-1585110396000-c9ffd4e4b308",

    desc:
      "Zwei neugierige Kaninchen, die ihr Glück gemeinsam suchen.",

    detail:
      "Dieses Beispielpaar wird gemeinsam gezeigt. Kaninchen " +
      "brauchen Sozialkontakt, Bewegungsfläche, sichere Rückzugsorte " +
      "und eine auf sie abgestimmte Versorgung."
  },

  {
    id: "bruno",
    name: "Bruno",
    type: "Hund",
    age: "8 Jahre",
    sex: "männlich",
    tag: "Ein ruhiger Begleiter",
    img: "photo-1587300003388-59208cc962cb",

    desc:
      "Gemütliche Spaziergänge und ein weiches Plätzchen wären sein Glück.",

    detail:
      "Bruno steht beispielhaft für einen älteren Hund, dessen " +
      "Alltag auf sein individuelles Tempo abgestimmt wird. " +
      "Verlässlichkeit und entspannte Gesellschaft stehen im Vordergrund."
  },

  {
    id: "nala",
    name: "Nala",
    type: "Katze",
    age: "2 Jahre",
    sex: "weiblich",
    tag: "Neugierige Entdeckerin",
    img: "photo-1573865526739-10659fec78a5",

    desc:
      "Verspielt, aufmerksam und immer bereit für eine neue Entdeckung.",

    detail:
      "Nala ist ein Beispiel für eine junge Katze mit Freude an " +
      "Spiel und Erkundung. Das konkrete Zuhause und der Umgang " +
      "mit Artgenossen müssten individuell abgeklärt werden."
  },

  {
    id: "finn",
    name: "Finn",
    type: "Hund",
    age: "4 Jahre",
    sex: "männlich",
    tag: "Vertrauen braucht Zeit",
    img: "photo-1518717758536-85ae29035b6d",

    desc:
      "Ein sensibler Charakter, der mit Geduld über sich hinauswächst.",

    detail:
      "Finn zeigt beispielhaft, dass nicht jeder Hund sofort offen " +
      "auf Menschen zugeht. Geduldige Bezugspersonen und " +
      "kleinschrittiges Kennenlernen helfen beim Aufbau von Vertrauen."
  }
];


/* ==================================================
   2. Merkliste aus dem Browser laden
   ================================================== */

let saved = [];

try {
  const stored = localStorage.getItem("pfoten-merkliste");

  saved = JSON.parse(stored || "[]");

  if (!Array.isArray(saved)) {
    saved = [];
  }
} catch {
  // Falls der Browser den Speicher blockiert,
  // startet die Seite mit einer leeren Merkliste.
  saved = [];
}


/* ==================================================
   3. Tierkarten darstellen
   ================================================== */

let filter = "Alle";

const box = document.querySelector("#animals");

function render() {
  const query = document
    .querySelector("#search")
    .value
    .toLocaleLowerCase("de");

  const results = animals.filter((animal) => {
    const matchesFilter =
      filter === "Alle" ||
      filter === animal.type ||
      (
        filter === "saved" &&
        saved.includes(animal.id)
      );

    const searchableText = [
      animal.name,
      animal.desc,
      animal.type,
      animal.age,
      animal.tag
    ]
      .join(" ")
      .toLocaleLowerCase("de");

    const matchesSearch = searchableText.includes(query);

    return matchesFilter && matchesSearch;
  });

  const cards = results.map((animal) => {
    const isSaved = saved.includes(animal.id);

    return `
      <article class="card">
        <div class="photo">
          <img
            src="https://images.unsplash.com/${animal.img}?auto=format&fit=crop&w=700&q=80"
            alt="Beispielfoto: ${animal.name}"
            loading="lazy"
          >

          <button
            class="heart"
            data-save="${animal.id}"
            aria-label="${animal.name} ${
              isSaved
                ? "aus Merkliste entfernen"
                : "merken"
            }"
            aria-pressed="${isSaved}"
          >
            ${isSaved ? "♥" : "♡"}
          </button>

          <span class="tag">
            ${animal.tag}
          </span>
        </div>

        <div class="card-body">
          <div class="card-title">
            <h3>${animal.name}</h3>

            <span aria-hidden="true">↗</span>
          </div>

          <div class="meta">
            ${animal.type} · ${animal.age} · ${animal.sex}
          </div>

          <p>${animal.desc}</p>

          <button
            class="text-btn font-semibold bg-[#FA7921] p-2"
            data-animal="${animal.id}"
          >
            ${animal.name} kennenlernen
          </button>
        </div>
      </article>
    `;
  });

  box.innerHTML = cards.join("") || `
    <p class="empty">
      Keine passenden Tiere gefunden.
      Wähle einen anderen Filter oder Suchbegriff.
    </p>
  `;
}

// Beim ersten Laden alle Tiere anzeigen.
render();


/* ==================================================
   4. Suche und Filter
   ================================================== */

// Bei jeder Eingabe die Tierkarten neu darstellen.
document
  .querySelector("#search")
  .addEventListener("input", render);

// Jede Filter-Schaltfläche verbinden.
document
  .querySelectorAll("[data-type]")
  .forEach((button) => {
    button.onclick = () => {
      filter = button.dataset.type;

      document
        .querySelectorAll("[data-type]")
        .forEach((otherButton) => {
          const isActive = otherButton === button;

          otherButton.classList.toggle("active", isActive);

          otherButton.setAttribute(
            "aria-pressed",
            String(isActive)
          );
        });

      render();
    };
  });


/* ==================================================
   5. Inhalte für die Ratgeberfenster
   ================================================== */

const guides = {
  check: [
    "Ist jetzt der richtige Zeitpunkt?",

    `
      <ul>
        <li>
          <b>Zeit:</b>
          Plane tägliche Betreuung, Beschäftigung
          und Eingewöhnung ein.
        </li>

        <li>
          <b>Budget:</b>
          Berücksichtige Futter, Ausstattung,
          laufende Versorgung und unerwartete Ausgaben.
        </li>

        <li>
          <b>Zuhause:</b>
          Kläre Wohnbedingungen und sprich
          mit allen Haushaltsmitgliedern.
        </li>

        <li>
          <b>Plan B:</b>
          Wer hilft bei Urlaub, Krankheit
          oder veränderten Arbeitszeiten?
        </li>
      </ul>

      <p>
        Notiere deine Antworten und bringe sie
        zum Vermittlungsgespräch mit.
      </p>
    `
  ],

  arrival: [
    "Ankommen darf langsam gehen.",

    `
      <ol>
        <li>
          Bereite einen ruhigen, sicheren Rückzugsort vor.
        </li>

        <li>
          Übernimm zunächst vertraute Abläufe
          und vereinbarte Versorgung.
        </li>

        <li>
          Lass dein Tier Nähe und Erkundung
          in seinem Tempo wählen.
        </li>

        <li>
          Vermeide Besuchstrubel und zu viele neue Eindrücke.
        </li>

        <li>
          Halte bei Fragen Rücksprache
          mit dem vermittelnden Tierheim.
        </li>
      </ol>
    `
  ],

  found: [
    "Ein Tier gefunden oder vermisst?",

    `
      <p>
        <b>Gefunden:</b>
        Beobachte aus sicherer Entfernung.
        Bringe dich und das Tier nicht in Gefahr.
        Notiere Fundort, Zeitpunkt und auffällige Merkmale.
        Kontaktiere eine zuständige Stelle vor Ort
        oder ein örtliches Tierheim, um das weitere
        Vorgehen abzustimmen.
      </p>

      <p>
        <b>Vermisst:</b>
        Suche zunächst das direkte Umfeld ab.
        Sammle ein aktuelles Foto, Merkmale und
        den letzten bekannten Aufenthaltsort.
        Informiere örtliche Tierheime und gegebenenfalls
        die Stelle, bei der das Tier registriert ist.
      </p>

      <p>
        Auf dieser Musterseite werden keine Fundmeldungen angenommen.
      </p>
    `
  ],

  volunteer: [
    "Deine Zeit kann viel bewirken.",

    `
      <p>
        Mögliche Aufgaben sind Spaziergänge, Beschäftigung,
        Reinigung, Fahrten oder organisatorische Unterstützung.
        Welche Aufgaben angeboten werden,
        legt das jeweilige Tierheim fest.
      </p>

      <ul>
        <li>Wie regelmäßig kannst du helfen?</li>
        <li>Welche Erfahrungen bringst du mit?</li>
        <li>Welche Einweisung und Voraussetzungen sind nötig?</li>
      </ul>

      <p>
        Eine Anmeldung ist hier noch nicht möglich.
        Kontaktdaten folgen.
      </p>
    `
  ],

  donate: [
    "Erst nachfragen, dann spenden.",

    `
      <p>
        Eine abgestimmte Sachspende ist besonders hilfreich.
        Frage nach benötigten Futtersorten, passenden Materialien,
        Zustand und Abgabezeiten.
      </p>

      <p>
        Diese Musterseite enthält keine aktuelle Bedarfsliste
        und nimmt keine Geldspenden entgegen.
      </p>
    `
  ],

  sponsor: [
    "Verlässlich an der Seite eines Tieres.",

    `
      <p>
        Eine Patenschaft kann die Versorgung von Tieren unterstützen,
        auch wenn eine Adoption nicht möglich ist.
        Umfang, Beitrag, Laufzeit und mögliche Besuche
        legt das jeweilige Tierheim fest.
      </p>

      <p>
        Hier ist noch keine Patenschaft buchbar.
        Die konkreten Bedingungen müssen
        vom Tierheim ergänzt werden.
      </p>
    `
  ],

  contact: [
    "Gut vorbereitet zum Kennenlernen.",

    `
      <ul>
        <li>Notiere, welches Tier dich interessiert.</li>

        <li>
          Beschreibe deinen Alltag und deine Wohnsituation.
        </li>

        <li>
          Überlege, welche Fragen du zum Tier hast.
        </li>

        <li>
          Kläre vorab einen Termin mit dem echten Tierheim.
        </li>
      </ul>

      <p>
        Es sind noch keine bestätigten Kontaktdaten hinterlegt.
        Diese Website verschickt keine Nachrichten
        und nimmt keine Termine an.
      </p>
    `
  ],

  imprint: [
    "Hinweis zur Muster-Website",

    `
      <p>
        „Pfotenfreunde“ ist hier ein vorläufiger Gestaltungsname.
        Diese Seite stellt kein identifiziertes Tierheim dar.
        Tiere, Altersangaben und Beschreibungen sind Beispielinhalte;
        die Fotos sind illustrative Tierfotos von Unsplash.
      </p>

      <p>
        Vor dem Einsatz für ein echtes Tierheim müssen dessen
        verantwortlicher Betreiber, Anschrift und Kontaktangaben
        sowie die erforderlichen Anbieterinformationen
        ergänzt werden.
      </p>
    `
  ],

  privacy: [
    "Hinweise zur Datennutzung",

    `
      <p>
        Diese Seite enthält kein Kontaktformular und keine
        Analyse- oder Werbeskripte. Die Merkliste nutzt den
        lokalen Speicher deines Browsers und wird nicht
        als Anfrage an ein Tierheim gesendet.
        Du kannst sie durch Entfernen der Herzen
        oder Löschen der Websitedaten zurücksetzen.
      </p>

      <p>
        Tierbilder werden von images.unsplash.com geladen.
        Dabei wird eine Verbindung zu diesem externen Dienst
        hergestellt. Beim Aufruf der Website fallen außerdem
        technische Verbindungsdaten beim Hosting an.
      </p>

      <p>
        Für den Betrieb durch ein echtes Tierheim müssen
        die Datenschutzhinweise anhand des verantwortlichen
        Betreibers und der tatsächlich verwendeten Dienste
        vervollständigt werden.
      </p>
    `
  ]
};


/* ==================================================
   6. Fenster öffnen
   ================================================== */

const modal = document.querySelector("#modal");

function openModal(title, body) {
  document.querySelector("#modal-content").innerHTML = `
    <h2>${title}</h2>
    ${body}
  `;

  modal.showModal();
}


/* ==================================================
   7. Klicks auf Merkliste, Tierprofile und Ratgeber
   ================================================== */

document.addEventListener("click", (event) => {
  // Wurde auf ein Herz geklickt?
  const saveButton = event.target.closest("[data-save]");

  if (saveButton) {
    const id = saveButton.dataset.save;

    if (saved.includes(id)) {
      saved = saved.filter((savedId) => savedId !== id);
    } else {
      saved = [...saved, id];
    }

    try {
      localStorage.setItem(
        "pfoten-merkliste",
        JSON.stringify(saved)
      );
    } catch {
      // Die Merkliste funktioniert während dieses Seitenbesuchs
      // auch dann, wenn der Browser das Speichern blockiert.
    }

    render();
  }

  // Wurde ein Tierprofil angeklickt?
  const animalButton = event.target.closest("[data-animal]");

  if (animalButton) {
    const pet = animals.find(
      (animal) => animal.id === animalButton.dataset.animal
    );

    openModal(
      pet.name,

      `
        <img
          src="https://images.unsplash.com/${pet.img}?auto=format&fit=crop&w=800&q=80"
          alt="Beispielfoto: ${pet.name}"
        >

        <p>
          <b>
            Beispielprofil · ${pet.type} · ${pet.age} · ${pet.sex}
          </b>
        </p>

        <p>${pet.detail}</p>

        <p>
          Dieses Tierprofil ist erfunden und stellt
          kein echtes Vermittlungsangebot dar.
        </p>

        <a
          class="btn"
          href="#adoption"
          onclick="document.querySelector('#modal').close()"
        >
          Mehr über Adoption erfahren
        </a>
      `
    );
  }

  // Wurde ein Ratgeber angeklickt?
  const guideButton = event.target.closest("[data-guide]");

  if (guideButton) {
    const data = guides[guideButton.dataset.guide];

    openModal(data[0], data[1]);
  }
});


/* ==================================================
   8. Fenster schließen
   ================================================== */

document.querySelector(".close").onclick = () => {
  modal.close();
};

// Ein Klick außerhalb des Fensterinhalts schließt es ebenfalls.
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    const rectangle = modal.getBoundingClientRect();

    const clickedOutside =
      event.clientX < rectangle.left ||
      event.clientX > rectangle.right ||
      event.clientY < rectangle.top ||
      event.clientY > rectangle.bottom;

    if (clickedOutside) {
      modal.close();
    }
  }
});

// Die Escape-Taste wird vom nativen <dialog>-Element unterstützt.


/* ==================================================
   9. Mobiles Menü
   ================================================== */

const menu = document.querySelector(".menu");

menu.onclick = () => {
  const isOpen = document
    .querySelector("nav")
    .classList.toggle("open");

  menu.setAttribute("aria-expanded", String(isOpen));
};

// Nach Auswahl eines Links das mobile Menü schließen.
document.querySelectorAll("nav a").forEach((link) => {
  link.onclick = () => {
    document.querySelector("nav").classList.remove("open");

    menu.setAttribute("aria-expanded", "false");
  };
});