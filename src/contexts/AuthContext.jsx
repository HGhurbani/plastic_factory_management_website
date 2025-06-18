import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const userRoles = {
  factoryManager: { name: 'Factory Manager', nameAr: 'مدير المصنع', permissions: ['all'] },
  operationsManager: { name: 'Operations Manager', nameAr: 'مسؤول العمليات', permissions: ['production', 'inventory', 'quality', 'reports'] },
  moldSupervisor: { name: 'Mold Supervisor', nameAr: 'مشرف القوالب', permissions: ['production', 'quality'] },
  shiftSupervisor: { name: 'Shift Supervisor', nameAr: 'مشرف الوردية', permissions: ['production', 'quality'] },
  machineOperator: { name: 'Machine Operator', nameAr: 'مشغل الآلة', permissions: ['production'] },
  qualityController: { name: 'Quality Controller', nameAr: 'مراقب الجودة', permissions: ['quality', 'reports'] },
  warehouseKeeper: { name: 'Warehouse Keeper', nameAr: 'أمين المخزن', permissions: ['inventory'] },
  maintenanceManager: { name: 'Maintenance Manager', nameAr: 'مسؤول الصيانة', permissions: ['maintenance', 'reports'] },
  salesRepresentative: { name: 'Sales Representative', nameAr: 'مندوب المبيعات', permissions: ['sales', 'reports'] },
  accountant: { name: 'Accountant', nameAr: 'المحاسب', permissions: ['sales', 'reports', 'settings'] }
};

// Demo users data for initial setup in Firestore (You'll need to add these to Firestore manually)
const demoUsersFirestoreData = {
  "manager@factory.com": {
    uid: "FIREBASE_UID_FOR_MANAGER",
    email: "manager@factory.com",
    name: "أحمد محمد",
    nameEn: "Ahmed Mohamed",
    role: "factoryManager",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
   "operations@factory.com": {
    uid: "FIREBASE_UID_FOR_OPERATIONS",
    email: "operations@factory.com",
    name: "فاطمة علي",
    nameEn: "Fatima Ali",
    role: "operationsManager",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  "quality@factory.com": {
    uid: "FIREBASE_UID_FOR_QUALITY",
    email: "quality@factory.com",
    name: "محمد حسن",
    nameEn: "Mohamed Hassan",
    role: "qualityController",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userData,
            roleInfo: userRoles[userData.role]
          });
        } else {
          // Handle case where user exists in Auth but not Firestore (e.g., during initial setup)
          // For demo, we'll try to find a match in our mock data structure if needed.
          // This part might need adjustment based on how you manage user creation.
          console.warn(`User document not found in Firestore for UID: ${firebaseUser.uid}. This might be a new user or demo user not yet in Firestore.`);
          
          // Attempt to match with demo data if email is one of the demo emails
          const demoUserEntry = Object.values(demoUsersFirestoreData).find(du => du.email === firebaseUser.email);
          if(demoUserEntry) {
             setUser({
                uid: firebaseUser.uid, // Use actual Firebase UID
                email: firebaseUser.email,
                name: demoUserEntry.name,
                nameEn: demoUserEntry.nameEn,
                role: demoUserEntry.role,
                avatar: demoUserEntry.avatar,
                roleInfo: userRoles[demoUserEntry.role]
             });
          } else {
            setUser(null); // Or set a minimal user object
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUp = async (email, password, data) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return { success: true };
    } catch (error) {
      console.error("Firebase signUp error:", error);
      return { success: false, error: error.message };
    }
  };


  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by onAuthStateChanged
      return { success: true };
    } catch (error) {
      console.error("Firebase login error:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // User state will be updated by onAuthStateChanged
    } catch (error) {
      console.error("Firebase logout error:", error);
    }
  };

  const hasPermission = (permission) => {
    if (!user || !user.roleInfo) return false;
    return user.roleInfo.permissions.includes('all') || user.roleInfo.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signUp,
      logout,
      hasPermission,
      loading,
      userRoles
    }}>
      {children}
    </AuthContext.Provider>
  );
};