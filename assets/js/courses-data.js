// ATHAR ACADEMY - Courses & Curriculum Data (Clean & Professional)
const AtharCoursesData = [
  {
    id: "quran",
    title: "القرآن الكريم",
    tagline: "تحفيظ وتلاوة وتجويد القرآن بأسلوب مبسط وممتع",
    ageGroup: "من 3 - 7 سنوات",
    color: "#6B8E67",
    bgColor: "#EBF2EC",
    icon: `<svg class="w-10 h-10 text-[#6B8E67]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"></path>
            <path d="M6 6h10"></path>
            <path d="M6 10h10"></path>
            <path d="M6 14h6"></path>
            <circle cx="12" cy="18" r="1.5"></circle>
          </svg>`,
    description: "برنامج تأسيسي مخصص للأطفال يبدأ بقصار السور من جزء عمّ، يركز على تصحيح مخارج الحروف، التلقين بالترديد التفاعلي، ورسم حب كتاب الله وقيمه في قلوب الصغار.",
    objectives: [
      "حفظ قصار السور من جزء عم مع التكرار المحبب",
      "إتقان مخارج الحروف والصفات الأساسية بطريقة ميسرة",
      "ترسيخ آداب الاستماع والتعامل مع المصحف الشريف",
      "قصص الأنبياء والعبر الإيمانية المناسبة للطفل"
    ],
    lessonsCount: 24,
    level: "تأسيسي ومتقدم",
    sampleVideo: "سورة الفاتحة والإخلاص بالتجويد الطفولي الميسر"
  },
  {
    id: "arabic",
    title: "تأسيس عربي",
    tagline: "تعلّم الحروف وأصواتها وقراءتها مع تدريبات مبسطة وممتعة",
    ageGroup: "من 3 - 7 سنوات",
    color: "#A37036",
    bgColor: "#F8EFE4",
    icon: `<svg class="w-10 h-10 text-[#A37036]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            <path d="M8 8h1"></path>
            <path d="M16 8h-1"></path>
          </svg>`,
    description: "منهج تفاعلي متكامل مستوحى من أحدث طرق تعليم القراءة العربية (نور البيان والقرائية الحديثة)، يربط بين شكل الحرف وصوته وحركاته عبر أناشيد وقصص مرئية وتدريبات حركية.",
    objectives: [
      "التمييز البصري والسمعي لكافة الحروف الهجائية",
      "نطق الحركات القصيرة (الفتح والكسر والضم) والسكون",
      "تركيب الكلمات البسيطة وقراءتها بثقة",
      "تطوير مسكة القلم والتهيئة للكتابة السليمة"
    ],
    lessonsCount: 30,
    level: "تأسيس شامل",
    sampleVideo: "رحلة الحروف مع الحركات الثلاث"
  },
  {
    id: "english",
    title: "تأسيس إنجليزي",
    tagline: "تساعد طفلك على اكتساب اللغة بسهولة من خلال القصص والألعاب",
    ageGroup: "من 3 - 7 سنوات",
    color: "#4A7C59",
    bgColor: "#E8F0EA",
    icon: `<svg class="w-10 h-10 text-[#4A7C59]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect width="8" height="8" x="3" y="3" rx="2"></rect>
            <path d="M7 7h.01"></path>
            <rect width="8" height="8" x="13" y="3" rx="2"></rect>
            <path d="M17 7h.01"></path>
            <rect width="8" height="8" x="8" y="13" rx="2"></rect>
            <path d="M12 17h.01"></path>
          </svg>`,
    description: "بناء ثقة الطفل في التحدث بالإنجليزية عبر منهج الـ Phonics المعاصر، وممارسة المحادثات اليومية السهلة (التحية، المشاعر، الألوان، وأسماء الأشياء).",
    objectives: [
      "Jolly Phonics: التعرف على أصوات الحروف (Letter Sounds)",
      "نطق الكلمات الإنجليزية الأساسية بلكنة سليمة",
      "اكتساب حصيلة لغوية تزيد عن 200 كلمة تفاعلية",
      "التحدث بجمل بسيطة والتفاعل مع المعلم بالإنجليزية"
    ],
    lessonsCount: 28,
    level: "مبتدئ وتأسيسي",
    sampleVideo: "Phonics & Fun Vocabulary for Little Learners"
  },
  {
    id: "math",
    title: "تأسيس حساب",
    tagline: "تنمي مهارات التفكير والمنطق من خلال أنشطة ممتعة وتفاعلية",
    ageGroup: "من 3 - 7 سنوات",
    color: "#C25E68",
    bgColor: "#FCECEE",
    icon: `<svg class="w-10 h-10 text-[#C25E68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect width="16" height="20" x="4" y="2" rx="3"></rect>
            <line x1="8" x2="16" y1="6" y2="6"></line>
            <line x1="16" x2="16" y1="14"></line>
            <path d="M16 10h.01"></path>
            <path d="M12 10h.01"></path>
            <path d="M8 10h.01"></path>
            <path d="M12 14h.01"></path>
            <path d="M8 14h.01"></path>
            <path d="M12 18h.01"></path>
            <path d="M8 18h.01"></path>
          </svg>`,
    description: "تحويل الحساب والرياضيات إلى تجربة محببة عبر استخدام النماذج والرسومات لتعليم العد، المقارنة، والجمع والطرح المبسط وتنمية التفكير المنطقي.",
    objectives: [
      "إتقان الأرقام والعد التنازلي والتصاعدي",
      "مفاهيم الكميات والأحجام والأشكال الهندسية",
      "أساسيات الجمع والطرح بالألعاب التفاعلية",
      "تطوير الذكاء الرياضي وحل المشكلات البسيطة"
    ],
    lessonsCount: 26,
    level: "تفكير ومنطق",
    sampleVideo: "مغامرة الأرقام والأشكال الذكية"
  }
];

// Interactive Activity Demo for Kids (Cleaned from all emojis)
const FunActivities = [
  {
    type: "arabic",
    question: "ما هو الحرف الذي تبدأ به كلمة (أسد)؟",
    options: ["أ", "ب", "ت", "ج"],
    correctIndex: 0,
    hint: "تلميح: الحرف الأول في الأبجدية",
    cheer: "أحسنت! إجابة صحيحة وممتازة."
  },
  {
    type: "math",
    question: "كم عدد الدوائر الظاهرة: [ ●  ●  ● ]؟",
    options: ["2", "3", "4", "5"],
    correctIndex: 1,
    hint: "تلميح: عد بالترتيب: واحد، اثنان، ...",
    cheer: "ممتاز! إجابة دقيقة وصحيحة."
  },
  {
    type: "english",
    question: "ما هو الحرف الأول في كلمة (Apple)؟",
    options: ["B", "A", "C", "D"],
    correctIndex: 1,
    hint: "Hint: A is for Apple",
    cheer: "Great job! Correct answer."
  }
];
