import React from 'react';
import Header from '../Header';
import MainContent from '../MainContent';
import Sidebar from '../SideBar';
import './style.css';

function Home() {

  return (
    <>
      <Header />
      <div className="content">
        <MainContent />
        <Sidebar />
      </div>
    </>
  );
}

export default Home;