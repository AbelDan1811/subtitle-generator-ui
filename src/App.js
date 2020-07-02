import React from 'react';
import Header from './shared/Header'
import {renderRoutes} from 'react-router-config'
import {ToastProvider} from 'react-toast-notifications'

const App = ({ route }) => {
  return (
    <ToastProvider autoDismiss={true} autoDismissTimeout={5000} placement='top-center'>
      <div className='bg-gray-300 overflow-hidden'>
          <Header />
          {renderRoutes(route.routes)}
      </div>
    </ToastProvider>
  )
}

export default App;
