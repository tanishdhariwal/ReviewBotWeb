  import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import NavBar from '../NavBar';

const Header = () => {
  const auth = useAuth();

  return (
    <div>
      <NavBar 
        isLoggedIn={auth.isLoggedIn} 
        username={auth.user ? auth.user.username : ''} 
      />
    </div>
  );
}

export default Header;