import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'

const App = lazy(() => import('./App'));
import { ContextProvider } from './context/ContextProvider'
import './index.css'
import PageLoader from './components/PageLoader';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <Suspense fallback={<PageLoader />}>
        <App />
      </Suspense>
    </ContextProvider>
  </React.StrictMode>
)
