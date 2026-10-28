/*
 * Portfolio app script.
 * Renders skills, projects and contact cards from js/config.js and
 * js/projects.js, and handles navigation niceties and filtering.
 * All data is inserted with textContent / setAttribute (no innerHTML for data).
 */
(function () {
  "use strict";

  var CONFIG = window.PORTFOLIO_CONFIG || {};
  var PROJECTS = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];

  // Static, trusted SVG markup (never built from user data).
  var ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.04 21.5h-.01a9.5 9.5 0 0 1-4.84-1.33l-.35-.21-3.6.94.96-3.5-.23-.36A9.46 9.46 0 0 1 2.5 12C2.5 6.76 6.78 2.5 12.04 2.5a9.47 9.47 0 0 1 9.46 9.5c0 5.24-4.27 9.5-9.46 9.5Zm8.05-17.55A11.3 11.3 0 0 0 12.04.5C5.68.5.5 5.66.5 12c0 2.03.53 4.01 1.54 5.76L.4 23.5l5.88-1.54A11.5 11.5 0 0 0 12.03 23.5h.01c6.36 0 11.46-5.16 11.46-11.5 0-3.07-1.19-5.96-3.41-8.05Z"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
    box: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>'
  };

  /* ---------- Helpers ---------- */

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function icon(name) {
    var span = el("span", "icon");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = ICONS[name] || ""; // trusted constant markup only
    return span;
  }

  // Accept only http(s) URLs; anything else is treated as "not configured".
  function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      var url = new URL(value.trim(), window.location.href);
      return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
    } catch (e) {
      return null;
    }
  }

  function externalLink(href, className, label) {
    var a = el("a", className);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    if (label) a.setAttribute("aria-label", label + " (opens in a new tab)");
    return a;
  }

  function initials(title) {
    return String(title || "?")
      .split(/[\s—-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); })
      .join("");
  }

  /* ---------- Profile photo fallback ---------- */

  function initAvatar() {
    var avatar = document.getElementById("avatar");
    var img = document.getElementById("profilePhoto");
    if (!avatar || !img) return;
    if (CONFIG.profileImagePosition) img.style.objectPosition = CONFIG.profileImagePosition;
    if (CONFIG.profileImage && img.getAttribute("src") !== CONFIG.profileImage) {
      img.src = CONFIG.profileImage;
    }
    var fail = function () { avatar.classList.add("no-photo"); };
    img.addEventListener("error", fail);
    // The image may have already failed before this script ran.
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("load", function () { avatar.classList.remove("no-photo"); });
  }

  /* ---------- Config-driven text ---------- */

  function applyConfig() {
    if (CONFIG.quote) {
      ["quoteText", "footerQuote"].forEach(function (id) {
        var node = document.getElementById(id);
        if (node) node.textContent = CONFIG.quote;
      });
    }
    var gh = safeUrl(CONFIG.contact && CONFIG.contact.github);
    var heroGithub = document.getElementById("heroGithub");
    if (heroGithub) {
      if (gh) heroGithub.href = gh;
      heroGithub.querySelector("[data-icon]").replaceWith(icon("github"));
    }
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  /* ---------- Skills ---------- */

  function renderSkills() {
    var grid = document.getElementById("skillsGrid");
    var groups = Array.isArray(CONFIG.skillGroups) ? CONFIG.skillGroups : [];
    if (!grid) return;

    groups.forEach(function (group) {
      var col = el("div", "col-sm-6 col-lg-3 reveal");
      var card = el("article", "card-surface skill-card");

      var ic = el("span", "skill-icon");
      ic.setAttribute("aria-hidden", "true");
      ic.innerHTML = ICONS[group.icon] || ICONS.code;
      card.appendChild(ic);

      card.appendChild(el("h3", null, group.title));

      var list = el("ul", "tag-list");
      (group.skills || []).forEach(function (s) { list.appendChild(el("li", "tag", s)); });
      card.appendChild(list);

      if (group.note) card.appendChild(el("p", "skill-note", group.note));

      col.appendChild(card);
      grid.appendChild(col);
    });
  }

  /* ---------- Projects ---------- */

  function buildProjectCard(project) {
    var col = el("div", "col-md-6 project-col");
    var card = el("article", "card-surface project-card");
    var titleId = "project-" + Math.random().toString(36).slice(2, 9);
    card.setAttribute("aria-labelledby", titleId);

    // Thumbnail (with graceful fallback when missing or broken)
    var thumb = el("div", "project-thumb");
    var fallback = el("div", "thumb-fallback", initials(project.title));
    fallback.setAttribute("aria-hidden", "true");

    if (project.image) {
      var img = document.createElement("img");
      img.src = project.image;
      img.alt = "Screenshot of " + project.title;
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 800;
      img.height = 450;
      img.addEventListener("error", function () { img.replaceWith(fallback); });
      thumb.appendChild(img);
    } else {
      thumb.appendChild(fallback);
    }

    if (project.featured) thumb.appendChild(el("span", "badge-featured", "Featured"));
    card.appendChild(thumb);

    // Body
    var body = el("div", "project-body");
    var h3 = el("h3", "project-title", project.title);
    h3.id = titleId;
    body.appendChild(h3);
    body.appendChild(el("p", "project-desc", project.description));

    var techs = Array.isArray(project.technologies) ? project.technologies : [];
    if (techs.length) {
      var tags = el("ul", "tag-list");
      tags.setAttribute("aria-label", "Technologies");
      techs.forEach(function (t) { tags.appendChild(el("li", "tag tag-sm", t)); });
      body.appendChild(tags);
    }

    // Links — rendered only when a valid URL is configured
    var links = el("div", "project-links");
    var gh = safeUrl(project.githubUrl);
    var demo = safeUrl(project.liveDemoUrl);

    if (gh) {
      var ghBtn = externalLink(gh, "btn btn-ghost btn-sm", project.title + " source code on GitHub");
      ghBtn.appendChild(icon("github"));
      ghBtn.appendChild(document.createTextNode("GitHub"));
      links.appendChild(ghBtn);
    }
    if (demo) {
      var demoBtn = externalLink(demo, "btn btn-accent btn-sm", project.title + " live demo");
      demoBtn.appendChild(icon("external"));
      demoBtn.appendChild(document.createTextNode("Live Demo"));
      links.appendChild(demoBtn);
    }
    if (links.childNodes.length) body.appendChild(links);

    card.appendChild(body);
    col.appendChild(card);
    col.dataset.tech = JSON.stringify(techs);
    return col;
  }

  function initProjects() {
    var grid = document.getElementById("projectsGrid");
    var filterBar = document.getElementById("projectFilters");
    var countNode = document.getElementById("projectCount");
    if (!grid) return;

    var valid = PROJECTS.filter(function (p) { return p && p.title; });
    // Featured first, otherwise keep the order from projects.js
    var sorted = valid
      .map(function (p, i) { return { p: p, i: i }; })
      .sort(function (a, b) { return (b.p.featured ? 1 : 0) - (a.p.featured ? 1 : 0) || a.i - b.i; })
      .map(function (x) { return x.p; });

    if (!sorted.length) {
      grid.appendChild(el("p", "empty-state col-12", "Projects coming soon."));
      return;
    }

    var cards = sorted.map(function (p) {
      var node = buildProjectCard(p);
      grid.appendChild(node);
      return { node: node, techs: p.technologies || [] };
    });

    // Build technology filter list (most common first)
    var counts = {};
    sorted.forEach(function (p) {
      (p.technologies || []).forEach(function (t) { counts[t] = (counts[t] || 0) + 1; });
    });
    var techs = Object.keys(counts).sort(function (a, b) {
      return counts[b] - counts[a] || a.localeCompare(b);
    });

    function apply(filter) {
      var shown = 0;
      cards.forEach(function (c) {
        var match = filter === "All" || c.techs.indexOf(filter) !== -1;
        c.node.hidden = !match;
        if (match) shown++;
      });
      Array.prototype.forEach.call(filterBar.children, function (btn) {
        btn.setAttribute("aria-pressed", String(btn.dataset.filter === filter));
      });
      if (countNode) {
        countNode.textContent = "Showing " + shown + " of " + cards.length + " projects" +
          (filter === "All" ? "." : " using " + filter + ".");
      }
    }

    // Only show filters when they actually help
    if (filterBar && techs.length > 1) {
      ["All"].concat(techs).forEach(function (t) {
        var btn = el("button", "filter-btn", t);
        btn.type = "button";
        btn.dataset.filter = t;
        var n = el("span", "count", String(t === "All" ? cards.length : counts[t]));
        n.setAttribute("aria-hidden", "true");
        btn.appendChild(n);
        btn.addEventListener("click", function () { apply(t); });
        filterBar.appendChild(btn);
      });
      apply("All");
    } else if (filterBar) {
      filterBar.remove();
    }
  }

  /* ---------- Contact ---------- */

  // "https://github.com/user/" -> "user"
  function lastSegment(url) {
    return url.replace(/\/+$/, "").split("/").pop();
  }

  function renderContact() {
    var grid = document.getElementById("contactGrid");
    var c = CONFIG.contact || {};
    if (!grid) return;

    var digits = (c.phone || "").replace(/[^\d+]/g, ""); // "+919182490868"
    var items = [];

    if (c.email) items.push({ icon: "mail", label: "Email", value: c.email, href: "mailto:" + c.email });
    if (digits) items.push({ icon: "phone", label: "Phone", value: c.phone, href: "tel:" + digits });
    if (digits && c.showWhatsApp) {
      items.push({ icon: "whatsapp", label: "WhatsApp", value: "Message on WhatsApp",
        href: "https://wa.me/" + digits.replace("+", ""), external: true });
    }
    var gh = safeUrl(c.github);
    if (gh) items.push({ icon: "github", label: "GitHub", value: lastSegment(gh), href: gh, external: true });
    var li = safeUrl(c.linkedin);
    if (li) items.push({ icon: "linkedin", label: "LinkedIn", value: lastSegment(li), href: li, external: true });

    items.forEach(function (item) {
      var col = el("div", "col-sm-6 col-lg-4 reveal");
      var a = item.external
        ? externalLink(item.href, "card-surface contact-card", item.label + ": " + item.value)
        : el("a", "card-surface contact-card");
      if (!item.external) a.href = item.href;

      var ic = el("span", "contact-icon");
      ic.setAttribute("aria-hidden", "true");
      ic.innerHTML = ICONS[item.icon];
      a.appendChild(ic);

      var text = el("span");
      text.appendChild(el("span", "contact-label", item.label));
      text.appendChild(el("span", "contact-value", item.value));
      a.appendChild(text);

      col.appendChild(a);
      grid.appendChild(col);
    });
  }

  /* ---------- Navigation ---------- */

  function initNav() {
    var nav = document.querySelector(".site-nav");
    var collapseEl = document.getElementById("navLinks");

    function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 10); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Close the mobile menu after choosing a link
    if (collapseEl && window.bootstrap) {
      collapseEl.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
          if (collapseEl.classList.contains("show")) {
            window.bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
          }
        });
      });
    }

    // Move focus to the target section so keyboard users land in the right place
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        var id = link.getAttribute("href").slice(1);
        var target = id && document.getElementById(id);
        if (!target) return;
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("in-view"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    nodes.forEach(function (n) { io.observe(n); });
  }

  /* ---------- Boot ---------- */

  initAvatar();
  applyConfig();
  renderSkills();
  initProjects();
  renderContact();
  initNav();
  initReveal();
})();
