/**
 * ATHAR ACADEMY - Firebase Configuration & Bridge
 * Easily connect your Firebase Firestore & Authentication here.
 */

// Replace this with your actual Firebase project config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSy_YOUR_FIREBASE_API_KEY",
  authDomain: "athar-academy.firebaseapp.com",
  projectId: "athar-academy",
  storageBucket: "athar-academy.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

// Simulated / Firebase Bridge Service
// When ready to connect live Firebase SDK, replace these methods with Firestore calls:
// e.g., getDocs(collection(db, "students")), setDoc(doc(db, "courses", id), data), etc.
const FirebaseService = {
  isInitialized: false,

  init() {
    // If Firebase SDK is loaded via CDN or module, initialize it here:
    if (typeof firebase !== 'undefined' && firebase.initializeApp) {
      try {
        firebase.initializeApp(firebaseConfig);
        this.isInitialized = true;
        console.log("Firebase initialized successfully.");
      } catch (err) {
        console.warn("Firebase init error (using Local Fallback Store):", err);
      }
    } else {
      console.log("Firebase SDK not loaded yet. Running with Local State & Storage.");
    }
  },

  // Save / Update Firebase Config in LocalStorage
  saveConfig(newConfig) {
    localStorage.setItem('athar_firebase_config', JSON.stringify(newConfig));
  },

  getConfig() {
    const saved = localStorage.getItem('athar_firebase_config');
    return saved ? JSON.parse(saved) : firebaseConfig;
  }
};

window.FirebaseService = FirebaseService;
