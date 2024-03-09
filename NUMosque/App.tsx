import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './app/screens/Login';
import MenuScreen from './app/screens/Menu';
import QuranSection from './app/screens/QuranSection'; // Add this line to import QuranSection
import QiblaFinder from './app/screens/QiblaFinder';
import Chatbot from './app/screens/Chatbot';
import AboutPage from './app/screens/AboutPage'; // make sure the path is correct
import ForgotYourPassword from './app/screens/ForgotYourPassword'; // make sure the path is correct
import SignUpScreen from './app/screens/SignUpScreen'; // make sure the path is correct
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Menu" component={MenuScreen} />
      <InsideStack.Screen name="Quran" component={QuranSection} />
      <InsideStack.Screen name="Chatbot" component={Chatbot} />
      <InsideStack.Screen name="About" component={AboutPage} />
      <InsideStack.Screen name="Mosque Locations" component={QiblaFinder} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false}}/>
        : 
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
        }
      <Stack.Screen name="ForgotPassword" component={ForgotYourPassword} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

