import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConversationContextProvider } from './context/ConversationContext.jsx';
import { MessageContextProvider } from './context/MessageContext.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConversationContextProvider>
          <MessageContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </MessageContextProvider>
        </ConversationContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
