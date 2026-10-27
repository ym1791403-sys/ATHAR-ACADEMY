// ========================================================
// ATHAR ACADEMY (أكاديمية أثر) - Interactive JavaScript
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initCoursesGrid();
  initMiniPlayground();
  initModals();
  initBookingForm();
});

// Sound synthesis using Web Audio API for rewarding child feedback
const AudioEffects = {
  ctx: null,
  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  },
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Celebration chord)
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.1);
        
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.1 + 0.5);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(this.ctx.currentTime + idx * 0.1);
        osc.stop(this.ctx.currentTime + idx * 0.1 + 0.6);
      });
    } catch (e) {
      console.log('Audio feedback:', e);
    }
  },
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {}
  }
};

// Render the 4 tracks as in the design mockup
function initCoursesGrid() {
  const container = document.getElementById('coursesTrackContainer');
  if (!container) return;

  container.innerHTML = AtharCoursesData.map((course, idx) => {
    return `
      <div class="track-card p-6 flex flex-col justify-between items-center text-center cursor-pointer group"
           onclick="openCourseModal('${course.id}')"
           style="background-color: ${course.bgColor};">
        
        <div class="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          ${course.icon}
        </div>

        <h3 class="text-xl font-bold text-[#332B25] mb-2 font-heading">
          ${course.title}
        </h3>

        <p class="text-sm text-[#5E544B] leading-relaxed mb-6 flex-grow">
          ${course.tagline}
        </p>

        <div class="w-full flex items-center justify-between pt-4 border-t border-[#E8DEC8]">
          <span class="badge-age bg-[#8C6239] text-white">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            ${course.ageGroup}
          </span>
          
          <button class="text-xs font-bold text-[#8C6239] group-hover:underline flex items-center gap-1">
            تفاصيل
            <svg class="w-3 h-3 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Course Modal Details
window.openCourseModal = function(courseId) {
  AudioEffects.playClick();
  const course = AtharCoursesData.find(c => c.id === courseId);
  if (!course) return;

  const modal = document.getElementById('courseModal');
  const modalContent = document.getElementById('courseModalContent');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="relative bg-white rounded-3xl p-6 md:p-8 max-w-xl w-full mx-4 shadow-2xl border border-[#EBE3D5]">
      <!-- Close Button -->
      <button onclick="closeModal('courseModal')" class="absolute top-5 left-5 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div class="flex items-center gap-4 mb-5">
        <div class="w-16 h-16 rounded-2xl flex items-center justify-center p-3" style="background-color: ${course.bgColor}">
          ${course.icon}
        </div>
        <div>
          <span class="text-xs font-bold text-[#8C6239] bg-[#F4ECE1] px-3 py-1 rounded-full">${course.ageGroup}</span>
          <h2 class="text-2xl font-bold text-[#332B25] mt-1 font-heading">${course.title}</h2>
        </div>
      </div>

      <p class="text-base text-[#5E544B] leading-relaxed mb-6">
        ${course.description}
      </p>

      <h4 class="font-bold text-[#332B25] mb-3 text-sm flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#8C6239]"></span>
        أهداف المسار التعليمي لطفلك:
      </h4>
      <ul class="space-y-2 mb-6">
        ${course.objectives.map(obj => `
          <li class="flex items-center gap-3 text-sm text-[#4A423B]">
            <svg class="w-4 h-4 text-[#8C6239] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            ${obj}
          </li>
        `).join('')}
      </ul>

      <div class="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE3D5] flex items-center justify-between mb-6">
        <div>
          <span class="text-xs text-gray-500 block">عدد الدروس والأنشطة</span>
          <span class="text-lg font-bold text-[#8C6239]">${course.lessonsCount} درساً تفاعلياً</span>
        </div>
        <div class="text-left">
          <span class="text-xs text-gray-500 block">المستوى</span>
          <span class="text-sm font-semibold text-[#332B25]">${course.level}</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button onclick="bookTrialForCourse('${course.title}')" class="btn-athar-primary py-3 px-6 flex-1 text-center font-bold">
          احجز حصة تقييم مجانية لطفلك
        </button>
        <button onclick="closeModal('courseModal')" class="btn-athar-outline py-3 px-6 text-center font-semibold">
          إغلاق
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
};

// Mini Interactive Activity for Kids
let currentActivityIndex = 0;
function initMiniPlayground() {
  renderActivity(currentActivityIndex);
}

function renderActivity(index) {
  const container = document.getElementById('activityPlaygroundBox');
  if (!container) return;

  const act = FunActivities[index];
  container.innerHTML = `
    <div class="text-center">
      <div class="inline-block bg-[#F4ECE1] text-[#8C6239] text-xs font-bold px-4 py-1.5 rounded-full mb-3">
        نشاط تفاعلي ممتع لطفلك 🎈
      </div>
      <h3 class="text-xl md:text-2xl font-bold text-[#332B25] mb-5">
        ${act.question}
      </h3>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md mx-auto mb-5">
        ${act.options.map((opt, optIdx) => `
          <button onclick="checkAnswer(${optIdx}, ${act.correctIndex})" 
                  id="opt-btn-${optIdx}"
                  class="py-4 text-xl font-bold rounded-2xl border-2 border-[#E0D6C8] bg-white hover:border-[#8C6239] hover:bg-[#FAF7F2] transition-all transform hover:scale-105 active:scale-95 shadow-sm text-[#332B25]">
            ${opt}
          </button>
        `).join('')}
      </div>

      <div id="activityFeedback" class="min-h-[2.5rem] flex items-center justify-center text-sm font-semibold">
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
    btn.classList.remove('border-[#E0D6C8]', 'bg-white');
    btn.classList.add('border-green-500', 'bg-green-50', 'text-green-700');
    
    feedback.innerHTML = `
      <div class="text-green-700 font-bold flex items-center gap-2 animate-bounce">
        <span>🎉</span> ${act.cheer}
      </div>
    `;

    setTimeout(() => {
      currentActivityIndex = (currentActivityIndex + 1) % FunActivities.length;
      renderActivity(currentActivityIndex);
    }, 2200);
  } else {
    AudioEffects.playClick();
    btn.classList.add('border-red-400', 'bg-red-50');
    feedback.innerHTML = `
      <div class="text-red-600 flex items-center gap-1">
        <span>حاول مرة أخرى يا بطل! 🌟 ${act.hint}</span>
      </div>
    `;
    setTimeout(() => {
      btn.classList.remove('border-red-400', 'bg-red-50');
    }, 1200);
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

  // Close when clicking overlay backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.add('hidden');
        backdrop.classList.remove('flex');
      }
    });
  });
}

