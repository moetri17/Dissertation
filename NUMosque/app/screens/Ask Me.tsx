import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const apikey = 'sk-proj-QeNsCqs2SrgBTxQtWiOhT3BlbkFJ1qt0U2lVnsTHTH1LzsiF';

  const handleSend = async () => {
    const userQuestion = input;
    setInput('');

    setConversation([...conversation, { type: 'user', text: userQuestion }]);

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apikey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{
            role: "user",
            content: userQuestion
          }]
        }),
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error ? json.error.message : "Unknown error");
      }

      const botAnswer = json.choices[0].message.content.trim();
      setConversation(prev => [...prev, { type: 'bot', text: botAnswer }]);
    } catch (error) {
      setConversation(prev => [...prev, { type: 'bot', text: "Sorry, I couldn't understand that." }]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatArea}>
        {conversation.map((msg, index) => (
          <Text key={index} style={msg.type === 'user' ? styles.userMsg : styles.botMsg}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Ask me something..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Icon name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#FFF8E1',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userMsg: {
    textAlign: 'right',
    margin: 5,
    padding: 5,
    backgroundColor: '#d1edff',
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  botMsg: {
    textAlign: 'left',
    marginVertical: 15,
    padding: 5,
    backgroundColor: '#FFF8E1',
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
});

export default Chatbot;
