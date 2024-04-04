import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './app/screens/Login';
import MenuScreen from './app/screens/Menu';
import Homepage from './app/screens/Homepage';
import QuranSection from './app/screens/QuranSection';
import QiblaFinder from './app/screens/QiblaFinder';
import Chatbot from './app/screens/Chatbot';
import AboutPage from './app/screens/AboutPage';
import Azkar from './app/screens/Azkar';
import MorningAzkar from './app/screens/Morning Athkar';
import EveningAzkar from './app/screens/Evening Athkar';
import ForgotYourPassword from './app/screens/ForgotYourPassword'; 
import SignUpScreen from './app/screens/SignUpScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Northumbria ISOC" component={MenuScreen} />
      <InsideStack.Screen name="Homepage" component={Homepage} />
      <InsideStack.Screen name="Quran" component={QuranSection} />
      <InsideStack.Screen name="Chatbot" component={Chatbot} />
      <InsideStack.Screen name="About" component={AboutPage} />
      <InsideStack.Screen name="Mosque Locations" component={QiblaFinder} />
      <InsideStack.Screen name="Azkar" component={Azkar} />
      <InsideStack.Screen name="Morning Athkar" component={MorningAzkar} />
      <InsideStack.Screen name="Evening Athkar" component={EveningAzkar} />
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

