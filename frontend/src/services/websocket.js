const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws';

let ws = null;
let reconnectTimeout = null;
let messageHandlers = [];

export const connectWebSocket = (onMessage) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    return ws;
  }

  ws = new WebSocket(WS_URL);

  ws.onopen = () => {
    console.log('WebSocket connected');
    clearTimeout(reconnectTimeout);
    
    // Subscribe to politics news channel
    ws.send(JSON.stringify({
      type: 'subscribe',
      channel: 'politics'
    }));
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      // Call all registered message handlers
      messageHandlers.forEach(handler => handler(data));
      
      if (onMessage) {
        onMessage(data);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  };

  ws.onerror = (error) => {
    // Silently handle errors - they're usually just connection issues
    // console.error('WebSocket error:', error);
  };

  ws.onclose = () => {
    // Silently handle disconnection and attempt reconnect
    // console.log('WebSocket disconnected');
    
    // Attempt to reconnect after 5 seconds
    reconnectTimeout = setTimeout(() => {
      // console.log('Attempting to reconnect WebSocket...');
      connectWebSocket(onMessage);
    }, 5000);
  };

  return ws;
};

export const disconnectWebSocket = () => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
  }
  
  if (ws) {
    ws.close();
    ws = null;
  }
  
  messageHandlers = [];
};

export const sendMessage = (message) => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not connected');
  }
};

export const addMessageHandler = (handler) => {
  messageHandlers.push(handler);
};

export const removeMessageHandler = (handler) => {
  messageHandlers = messageHandlers.filter(h => h !== handler);
};

const websocketService = {
  connect: connectWebSocket,
  disconnect: disconnectWebSocket,
  send: sendMessage,
  addHandler: addMessageHandler,
  removeHandler: removeMessageHandler
};

export default websocketService;
