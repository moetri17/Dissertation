import { View, TextInput, StyleSheet, Image, Button} from 'react-native'
import React, {useState} from 'react'
import { useAuth } from '../AuthContext'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {onLogin, onRegister } = useAuth(); 

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
    };

    const register = async () => {
        const result = await onRegister!(email, password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    };

  return (
    <View style={styles.container}>
        <Image source={{uri: 'https://galaxies.dev/img/logos/logo--blue.png'}} style={styles.image} />
        <View style={styles.form}>
            <TextInput style={styles.input} placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email} />
            <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)} value={password} />
            <Button onPress={login} title="Sign in" />
            <Button onPress={register} title="Sign Up" />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    image: {

    },
    container: {

    },
    form:{

    },
    input:{

    },
})

export default Login