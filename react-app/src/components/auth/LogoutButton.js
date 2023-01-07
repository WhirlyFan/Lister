import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import styles from './auth.module.css';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <div onClick={onLogout} className={styles.logout}>Logout</div>;
};

export default LogoutButton;
