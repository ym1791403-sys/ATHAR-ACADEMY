/**
 * ATHAR ACADEMY - Live Firebase Configuration & Database Bridge
 * Connected Project: athar-28099
 */

const defaultFirebaseConfig = {
  apiKey: "AIzaSyBGSAINAlqmeqPgd3jIkcFLDAhuEpRqNKE",
  authDomain: "athar-28099.firebaseapp.com",
  projectId: "athar-28099",
  storageBucket: "athar-28099.firebasestorage.app",
  messagingSenderId: "760976572515",
  appId: "1:760976572515:web:a3fec0eb740c038de6f856",
  measurementId: "G-4HNNK18BM6",
  databaseURL: "https://athar-28099-default-rtdb.firebaseio.com"
};

const FirebaseService = {
  app: null,
  db: null,
  rtdb: null,
  auth: null,
  analytics: null,
  isLive: false,

  init() {
    const config = this.getConfig();
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      try {
        if (!firebase.apps.length) {
          this.app = firebase.initializeApp(config);
        } else {
          this.app = firebase.app();
        }
        
        if (firebase.database) {
          this.rtdb = firebase.database();
        }
        if (firebase.firestore) {
          this.db = firebase.firestore();
        }
        if (firebase.auth) {
          this.auth = firebase.auth();
        }
        if (firebase.analytics && config.measurementId) {
          try {
            this.analytics = firebase.analytics();
          } catch (e) {}
        }
        
        this.isLive = true;
        console.log("Connected live to Firebase Project: athar-28099");
      } catch (err) {
        console.warn("Firebase live connection notice:", err);
      }
    }
  },

  getConfig() {
    return defaultFirebaseConfig;
  },

  saveConfig(newConfig) {
    localStorage.setItem('athar_firebase_config', JSON.stringify(newConfig));
    this.init();
  },

  // Save Booking in Realtime Database & Firestore
  async saveTrialBooking(bookingData) {
    let saved = false;
    if (this.rtdb) {
      try {
        await this.rtdb.ref('trial_bookings/' + bookingData.id).set(bookingData);
        saved = true;
      } catch (e) {
        console.warn("RTDB write:", e);
      }
    }
    if (this.db) {
      try {
        await this.db.collection('trial_bookings').doc(bookingData.id).set(bookingData);
        saved = true;
      } catch (e) {
        console.warn("Firestore write:", e);
      }
    }
    return saved;
  },

  // Sync Courses List to Firebase
  async syncCourses(coursesList) {
    if (this.rtdb) {
      try {
        await this.rtdb.ref('courses').set(coursesList);
        return true;
      } catch (e) {
        console.warn("RTDB sync courses:", e);
      }
    }
    return false;
  },

  // Sync Students List to Firebase
  async syncStudents(studentsList) {
    if (this.rtdb) {
      try {
        await this.rtdb.ref('students').set(studentsList);
        return true;
      } catch (e) {
        console.warn("RTDB sync students:", e);
      }
    }
    return false;
  },

  // Sync Activation Codes to Firebase
  async syncActivationCodes(codesList) {
    if (this.rtdb) {
      try {
        await this.rtdb.ref('activation_codes').set(codesList);
        return true;
      } catch (e) {
        console.warn("RTDB sync codes:", e);
      }
    }
    return false;
  }
};

// Initialize immediately
if (typeof window !== 'undefined') {
  window.FirebaseService = FirebaseService;
  document.addEventListener('DOMContentLoaded', () => {
    FirebaseService.init();
  });
}
