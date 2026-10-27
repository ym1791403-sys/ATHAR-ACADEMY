/**
 * ATHAR ACADEMY - Firebase Configuration & Database Bridge
 * Supports both Firebase Realtime Database & Cloud Firestore with Open Read/Write Rules
 */

// Default Configuration with Database URL placeholder
const defaultFirebaseConfig = {
  apiKey: "AIzaSy_YOUR_FIREBASE_API_KEY",
  authDomain: "athar-academy.firebaseapp.com",
  databaseURL: "https://athar-academy-default-rtdb.firebaseio.com",
  projectId: "athar-academy",
  storageBucket: "athar-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

const FirebaseService = {
  db: null,
  rtdb: null,
  auth: null,
  isLive: false,

  init() {
    const config = this.getConfig();
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
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
        this.isLive = true;
        console.log("Firebase Database connected successfully with open rules.");
      } catch (err) {
        console.warn("Firebase initialization notice:", err);
      }
    }
  },

  getConfig() {
    const saved = localStorage.getItem('athar_firebase_config');
    return saved ? JSON.parse(saved) : defaultFirebaseConfig;
  },

  saveConfig(newConfig) {
    localStorage.setItem('athar_firebase_config', JSON.stringify(newConfig));
    this.init();
  },

  // Save Booking in Realtime Database / Firestore
  async saveTrialBooking(bookingData) {
    if (this.rtdb) {
      try {
        await this.rtdb.ref('trial_bookings/' + bookingData.id).set(bookingData);
        return true;
      } catch (e) {
        console.warn("RTDB write fallback:", e);
      }
    }
    if (this.db) {
      try {
        await this.db.collection('trial_bookings').doc(bookingData.id).set(bookingData);
        return true;
      } catch (e) {
        console.warn("Firestore write fallback:", e);
      }
    }
    return false;
  },

  // Sync Students
  async syncStudents(studentsList) {
    if (this.rtdb) {
      try {
        await this.rtdb.ref('students').set(studentsList);
        return true;
      } catch (e) {
        console.warn("RTDB sync students fallback:", e);
      }
    }
    return false;
  },

  // Sync Activation Codes
  async syncActivationCodes(codesList) {
    if (this.rtdb) {
      try {
        await this.rtdb.ref('activation_codes').set(codesList);
        return true;
      } catch (e) {
        console.warn("RTDB sync codes fallback:", e);
      }
    }
    return false;
  }
};

// Auto initialize on load
if (typeof window !== 'undefined') {
  window.FirebaseService = FirebaseService;
  document.addEventListener('DOMContentLoaded', () => {
    FirebaseService.init();
  });
}
