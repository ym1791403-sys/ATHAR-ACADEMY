// ========================================================
// ATHAR ACADEMY (أكاديمية أثر) - Main Frontend Interactive Logic
// Enhanced with Course Covers, Video Previews, Price & Chapters
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initCoursesGrid();
  initMiniPlayground();
  initModals();
  initBookingForm();
  initUserSession();
});

// Audio Feedback System
let soundEnabled = true;
const AudioEffects = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
  },
  playSuccess() {
    if (!soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch (e) {}
  },
  playClick() {
    if (!soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }
};

window.toggleSound = function() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById('soundToggleBtn');
  if (btn) btn.innerHTML = soundEnabled ? 'المؤثرات الصوتية: مفعّلة' : 'المؤثرات الصوتية: مكتومة';
  showMainToast(soundEnabled ? 'تم تفعيل الصوت' : 'تم كتم الصوت');
};

function showMainToast(message, type = 'success') {
  let container = document.getElementById('mainToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'mainToastContainer';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bg = type === 'success' ? 'bg-[#8C6239] text-white' : 'bg-red-700 text-white';
  const icon = type === 'success' 
    ? `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`
    : `<svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

  toast.className = `${bg} px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-semibold transition-all transform duration-300 translate-y-2 opacity-0`;
  toast.innerHTML = `${icon}<span>${message}</span>`;

  container.appendChild(toast);
  setTimeout(() => toast.classList.remove('translate-y-2', 'opacity-0'), 10);
  setTimeout(() => {
    toast.classList.add('opacity-0', '-translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// User Session Management
function initUserSession() {
  const session = localStorage.getItem('athar_user_session');
  const authBtns = document.getElementById('navAuthButtons');
  if (!authBtns) return;

  if (session) {
    const user = JSON.parse(session);
    authBtns.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4ECE1] text-[#8C6239] text-xs font-bold border border-[#EBE3D5]">
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>${user.name}</span>
        </div>
        <button onclick="logoutUser()" class="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors py-1.5 px-2">
          تسجيل الخروج
        </button>
      </div>
    `;
  }
}

window.logoutUser = function() {
  localStorage.removeItem('athar_user_session');
  showMainToast('تم تسجيل الخروج بنجاح');
  setTimeout(() => location.reload(), 600);
};

// Render Course Cards with Cover Images and Prices
function initCoursesGrid() {
  const container = document.getElementById('coursesTrackContainer');
  if (!container) return;

  const storedCourses = localStorage.getItem('athar_admin_courses');
  const courses = storedCourses ? JSON.parse(storedCourses) : AtharCoursesData;

  container.innerHTML = courses.map((course) => {
    const cover = course.coverImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80";
    const price = course.price || "180 ر.س";
    const instructor = course.instructor || "أكاديمية أثر";

    return `
      <div class="track-card flex flex-col justify-between cursor-pointer group overflow-hidden bg-white rounded-3xl border border-[#EBE3D5] shadow-sm hover:shadow-lg transition-all"
           onclick="openCourseModal('${course.id}')">
        
        <!-- Cover Image on Outside Card -->
        <div class="relative h-44 w-full bg-[#FAF7F2] overflow-hidden">
          <img src="${cover}" alt="${course.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          <div class="absolute top-3 right-3">
            <span class="badge-age bg-white/95 text-[#8C6239] font-bold text-xs shadow-sm backdrop-blur-sm">
              ${course.ageGroup || 'من 3 - 7 سنوات'}
            </span>
          </div>

          <div class="absolute bottom-3 right-3 left-3 flex items-center justify-between text-white">
            <span class="text-xs font-semibold opacity-90">${instructor}</span>
            <span class="text-xs font-extrabold bg-[#8C6239] px-2.5 py-1 rounded-lg">${price}</span>
          </div>
        </div>

        <div class="p-5 flex flex-col flex-grow justify-between">
          <div>
            <h3 class="text-lg font-bold text-[#332B25] mb-2 font-heading">
              ${course.title}
            </h3>

            <p class="text-xs sm:text-sm text-[#5E544B] leading-relaxed mb-4 line-clamp-2">
              ${course.tagline || course.description}
            </p>
          </div>

          <div class="w-full flex items-center justify-between pt-3 border-t border-[#E8DEC8]">
            <span class="text-xs font-bold text-[#8C6239] bg-[#F4ECE1] px-3 py-1 rounded-full">
              ${course.track || 'مسار تأسيسي'}
            </span>
            
            <button class="text-xs font-bold text-[#8C6239] group-hover:underline flex items-center gap-1">
              تفاصيل والمنهج
              <svg class="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Course Modal Details with Cover Image, Price & Lesson Videos
window.openCourseModal = function(courseId) {
  AudioEffects.playClick();
  const storedCourses = localStorage.getItem('athar_admin_courses');
  const courses = storedCourses ? JSON.parse(storedCourses) : AtharCoursesData;
  const course = courses.find(c => c.id === courseId) || AtharCoursesData.find(c => c.id === courseId);
  if (!course) return;

  const modal = document.getElementById('courseModal');
  const modalContent = document.getElementById('courseModalContent');
  if (!modal || !modalContent) return;

  const cover = course.coverImage || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80";
  const chapters = course.chapters || [];

  modalContent.innerHTML = `
    <div class="relative bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full mx-4 shadow-2xl border border-[#EBE3D5] max-h-[90vh] overflow-y-auto">
      <button onclick="closeModal('courseModal')" class="absolute top-5 left-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors z-10">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <!-- Course Cover Banner -->
      <div class="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 shadow-sm border border-[#E8DEC8]">
        <img src="${cover}" alt="${course.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div class="absolute bottom-4 right-4 left-4 flex items-end justify-between text-white">
          <div>
            <span class="text-xs font-bold text-white bg-[#8C6239] px-3 py-1 rounded-full">${course.track || 'مسار تعليمي'}</span>
            <h2 class="text-xl sm:text-2xl font-bold mt-2 font-heading">${course.title}</h2>
          </div>
          <span class="text-base font-extrabold bg-white text-[#8C6239] px-3.5 py-1 rounded-xl shadow-md">${course.price || 'مجاني'}</span>
        </div>
      </div>

      <div class="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-[#E8DEC8]">
        <span>المعلم: <strong class="text-[#332B25]">${course.instructor || 'أكاديمية أثر'}</strong></span>
        <span>•</span>
        <span>الفئة: <strong class="text-[#332B25]">${course.ageGroup || 'من 3 - 7 سنوات'}</strong></span>
      </div>

      <p class="text-sm text-[#5E544B] leading-relaxed mb-6">
        ${course.description || course.tagline}
      </p>

      <!-- Chapters & Lessons Syllabus with Videos -->
      <div class="mb-6">
        <h4 class="font-bold text-[#332B25] mb-3 text-sm flex items-center gap-2">
          <svg class="w-4 h-4 text-[#8C6239]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span>منهج وفيديوهات الدورة:</span>
        </h4>

        <div class="space-y-3">
          ${chapters.length === 0 ? `<p class="text-xs text-gray-400">سيتم إضافة الفصول والدروس قريباً.</p>` : ''}
          ${chapters.map((ch, idx) => {
            const lessons = ch.lessons || [];
            return `
              <div class="border border-[#E0D6C8] rounded-2xl p-4 bg-[#FAF7F2]">
                <h5 class="font-bold text-xs sm:text-sm text-[#332B25] mb-2.5 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-md bg-[#8C6239] text-white flex items-center justify-center text-[10px] font-bold">${idx + 1}</span>
                  ${ch.title}
                </h5>

                <div class="space-y-2 pr-3 border-r-2 border-[#C59A58]">
                  ${lessons.map((ls, lsIdx) => {
                    const lTitle = typeof ls === 'object' ? ls.title : ls;
                    const vUrl = typeof ls === 'object' ? ls.videoUrl : '';
                    const dur = typeof ls === 'object' ? ls.duration : 'ساعة كاملة';
                    const attachments = (typeof ls === 'object' && ls.attachments) ? ls.attachments : [];
                    const quiz = (typeof ls === 'object' && ls.quiz) ? ls.quiz : null;

                    return `
                      <div class="bg-white p-3 rounded-xl border border-[#EBE3D5] text-xs space-y-2">
                        <div class="flex items-center justify-between gap-2">
                          <span class="text-[#332B25] font-semibold">${lTitle}</span>
                          <span class="text-[11px] text-[#8C6239] bg-[#FAF7F2] px-2 py-0.5 rounded-md font-medium shrink-0">${dur || 'محتوى كامل'}</span>
                        </div>

                        <!-- Actions: Watch Video & Take Quiz -->
                        <div class="flex flex-wrap items-center gap-2 pt-1">
                          ${vUrl ? `
                            <button onclick="openVideoPlayerModal('${encodeURIComponent(vUrl)}', '${encodeURIComponent(lTitle)}')" class="btn-athar-primary py-1 px-3 text-[11px] font-bold flex items-center gap-1.5 shadow-none">
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                              <span>مشاهدة الشرح</span>
                            </button>
                          ` : ''}

                          ${quiz ? `
                            <button onclick="startStudentQuiz('${course.id}', ${idx}, ${lsIdx})" class="flex items-center gap-1.5 text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors">
                              <svg class="w-3.5 h-3.5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              <span>بدء الكويز (${quiz.questions ? quiz.questions.length : 1} أسئلة)</span>
                            </button>
                          ` : ''}
                        </div>

                        <!-- Attachments / PDF Files -->
                        ${attachments.length > 0 ? `
                          <div class="pt-1.5 border-t border-gray-100 flex flex-wrap gap-2">
                            ${attachments.map(att => `
                              <a href="${att.url}" target="_blank" download class="inline-flex items-center gap-1.5 text-[11px] text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-medium transition-colors border border-blue-100">
                                <svg class="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <span>${att.name || 'تحميل ملف PDF مرفق'}</span>
                                ${att.size ? `<span class="text-[10px] text-blue-500 font-mono">(${att.size})</span>` : ''}
                              </a>
                            `).join('')}
                          </div>
                        ` : ''}
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <button onclick="bookTrialForCourse('${course.title}')" class="btn-athar-primary py-3 px-6 flex-1 text-center font-bold text-sm">
          احجز حصة تقييم مجانية لطفلك
        </button>
        <button onclick="closeModal('courseModal')" class="btn-athar-outline py-3 px-6 text-center font-semibold text-sm">
          إغلاق
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

// Video Player Modal for Public Website
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

// Mini Interactive Activity for Kids
let currentActivityIndex = 0;
let userScore = 0;

function initMiniPlayground() {
  renderActivity(currentActivityIndex);
}

function renderActivity(index) {
  const container = document.getElementById('activityPlaygroundBox');
  if (!container) return;

  const act = FunActivities[index];
  container.innerHTML = `
    <div class="text-center">
      <div class="flex items-center justify-between mb-3 px-2">
        <span class="text-xs font-bold text-[#8C6239] bg-[#F4ECE1] px-3 py-1 rounded-full">
          السؤال ${index + 1} من ${FunActivities.length}
        </span>
        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          النقاط: ${userScore}
        </span>
      </div>

      <h3 class="text-lg md:text-xl font-bold text-[#332B25] mb-5 font-heading">
        ${act.question}
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto mb-5">
        ${act.options.map((opt, optIdx) => `
          <button onclick="checkAnswer(${optIdx}, ${act.correctIndex})" 
                  id="opt-btn-${optIdx}"
                  class="py-3.5 text-lg font-bold rounded-xl border border-[#E0D6C8] bg-white hover:border-[#8C6239] hover:bg-[#FAF7F2] transition-all transform hover:scale-[1.02] active:scale-95 shadow-sm text-[#332B25]">
            ${opt}
          </button>
        `).join('')}
      </div>

      <div id="activityFeedback" class="min-h-[2.5rem] flex items-center justify-center text-xs sm:text-sm font-semibold">
        <span class="text-gray-500">${act.hint}</span>
      </div>
    </div>
  `;
}

window.checkAnswer = function(selectedIdx, correctIdx) {
  const feedback = document.getElementById('activityFeedback');
  const btn = document.getElementById(`opt-btn-${selectedIdx}`);
  const act = FunActivities[currentActivityIndex];

  if (selectedIdx === correctIdx) {
    AudioEffects.playSuccess();
    userScore += 10;
    btn.classList.remove('border-[#E0D6C8]', 'bg-white');
    btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-700');
    
    feedback.innerHTML = `
      <div class="text-emerald-700 font-bold flex items-center gap-2">
        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
        <span>${act.cheer}</span>
      </div>
    `;

    setTimeout(() => {
      currentActivityIndex = (currentActivityIndex + 1) % FunActivities.length;
      renderActivity(currentActivityIndex);
    }, 1800);
  } else {
    AudioEffects.playClick();
    btn.classList.add('border-red-400', 'bg-red-50');
    feedback.innerHTML = `
      <div class="text-red-600 flex items-center gap-1">
        <span>حاول مرة أخرى: ${act.hint}</span>
      </div>
    `;
    setTimeout(() => {
      btn.classList.remove('border-red-400', 'bg-red-50');
    }, 1000);
  }
};

// Modal handlers
function initModals() {
  window.openModal = function(modalId) {
    AudioEffects.playClick();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  };

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add('hidden');
        backdrop.classList.remove('flex');
      }
    });
  });
}

// Booking Form Persistence & Live Firebase Database Write
function initBookingForm() {
  const form = document.getElementById('trialBookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    AudioEffects.playSuccess();

    const parentName = document.getElementById('parentName')?.value || 'ولي الأمر';
    const childAge = document.getElementById('childAge')?.value || '5';
    const courseTrack = document.getElementById('courseTrack')?.value || 'عام';
    const parentPhone = document.getElementById('parentPhone')?.value || '';

    const existingBookings = JSON.parse(localStorage.getItem('athar_trial_bookings') || '[]');
    const newBooking = {
      id: `book-${Date.now()}`,
      parentName,
      childAge,
      courseTrack,
      parentPhone,
      date: new Date().toISOString().split('T')[0]
    };
    existingBookings.unshift(newBooking);
    localStorage.setItem('athar_trial_bookings', JSON.stringify(existingBookings));

    if (window.FirebaseService) {
      window.FirebaseService.saveTrialBooking(newBooking);
    }

    const successBox = document.getElementById('bookingSuccessState');
    if (successBox) {
      const summary = document.getElementById('bookingConfirmationSummary');
      if (summary) {
        summary.textContent = `تم تسجيل موعد مبدئي للأستاذ/ة ${parentName} لمسار: ${courseTrack}.`;
      }
      successBox.classList.remove('hidden');
      form.classList.add('hidden');
    }
    showMainToast('تم تسجيل طلب الحصة التجريبية بنجاح');
  });
}

window.resetBookingForm = function() {
  const form = document.getElementById('trialBookingForm');
  const successBox = document.getElementById('bookingSuccessState');
  if (form && successBox) {
    form.reset();
    form.classList.remove('hidden');
    successBox.classList.add('hidden');
  }
};

window.bookTrialForCourse = function(courseName) {
  closeModal('courseModal');
  const select = document.getElementById('courseTrack');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(courseName)) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  const trialSection = document.getElementById('book-trial');
  if (trialSection) {
    trialSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.getElementById('parentName')?.focus();
    }, 500);
  }
};

