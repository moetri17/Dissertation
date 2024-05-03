import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './app/screens/Login';
import MenuScreen from './app/screens/Menu';
import Homepage from './app/screens/Homepage';
import QuranSection from './app/screens/QuranSection';
import Locations from './app/screens/Locations';
import Chatbot from './app/screens/Chatbot';
import AboutPage from './app/screens/AboutPage';
import Settings from './app/screens/Settings';
import Athkar from './app/screens/Athkar';
import MorningAzkar from './app/screens/Morning Athkar';
import EveningAzkar from './app/screens/Evening Athkar';
import BeforeSleep from './app/screens/Before Sleep';
import Eventss from './app/screens/Events';
import UserEvents from './app/screens/components/UserEvents';
import AdminEvents from './app/screens/components/AdminEvents';
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
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout({navigation, route}) {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Homepage';

  return (
    <InsideStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerRight: () => (
          routeName !== 'Menu' ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('Menu')}>
              <Icon name="menu" size={24} color="#000" />
            </TouchableOpacity>
          ) : null
        ),
      }}>
      <InsideStack.Screen name="Homepage" component={Homepage} />
      <InsideStack.Screen name="Menu" component={MenuScreen} />
      <InsideStack.Screen name="Quran" component={QuranSection} />
      <InsideStack.Screen name="Events" component={Eventss} />
      <InsideStack.Screen name="UserEvents" component={UserEvents} />
      <InsideStack.Screen name="AdminEvents" component={AdminEvents} />
      <InsideStack.Screen name="AddEvent" component={AddEvent} />
      <InsideStack.Screen name="EditEvent" component={EditEvent} />
      <InsideStack.Screen name="Chatbot" component={Chatbot} />
      <InsideStack.Screen name="About" component={AboutPage} />
      <InsideStack.Screen name="Locations" component={Locations} />
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

