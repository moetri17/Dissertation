import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const predefinedAnswers = {
    "How are you doing?": "I'm good, thank you!",
    "What's your name?": "I'm Chatbot.",
    // Add more predefined Q&A here
  };

  const handleSend = () => {
    const userQuestion = input;
    const botAnswer = predefinedAnswers[userQuestion] || "I don't understand that question.";

    setConversation([...conversation, { type: 'user', text: userQuestion }, { type: 'bot', text: botAnswer }]);
    setInput('');
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
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  chatArea: {
    flex: 1,
    padding: 10,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#4e9efc',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
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
    margin: 5,
    padding: 5,
    backgroundColor: '#eff0f1',
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
});

export default Chatbot;
