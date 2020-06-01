import React from 'react';
import Todos from './containers/Todos';
import Header from './containers/Header';
import Notifications from './containers/Notifications';
import Footer from './containers/Footer';

const PageContainer = () => {
  return (
    <div>
      <Notifications />
      <Header />
      <Todos />
      <Footer />
    </div>
  );
};
export default PageContainer;
