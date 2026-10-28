// All site content lives here. Edit this file to add projects, log entries or posts.
// Every text field has an English (en) and Armenian (hy) version.

window.SITE = {
  name: { en: "Alen Gevorgyan", hy: "Ալեն Գևորգյան" },
  role: { en: "AI & Software Developer", hy: "AI և ծրագրավորող" },
  tagline: {
    en: "I build AI tools for problems I see in Armenia.",
    hy: "Ստեղծում եմ AI գործիքներ Հայաստանում իմ տեսած խնդիրների համար։",
  },
  status: { en: "high-school senior", hy: "ավագ դպրոցի աշակերտ" },
  location: { en: "Earth, Solar System", hy: "Երկիր, Արեգակնային համակարգ" },
  timezone: "Asia/Yerevan",

  // TODO (Alen): add your email, LinkedIn and Telegram, or delete the lines you don't want.
  links: [
    { label: "github", url: "https://github.com/AlenGevorgyan" },
    // { label: "email", url: "mailto:you@example.com" },
    // { label: "linkedin", url: "https://www.linkedin.com/in/your-name" },
    // { label: "telegram", url: "https://t.me/your-name" },
  ],

  about: {
    en: [
      "High-school senior in Yerevan. My school is one of about 50 in Armenia with an AI track.",
      "I want to study Computer Science or Data Science, then come back to Armenia, build software for Armenian Sign Language and help grow AI here.",
      "Code: Python, Java, C#, C++ (basics). Languages: Armenian (native), Russian (fluent), English (intermediate).",
      "Outside of code: volleyball and basketball.",
    ],
    hy: [
      "Ավագ դպրոցի աշակերտ եմ Երևանում։ Իմ դպրոցը Հայաստանի մոտ 50 դպրոցներից մեկն է, որտեղ կա AI հոսք։",
      "Ուզում եմ սովորել Համակարգչային գիտություն կամ Տվյալների գիտություն, հետո վերադառնալ Հայաստան, ստեղծել ծրագրեր հայերեն ժեստերի լեզվի համար և օգնել AI-ի զարգացմանը։",
      "Ծրագրավորում՝ Python, Java, C#, C++ (հիմունքներ)։ Լեզուներ՝ հայերեն (մայրենի), ռուսերեն (ազատ), անգլերեն (միջին)։",
      "Կոդից դուրս՝ վոլեյբոլ և բասկետբոլ։",
    ],
  },

  projects: [
    {
      id: "arsen-ai",
      title: "ArSen_AI",
      featured: true,
      desc: {
        en: "Real-time translator from Armenian Sign Language to text. Webcam, MediaPipe hand landmarks and an LSTM network. Runs on a CPU. 25 single words for now.",
        hy: "Հայերեն ժեստերի լեզվից տեքստի իրական ժամանակի թարգմանիչ։ Վեբ-տեսախցիկ, MediaPipe ձեռքի կետեր և LSTM ցանց։ Աշխատում է CPU-ով։ Առայժմ՝ 25 առանձին բառ։",
      },
      tags: ["python", "tensorflow", "mediapipe", "cv"],
      source: "https://github.com/AlenGevorgyan/ArSen_AI",
    },
    {
      id: "ocarm",
      title: "OCArm",
      featured: true,
      desc: {
        en: "OCR for handwritten Armenian. Photo in, text or file out (TXT, PDF, CSV, Excel). Fine-tuned on handwriting my friends and I collected. FastAPI back end and a web app.",
        hy: "Ձեռագիր հայերենի OCR։ Լուսանկարից ստանում ես տեքստ կամ ֆայլ (TXT, PDF, CSV, Excel)։ Fine-tune է արված իմ և ընկերներիս հավաքած ձեռագրերով։ FastAPI և վեբ հավելված։",
      },
      tags: ["python", "pytorch", "fastapi", "react"],
      source: "https://github.com/AlenGevorgyan/OCArm",
    },
    {
      id: "codveda",
      title: "ml-internship-codveda",
      featured: true,
      desc: {
        en: "Two ML tasks from my internship at Codveda Technologies: a tuned Random Forest for customer churn and a neural network for MNIST.",
        hy: "Codveda Technologies-ում պրակտիկայի երկու ML առաջադրանք՝ Random Forest հաճախորդների արտահոսքի համար և նեյրոնային ցանց MNIST-ի համար։",
      },
      tags: ["python", "scikit-learn", "tensorflow"],
      source: "https://github.com/AlenGevorgyan/ml-internship-codveda",
    },
    {
      id: "mnist-scratch",
      title: "mnist-from-scratch",
      desc: {
        en: "A neural network for MNIST written with NumPy only, including manual backpropagation.",
        hy: "Նեյրոնային ցանց MNIST-ի համար՝ գրված միայն NumPy-ով, ձեռքով գրված backpropagation-ով։",
      },
      tags: ["python", "numpy"],
      source: "https://github.com/AlenGevorgyan/MNIST_Dataset_Classificaton_from_Scratch",
    },
    {
      id: "happy-tails",
      title: "Happy Tails",
      desc: {
        en: "Android app for helping stray dogs. Anyone can make a page for a dog with the place it usually stays and start Patreon campaigns for food, toys or treats.",
        hy: "Android հավելված թափառող շների համար։ Ցանկացածը կարող է էջ բացել շան համար՝ նշելով, թե որտեղ է նա սովորաբար լինում, և Patreon-ով հանգանակություն սկսել կերի, խաղալիքների կամ հյուրասիրության համար։",
      },
      tags: ["java", "android", "firebase"],
      source: "https://github.com/AlenGevorgyan/Happy__Tails",
    },
    {
      id: "shooter",
      title: "2d-shooter",
      desc: {
        en: "My first project: a 2D shooter game built at Yandex Programming School.",
        hy: "Իմ առաջին նախագիծը՝ 2D shooter խաղ, ստեղծված Յանդեքսի ծրագրավորման դպրոցում։",
      },
      tags: ["python", "game"],
      source: "https://github.com/AlenGevorgyan/First-Project",
    },
  ],

  // Shown newest first. Use "----" when the year is unknown.
  log: [
    { year: "2026", level: "WIN", text: {
      en: "IOAI 2026: selected for Armenia's team. Team finished 5th in the Team Challenge.",
      hy: "IOAI 2026՝ ընտրվել եմ Հայաստանի թիմում։ Թիմը 5-րդ տեղն է զբաղեցրել Team Challenge-ում։" } },
    { year: "----", level: "WIN", text: {
      en: "Digicode, national programming competition: 2nd place.",
      hy: "Digicode ազգային ծրագրավորման մրցույթ՝ 2-րդ տեղ։" } },
    { year: "----", level: "WIN", text: {
      en: "Dilijan Business Hackathon: 1st place.",
      hy: "Dilijan Business Hackathon՝ 1-ին տեղ։" } },
    { year: "2025", level: "RUN", text: {
      en: "Hackathons: DevHacks 2025, MPP Insights Hackathon 2025.",
      hy: "Հաքաթոններ՝ DevHacks 2025, MPP Insights Hackathon 2025։" } },
    { year: "----", level: "JOB", text: {
      en: "ML Engineering Intern, Codveda Technologies.",
      hy: "ML Engineering պրակտիկանտ, Codveda Technologies։" } },
    { year: "----", level: "JOB", text: {
      en: "Full-stack programmer intern: a dentist's website, AI chatbots, REST APIs and WebSockets.",
      hy: "Full-stack ծրագրավորող պրակտիկանտ՝ ատամնաբույժի կայք, AI չաթբոտներ, REST API և WebSocket։" } },
    { year: "----", level: "EDU", text: {
      en: "Samsung Innovation Campus, mobile track: Java and Android, built a complete app.",
      hy: "Samsung Innovation Campus, մոբայլ հոսք՝ Java և Android, ստեղծել եմ ամբողջական հավելված։" } },
    { year: "----", level: "EDU", text: {
      en: "Yandex Programming School at VTC: advanced Python, OOP, built a 2D shooter.",
      hy: "Յանդեքսի ծրագրավորման դպրոց (VTC)՝ խորացված Python, OOP, ստեղծել եմ 2D shooter։" } },
    { year: "----", level: "EDU", text: {
      en: "VTC: Python basics, and C++ basics at a summer school.",
      hy: "VTC՝ Python-ի հիմունքներ, ամառային դպրոցում՝ C++-ի հիմունքներ։" } },
    { year: "----", level: "EDU", text: {
      en: "Armath robotics lab: Scratch, KTurtle, Python, C#, programmed robots.",
      hy: "Արմաթ ռոբոտաշինության լաբորատորիա՝ Scratch, KTurtle, Python, C#, ռոբոտների ծրագրավորում։" } },
  ],

  // Blog posts, newest first. "body" is a list of paragraphs.
  // TODO (Alen): replace this sample post with your own.
  posts: [
    {
      id: "hello-world",
      date: "2026-10-28",
      title: { en: "Hello, world", hy: "Բարև, աշխարհ" },
      body: {
        en: [
          "This is my new site. Here I will write short notes about my projects, competitions and what I learn.",
          "First up: progress on ArSen_AI and tests with real users.",
        ],
        hy: [
          "Սա իմ նոր կայքն է։ Այստեղ կգրեմ կարճ գրառումներ իմ նախագծերի, մրցույթների և իմ սովորածի մասին։",
          "Առաջինը՝ ArSen_AI-ի առաջընթացը և փորձարկումներ իրական օգտատերերի հետ։",
        ],
      },
    },
  ],
};
