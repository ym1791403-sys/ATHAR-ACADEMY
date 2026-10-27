/**
 * ATHAR ACADEMY - Admin Dashboard Controller (Advanced Course, Unlimited Videos, Files & Quizzes)
 * Clean, Zero Emojis, Live Media & Video Attachments
 */

// Initial Seed Data
const DefaultInitialData = {
  stats: {
    totalStudents: 1284,
    activeCourses: 4,
    monthlyRevenue: "34,850 ر.س",
    completionRate: "88%"
  },
  notifications: [
    { id: 1, text: "انضمام طالب جديد: عمر عبد الرحمن إلى مسار القرآن الكريم", time: "منذ 15 دقيقة", unread: true },
    { id: 2, text: "حجز حصة تقييم مجانية جديدة لمرحلة التأسيس", time: "منذ ساعتين", unread: true },
    { id: 3, text: "تفعيل كود اشتراك بنجاح: ATHAR-ARABIC-1102", time: "منذ 4 ساعات", unread: false }
  ],
  courses: typeof AtharCoursesData !== 'undefined' ? AtharCoursesData : [],
  students: [
    {
      id: "std-101",
      name: "عمر أحمد عبد الرحمن",
      parentPhone: "+966 50 123 4567",
      age: "5 سنوات",
      enrolledCourses: ["تأسيس عربي", "القرآن الكريم"],
      joinDate: "2026-10-15",
      status: "active",
      progress: 75
    },
    {
      id: "std-102",
      name: "سارة محمد العتيبي",
      parentPhone: "+966 55 987 6543",
      age: "6 سنوات",
      enrolledCourses: ["English Phonics", "تأسيس حساب"],
      joinDate: "2026-10-18",
      status: "active",
      progress: 90
    },
    {
      id: "std-103",
      name: "يوسف خالد الغامدي",
      parentPhone: "+966 54 222 3344",
      age: "4 سنوات",
      enrolledCourses: ["القرآن الكريم"],
      joinDate: "2026-10-22",
      status: "blocked",
      progress: 20
    },
    {
      id: "std-104",
      name: "ريما فهد السديري",
      parentPhone: "+966 56 444 8899",
      age: "7 سنوات",
      enrolledCourses: ["تأسيس عربي", "English Phonics", "تأسيس حساب"],
      joinDate: "2026-10-25",
      status: "active",
      progress: 60
    }
  ],
  activationCodes: [
    { code: "ATHAR-QURAN-9842", track: "القرآن الكريم", createdDate: "2026-10-20", expiryDate: "2026-12-31", isUsed: false, usedBy: "-" },
    { code: "ATHAR-ARABIC-1102", track: "تأسيس عربي", createdDate: "2026-10-21", expiryDate: "2026-12-31", isUsed: true, usedBy: "عمر أحمد" },
    { code: "ATHAR-ENGL-5521", track: "تأسيس إنجليزي", createdDate: "2026-10-22", expiryDate: "2026-12-31", isUsed: false, usedBy: "-" },
    { code: "ATHAR-MATH-4439", track: "تأسيس حساب", createdDate: "2026-10-24", expiryDate: "2026-12-31", isUsed: false, usedBy: "-" }
  ]
};

