import { doc, getDoc, updateDoc, addDoc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from '@/firebase';

async function logAction(collectionName, id, action, data = {}) {
  const logRef = collection(db, `${collectionName}/${id}/logs`);
  await addDoc(logRef, {
    action,
    userId: auth.currentUser.uid,
    timestamp: serverTimestamp(),
    ...data
  });
}

export async function startProduction(orderId) {
  const ref = doc(db, 'productionOrders', orderId);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error('Order not found');
  const order = snap.data();
  if (order.status !== 'moldInstalled') {
    throw new Error('Cannot start production before mold is installed');
  }
  await updateDoc(ref, { status: 'inProgress', updatedAt: serverTimestamp() });
  await logAction('productionOrders', orderId, 'startProduction');
}

export async function approveQualityCheck(orderId, status) {
  const ref = doc(db, 'productionOrders', orderId);
  await updateDoc(ref, {
    qualityStatus: status,
    status: status === 'approved' ? 'completed' : 'qualityFailed',
    updatedAt: serverTimestamp()
  });
  await logAction('productionOrders', orderId, 'qualityCheck', { result: status });
}

export async function reportFault(faultData) {
  const ref = doc(collection(db, 'faults'));
  await setDoc(ref, {
    ...faultData,
    status: 'open',
    createdAt: serverTimestamp()
  });
  await logAction('faults', ref.id, 'reportFault');
  return ref.id;
}
