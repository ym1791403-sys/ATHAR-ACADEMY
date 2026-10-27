// ATHAR ACADEMY - Courses & Curriculum Data
// Full support for Unlimited Duration Videos, PDF/File Attachments, and Interactive Quizzes
const AtharCoursesData = [
  {
    id: "course-1",
    title: "القرآن الكريم والتجويد الميسر",
    tagline: "تحفيظ وتلاوة وتجويد القرآن بأسلوب مبسط وممتع",
    ageGroup: "من 3 - 7 سنوات",
    price: "180 ر.س",
    instructor: "أ. فاطمة الزهراء",
    coverImage: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=800&q=80",
    color: "#6B8E67",
    bgColor: "#EBF2EC",
    icon: `<svg class="w-8 h-8 text-[#6B8E67]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
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
    sampleVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    chapters: [
      {
        title: "الفصل الأول: آداب الاستماع وقصار السور",
        lessons: [
          {
            id: "ls-101",
            title: "سورة الفاتحة والإخلاص بالتجويد الميسر",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "ساعة و 15 دقيقة",
            attachments: [
              { name: "مذكرة معاني الكلمات والآداب (PDF)", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", size: "1.8 MB", type: "pdf" }
            ],
            quiz: {
              title: "اختبار فهم سورة الفاتحة والإخلاص",
              passingScore: 70,
              questions: [
                {
                  question: "ما هي السورة التي تسمى (أم الكتاب) وتفتتح بها المصحف؟",
                  options: ["سورة الإخلاص", "سورة الفاتحة", "سورة الناس", "سورة الفلق"],
                  correctIndex: 1,
                  explanation: "سورة الفاتحة هي أعظم سور القرآن وتسمى بأم الكتاب وأم القرآن."
                },
                {
                  question: "معنى (قل هو الله أحد) أن الله:",
                  options: ["واحد لا شريك له", "كبير وعظيم فقط", "له أولاد", "كل ما سبق"],
                  correctIndex: 0,
                  explanation: "الله جل جلاله واحد أحد فرد صمد ليس له شريك ولا مثيل."
                }
              ]
            }
          },
          {
            id: "ls-102",
            title: "سورة الفلق والناس مع الشرح المصور",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "ساعتان كاملتان",
            attachments: [
              { name: "ورقة أنشطة التلوين والترديد (PDF)", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", size: "2.1 MB", type: "pdf" }
            ],
            quiz: null
          }
        ]
      },
      {
        title: "الفصل الثاني: مخارج الحروف الأساسية",
        lessons: [
          {
            id: "ls-103",
            title: "مخارج حروف الحلق والشفتين",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "ساعة و 45 دقيقة",
            attachments: [
              { name: "رسم توضيحي لمخارج الحروف (PDF)", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", size: "3.2 MB", type: "pdf" }
            ],
            quiz: {
              title: "كويز مخارج الحروف للأطفال",
              passingScore: 60,
              questions: [
                {
                  question: "أي من الحروف التالية يخرج من الشفتين؟",
                  options: ["حرف الباء (ب)", "حرف الخاء (خ)", "حرف الهمزة (ء)", "حرف العين (ع)"],
                  correctIndex: 0,
                  explanation: "حرف الباء يخرج بانطباق الشفتين."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "تأسيس القراءة والكتابة العربية",
    tagline: "تعلّم الحروف وأصواتها وقراءتها مع تدريبات مبسطة وممتعة",
    ageGroup: "من 3 - 7 سنوات",
    price: "190 ر.س",
    instructor: "أ. عبد الله الشريف",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    color: "#A37036",
    bgColor: "#F8EFE4",
    icon: `<svg class="w-8 h-8 text-[#A37036]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            <path d="M8 8h1"></path>
            <path d="M16 8h-1"></path>
          </svg>`,
    description: "منهج تفاعلي متكامل مستوحى من أحدث طرق تعليم القراءة العربية، يربط بين شكل الحرف وصوته وحركاته عبر أناشيد وقصص مرئية وتدريبات حركية.",
    objectives: [
      "التمييز البصري والسمعي لكافة الحروف الهجائية",
      "نطق الحركات القصيرة والسكون",
      "تركيب الكلمات البسيطة وقراءتها بثقة",
      "تطوير مسكة القلم والتهيئة للكتابة السليمة"
    ],
    lessonsCount: 30,
    level: "تأسيس شامل",
    sampleVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    chapters: [
      {
        title: "الفصل الأول: الحروف الهجائية وأصواتها",
        lessons: [
          {
            id: "ls-201",
            title: "رحلة الحروف من (أ) إلى (خ) بالأشكال",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "ساعة ونصف",
            attachments: [
              { name: "دفتر تتبع الحروف ونقاط الكتابة (PDF)", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", size: "4.5 MB", type: "pdf" }
            ],
            quiz: {
              title: "كويز تمييز الحروف الهجائية",
              passingScore: 70,
              questions: [
                {
                  question: "ما هو الحرف الذي توجد فوقه ثلاث نقاط؟",
                  options: ["حرف الباء (ب)", "حرف التاء (ت)", "حرف الثاء (ث)", "حرف الجيم (ج)"],
                  correctIndex: 2,
                  explanation: "حرف الثاء يتميز بثلاث نقاط فوقه."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "English Phonics & Early Vocabulary",
    tagline: "تساعد طفلك على اكتساب اللغة بسهولة من خلال القصص والألعاب",
    ageGroup: "من 3 - 7 سنوات",
    price: "210 ر.س",
    instructor: "Miss Sarah Adams",
    coverImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    color: "#4A7C59",
    bgColor: "#E8F0EA",
    icon: `<svg class="w-8 h-8 text-[#4A7C59]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect width="8" height="8" x="3" y="3" rx="2"></rect>
            <path d="M7 7h.01"></path>
            <rect width="8" height="8" x="13" y="3" rx="2"></rect>
            <path d="M17 7h.01"></path>
            <rect width="8" height="8" x="8" y="13" rx="2"></rect>
            <path d="M12 17h.01"></path>
          </svg>`,
    description: "بناء ثقة الطفل في التحدث بالإنجليزية عبر منهج الـ Phonics المعاصر وممارسة المحادثات اليومية السهلة.",
    objectives: [
      "Jolly Phonics: التعرف على أصوات الحروف",
      "نطق الكلمات الإنجليزية بلكنة سليمة",
      "اكتساب حصيلة لغوية تفاعلية",
      "التحدث بجمل بسيطة بثقة"
    ],
    lessonsCount: 28,
    level: "مبتدئ وتأسيسي",
    sampleVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    chapters: [
      {
        title: "Unit 1: Letter Sounds (S, A, T, P, I, N)",
        lessons: [
          {
            id: "ls-301",
            title: "Sound Stories & Visual Vocabulary",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "ساعة و 10 دقائق",
            attachments: [
              { name: "Phonics Activity Flashcards (PDF)", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", size: "3.1 MB", type: "pdf" }
            ],
            quiz: {
              title: "Phonics Letters Assessment",
              passingScore: 70,
              questions: [
                {
                  question: "Which letter makes the /s/ sound as in Sun?",
                  options: ["Letter T", "Letter S", "Letter P", "Letter A"],
                  correctIndex: 1,
                  explanation: "The letter S represents the /s/ sound."
                }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "تأسيس الحساب والأشكال الذكية",
    tagline: "تنمي مهارات التفكير والمنطق من خلال أنشطة ممتعة وتفاعلية",
    ageGroup: "من 3 - 7 سنوات",
    price: "160 ر.س",
    instructor: "أ. مريم الدوسري",
    coverImage: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80",
    color: "#C25E68",
    bgColor: "#FCECEE",
    icon: `<svg class="w-8 h-8 text-[#C25E68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
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
    description: "تحويل الحساب والرياضيات إلى تجربة محببة عبر استخدام النماذج والرسومات لتعليم العد والمقارنة والجمع والطرح.",
    objectives: [
      "إتقان الأرقام والعد التنازلي والتصاعدي",
      "مفاهيم الكميات والأحجام والأشكال الهندسية",
      "أساسيات الجمع والطرح بالألعاب التفاعلية",
      "تطوير الذكاء الرياضي وحل المشكلات البسيطة"
    ],
    lessonsCount: 26,
    level: "تفكير ومنطق",
    sampleVideoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    chapters: [
      {
        title: "الوحدة الأولى: الأرقام من 1 إلى 10",
        lessons: [
          {
            id: "ls-401",
            title: "العد بالأصابع والنماذج البصرية",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            duration: "ساعة كاملة",
            attachments: [
              { name: "أوراق عمل تمارين الأرقام وتطابق الأشكال (PDF)", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", size: "2.8 MB", type: "pdf" }
            ],
            quiz: {
              title: "كويز العد والأرقام الذكية",
              passingScore: 60,
              questions: [
                {
                  question: "ما هو الرقم الذي يأتي مباشرة بعد الرقم 4؟",
                  options: ["3", "5", "6", "2"],
                  correctIndex: 1,
                  explanation: "العدد التالي للرقم 4 هو الرقم 5."
                }
              ]
            }
          }
        ]
      }
    ]
  }
];

// Interactive Activity Demo for Kids (Clean & Professional)
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