// Booking free assessment
function initBookingForm() {
  const form = document.getElementById('trialBookingForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    AudioEffects.playSuccess();

    const parentName = document.getElementById('parentName')?.value || 'ولي الأمر';
    const childAge = document.getElementById('childAge')?.value || '';
    const courseTrack = document.getElementById('courseTrack')?.value || '';

    const successBox = document.getElementById('bookingSuccessState');
    if (successBox) {
      successBox.classList.remove('hidden');
      form.classList.add('hidden');
    }
  });
}

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
  }
};

// Switch between Login and Register tabs inside Auth Modal
window.switchAuthTab = function(tab) {
  const loginForm = document.getElementById('loginFormContent');
  const regForm = document.getElementById('registerFormContent');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegBtn = document.getElementById('tabRegBtn');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
    tabLoginBtn.classList.add('border-b-2', 'border-[#8C6239]', 'text-[#8C6239]', 'font-bold');
    tabRegBtn.classList.remove('border-b-2', 'border-[#8C6239]', 'text-[#8C6239]', 'font-bold');
    tabRegBtn.classList.add('text-gray-500');
  } else {
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
    tabRegBtn.classList.add('border-b-2', 'border-[#8C6239]', 'text-[#8C6239]', 'font-bold');
    tabLoginBtn.classList.remove('border-b-2', 'border-[#8C6239]', 'text-[#8C6239]', 'font-bold');
    tabLoginBtn.classList.add('text-gray-500');
  }
};
