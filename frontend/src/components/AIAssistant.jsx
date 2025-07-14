import React, { useState } from 'react';
import { Send, MessageCircle, Bot, User as UserIcon, Mic, MicOff } from 'lucide-react';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import './AIAssistant.css';

export const AIAssistant = () => {
  const { state, dispatch } = useApp();
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! I\'m your AI shopping assistant. I can help you find products, answer questions about health benefits, provide recommendations, and much more. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        'Show me gaming laptops under ₹50,000',
        'Best shampoos for hair fall',
        'Sugar-free snacks for diabetics',
        'What are today\'s deals?'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Product search queries
    if (lowerMessage.includes('gaming laptop') || lowerMessage.includes('laptop for gaming')) {
      const gamingLaptops = products.filter(p => 
        p.category === 'electronics' && 
        p.subcategory === 'laptops' &&
        (p.name.toLowerCase().includes('gaming') || p.tags.includes('gaming'))
      );
      
      if (lowerMessage.includes('under') && lowerMessage.includes('50000')) {
        const affordableLaptops = gamingLaptops.filter(p => p.price < 50000);
        return {
          text: `I found ${affordableLaptops.length} gaming laptops under ₹50,000. Here are some great options: ${affordableLaptops.map(p => p.name).join(', ')}. Would you like to see more details about any of these?`,
          suggestions: ['Show me laptop specifications', 'Compare these laptops', 'What about gaming accessories?']
        };
      }
      return {
        text: `I found ${gamingLaptops.length} gaming laptops. Some popular options include: ${gamingLaptops.slice(0, 3).map(p => p.name).join(', ')}. These are perfect for gaming and high-performance tasks!`,
        suggestions: ['Show me under ₹50,000', 'What about gaming accessories?', 'Compare laptop specs']
      };
    }

    if (lowerMessage.includes('shampoo') && (lowerMessage.includes('hair fall') || lowerMessage.includes('hair loss'))) {
      const hairCareProducts = products.filter(p => 
        p.category === 'health-beauty' && 
        p.subcategory === 'haircare' &&
        (p.name.toLowerCase().includes('hair fall') || p.tags.includes('hair-fall'))
      );
      return {
        text: `For hair fall concerns, I recommend these products: ${hairCareProducts.map(p => p.name).join(', ')}. These contain ingredients like biotin and keratin that help strengthen hair and reduce hair fall.`,
        suggestions: ['Show me hair care routine', 'What causes hair fall?', 'Natural hair fall remedies']
      };
    }

    if (lowerMessage.includes('sugar-free') || lowerMessage.includes('diabetic')) {
      const sugarFreeProducts = products.filter(p => 
        p.tags.includes('sugar-free') || p.tags.includes('diabetic-friendly') || p.healthTags.includes('sugar-free')
      );
      if (lowerMessage.includes('snack')) {
        const snacks = sugarFreeProducts.filter(p => p.subcategory === 'snacks');
        return {
          text: `I found ${snacks.length} sugar-free snacks perfect for diabetics: ${snacks.map(p => p.name).join(', ')}. These are sweetened with natural alternatives and won't spike blood sugar levels.`,
          suggestions: ['Show me diabetic meal plans', 'What about sugar-free drinks?', 'Diabetic-friendly recipes']
        };
      }
      return {
        text: `I found ${sugarFreeProducts.length} sugar-free and diabetic-friendly products. These include snacks, beverages, and other food items that help maintain stable blood sugar levels.`,
        suggestions: ['Show me sugar-free snacks', 'Diabetic meal planning', 'Blood sugar monitoring devices']
      };
    }

    if (lowerMessage.includes('smartphone') || lowerMessage.includes('phone')) {
      const smartphones = products.filter(p => p.subcategory === 'smartphones');
      if (lowerMessage.includes('under') && lowerMessage.includes('20000')) {
        const budgetPhones = smartphones.filter(p => p.price < 20000);
        return {
          text: `I found ${budgetPhones.length} smartphones under ₹20,000. These offer great value for money with good cameras and performance.`,
          suggestions: ['Show me phone specifications', 'Best camera phones', 'Phone accessories']
        };
      }
      return {
        text: `We have a wide range of smartphones including: ${smartphones.slice(0, 3).map(p => p.name).join(', ')}. What's your budget and preferred features?`,
        suggestions: ['Under ₹20,000 phones', 'Premium smartphones', 'Phone comparison']
      };
    }

    // Health-related queries
    if (lowerMessage.includes('vitamin') || lowerMessage.includes('supplement')) {
      const vitamins = products.filter(p => p.subcategory === 'vitamins');
      return {
        text: `We have a comprehensive range of vitamins and supplements: ${vitamins.map(p => p.name).join(', ')}. Always consult with a healthcare provider before starting new supplements.`,
        suggestions: ['Vitamin D benefits', 'Daily vitamin requirements', 'Natural vs synthetic vitamins']
      };
    }

    if (lowerMessage.includes('organic') || lowerMessage.includes('natural')) {
      const organicProducts = products.filter(p => p.tags.includes('organic') || p.healthTags.includes('organic'));
      return {
        text: `We have ${organicProducts.length} organic products available. Organic products are grown without synthetic pesticides and are better for your health and the environment.`,
        suggestions: ['Benefits of organic food', 'Organic vs conventional', 'Organic skincare products']
      };
    }

    // Shopping assistance
    if (lowerMessage.includes('deal') || lowerMessage.includes('discount') || lowerMessage.includes('offer')) {
      const discountedProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);
      return {
        text: `Today we have amazing deals! ${discountedProducts.length} products are on sale with discounts up to 25% off. Check out: ${discountedProducts.slice(0, 3).map(p => p.name).join(', ')}.`,
        suggestions: ['Show all deals', 'Electronics deals', 'Fashion deals', 'Grocery deals']
      };
    }

    if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
      return {
        text: 'Our delivery options: Standard delivery (2-3 days) is free on orders over ₹500. Express delivery (next day) available for ₹99. Same-day delivery available in select cities for orders before 2 PM.',
        suggestions: ['Track my order', 'Delivery areas', 'Express delivery cost']
      };
    }

    if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return {
        text: 'We offer a 30-day return policy for most items. Electronics have a 15-day return window. Perishable items like food have a 7-day return policy. Items must be in original condition and packaging.',
        suggestions: ['How to return items', 'Refund process', 'Exchange policy']
      };
    }

    // Personalized recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest')) {
      if (state.user?.healthProfile.isDiabetic) {
        return {
          text: 'Based on your diabetic profile, I recommend our sugar-free products, low-carb snacks, and blood glucose monitoring devices. Would you like to see specific categories?',
          suggestions: ['Sugar-free products', 'Diabetic meal plans', 'Blood glucose monitors']
        };
      }
      if (state.user?.healthProfile.isVegan) {
        return {
          text: 'For your vegan lifestyle, I recommend our plant-based products, vegan skincare, and cruelty-free items. All are clearly labeled for easy identification.',
          suggestions: ['Vegan food products', 'Plant-based skincare', 'Vegan fashion']
        };
      }
      return {
        text: 'I\'d be happy to recommend products! Could you tell me what category you\'re interested in? We have electronics, fashion, groceries, health & beauty, and more.',
        suggestions: ['Electronics recommendations', 'Fashion trends', 'Health products', 'Home essentials']
      };
    }

    // Category browsing
    if (lowerMessage.includes('electronics')) {
      return {
        text: 'Our electronics section includes smartphones, laptops, tablets, headphones, cameras, gaming gear, and smart home devices. What are you looking for?',
        suggestions: ['Latest smartphones', 'Gaming laptops', 'Smart home devices', 'Camera equipment']
      };
    }

    if (lowerMessage.includes('fashion') || lowerMessage.includes('clothing')) {
      return {
        text: 'Explore our fashion collection with men\'s and women\'s clothing, shoes, accessories, bags, jewelry, and watches. What style are you looking for?',
        suggestions: ['Trending fashion', 'Seasonal collections', 'Shoe collection', 'Accessories']
      };
    }

    // Default responses
    const defaultResponses = [
      {
        text: 'I\'m here to help you find the perfect products! You can ask me about specific items, compare products, get health recommendations, or browse our categories.',
        suggestions: ['Show me categories', 'Today\'s deals', 'New arrivals', 'Popular products']
      },
      {
        text: 'Feel free to ask me about product details, ingredients, health benefits, or how items might fit your dietary requirements and lifestyle.',
        suggestions: ['Health-conscious products', 'Product comparisons', 'Ingredient information', 'Dietary recommendations']
      },
      {
        text: 'I can help you find products by category, price range, health preferences, or specific features. What are you shopping for today?',
        suggestions: ['Budget-friendly options', 'Premium products', 'Health & wellness', 'Tech gadgets']
      }
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputText);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: response.suggestions
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  return (
    <div className="ai-assistant-container">
      <div className="ai-assistant-wrapper">
        {/* Header */}
        <div className="ai-assistant-header">
          <div className="ai-assistant-header-content">
            <MessageCircle className="ai-assistant-header-icon" />
            <div>
              <h2 className="ai-assistant-header-title">AI Shopping Assistant</h2>
              <p className="ai-assistant-header-subtitle">Your intelligent shopping companion - ask me anything!</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="ai-assistant-messages">
          {messages.map((message) => (
            <div key={message.id} className="ai-assistant-message-group">
              <div className={`ai-assistant-message ${message.isBot ? 'ai-assistant-message-bot' : 'ai-assistant-message-user'}`}>
                <div className={`ai-assistant-avatar ${message.isBot ? 'ai-assistant-avatar-bot' : 'ai-assistant-avatar-user'}`}>
                  {message.isBot ? (
                    <Bot className="ai-assistant-avatar-icon" />
                  ) : (
                    <UserIcon className="ai-assistant-avatar-icon" />
                  )}
                </div>
                <div className={`ai-assistant-message-bubble ${message.isBot ? 'ai-assistant-message-bubble-bot' : 'ai-assistant-message-bubble-user'}`}>
                  <p className="ai-assistant-message-text">{message.text}</p>
                  <p className={`ai-assistant-message-time ${message.isBot ? 'ai-assistant-message-time-bot' : 'ai-assistant-message-time-user'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              
              {/* Suggestions */}
              {message.isBot && message.suggestions && (
                <div className="ai-assistant-suggestions">
                  <p className="ai-assistant-suggestions-label">Suggested questions:</p>
                  <div className="ai-assistant-suggestions-list">
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="ai-assistant-suggestion-button"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="ai-assistant-input-section">
          <div className="ai-assistant-input-wrapper">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about products, health benefits, deals, or anything else..."
              className="ai-assistant-input"
            />
            <button
              onClick={startVoiceRecognition}
              disabled={isListening}
              className={`ai-assistant-voice-button ${isListening ? 'ai-assistant-voice-button-active' : ''}`}
            >
              {isListening ? <MicOff className="ai-assistant-button-icon" /> : <Mic className="ai-assistant-button-icon" />}
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="ai-assistant-send-button"
            >
              <Send className="ai-assistant-button-icon" />
            </button>
          </div>
          {isListening && (
            <p className="ai-assistant-listening-status">
              <span className="ai-assistant-listening-pulse">🎤</span>
              Listening... Speak now
            </p>
          )}
        </div>
      </div>
    </div>
  );
};