import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { registerThunk, clearError } from '@/features/auth/authSlice';
import { ThunderboltOutlined, MailOutlined, LockOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (error) dispatch(clearError());
  }, [error, dispatch]);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Введите имя';
    else if (name.length < 2) newErrors.name = 'Минимум 2 символа';
    if (!email) newErrors.email = 'Введите email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Некорректный email';
    if (!password) newErrors.password = 'Введите пароль';
    else if (password.length < 8) newErrors.password = 'Минимум 8 символов';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const result = await dispatch(registerThunk({ name, email, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 1500);
      }
    }
  };

  if (success) {
    return (
      <div style={styles.page}>
        <motion.div
          style={styles.successCard}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ThunderboltOutlined style={{ fontSize: 48, color: '#F88545' }} />
          <h1 style={styles.successTitle}>Аккаунт создан!</h1>
          <p style={styles.successText}>Сейчас перенаправим вас на страницу входа...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.logo}>
          <ThunderboltOutlined style={{ fontSize: 32, color: '#F88545' }} />
          <span style={styles.logoText}>THE FIREWALL</span>
        </div>
        <h1 style={styles.title}>Регистрация</h1>
        <p style={styles.subtitle}>Создайте аккаунт, чтобы начать обучение</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Имя</label>
            <div style={styles.inputWrapper}>
              <UserOutlined style={styles.inputIcon} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как вас зовут?"
                style={{ ...styles.input, borderColor: errors.name ? '#D9534F' : '#E8E3D5' }}
              />
            </div>
            {errors.name && <span style={styles.errorText}>{errors.name}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrapper}>
              <MailOutlined style={styles.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.ru"
                style={{ ...styles.input, borderColor: errors.email ? '#D9534F' : '#E8E3D5' }}
              />
            </div>
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Пароль</label>
            <div style={styles.inputWrapper}>
              <LockOutlined style={styles.inputIcon} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 8 символов"
                style={{ ...styles.input, borderColor: errors.password ? '#D9534F' : '#E8E3D5' }}
              />
            </div>
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
          </div>

          {error && (
            <motion.div
              style={styles.serverError}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            style={styles.submitBtn}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 32px rgba(64, 91, 188, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Создаём...' : 'Зарегистрироваться'}
            {status !== 'loading' && <ArrowRightOutlined style={{ marginLeft: 8 }} />}
          </motion.button>
        </form>

        <p style={styles.footer}>
          Уже есть аккаунт? <Link to="/login" style={styles.link}>Войти</Link>
        </p>
      </motion.div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFF9EC',
    padding: '24px',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '20px',
    padding: '48px',
    maxWidth: '460px',
    width: '100%',
    boxShadow: '0 8px 40px rgba(20, 15, 65, 0.08)',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  logoText: {
    fontSize: '18px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
  },
  title: {
    fontSize: '28px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    textAlign: 'center',
    marginBottom: '8px',
    fontWeight: 400,
  },
  subtitle: {
    fontSize: '14px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#8F8AA6',
    textAlign: 'center',
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontFamily: "'Comfortaa', sans-serif",
    fontWeight: 600,
    color: '#140F41',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    color: '#8F8AA6',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '14px 16px 14px 42px',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '15px',
    color: '#140F41',
    background: '#FFFFFF',
    border: '1px solid #E8E3D5',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
  },
  errorText: {
    fontSize: '12px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#D9534F',
  },
  serverError: {
    background: '#FBECEC',
    color: '#D9534F',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '13px',
    fontFamily: "'Comfortaa', sans-serif",
  },
  submitBtn: {
    background: '#405BBC',
    color: '#FFFFFF',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    padding: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease',
  },
  footer: {
    fontSize: '14px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#8F8AA6',
    textAlign: 'center',
    marginTop: '24px',
  },
  link: {
    color: '#405BBC',
    fontWeight: 600,
    textDecoration: 'none',
  },
  successCard: {
    background: '#FFFFFF',
    borderRadius: '20px',
    padding: '48px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 8px 40px rgba(20, 15, 65, 0.08)',
    textAlign: 'center',
  },
  successTitle: {
    fontSize: '24px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    marginTop: '16px',
    marginBottom: '8px',
    fontWeight: 400,
  },
  successText: {
    fontSize: '14px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#8F8AA6',
  },
};