window.switchAuthTab = function(tab) {
  const loginForm = document.getElementById('loginFormContent');
  const regForm = document.getElementById('registerFormContent');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegBtn = document.getElementById('tabRegBtn');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
    tabLoginBtn.classList.add('border-b-2', 'border-[#8C6239]', 'text-[#8C6239]', 'font-bold');
    tabLoginBtn.classList.remove('text-gray-500');
    tabRegBtn.classList.remove('border-b-2', 'border-[#8C6239]', 'text-[#8C6239]', 'font-bold');
    tabRegBtn.classList.add('text-gray-500');
  } else {
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
    tabRegBtn.classList.add('border-b-2', 'border-[#8C6239]', 'text-[#8C6239]', 'font-bold');
    tabRegBtn.classList.remove('text-gray-500');
    tabLoginBtn.classList.remove('border-b-2', 'border-[#8C6239]', 'text-[#8C6239]', 'font-bold');
    tabLoginBtn.classList.add('text-gray-500');
  }
};

window.handleUserLogin = function(event) {
  event.preventDefault();
  const emailOrPhone = document.getElementById('loginIdentifier')?.value || 'ولي الأمر';
  localStorage.setItem('athar_user_session', JSON.stringify({
    name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'ولي أمر الطالب',
    identifier: emailOrPhone,
    loginAt: new Date().toISOString()
  }));
  closeModal('authModal');
  showMainToast('مرحباً بك مجدداً في أكاديمية أثر');
  setTimeout(() => location.reload(), 400);
};

