import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

const Eventss = () => {
  const navigation = useNavigation();

  onAuthStateChanged(FIREBASE_AUTH, async (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User signed in, UID:", uid);  // Log for debugging

      try {
        const response = await fetch(`http://192.168.0.23:8000/api/users/${uid}`);
        const data = await response.json();
        if (data.is_admin) {
          console.log("User is admin, navigating to AdminEvents.");
          navigation.navigate('AdminEvents');
        } else {
          console.log("User is not admin, navigating to UserEvents.");
          navigation.navigate('UserEvents');
        }
      } catch (error) {
        console.error("Error fetching admin status:", error);
      }
    } else {
      console.log("No user is signed in.");
      // Optionally navigate to a login screen or handle appropriately
    }
  });
};

export default Eventss;
