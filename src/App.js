import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [emailError, setEmailError] = React.useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = React.useState('Password не может быть пустым');
  const [formValid, setFormValid] = React.useState(false);


  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Некорректный емейл')
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Пароль должен быть длиннее 3 и меньше 8 символов');
      if (!e.target.value) {
        setPasswordError('Password не может быть пустым');
      }
    } else {
      setPasswordError('')
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  return (
    <div className='app'>
      <div className='registration'>
        <form className='form'>
          <h1>Регистрация</h1>
          {(emailDirty && emailError) && <div style={{ color: 'red' }}>{emailError}</div>}
          <input value={email} onChange={(e) => emailHandler(e)} onBlur={e => blurHandler(e)} name='email' type='text' placeholder='Enter your email....' />
          {(passwordDirty && passwordError) && <div style={{ color: 'red' }}>{passwordError}</div>}
          <input value={password} onChange={(e) => passwordHandler(e)} onBlur={e => blurHandler(e)} name='password' type='password' placeholder='Enter your password....' />
          <button disabled={!formValid} type='submit'>Registration</button>
        </form>
      </div>
    </div>
  );
}

export default App;
