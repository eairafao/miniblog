import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Register.module.css'
import { useState, useEffect } from 'react'

export default function Register() {

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      displayName,
      email,
      password
    }

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais!')
      return;
    }

    const res = await createUser(user)
    console.log(user)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastra-se para publicar</h1>
      <p>Crie seu usuário e compartilhe suas experiências</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input type="text" name='displayname' required placeholder='Nome do usuário' value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </label>

        <label>
          <span>Email:</span>
          <input type="email" name="email" required placeholder='E-mail do usuário' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" name="password" required placeholder='Digite a senha' value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <label>
          <span>Senha:</span>
          <input type="password" name="confirmPassword" required placeholder='Digite a senha novamente' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>

        <button className="btn">Cadastrar</button>

        {error && <p className={styles.error}>As senhas precisam ser iguais!!</p>}
      </form>
    </div>
  )
}