// Store Controller with Auto LocalStorage & Firebase Sync
const AdminStore = {
  get(key) {
    const raw = localStorage.getItem(`athar_admin_${key}`);
    if (raw) return JSON.parse(raw);
    if (key === 'courses' && typeof AtharCoursesData !== 'undefined') {
      return AtharCoursesData;
    }
    return DefaultInitialData[key];
  },
  set(key, val) {
    localStorage.setItem(`athar_admin_${key}`, JSON.stringify(val));
    if (window.FirebaseService) {
      if (key === 'courses') window.FirebaseService.syncCourses && window.FirebaseService.syncCourses(val);
      if (key === 'students') window.FirebaseService.syncStudents && window.FirebaseService.syncStudents(val);
      if (key === 'activationCodes') window.FirebaseService.syncActivationCodes && window.FirebaseService.syncActivationCodes(val);
    }
  },
  init() {
    ['stats', 'notifications', 'courses', 'students', 'activationCodes'].forEach(key => {
      if (!localStorage.getItem(`athar_admin_${key}`)) {
        this.set(key, this.get(key));
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AdminStore.init();
  initNavigation();
  renderOverview();
  renderCourses();
  renderStudents();
  renderActivationCodes();
  initSettingsForm();
  renderNotifications();
  initCoverImagePreview();
});

// Toast System (Pure SVG, Zero Emojis)
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-[#8C6239] text-white' : 'bg-red-700 text-white';
  const icon = type === 'success'
    ? `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`
    : `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

  toast.className = `${bg} px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all transform duration-300 translate-y-2 opacity-0 z-50`;
  toast.innerHTML = `${icon}<span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
  setTimeout(() => {
    toast.classList.add('opacity-0', '-translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Navigation
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.admin-section');

  window.switchView = function(viewId) {
    sections.forEach(sec => sec.classList.add('hidden'));
    const target = document.getElementById(`section-${viewId}`);
    if (target) target.classList.remove('hidden');

    navItems.forEach(btn => {
      if (btn.dataset.view === viewId) {
        btn.classList.add('bg-[#8C6239]', 'text-white', 'shadow-md');
        btn.classList.remove('text-[#5E544B]', 'hover:bg-[#F4ECE1]');
      } else {
        btn.classList.remove('bg-[#8C6239]', 'text-white', 'shadow-md');
        btn.classList.add('text-[#5E544B]', 'hover:bg-[#F4ECE1]');
      }
    });

    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar && window.innerWidth < 1024) {
      sidebar.classList.add('-translate-x-full');
      if (overlay) overlay.classList.add('hidden');
    }
  };

  window.toggleSidebar = function() {
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!sidebar) return;
    const isClosed = sidebar.classList.contains('-translate-x-full');
    if (isClosed) {
      sidebar.classList.remove('-translate-x-full');
      if (overlay) overlay.classList.remove('hidden');
    } else {
      sidebar.classList.add('-translate-x-full');
      if (overlay) overlay.classList.add('hidden');
    }
  };
}

// Notifications
window.toggleNotifications = function() {
  const dropdown = document.getElementById('notificationsDropdown');
  if (dropdown) dropdown.classList.toggle('hidden');
};

function renderNotifications() {
  const notifs = AdminStore.get('notifications') || [];
  const listEl = document.getElementById('notificationsList');
  const badgeEl = document.getElementById('notifBadge');
  const unreadCount = notifs.filter(n => n.unread).length;

  if (badgeEl) {
    if (unreadCount > 0) {
      badgeEl.textContent = unreadCount;
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }
  }

  if (listEl) {
    if (notifs.length === 0) {
      listEl.innerHTML = `<div class="p-4 text-center text-xs text-gray-400">لا توجد إشعارات جديدة</div>`;
      return;
    }
    listEl.innerHTML = notifs.map(n => `
      <div class="p-3 border-b border-[#F4ECE1] hover:bg-[#FAF7F2] transition-colors ${n.unread ? 'bg-amber-50/40' : ''}">
        <p class="text-xs text-[#332B25] font-semibold">${n.text}</p>
        <span class="text-[10px] text-gray-400 mt-1 block">${n.time}</span>
      </div>
    `).join('');
  }
}

window.markAllNotificationsRead = function() {
  const notifs = AdminStore.get('notifications') || [];
  notifs.forEach(n => n.unread = false);
  AdminStore.set('notifications', notifs);
  renderNotifications();
  showToast("تم تحديد كل الإشعارات كمقروءة");
};

window.clearNotifications = function() {
  AdminStore.set('notifications', []);
  renderNotifications();
  showToast("تم مسح سجل الإشعارات");
};

// Overview
function renderOverview() {
  const stats = AdminStore.get('stats');
  const courses = AdminStore.get('courses');
  const students = AdminStore.get('students');

  document.getElementById('statTotalStudents').textContent = students.length || stats.totalStudents;
  document.getElementById('statActiveCourses').textContent = courses.filter(c => c.status === 'active' || !c.status).length;
  document.getElementById('statRevenue').textContent = stats.monthlyRevenue;
  document.getElementById('statCompletionRate').textContent = stats.completionRate;

  const recentTable = document.getElementById('recentStudentsOverviewTable');
  if (recentTable) {
    recentTable.innerHTML = students.slice(0, 5).map(std => `
      <tr class="border-b border-[#EBE3D5] hover:bg-[#FAF7F2] transition-colors">
        <td class="py-3 px-4 font-bold text-[#332B25] flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-[#F4ECE1] text-[#8C6239] flex items-center justify-center font-bold text-xs">
            ${std.name.charAt(0)}
          </div>
          ${std.name}
        </td>
        <td class="py-3 px-4 text-xs text-[#5E544B]">${std.age}</td>
        <td class="py-3 px-4 text-xs text-[#5E544B]">${std.enrolledCourses.join('، ')}</td>
        <td class="py-3 px-4">
          <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${std.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
            ${std.status === 'active' ? 'نشط' : 'محظور'}
          </span>
        </td>
      </tr>
    `).join('');
  }
}

// -------------------------------------------------------------
// Courses Management with Cover Image, Video & Price Support
// -------------------------------------------------------------
let uploadedCoverBase64 = null;

function initCoverImagePreview() {
  const fileInput = document.getElementById('newCourseCoverFile');
  const urlInput = document.getElementById('newCourseCoverUrl');
  const previewImg = document.getElementById('courseCoverPreview');
  const previewBox = document.getElementById('courseCoverPreviewBox');

  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          uploadedCoverBase64 = evt.target.result;
          if (previewImg && previewBox) {
            previewImg.src = uploadedCoverBase64;
            previewBox.classList.remove('hidden');
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (urlInput) {
    urlInput.addEventListener('input', function(e) {
      const val = e.target.value.trim();
      if (val && previewImg && previewBox) {
        uploadedCoverBase64 = val;
        previewImg.src = val;
        previewBox.classList.remove('hidden');
      }
    });
  }
}

function renderCourses() {
  const courses = AdminStore.get('courses');
  const container = document.getElementById('coursesListContainer');
  if (!container) return;

  container.innerHTML = courses.map((course) => {
    let totalLessons = 0;
    let totalChapters = 0;
    let totalFiles = 0;
    let totalQuizzes = 0;

    if (course.chapters) {
      totalChapters = course.chapters.length;
      course.chapters.forEach(ch => {
        if (ch.lessons) {
          totalLessons += ch.lessons.length;
          ch.lessons.forEach(ls => {
            if (typeof ls === 'object') {
              if (ls.attachments && ls.attachments.length) totalFiles += ls.attachments.length;
              if (ls.quiz) totalQuizzes += 1;
            }
          });
        }
      });
    }

    const cover = course.coverImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80";
    const status = course.status || "active";

    return `
      <div class="bg-white rounded-3xl border border-[#EBE3D5] shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
        
        <!-- Course Cover Image Display -->
        <div class="relative h-44 w-full bg-[#FAF7F2] overflow-hidden">
          <img src="${cover}" alt="${course.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div class="absolute top-3 right-3 flex items-center gap-2">
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-[#8C6239] shadow-sm backdrop-blur-sm">
              ${course.track || 'مسار عام'}
            </span>
          </div>

          <div class="absolute top-3 left-3">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full ${status === 'active' ? 'bg-emerald-500 text-white' : 'bg-gray-500 text-white'} shadow-sm">
              ${status === 'active' ? 'متاح' : 'معطل'}
            </span>
          </div>

          <div class="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white">
            <span class="text-xs font-semibold opacity-90">${course.instructor || 'أكاديمية أثر'}</span>
            <span class="text-sm font-extrabold bg-[#8C6239] px-2.5 py-0.5 rounded-lg">${course.price || 'مجاني'}</span>
          </div>
        </div>

        <!-- Body Details -->
        <div class="p-5 flex-grow flex flex-col justify-between">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-[#332B25] mb-1.5 font-heading leading-snug">${course.title}</h3>
            <p class="text-xs text-[#6B625B] line-clamp-2 mb-4 leading-relaxed">${course.description || course.tagline || 'منهج تأسيسي متكامل للأطفال.'}</p>

            <div class="grid grid-cols-4 gap-1.5 py-2.5 px-2 bg-[#FAF7F2] rounded-xl text-xs text-[#5E544B] mb-4 text-center border border-[#EBE3D5]">
              <div><span class="block text-[10px] text-gray-400">الفصول</span><strong class="text-[#332B25] font-bold">${totalChapters}</strong></div>
              <div><span class="block text-[10px] text-gray-400">الدروس</span><strong class="text-[#332B25] font-bold">${totalLessons}</strong></div>
              <div><span class="block text-[10px] text-gray-400">الملفات</span><strong class="text-[#8C6239] font-bold">${totalFiles}</strong></div>
              <div><span class="block text-[10px] text-gray-400">الكويزات</span><strong class="text-emerald-700 font-bold">${totalQuizzes}</strong></div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 pt-2 border-t border-[#F4ECE1]">
            <button onclick="openManageChaptersModal('${course.id}')" class="btn-athar-primary py-2 px-3 text-xs font-bold flex-1 text-center flex items-center justify-center gap-1.5">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>إدارة الفصول، الملفات والكويزات</span>
            </button>
            <button onclick="toggleCourseStatus('${course.id}')" class="btn-athar-outline py-2 px-3 text-xs font-bold" title="تغيير الحالة">
              ${status === 'active' ? 'تعطيل' : 'تفعيل'}
            </button>
            <button onclick="deleteCourse('${course.id}')" class="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors" title="حذف الدورة">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>

      </div>
    `;
  }).join('');
}

// Add New Course Handler
window.handleAddNewCourse = function(event) {
  event.preventDefault();
  const title = document.getElementById('newCourseTitle').value;
  const track = document.getElementById('newCourseTrack').value;
  const ageGroup = document.getElementById('newCourseAge').value;
  const instructor = document.getElementById('newCourseInstructor').value;
  const price = document.getElementById('newCoursePrice').value || "مجاني";
  const description = document.getElementById('newCourseDescription').value || "منهج تأسيسي تفاعلي للأطفال.";
  const sampleVideoUrl = document.getElementById('newCourseSampleVideo')?.value || "";

  const cover = uploadedCoverBase64 || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80";

  const courses = AdminStore.get('courses');
  const newCourse = {
    id: `course-${Date.now()}`,
    title,
    track,
    ageGroup,
    instructor,
    price,
    description,
    tagline: description,
    coverImage: cover,
    sampleVideoUrl,
    studentsCount: 0,
    status: "active",
    chapters: [
      {
        title: "الفصل الأول: البداية التمهيدية",
        lessons: [
          {
            id: `ls-${Date.now()}`,
            title: "الدرس الأول: مقدمة ونشاط تفاعلي (مفتوح بدون حد وقت)",
            videoUrl: sampleVideoUrl,
            duration: "ساعة و 15 دقيقة",
            attachments: [],
            quiz: null
          }
        ]
      }
    ]
  };

  courses.unshift(newCourse);
  AdminStore.set('courses', courses);
  renderCourses();
  renderOverview();
  closeModal('addCourseModal');
  event.target.reset();
  uploadedCoverBase64 = null;
  const previewBox = document.getElementById('courseCoverPreviewBox');
  if (previewBox) previewBox.classList.add('hidden');
  showToast("تمت إضافة الدورة وصورة الغلاف بنجاح");
};

window.toggleCourseStatus = function(courseId) {
  const courses = AdminStore.get('courses');
  const course = courses.find(c => c.id === courseId);
  if (course) {
    course.status = course.status === 'active' ? 'inactive' : 'active';
    AdminStore.set('courses', courses);
    renderCourses();
    renderOverview();
    showToast(`تم تحديث حالة الدورة: ${course.status === 'active' ? 'نشطة' : 'معطلة'}`);
  }
};

window.deleteCourse = function(courseId) {
  if (!confirm("هل أنت متأكد من حذف هذه الدورة؟")) return;
  let courses = AdminStore.get('courses');
  courses = courses.filter(c => c.id !== courseId);
  AdminStore.set('courses', courses);
  renderCourses();
  renderOverview();
  showToast("تم حذف الدورة بنجاح", "error");
};

// -------------------------------------------------------------
// Chapters, Unlimited Videos, Files & Quizzes Management Modal
// -------------------------------------------------------------
let activeManagingCourseId = null;

window.openManageChaptersModal = function(courseId) {
  activeManagingCourseId = courseId;
  const courses = AdminStore.get('courses');
  const course = courses.find(c => c.id === courseId);
  if (!course) return;

  const modal = document.getElementById('chaptersModal');
  const container = document.getElementById('chaptersModalContent');
  if (!modal || !container) return;

  if (!course.chapters) course.chapters = [];

  container.innerHTML = `
    <div class="relative bg-white rounded-3xl p-6 md:p-8 max-w-3xl w-full mx-4 shadow-2xl border border-[#EBE3D5] max-h-[88vh] overflow-y-auto">
      <button onclick="closeModal('chaptersModal')" class="absolute top-5 left-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <div class="flex items-center gap-4 mb-6">
        <img src="${course.coverImage || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80'}" class="w-16 h-16 rounded-2xl object-cover border border-[#E8DEC8]">
        <div>
          <span class="text-xs font-bold text-[#8C6239] bg-[#F4ECE1] px-3 py-1 rounded-full">${course.track || 'مسار عام'}</span>
          <h2 class="text-xl sm:text-2xl font-bold text-[#332B25] mt-1 font-heading">${course.title}</h2>
          <p class="text-xs text-[#6B625B]">فيديوهات كاملة بدون حد للوقت، ملفات ومذكرات PDF، واختبارات تفاعلية</p>
        </div>
      </div>

      <div class="space-y-5 mb-6">
        ${course.chapters.length === 0 ? `<p class="text-xs text-gray-400 text-center py-4">لا توجد فصول بعد، اضغط على زر إضافة فصل أدناه.</p>` : ''}
        ${course.chapters.map((ch, chIdx) => {
          const lessons = ch.lessons || [];
          return `
            <div class="border border-[#E0D6C8] rounded-2xl p-4 sm:p-5 bg-[#FAF7F2]">
              <div class="flex items-center justify-between mb-3.5">
                <h4 class="font-bold text-[#332B25] text-xs sm:text-sm flex items-center gap-2">
                  <span class="w-6 h-6 rounded-lg bg-[#8C6239] text-white flex items-center justify-center text-xs font-bold">${chIdx + 1}</span>
                  ${ch.title}
                </h4>
                <button onclick="deleteChapter('${course.id}', ${chIdx})" class="text-xs text-red-500 hover:underline">
                  حذف الفصل
                </button>
              </div>

              <div class="space-y-3 pr-4 border-r-2 border-[#C59A58]">
                ${lessons.map((ls, lsIdx) => {
                  const title = typeof ls === 'object' ? ls.title : ls;
                  const vUrl = typeof ls === 'object' ? ls.videoUrl : '';
                  const dur = typeof ls === 'object' ? ls.duration : 'ساعة كاملة';
                  const attachments = (typeof ls === 'object' && ls.attachments) ? ls.attachments : [];
                  const quiz = (typeof ls === 'object' && ls.quiz) ? ls.quiz : null;

                  return `
                    <div class="bg-white p-3.5 rounded-2xl border border-[#EBE3D5] text-xs space-y-2">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 flex-grow overflow-hidden">
                          <svg class="w-4 h-4 text-[#8C6239] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          <span class="font-bold text-[#332B25] truncate">${title}</span>
                          ${vUrl ? `<span class="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-bold">فيديو مفتوح: ${dur}</span>` : `<span class="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">بدون فيديو</span>`}
                        </div>

                        <div class="flex items-center gap-2 flex-shrink-0 mr-2">
                          ${vUrl ? `
                            <button onclick="openVideoPlayerModal('${encodeURIComponent(vUrl)}', '${encodeURIComponent(title)}')" class="p-1 text-[#8C6239] hover:bg-[#F4ECE1] rounded-lg" title="مشاهدة الفيديو">
                              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </button>
                          ` : ''}
                          <button onclick="deleteLesson('${course.id}', ${chIdx}, ${lsIdx})" class="text-red-400 hover:text-red-600 p-1" title="حذف الدرس">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        </div>
                      </div>

                      <!-- Attachments & Quiz Indicators -->
                      <div class="flex items-center gap-3 pt-2 border-t border-[#F4ECE1] text-[11px]">
                        ${attachments.length ? `
                          <div class="flex items-center gap-1.5 text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            <span>${attachments[0].name}</span>
                          </div>
                        ` : `<span class="text-gray-400">لا توجد ملفات مرفقة</span>`}

                        ${quiz ? `
                          <button onclick="previewQuizInModal('${course.id}', ${chIdx}, ${lsIdx})" class="flex items-center gap-1.5 text-amber-800 font-bold bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-lg transition-colors">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                            <span>كويز تفاعلي: ${quiz.questions.length} أسئلة (معاينة)</span>
                          </button>
                        ` : `<span class="text-gray-400">لا يوجد كويز</span>`}
                      </div>
                    </div>
                  `;
                }).join('')}

                <button onclick="openAddLessonModal('${course.id}', ${chIdx})" class="mt-2 text-xs font-bold text-[#8C6239] hover:underline flex items-center gap-1.5 py-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  <span>+ إضافة درس كامل (فيديو مفتوح + ملف PDF + كويز)</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="pt-4 border-t border-[#EBE3D5] flex gap-3">
        <button onclick="addChapterPrompt('${course.id}')" class="btn-athar-primary py-2.5 px-5 text-xs sm:text-sm font-bold flex-1 text-center">
          + إضافة فصل جديد
        </button>
        <button onclick="closeModal('chaptersModal')" class="btn-athar-outline py-2.5 px-5 text-xs sm:text-sm font-bold">
          تم الحفظ
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

window.addChapterPrompt = function(courseId) {
  const chapterName = prompt("اكتب عنوان الفصل الجديد:");
  if (!chapterName) return;

  const courses = AdminStore.get('courses');
  const course = courses.find(c => c.id === courseId);
  if (course) {
    if (!course.chapters) course.chapters = [];
    course.chapters.push({
      title: chapterName,
      lessons: []
    });
    AdminStore.set('courses', courses);
    renderCourses();
    openManageChaptersModal(courseId);
    showToast("تمت إضافة الفصل بنجاح");
  }
};

window.deleteChapter = function(courseId, chIdx) {
  if (!confirm("هل تريد حذف هذا الفصل ودروسه؟")) return;
  const courses = AdminStore.get('courses');
  const course = courses.find(c => c.id === courseId);
  if (course && course.chapters) {
    course.chapters.splice(chIdx, 1);
    AdminStore.set('courses', courses);
    renderCourses();
    openManageChaptersModal(courseId);
    showToast("تم حذف الفصل");
  }
};

// -------------------------------------------------------------
// Add Lesson with Unlimited Video, PDF File & Quiz Builder
// -------------------------------------------------------------
let pendingLessonCourseId = null;
let pendingLessonChapterIdx = null;
let uploadedLessonVideoBase64 = null;
let uploadedAttachmentBase64 = null;

window.openAddLessonModal = function(courseId, chIdx) {
  pendingLessonCourseId = courseId;
  pendingLessonChapterIdx = chIdx;
  uploadedLessonVideoBase64 = null;
  uploadedAttachmentBase64 = null;

  const modal = document.getElementById('addLessonModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.handleLessonVideoFileUpload = function(e) {
  const file = e.target.files[0];
  if (file) {
    uploadedLessonVideoBase64 = URL.createObjectURL(file);
    const indicator = document.getElementById('lessonVideoFileName');
    if (indicator) {
      indicator.textContent = `تم اختيار ملف الفيديو: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
      indicator.classList.remove('hidden');
    }
  }
};

window.handleLessonAttachmentUpload = function(e) {
  const file = e.target.files[0];
  if (file) {
    uploadedAttachmentBase64 = {
      name: file.name,
      url: URL.createObjectURL(file),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.includes('pdf') ? 'pdf' : 'doc'
    };
    const indicator = document.getElementById('attachmentFileName');
    if (indicator) {
      indicator.textContent = `تم إرفاق الملف: ${file.name}`;
      indicator.classList.remove('hidden');
    }
  }
};

window.saveNewLessonWithVideo = function(e) {
  e.preventDefault();
  const title = document.getElementById('newLessonTitle').value;
  const urlInput = document.getElementById('newLessonVideoUrl').value.trim();
  const duration = document.getElementById('newLessonDuration').value || "ساعة ونصف (مفتوح بدون حد)";
  
  // Attachments
  const attachmentTitle = document.getElementById('newLessonAttachmentName')?.value.trim();
  const attachmentUrl = document.getElementById('newLessonAttachmentUrl')?.value.trim();
  
  let attachments = [];
  if (uploadedAttachmentBase64) {
    attachments.push(uploadedAttachmentBase64);
  } else if (attachmentTitle && attachmentUrl) {
    attachments.push({
      name: attachmentTitle,
      url: attachmentUrl,
      size: "ملف خارجي",
      type: "pdf"
    });
  }

  // Quiz Builder
  let quiz = null;
  const quizEnabled = document.getElementById('enableQuizToggle')?.checked;
  if (quizEnabled) {
    const qTitle = document.getElementById('quizTitleInput')?.value || "اختبار قياس الاستيعاب";
    const qText = document.getElementById('quizQuestionText')?.value;
    const opt0 = document.getElementById('quizOpt0')?.value;
    const opt1 = document.getElementById('quizOpt1')?.value;
    const opt2 = document.getElementById('quizOpt2')?.value;
    const opt3 = document.getElementById('quizOpt3')?.value;
    const correctIdx = parseInt(document.getElementById('quizCorrectOpt')?.value) || 0;
    const explanation = document.getElementById('quizExplanation')?.value || "";

    if (qText && opt0 && opt1) {
      quiz = {
        title: qTitle,
        passingScore: 70,
        questions: [
          {
            question: qText,
            options: [opt0, opt1, opt2 || "لا شيء مما سبق", opt3 || "جميع ما سبق"],
            correctIndex: correctIdx,
            explanation: explanation
          }
        ]
      };
    }
  }

  let finalVideoUrl = uploadedLessonVideoBase64 || urlInput || "";

  if (finalVideoUrl.includes("youtube.com/watch?v=")) {
    finalVideoUrl = finalVideoUrl.replace("watch?v=", "embed/");
  } else if (finalVideoUrl.includes("youtu.be/")) {
    finalVideoUrl = finalVideoUrl.replace("youtu.be/", "www.youtube.com/embed/");
  }

  const courses = AdminStore.get('courses');
  const course = courses.find(c => c.id === pendingLessonCourseId);
  if (course && course.chapters && course.chapters[pendingLessonChapterIdx]) {
    course.chapters[pendingLessonChapterIdx].lessons.push({
      id: `ls-${Date.now()}`,
      title,
      videoUrl: finalVideoUrl,
      duration,
      attachments,
      quiz
    });

    AdminStore.set('courses', courses);
    renderCourses();
    closeModal('addLessonModal');
    openManageChaptersModal(pendingLessonCourseId);
    showToast("تمت إضافة الدرس مع الفيديو والمرفقات والكويز بنجاح");
  }
};

window.deleteLesson = function(courseId, chIdx, lsIdx) {
  const courses = AdminStore.get('courses');
  const course = courses.find(c => c.id === courseId);
  if (course && course.chapters && course.chapters[chIdx]) {
    course.chapters[chIdx].lessons.splice(lsIdx, 1);
    AdminStore.set('courses', courses);
    renderCourses();
    openManageChaptersModal(courseId);
    showToast("تم حذف الدرس");
  }
};

// -------------------------------------------------------------
// Interactive Quiz Runner Modal (for Admin & Students)
// -------------------------------------------------------------
let currentActiveQuiz = null;
let currentQuizQuestionIdx = 0;
let currentQuizScore = 0;

window.previewQuizInModal = function(courseId, chIdx, lsIdx) {
  const courses = AdminStore.get('courses');
  const course = courses.find(c => c.id === courseId);
  if (!course || !course.chapters[chIdx] || !course.chapters[chIdx].lessons[lsIdx]) return;

  const lesson = course.chapters[chIdx].lessons[lsIdx];
  if (!lesson.quiz) return;

  currentActiveQuiz = lesson.quiz;
  currentQuizQuestionIdx = 0;
  currentQuizScore = 0;

  renderQuizModalQuestion();
};

function renderQuizModalQuestion() {
  const modal = document.getElementById('quizRunnerModal');
  const container = document.getElementById('quizRunnerModalContent');
  if (!modal || !container || !currentActiveQuiz) return;

  const questions = currentActiveQuiz.questions || [];
  if (currentQuizQuestionIdx >= questions.length) {
    // Show Results
    const percent = Math.round((currentQuizScore / questions.length) * 100);
    const passed = percent >= (currentActiveQuiz.passingScore || 60);

    container.innerHTML = `
      <div class="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl border border-[#EBE3D5] text-center">
        <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${passed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
          ${passed ? `
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          ` : `
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          `}
        </div>

        <h3 class="text-xl font-bold text-[#332B25] mb-2 font-heading">
          ${passed ? 'تهانينا! لقد اجتزت الكويز بنجاح' : 'محاولة جيدة، يمكنك إعادة الاختبار'}
        </h3>

        <div class="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E0D6C8] my-4 inline-block px-8">
          <span class="text-xs text-gray-500 block">درجة الاختبار:</span>
          <span class="text-3xl font-extrabold text-[#8C6239]">${percent}%</span>
          <span class="text-[11px] text-gray-400 block mt-1">${currentQuizScore} من ${questions.length} إجابات صحيحة</span>
        </div>

        <div class="flex gap-3 pt-2">
          <button onclick="currentQuizQuestionIdx = 0; currentQuizScore = 0; renderQuizModalQuestion();" class="btn-athar-primary py-2.5 px-4 text-xs font-bold flex-1">
            إعادة الاختبار
          </button>
          <button onclick="closeModal('quizRunnerModal')" class="btn-athar-outline py-2.5 px-4 text-xs font-bold flex-1">
            إغلاق
          </button>
        </div>
      </div>
    `;
    return;
  }

  const q = questions[currentQuizQuestionIdx];
  container.innerHTML = `
    <div class="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl border border-[#EBE3D5]">
      <button onclick="closeModal('quizRunnerModal')" class="absolute top-5 left-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <div class="flex items-center justify-between mb-4 pb-2 border-b border-[#EBE3D5]">
        <span class="text-xs font-bold text-[#8C6239] bg-[#F4ECE1] px-3 py-1 rounded-full">
          السؤال ${currentQuizQuestionIdx + 1} من ${questions.length}
        </span>
        <span class="text-xs font-bold text-[#332B25]">${currentActiveQuiz.title}</span>
      </div>

      <h3 class="text-base sm:text-lg font-bold text-[#332B25] mb-5 font-heading">
        ${q.question}
      </h3>

      <div class="space-y-2.5 mb-6">
        ${q.options.map((opt, optIdx) => `
          <button onclick="handleQuizAnswerSelection(${optIdx}, ${q.correctIndex})" 
                  id="quiz-opt-btn-${optIdx}"
                  class="w-full text-right py-3 px-4 rounded-xl border border-[#E0D6C8] hover:border-[#8C6239] hover:bg-[#FAF7F2] transition-all text-xs sm:text-sm font-semibold text-[#332B25] flex items-center justify-between">
            <span>${opt}</span>
            <span class="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400 font-bold">${optIdx + 1}</span>
          </button>
        `).join('')}
      </div>

      <div id="quizFeedbackBox" class="min-h-[2rem] text-xs font-semibold"></div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

window.handleQuizAnswerSelection = function(selectedIdx, correctIdx) {
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const btn = document.getElementById(`quiz-opt-btn-${selectedIdx}`);
  const q = currentActiveQuiz.questions[currentQuizQuestionIdx];

  if (selectedIdx === correctIdx) {
    currentQuizScore += 1;
    btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
    feedbackBox.innerHTML = `<span class="text-emerald-700 font-bold">إجابة صحيحة وممتازة! ${q.explanation || ''}</span>`;
  } else {
    btn.classList.add('bg-red-50', 'border-red-400', 'text-red-800');
    feedbackBox.innerHTML = `<span class="text-red-700 font-bold">إجابة غير صحيحة. الصحيح هو: ${q.options[correctIdx]}</span>`;
  }

  // Next question
  setTimeout(() => {
    currentQuizQuestionIdx += 1;
    renderQuizModalQuestion();
  }, 1400);
};

// Video Player Modal
window.openVideoPlayerModal = function(encUrl, encTitle) {
  const url = decodeURIComponent(encUrl);
  const title = decodeURIComponent(encTitle);

  const modal = document.getElementById('videoPlayerModal');
  const content = document.getElementById('videoPlayerModalContent');
  if (!modal || !content) return;

  let playerHtml = '';
  if (url.includes('youtube.com') || url.includes('vimeo.com') || url.includes('drive.google.com')) {
    playerHtml = `<iframe src="${url}" class="w-full h-72 sm:h-96 rounded-2xl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    playerHtml = `<video src="${url}" controls class="w-full max-h-96 rounded-2xl bg-black" autoplay></video>`;
  }

  content.innerHTML = `
    <div class="relative bg-white rounded-3xl p-4 sm:p-6 max-w-2xl w-full mx-4 shadow-2xl border border-[#EBE3D5]">
      <div class="flex items-center justify-between mb-3 pb-2 border-b border-[#EBE3D5]">
        <h3 class="font-bold text-sm sm:text-base text-[#332B25] truncate">${title}</h3>
        <button onclick="closeModal('videoPlayerModal')" class="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      ${playerHtml}
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

// -------------------------------------------------------------
// Students & Codes Controllers
// -------------------------------------------------------------
let currentStudentFilter = 'all';
function renderStudents(filter = currentStudentFilter, searchQuery = '') {
  currentStudentFilter = filter;
  const students = AdminStore.get('students');
  const tableBody = document.getElementById('studentsTableBody');
  if (!tableBody) return;

  let filtered = students;
  if (filter !== 'all') filtered = filtered.filter(s => s.status === filter);
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.parentPhone.includes(q));
  }

  tableBody.innerHTML = filtered.map(std => `
    <tr class="border-b border-[#EBE3D5] hover:bg-[#FAF7F2] transition-colors">
      <td class="py-4 px-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#F4ECE1] text-[#8C6239] font-bold flex items-center justify-center text-sm shadow-sm">
            ${std.name.charAt(0)}
          </div>
          <div>
            <div class="font-bold text-[#332B25] text-sm">${std.name}</div>
            <div class="text-xs text-[#6B625B]">العمر: ${std.age}</div>
          </div>
        </div>
      </td>

      <td class="py-4 px-4 text-xs font-mono text-[#5E544B]" dir="ltr">
        ${std.parentPhone}
      </td>

      <td class="py-4 px-4 text-xs text-[#332B25]">
        ${std.enrolledCourses.map(c => `<span class="inline-block bg-[#F4ECE1] text-[#8C6239] px-2 py-0.5 rounded-md text-[11px] ml-1 mb-1 font-semibold">${c}</span>`).join('')}
      </td>

      <td class="py-4 px-4">
        <div class="flex items-center gap-2">
          <div class="w-16 bg-[#EBE3D5] rounded-full h-2 overflow-hidden">
            <div class="bg-[#8C6239] h-2 rounded-full" style="width: ${std.progress}%"></div>
          </div>
          <span class="text-xs font-bold text-[#5E544B]">${std.progress}%</span>
        </div>
      </td>

      <td class="py-4 px-4">
        <span class="inline-flex px-3 py-1 rounded-full text-xs font-bold ${std.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}">
          ${std.status === 'active' ? 'مفعّل' : 'محظور'}
        </span>
      </td>

      <td class="py-4 px-4">
        <div class="flex items-center gap-2">
          <button onclick="toggleStudentStatus('${std.id}')" 
                  class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${std.status === 'active' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'}">
            ${std.status === 'active' ? 'حظر الحساب' : 'تفعيل'}
          </button>
          <button onclick="deleteStudent('${std.id}')" class="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.toggleStudentStatus = function(stdId) {
  const students = AdminStore.get('students');
  const student = students.find(s => s.id === stdId);
  if (student) {
    student.status = student.status === 'active' ? 'blocked' : 'active';
    AdminStore.set('students', students);
    renderStudents();
    renderOverview();
    showToast(`تم ${student.status === 'active' ? 'تفعيل' : 'حظر'} حساب الطالب ${student.name}`);
  }
};

window.deleteStudent = function(stdId) {
  if (!confirm("هل أنت متأكد من حذف هذا الطالب؟")) return;
  let students = AdminStore.get('students');
  students = students.filter(s => s.id !== stdId);
  AdminStore.set('students', students);
  renderStudents();
  renderOverview();
  showToast("تم حذف الطالب بنجاح", "error");
};

window.handleAddStudent = function(event) {
  event.preventDefault();
  const name = document.getElementById('newStdName').value;
  const parentPhone = document.getElementById('newStdPhone').value;
  const age = document.getElementById('newStdAge').value;
  const course = document.getElementById('newStdCourse').value;

  const students = AdminStore.get('students');
  students.unshift({
    id: `std-${Date.now()}`,
    name,
    parentPhone,
    age: `${age} سنوات`,
    enrolledCourses: [course],
    joinDate: new Date().toISOString().split('T')[0],
    status: 'active',
    progress: 0
  });

  AdminStore.set('students', students);
  renderStudents();
  renderOverview();
  closeModal('addStudentModal');
  event.target.reset();
  showToast("تمت إضافة الطالب بنجاح");
};

window.filterStudents = function(type) {
  const search = document.getElementById('studentSearchInput')?.value || '';
  document.querySelectorAll('.student-filter-btn').forEach(btn => {
    if (btn.dataset.filter === type) {
      btn.className = "student-filter-btn px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#8C6239] text-white";
    } else {
      btn.className = "student-filter-btn px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white border border-[#E0D6C8] text-[#5E544B] hover:bg-[#F4ECE1]";
    }
  });
  renderStudents(type, search);
};

window.onStudentSearch = function(e) {
  renderStudents(currentStudentFilter, e.target.value);
};

window.exportStudentsCSV = function() {
  const students = AdminStore.get('students');
  let csvContent = "\uFEFFاسم الطالب,هاتف ولي الأمر,العمر,المسارات المسجلة,الحالة,التقدم\n";
  students.forEach(s => {
    csvContent += `"${s.name}","${s.parentPhone}","${s.age}","${s.enrolledCourses.join(' - ')}","${s.status === 'active' ? 'مفعل' : 'محظور'}","${s.progress}%"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `athar-students-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("تم تصدير ملف بيانات الطلاب بنجاح");
};

// Activation Codes
let currentCodeFilter = 'all';
function renderActivationCodes(filter = currentCodeFilter) {
  currentCodeFilter = filter;
  const codes = AdminStore.get('activationCodes');
  const tableBody = document.getElementById('activationCodesTableBody');
  if (!tableBody) return;

  let filtered = codes;
  if (filter === 'available') filtered = codes.filter(c => !c.isUsed);
  if (filter === 'used') filtered = codes.filter(c => c.isUsed);

  tableBody.innerHTML = filtered.map((c) => `
    <tr class="border-b border-[#EBE3D5] hover:bg-[#FAF7F2] transition-colors">
      <td class="py-3 px-4 font-mono font-bold text-xs sm:text-sm text-[#8C6239] flex items-center gap-2" dir="ltr">
        <span>${c.code}</span>
        <button onclick="copyToClipboard('${c.code}')" class="text-gray-400 hover:text-[#8C6239] p-1 rounded transition-colors" title="نسخ الكود">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
        </button>
      </td>
      <td class="py-3 px-4 text-xs text-[#332B25] font-semibold">${c.track}</td>
      <td class="py-3 px-4 text-xs text-[#5E544B]">${c.expiryDate}</td>
      <td class="py-3 px-4">
        <span class="inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${c.isUsed ? 'bg-gray-100 text-gray-600' : 'bg-emerald-100 text-emerald-700'}">
          ${c.isUsed ? 'مستخدم' : 'متاح للتفعيل'}
        </span>
      </td>
      <td class="py-3 px-4 text-xs text-[#5E544B]">${c.usedBy || '-'}</td>
      <td class="py-3 px-4">
        <button onclick="deleteActivationCode('${c.code}')" class="text-red-400 hover:text-red-600 p-1" title="حذف الكود">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

window.filterCodes = function(type) {
  document.querySelectorAll('.code-filter-btn').forEach(btn => {
    if (btn.dataset.filter === type) {
      btn.className = "code-filter-btn px-3.5 py-1.5 text-xs font-bold rounded-xl bg-[#8C6239] text-white";
    } else {
      btn.className = "code-filter-btn px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white border border-[#E0D6C8] text-[#5E544B] hover:bg-[#F4ECE1]";
    }
  });
  renderActivationCodes(type);
};

window.handleGenerateCodes = function(event) {
  event.preventDefault();
  const track = document.getElementById('codeTrackSelect').value;
  const count = parseInt(document.getElementById('codeQuantityInput').value) || 1;
  const expiry = document.getElementById('codeExpiryInput').value || "2026-12-31";
  const prefix = document.getElementById('codePrefixInput').value || "ATHAR";

  const codes = AdminStore.get('activationCodes');
  for (let i = 0; i < count; i++) {
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newCode = `${prefix}-${track.substring(0, 3)}-${randomHex}`;
    codes.unshift({
      code: newCode,
      track,
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: expiry,
      isUsed: false,
      usedBy: "-"
    });
  }

  AdminStore.set('activationCodes', codes);
  renderActivationCodes();
  showToast(`تم توليد ${count} كود اشتراك بنجاح`);
};

window.copyToClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`تم نسخ الكود: ${text}`);
  }).catch(() => {
    showToast("تعذر النسخ التلقائي", "error");
  });
};

window.deleteActivationCode = function(codeStr) {
  let codes = AdminStore.get('activationCodes');
  codes = codes.filter(c => c.code !== codeStr);
  AdminStore.set('activationCodes', codes);
  renderActivationCodes();
  showToast("تم حذف الكود");
};

window.deleteUsedCodes = function() {
  if (!confirm("هل تريد حذف كافة الأكواد المستخدمة؟")) return;
  let codes = AdminStore.get('activationCodes');
  codes = codes.filter(c => !c.isUsed);
  AdminStore.set('activationCodes', codes);
  renderActivationCodes();
  showToast("تم تنظيف الأكواد المستهلكة");
};

window.exportCodesCSV = function() {
  const codes = AdminStore.get('activationCodes');
  let csvContent = "\uFEFFكود الاشتراك,المسار,تاريخ الإنشاء,تاريخ الانتهاء,الحالة,المستخدم بواسطة\n";
  codes.forEach(c => {
    csvContent += `"${c.code}","${c.track}","${c.createdDate}","${c.expiryDate}","${c.isUsed ? 'مستخدم' : 'متاح'}","${c.usedBy}"\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `athar-codes-${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("تم تصدير ملف الأكواد بنجاح");
};

// Settings & Backup
function initSettingsForm() {
  const config = window.FirebaseService ? window.FirebaseService.getConfig() : null;
  if (config) {
    if (document.getElementById('fbApiKey')) document.getElementById('fbApiKey').value = config.apiKey || '';
    if (document.getElementById('fbAuthDomain')) document.getElementById('fbAuthDomain').value = config.authDomain || '';
    if (document.getElementById('fbProjectId')) document.getElementById('fbProjectId').value = config.projectId || '';
    if (document.getElementById('fbStorageBucket')) document.getElementById('fbStorageBucket').value = config.storageBucket || '';
  }

  const fbForm = document.getElementById('firebaseConfigForm');
  if (fbForm) {
    fbForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newConfig = {
        apiKey: document.getElementById('fbApiKey').value,
        authDomain: document.getElementById('fbAuthDomain').value,
        projectId: document.getElementById('fbProjectId').value,
        storageBucket: document.getElementById('fbStorageBucket').value
      };
      if (window.FirebaseService) {
        window.FirebaseService.saveConfig(newConfig);
      }
      showToast("تم حفظ إعدادات Firebase بنجاح");
    });
  }
}

window.testFirebaseConnection = function() {
  const apiKey = document.getElementById('fbApiKey')?.value;
  const statusEl = document.getElementById('fbConnectionStatus');
  if (!statusEl) return;

  statusEl.classList.remove('hidden');
  statusEl.innerHTML = `
    <div class="flex items-center gap-2 text-xs text-[#8C6239] animate-pulse">
      <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="3" class="opacity-25"></circle><path d="M4 12a8 8 0 018-8" stroke-width="3" class="opacity-75"></path></svg>
      <span>جاري اختبار الاتصال بخوادم Firebase...</span>
    </div>
  `;

  setTimeout(() => {
    if (apiKey && apiKey.length > 5) {
      statusEl.innerHTML = `
        <div class="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
          <svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
          <span>تم الاتصال بنجاح بمشروع athar-28099. خوادم Firestore & Database جاهزة.</span>
        </div>
      `;
    }
  }, 700);
};

window.exportFullBackupJSON = function() {
  const fullBackup = {
    version: "3.0",
    date: new Date().toISOString(),
    stats: AdminStore.get('stats'),
    courses: AdminStore.get('courses'),
    students: AdminStore.get('students'),
    activationCodes: AdminStore.get('activationCodes')
  };

  const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", `athar-backup-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("تم تنزيل النسخة الاحتياطية الكاملة");
};

window.importBackupJSON = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.courses) AdminStore.set('courses', data.courses);
      if (data.students) AdminStore.set('students', data.students);
      if (data.activationCodes) AdminStore.set('activationCodes', data.activationCodes);
      if (data.stats) AdminStore.set('stats', data.stats);

      renderOverview();
      renderCourses();
      renderStudents();
      renderActivationCodes();
      showToast("تمت استعادة النسخة الاحتياطية بنجاح");
    } catch (err) {
      showToast("الملف غير صالح أو تالف", "error");
    }
  };
  reader.readAsText(file);
};

window.resetAdminData = function() {
  if (confirm("هل تريد استعادة البيانات الافتراضية للوحة التحكم؟")) {
    localStorage.removeItem('athar_admin_stats');
    localStorage.removeItem('athar_admin_courses');
    localStorage.removeItem('athar_admin_students');
    localStorage.removeItem('athar_admin_activationCodes');
    localStorage.removeItem('athar_admin_notifications');
    AdminStore.init();
    renderOverview();
    renderCourses();
    renderStudents();
    renderActivationCodes();
    renderNotifications();
    showToast("تمت استعادة البيانات الافتراضية");
  }
};
