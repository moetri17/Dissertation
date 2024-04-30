import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './app/screens/Login';
import MenuScreen from './app/screens/Menu';
import Homepage from './app/screens/Homepage';
import QuranSection from './app/screens/QuranSection';
import QiblaFinder from './app/screens/QiblaFinder';
import Chatbot from './app/screens/Chatbot';
import AboutPage from './app/screens/AboutPage';
import Settings from './app/screens/Settings';
import Athkar from './app/screens/Athkar';
import MorningAzkar from './app/screens/Morning Athkar';
import EveningAzkar from './app/screens/Evening Athkar';
import BeforeSleep from './app/screens/Before Sleep';
import UserEvents from './app/screens/UserEvents';
import AdminEvents from './app/screens/AdminEvents';
import AddEvent from './app/screens/AddEvent';
import EditEvent from './app/screens/EditEvent';
import Surah from './app/screens/components/Surah';
import Page from './app/screens/components/Page';
import Juz from './app/screens/components/Juz';
import ForgotYourPassword from './app/screens/ForgotYourPassword'; 
import SignUpScreen from './app/screens/SignUpScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="Northumbria ISOC" component={MenuScreen} />
      <InsideStack.Screen name="Homepage" component={Homepage} />
      <InsideStack.Screen name="Quran" component={QuranSection} />
      <InsideStack.Screen name="Events" component={AdminEvents} />
      <InsideStack.Screen name="AdminEvents" component={AdminEvents} />
      <InsideStack.Screen name="AddEvent" component={AddEvent} />
      <InsideStack.Screen name="EditEvent" component={EditEvent} />
      <InsideStack.Screen name="Chatbot" component={Chatbot} />
      <InsideStack.Screen name="About" component={AboutPage} />
      <InsideStack.Screen name="QiblaFinder" component={QiblaFinder} />
      <InsideStack.Screen name="Athkar" component={Athkar} />
      <InsideStack.Screen name="Morning Athkar" component={MorningAzkar} />
      <InsideStack.Screen name="Evening Athkar" component={EveningAzkar} />
      <InsideStack.Screen name="Before Sleep" component={BeforeSleep} />
      <InsideStack.Screen name="Surah" component={Surah} />
      <InsideStack.Screen name="Page" component={Page} />
      <InsideStack.Screen name="Juz" component={Juz} />
      <InsideStack.Screen name="Settings" component={Settings} />
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

