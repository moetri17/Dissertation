import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  // Directly use the OpenAI API key for testing purposes
  const apikey = 'sk-proj-QeNsCqs2SrgBTxQtWiOhT3BlbkFJ1qt0U2lVnsTHTH1LzsiF';

  const handleSend = async () => {
    const userQuestion = input;
    console.log("User Question:", userQuestion);
    setInput('');
  
    setConversation([...conversation, { type: 'user', text: userQuestion }]);
  
    try {
      console.log("Using API Key:", apikey);
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
      console.log("Response from OpenAI:", json);
  
      if (!response.ok) {
        throw new Error(json.error ? json.error.message : "Unknown error");
      }
  
      const botAnswer = json.choices[0].message.content.trim();
      console.log("Bot Answer:", botAnswer);
  
      setConversation(prev => [...prev, { type: 'bot', text: botAnswer }]);
    } catch (error) {
      console.error("Error fetching data from OpenAI", error);
      setConversation(prev => [...prev, { type: 'bot', text: "Sorry, I couldn't understand that." }]);
    }
  };
  

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#f5f5f5' }}>
      <ScrollView style={{ flex: 1, padding: 10 }}>
        {conversation.map((msg, index) => (
          <Text key={index} style={msg.type === 'user' ? { textAlign: 'right', margin: 5, padding: 5, backgroundColor: '#d1edff', alignSelf: 'flex-end', borderRadius: 10 } : { textAlign: 'left', margin: 5, padding: 5, backgroundColor: '#eff0f1', alignSelf: 'flex-start', borderRadius: 10 }}>
            {msg.text}
          </Text>
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', padding: 10 }}>
        <TextInput
          style={{ flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 10, padding: 10 }}
          value={input}
          onChangeText={setInput}
          placeholder="Ask me something..."
        />
        <TouchableOpacity onPress={handleSend} style={{ backgroundColor: '#4e9efc', borderRadius: 10, padding: 10, marginLeft: 10 }}>
          <Text style={{ color: 'white' }}>Send</Text>
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
