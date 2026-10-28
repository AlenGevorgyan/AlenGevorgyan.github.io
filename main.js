(() => {
  const S = window.SITE;
  const $ = (sel) => document.querySelector(sel);

  // ---------------------------------------------------------------- i18n
  const UI = {
    en: {
      "nav.home": "home", "nav.projects": "projects", "nav.log": "log", "nav.blog": "blog",
      "chip.online": "ONLINE", "term.skip": "skip »",
      "info.status": "status", "info.location": "location", "info.projects": "projects",
      "info.posts": "posts", "info.time": "local time",
      "grep.ph": "search projects…", "grep.none": "no matches.",
      "entries": (n) => `${n} entries`, "all": "*all", "featured": "FEATURED", "source": "[source ↗]",
      "reader.close": "close ×", "foot.hint": "try typing help in the terminal",
      "boot": ["mounting /home/alen", "loading models: arsen, ocarm", "connecting to github.com/AlenGevorgyan"],
      "boot.ready": "ready. type 'help' for commands, or try: cd projects",
      "help": [
        ["ls [dir]", "list files"], ["cd <dir>", "change folder (cd projects, cd ..)"],
        ["cat <file>", "print a file (cat README.txt)"], ["./open.sh", "inside a project: open it on GitHub"],
        ["pwd", "current folder"], ["tree", "show all folders"],
        ["whoami", "who I am"], ["about", "short bio"], ["projects", "list projects"],
        ["log", "achievements and experience"], ["blog", "latest posts"], ["contact", "links"],
        ["lang en|hy", "switch language"], ["clear", "clear the screen"],
      ],
      "fs.runhint": "run ./open.sh to open this project.",
      "fs.opening": (name, url) => `opening ${name} → ${url}`,
      "fs.nofile": (cmd, p) => `${cmd}: ${p}: no such file or directory`,
      "fs.notdir": (p) => `cd: ${p}: not a directory`,
      "fs.isdir": (cmd, p) => `${cmd}: ${p}: is a directory`,
      "fs.noexec": (p) => `sh: ${p}: permission denied (try cat)`,
      "notfound": (c) => `command not found: ${c}. try 'help'`,
      "sudo": "nice try. permission denied.",
      "open": (t) => `opening ${t}…`,
    },
    hy: {
      "nav.home": "գլխավոր", "nav.projects": "նախագծեր", "nav.log": "մատյան", "nav.blog": "բլոգ",
      "chip.online": "ՑԱՆՑՈՒՄ", "term.skip": "բաց թողնել »",
      "info.status": "կարգավիճակ", "info.location": "վայր", "info.projects": "նախագծեր",
      "info.posts": "գրառումներ", "info.time": "տեղական ժամ",
      "grep.ph": "որոնել նախագծեր…", "grep.none": "համընկնում չկա։",
      "entries": (n) => `${n} գրառում`, "all": "*բոլորը", "featured": "ԸՆՏՐՎԱԾ", "source": "[կոդ ↗]",
      "reader.close": "փակել ×", "foot.hint": "տերմինալում գրիր help",
      "boot": ["միացնում ենք /home/alen", "բեռնում ենք մոդելները՝ arsen, ocarm", "կապ github.com/AlenGevorgyan-ի հետ"],
      "boot.ready": "պատրաստ է։ գրիր 'help' կամ փորձիր՝ cd projects",
      "help": [
        ["ls [dir]", "ֆայլերի ցանկ"], ["cd <dir>", "փոխել պանակը (cd projects, cd ..)"],
        ["cat <file>", "ցույց տալ ֆայլը (cat README.txt)"], ["./open.sh", "նախագծի ներսում՝ բացել GitHub-ում"],
        ["pwd", "ընթացիկ պանակը"], ["tree", "բոլոր պանակները"],
        ["whoami", "ով եմ ես"], ["about", "կարճ կենսագրություն"], ["projects", "նախագծերի ցանկ"],
        ["log", "նվաճումներ և փորձ"], ["blog", "վերջին գրառումները"], ["contact", "հղումներ"],
        ["lang en|hy", "փոխել լեզուն"], ["clear", "մաքրել էկրանը"],
      ],
      "fs.runhint": "գործարկիր ./open.sh՝ նախագիծը բացելու համար։",
      "fs.opening": (name, url) => `բացում ենք ${name} → ${url}`,
      "fs.nofile": (cmd, p) => `${cmd}: ${p}: նման ֆայլ կամ պանակ չկա`,
      "fs.notdir": (p) => `cd: ${p}: պանակ չէ`,
      "fs.isdir": (cmd, p) => `${cmd}: ${p}: պանակ է`,
      "fs.noexec": (p) => `sh: ${p}: թույլտվություն չկա (փորձիր cat)`,
      "notfound": (c) => `հրամանը չի գտնվել՝ ${c}։ փորձիր 'help'`,
      "sudo": "լավ փորձ էր։ մուտքն արգելված է։",
      "open": (t) => `բացում ենք ${t}…`,
    },
  };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  };

  let lang = store.get("lang") === "hy" ? "hy" : "en";
  const t = (key) => UI[lang][key];
  const L = (obj) => (obj && typeof obj === "object" ? obj[lang] ?? obj.en : obj);

  // ---------------------------------------------------------------- render
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else n.setAttribute(k, v);
    }
    for (const kid of kids) if (kid != null) n.append(kid);
    return n;
  };

  let activeTag = "all";

  function renderStatic() {
    document.documentElement.lang = lang === "hy" ? "hy" : "en";
    document.querySelectorAll("[data-i18n]").forEach((n) => { n.textContent = t(n.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((n) => { n.placeholder = t(n.dataset.i18nPh); });
    document.querySelectorAll("[data-c]").forEach((n) => { n.textContent = L(S[n.dataset.c]); });
    document.querySelectorAll("[data-lang]").forEach((n) => n.classList.toggle("on", n.dataset.lang === lang));

    $("#count-projects").textContent = S.projects.length;
    $("#count-posts").textContent = S.posts.length;
    $("#year").textContent = new Date().getFullYear();

    $("#links").replaceChildren(...S.links.map((l) =>
      el("a", { href: l.url, target: "_blank", rel: "noopener", text: `[${l.label}]` })));

    $("#about-text").replaceChildren(...L(S.about).map((p) => el("p", { text: p })));

    $("#logfile").replaceChildren(...S.log.map((e) => el("li", {},
      el("span", { class: "yr", text: e.year }),
      el("span", { class: `lvl lvl-${e.level}`, text: `[${e.level}]` }),
      el("span", { text: L(e.text) }))));

    $("#post-list").replaceChildren(...S.posts.map((p) => el("a", { class: "win post", href: `#post/${p.id}` },
      el("span", { class: "date", text: p.date }),
      el("span", {}, el("strong", { text: L(p.title) }), el("span", { class: "ex", text: L(p.body)[0] })))));

    renderFilters();
    renderProjects();
  }

  function renderFilters() {
    const tags = [...new Set(S.projects.flatMap((p) => p.tags))].sort();
    const mk = (tag, label) => {
      const b = el("button", { type: "button", text: label });
      b.classList.toggle("on", tag === activeTag);
      b.addEventListener("click", () => { activeTag = tag; renderFilters(); renderProjects(); });
      return b;
    };
    $("#filters").replaceChildren(mk("all", t("all")), ...tags.map((tg) => mk(tg, `#${tg}`)));
  }

  function renderProjects() {
    const q = $("#grep").value.trim().toLowerCase();
    const list = S.projects.filter((p) => {
      if (activeTag !== "all" && !p.tags.includes(activeTag)) return false;
      if (!q) return true;
      return [p.title, p.desc.en, p.desc.hy, ...p.tags].join(" ").toLowerCase().includes(q);
    });
    $("#project-grid").replaceChildren(...list.map((p) => {
      const h = el("h3", {}, el("span", { class: "dir", text: "./" }), p.title);
      if (p.featured) h.append(el("span", { class: "badge", text: t("featured") }));
      const foot = el("div", { class: "card-foot" });
      if (p.live) foot.append(el("a", { href: p.live, target: "_blank", rel: "noopener", text: "[live ↗] " }));
      if (p.source) foot.append(el("a", { href: p.source, target: "_blank", rel: "noopener", text: t("source") }));
      return el("article", { class: `win card${p.featured ? " featured" : ""}` },
        h, el("p", { text: L(p.desc) }),
        el("div", { class: "tags" }, ...p.tags.map((tg) => el("span", { text: `#${tg}` }))),
        foot);
    }));
    $("#entries").textContent = t("entries")(list.length);
    $("#no-match").hidden = list.length > 0;
  }

  $("#grep").addEventListener("input", renderProjects);

  // ---------------------------------------------------------------- clock
  function tick() {
    const now = new Date().toLocaleTimeString("en-GB", { timeZone: S.timezone, hour12: false });
    $("#local-time").textContent = now;
    $("#clock-chip").textContent = now;
  }
  tick();
  setInterval(tick, 1000);

  // ---------------------------------------------------------------- terminal
  const out = $("#term-out");
  const body = $("#term-body");
  const form = $("#term-form");
  const input = $("#term-input");
  const history = [];
  let hIdx = 0;

  const print = (text, cls) => {
    out.append(el("p", { class: cls || "", text }));
    body.scrollTop = body.scrollHeight;
  };
  const printNodes = (...nodes) => {
    out.append(el("p", {}, ...nodes));
    body.scrollTop = body.scrollHeight;
  };

  // ---- virtual file system: ~/about.txt, ~/projects/<id>/{README.txt,open.sh}, ~/log, ~/blog
  let cwd = [];
  const pathStr = (parts) => "~" + parts.map((p) => "/" + p).join("");
  const promptStr = () => `alen@earth:${pathStr(cwd)}$`;
  const updatePrompt = () => { $("#term-form .prompt").textContent = promptStr(); };

  const dir = (children) => ({ type: "dir", children });
  const file = (lines) => ({ type: "file", lines });
  const exec = (url, label) => ({ type: "exec", url, label });

  function buildFS() {
    const projects = {};
    for (const p of S.projects) {
      const lines = [p.title, "=".repeat(p.title.length), "", L(p.desc), "", `tags:   ${p.tags.map((x) => "#" + x).join(" ")}`];
      if (p.source) lines.push(`source: ${p.source}`);
      if (p.live) lines.push(`live:   ${p.live}`);
      lines.push("", t("fs.runhint"));
      projects[p.id] = dir({ "README.txt": file(lines), "open.sh": exec(p.live || p.source, p.title) });
    }
    const posts = {};
    for (const p of S.posts) posts[`${p.id}.md`] = file([`# ${L(p.title)}`, p.date, "", ...L(p.body)]);
    return dir({
      "about.txt": file(L(S.about)),
      "contact.txt": file(S.links.map((l) => `${l.label.padEnd(10)} ${l.url}`)),
      projects: dir(projects),
      log: dir({ "achievements.log": file(S.log.map((e) => `${e.year} [${e.level}] ${L(e.text)}`)) }),
      blog: dir(posts),
    });
  }

  // Resolve a path string against cwd. Returns { node, parts } or null.
  function resolve(path) {
    let parts = path === "~" || path.startsWith("~/") || path.startsWith("/") ? [] : [...cwd];
    for (const seg of path.replace(/^~\/?|^\//, "").split("/")) {
      if (!seg || seg === ".") continue;
      if (seg === "..") { parts.pop(); continue; }
      parts.push(seg);
    }
    let node = buildFS();
    for (const seg of parts) {
      node = node.type === "dir" ? node.children[seg] : null;
      if (!node) return null;
    }
    return { node, parts };
  }

  const nameNode = (name, node) => {
    if (node.type === "dir") return el("span", { class: "fs-dir", text: name + "/" });
    if (node.type === "exec") return el("span", { class: "fs-exec", text: name + "*" });
    return el("span", { text: name });
  };

  function runExec(node) {
    print(t("fs.opening")(node.label, node.url), "sys");
    window.open(node.url, "_blank", "noopener");
  }

  const echo = (cmd) => {
    const p = el("p", { class: "cmd-echo" }, el("span", { class: "p", text: promptStr() + " " }), cmd);
    out.append(p);
  };

  const goTo = (id) => document.getElementById(id).scrollIntoView();

  const COMMANDS = {
    help() {
      t("help").forEach(([c, d]) => print(`  ${c.padEnd(14)} ${d}`));
    },
    ls(path = ".") {
      const r = resolve(path);
      if (!r) return print(t("fs.nofile")("ls", path), "err");
      if (r.node.type !== "dir") return printNodes(nameNode(r.parts.at(-1), r.node));
      const names = Object.keys(r.node.children);
      const nodes = [];
      names.forEach((n, i) => { if (i) nodes.push("  "); nodes.push(nameNode(n, r.node.children[n])); });
      printNodes(...nodes);
    },
    cd(path = "~") {
      const r = resolve(path);
      if (!r) return print(t("fs.nofile")("cd", path), "err");
      if (r.node.type !== "dir") return print(t("fs.notdir")(path), "err");
      cwd = r.parts;
      updatePrompt();
    },
    pwd() { print(`/home/alen${cwd.map((p) => "/" + p).join("")}`); },
    cat(path) {
      if (!path) return print("usage: cat <file>", "err");
      const r = resolve(path);
      if (!r) return print(t("fs.nofile")("cat", path), "err");
      if (r.node.type === "dir") return print(t("fs.isdir")("cat", path), "err");
      if (r.node.type === "exec") return print(`#!/bin/sh\nxdg-open ${r.node.url}`);
      r.node.lines.forEach((l) => print(l));
    },
    tree() {
      const walk = (node, prefix) => {
        const names = Object.keys(node.children);
        names.forEach((n, i) => {
          const last = i === names.length - 1;
          const child = node.children[n];
          printNodes(prefix + (last ? "└── " : "├── "), nameNode(n, child));
          if (child.type === "dir") walk(child, prefix + (last ? "    " : "│   "));
        });
      };
      const r = resolve(".");
      print(pathStr(cwd));
      walk(r.node, "");
    },
    whoami() {
      print(`${L(S.name)} — ${L(S.role)}`, "hl");
      print(`${L(S.status)} · ${L(S.location)}`);
    },
    about() { L(S.about).forEach((p) => print(p)); },
    projects() {
      S.projects.forEach((p) => print(`  ./${p.title.padEnd(24)} ${p.tags.map((x) => "#" + x).join(" ")}`));
      print(t("open")("~/projects"), "sys"); goTo("projects");
    },
    log() {
      S.log.slice(0, 5).forEach((e) => print(`  ${e.year} [${e.level}] ${L(e.text)}`));
      print(t("open")("achievements.log"), "sys"); goTo("log");
    },
    blog() {
      S.posts.forEach((p) => print(`  ${p.date}  ${L(p.title)}`));
      goTo("blog");
    },
    contact() { S.links.forEach((l) => print(`  ${l.label.padEnd(10)} ${l.url}`)); },
    lang(arg) {
      if (arg === "en" || arg === "hy") setLang(arg);
      print(`lang = ${lang}`, "sys");
    },
    clear() { out.replaceChildren(); },
    sudo() { print(t("sudo"), "err"); },
  };

  function run(line) {
    const [cmd, ...args] = line.trim().split(/\s+/);
    if (!cmd) return;
    echo(line);
    // ./open.sh, projects/ocarm/open.sh, ~/projects/ocarm/open.sh
    if (cmd.includes("/")) {
      const r = resolve(cmd);
      if (!r) print(t("fs.nofile")("sh", cmd), "err");
      else if (r.node.type === "exec") runExec(r.node);
      else if (r.node.type === "dir") print(t("fs.isdir")("sh", cmd), "err");
      else print(t("fs.noexec")(cmd), "err");
    } else {
      const fn = COMMANDS[cmd.toLowerCase()];
      if (fn) fn(...args); else print(t("notfound")(cmd), "err");
    }
    body.scrollTop = body.scrollHeight;
  }

  // Tab completes the last word against commands or file names.
  function complete() {
    const v = input.value;
    const words = v.split(/\s+/);
    const last = words.at(-1);
    let options;
    if (words.length === 1 && !last.includes("/")) {
      options = Object.keys(COMMANDS).filter((c) => c.startsWith(last));
    } else {
      const slash = last.lastIndexOf("/");
      const base = slash >= 0 ? last.slice(0, slash + 1) : "";
      const r = resolve(base || ".");
      if (!r || r.node.type !== "dir") return;
      options = Object.entries(r.node.children)
        .filter(([n]) => n.startsWith(last.slice(slash + 1)))
        .map(([n, node]) => base + n + (node.type === "dir" ? "/" : ""));
    }
    if (options.length === 1) {
      words[words.length - 1] = options[0];
      input.value = words.join(" ") + (options[0].endsWith("/") ? "" : " ");
    } else if (options.length > 1) {
      echo(v);
      print(options.join("  "));
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = input.value;
    if (v.trim()) { history.push(v); hIdx = history.length; }
    input.value = "";
    run(v);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hIdx > 0) { input.value = history[--hIdx]; e.preventDefault(); }
    if (e.key === "ArrowDown") { hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] || ""; }
    if (e.key === "Tab") { e.preventDefault(); complete(); }
  });
  body.addEventListener("click", () => { if (!form.hidden && !getSelection().toString()) input.focus({ preventScroll: true }); });

  // boot sequence
  let booted = false;
  const timers = [];
  function finishBoot() {
    if (booted) return;
    booted = true;
    timers.forEach(clearTimeout);
    out.replaceChildren();
    t("boot").forEach((s) => print(s, "ok"));
    print(t("boot.ready"), "sys");
    form.hidden = false;
    $("#skip-boot").hidden = true;
  }
  function boot() {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return finishBoot();
    t("boot").forEach((s, i) => timers.push(setTimeout(() => print(s, "ok"), 350 + i * 450)));
    timers.push(setTimeout(finishBoot, 350 + t("boot").length * 450 + 300));
  }
  $("#skip-boot").addEventListener("click", finishBoot);

  // ---------------------------------------------------------------- language
  function setLang(next) {
    lang = next;
    store.set("lang", lang);
    renderStatic();
    route();
  }
  $("#lang-toggle").addEventListener("click", () => setLang(lang === "en" ? "hy" : "en"));

  // ---------------------------------------------------------------- routing (blog reader + nav highlight)
  const reader = $("#reader");
  function route() {
    const m = location.hash.match(/^#post\/(.+)$/);
    const post = m && S.posts.find((p) => p.id === decodeURIComponent(m[1]));
    if (post) {
      $("#reader-file").textContent = `~/blog/${post.id}.md`;
      $("#reader-date").textContent = post.date;
      $("#reader-title").textContent = L(post.title);
      $("#reader-body").replaceChildren(...L(post.body).map((p) => el("p", { text: p })));
      reader.hidden = false;
      document.body.style.overflow = "hidden";
    } else {
      reader.hidden = true;
      document.body.style.overflow = "";
    }
  }
  window.addEventListener("hashchange", route);
  reader.addEventListener("click", (e) => { if (e.target === reader) location.hash = "#blog"; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !reader.hidden) location.hash = "#blog"; });

  const navLinks = [...document.querySelectorAll("[data-nav]")];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const id = en.target.id === "about" ? "home" : en.target.id;
      navLinks.forEach((a) => a.classList.toggle("active", a.dataset.nav === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["home", "about", "projects", "log", "blog"].forEach((id) => spy.observe(document.getElementById(id)));

  renderStatic();
  route();
  boot();
})();
