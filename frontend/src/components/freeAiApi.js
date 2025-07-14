

export async function fetchFreeAIResponse(prompt) {
  let apiKey;
  try {
    if (typeof window === 'undefined') {
      const fs = await import('fs/promises');
      apiKey = (await fs.readFile('./openrouter.key', 'utf-8')).trim();
    } else {
      throw new Error('OpenRouter API key must be provided in the browser context.');
    }
  } catch (err) {
    throw new Error('OpenRouter API key not found. Please create a file named openrouter.key in this directory with your key.');
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-ai/deepseek-chat-v3-0324',
      messages: [
        { role: 'user', content: prompt }
      ]
    })
  });

  if (!response.ok) {
    throw new Error('OpenRouter API error: ' + response.status);
  }
  const data = await response.json();
  if (data && Array.isArray(data.choices) && data.choices[0]?.message?.content) {
    return data.choices[0].message.content;
  }
  return 'Sorry, I could not get a response from the AI right now.';
}