window.handleUserRegister = function(event) {
  event.preventDefault();
  const name = document.getElementById('regName')?.value || 'ولي أمر جديد';
  const phone = document.getElementById('regPhone')?.value || '';
  localStorage.setItem('athar_user_session', JSON.stringify({
    name,
    phone,
    loginAt: new Date().toISOString()
  }));
  closeModal('authModal');
  showMainToast('تم إنشاء الحساب وتفعيله بنجاح');
  setTimeout(() => location.reload(), 400);
};

window.handleForgotPassword = function() {
  const contact = prompt('يرجى كتابة رقم الجوال أو البريد الإلكتروني المسجل:');
  if (contact) {
    showMainToast('تم إرسال رابط استعادة كلمة المرور إلى هاتفك');
  }
};

// ================= INTERACTIVE QUIZ RUNNER FOR STUDENTS =================
let studentActiveQuiz = null;
let studentQuizQuestionIdx = 0;
let studentQuizScore = 0;

window.startStudentQuiz = function(courseId, chIdx, lsIdx) {
  if (window.AudioEffects) AudioEffects.playClick();
  const storedCourses = localStorage.getItem('athar_admin_courses');
  const courses = storedCourses ? JSON.parse(storedCourses) : AtharCoursesData;
  const course = courses.find(c => c.id === courseId) || AtharCoursesData.find(c => c.id === courseId);
  if (!course) return;

  const chapter = course.chapters ? course.chapters[chIdx] : null;
  const lesson = chapter && chapter.lessons ? chapter.lessons[lsIdx] : null;
  if (!lesson || !lesson.quiz) return;

  studentActiveQuiz = lesson.quiz;
  studentQuizQuestionIdx = 0;
  studentQuizScore = 0;

  renderStudentQuizQuestion();
};

