import { useContext } from 'react';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/Auth';
import s from './styles/App.module.scss';

function App() {

  const { users } = useContext(AuthContext);

  return (
    <main className={s.contentWrapper}>
      <MessageList />
      {!! users ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}

export default App