function renderStudentQuizQuestion() {
  const modal = document.getElementById('quizRunnerModal');
  const container = document.getElementById('quizRunnerModalContent');
  if (!modal || !container || !studentActiveQuiz) return;

  const questions = studentActiveQuiz.questions || [];
  if (studentQuizQuestionIdx >= questions.length) {
    const percent = Math.round((studentQuizScore / questions.length) * 100);
    const passed = percent >= (studentActiveQuiz.passingScore || 60);

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
        <p class="text-xs text-gray-500 mb-4">${studentActiveQuiz.title}</p>

        <div class="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E0D6C8] my-4 inline-block px-8">
          <span class="text-xs text-gray-500 block">درجة الاختبار:</span>
          <span class="text-3xl font-extrabold text-[#8C6239]">${percent}%</span>
          <span class="text-[11px] text-gray-400 block mt-1">${studentQuizScore} من ${questions.length} إجابات صحيحة</span>
        </div>

        <div class="flex gap-3 pt-3">
          <button onclick="studentQuizQuestionIdx = 0; studentQuizScore = 0; renderStudentQuizQuestion();" class="btn-athar-primary py-2.5 px-4 text-xs font-bold flex-1">
            إعادة الاختبار
          </button>
          <button onclick="closeModal('quizRunnerModal')" class="btn-athar-outline py-2.5 px-4 text-xs font-bold flex-1">
            إغلاق
          </button>
        </div>
      </div>
    `;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    return;
  }

  const q = questions[studentQuizQuestionIdx];
  container.innerHTML = `
    <div class="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 shadow-2xl border border-[#EBE3D5]">
      <button onclick="closeModal('quizRunnerModal')" class="absolute top-5 left-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <div class="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <span class="text-xs font-bold text-[#8C6239] bg-[#FAF7F2] px-3 py-1 rounded-full">
          السؤال ${studentQuizQuestionIdx + 1} من ${questions.length}
        </span>
        <span class="text-xs font-bold text-[#332B25]">${studentActiveQuiz.title}</span>
      </div>

      <h4 class="text-base font-bold text-[#332B25] mb-5 leading-relaxed">
        ${q.question}
      </h4>

      <div class="space-y-2.5 mb-5" id="studentQuizOptionsContainer">
        ${q.options.map((opt, optIdx) => `
          <button onclick="handleStudentQuizAnswerSelection(${optIdx}, ${q.correctIndex})" 
                  id="student-quiz-opt-btn-${optIdx}"
                  class="w-full text-right p-3.5 rounded-xl border border-[#E0D6C8] hover:border-[#8C6239] hover:bg-[#FAF7F2] transition-colors text-xs font-semibold text-[#4A423B] flex items-center justify-between group">
            <span>${opt}</span>
            <span class="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-400 group-hover:border-[#8C6239] group-hover:text-[#8C6239]">
              ${optIdx + 1}
            </span>
          </button>
        `).join('')}
      </div>

      <div id="studentQuizFeedbackBox" class="min-h-[2rem] text-xs font-semibold"></div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

window.handleStudentQuizAnswerSelection = function(selectedIdx, correctIdx) {
  const feedbackBox = document.getElementById('studentQuizFeedbackBox');
  const btn = document.getElementById(`student-quiz-opt-btn-${selectedIdx}`);
  const q = studentActiveQuiz.questions[studentQuizQuestionIdx];

  const allBtns = document.querySelectorAll('#studentQuizOptionsContainer button');
  allBtns.forEach(b => b.disabled = true);

  if (selectedIdx === correctIdx) {
    studentQuizScore += 1;
    if (window.AudioEffects) AudioEffects.playSuccess();
    if (btn) btn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
    if (feedbackBox) {
      feedbackBox.className = "p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 mt-2 text-xs";
      feedbackBox.innerHTML = `<strong>إجابة صحيحة وممتازة!</strong> ${q.explanation || ''}`;
    }
  } else {
    if (window.AudioEffects) AudioEffects.playClick();
    if (btn) btn.classList.add('bg-rose-50', 'border-rose-500', 'text-rose-800');
    const correctBtn = document.getElementById(`student-quiz-opt-btn-${correctIdx}`);
    if (correctBtn) correctBtn.classList.add('bg-emerald-50', 'border-emerald-500', 'text-emerald-800');
    if (feedbackBox) {
      feedbackBox.className = "p-3 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 mt-2 text-xs";
      feedbackBox.innerHTML = `<strong>إجابة غير صحيحة.</strong> ${q.explanation || ''}`;
    }
  }

  setTimeout(() => {
    studentQuizQuestionIdx += 1;
    renderStudentQuizQuestion();
  }, 1600);
};
