import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchModules, setFilter, resetFilters } from '@/features/catalog/catalogSlice';
import { fetchProgress } from '@/features/progress/progressSlice';
import {
  BookOutlined,
  UserOutlined,
  ArrowRightOutlined,
  LockOutlined,
  MessageOutlined,
  SafetyCertificateOutlined,
  HomeOutlined,
  SearchOutlined,
  TrophyOutlined,
  FireOutlined,
} from '@ant-design/icons';

const icons = {
  mail: <MessageOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />,
  lock: <LockOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />,
  team: <UserOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />,
  safety: <SafetyCertificateOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />,
  shield: <SafetyCertificateOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />,
  wifi: <HomeOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />,
};

const difficultyLabels = {
  basic: 'Базовый',
  advanced: 'Продвинутый',
};

export default function CatalogPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modules, status, filters } = useSelector((state) => state.catalog);
  const { items: progressItems } = useSelector((state) => state.progress);
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchModules());
    dispatch(fetchProgress());
  }, [dispatch]);

  const filteredModules = useMemo(() => {
    let result = [...modules];
    if (filters.category) result = result.filter((m) => m.category === filters.category);
    if (filters.difficulty) result = result.filter((m) => m.difficulty === filters.difficulty);
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (m) => m.title.toLowerCase().includes(s) || m.description.toLowerCase().includes(s)
      );
    }
    return result;
  }, [modules, filters, search]);

  const completedCount = progressItems.filter((p) => p.status === 'completed').length;
  const overallProgress = modules.length > 0
    ? Math.round((completedCount / modules.length) * 100)
    : 0;

  const getModuleProgress = (moduleId) => {
    const progress = progressItems.find((p) => p.module_id === moduleId);
    if (!progress) return 0;
    return progress.score || 0;
  };

  return (
    <div style={styles.page}>
      {/* ВЕРХНИЙ БЛОК */}
      <motion.div
        style={styles.hero}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.heroLeft}>
          <h1 style={styles.title}>Привет, {user?.username || 'ученик'}!</h1>
          <p style={styles.subtitle}>
            Выбери модуль и начни обучение. Или загляни в свой кабинет, чтобы увидеть прогресс.
          </p>
          <motion.button
            style={styles.dashboardBtn}
            onClick={() => navigate('/dashboard')}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(248, 133, 69, 0.35)' }}
            whileTap={{ scale: 0.97 }}
          >
            <UserOutlined style={{ marginRight: 8 }} />
            Мой кабинет
          </motion.button>
        </div>
        <motion.div
          style={styles.heroStats}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={styles.heroStat}>
            <TrophyOutlined style={{ fontSize: 32, color: '#F88545' }} />
            <div>
              <div style={styles.heroStatValue}>{completedCount}/{modules.length}</div>
              <div style={styles.heroStatLabel}>Модулей пройдено</div>
            </div>
          </div>
          <div style={styles.heroStat}>
            <FireOutlined style={{ fontSize: 32, color: '#F88545' }} />
            <div>
              <div style={styles.heroStatValue}>{overallProgress}%</div>
              <div style={styles.heroStatLabel}>Общий прогресс</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ФИЛЬТРЫ */}
      <motion.div
        style={styles.filters}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div style={styles.searchWrapper}>
          <SearchOutlined style={styles.searchIcon} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск модулей..."
            style={styles.searchInput}
          />
        </div>
        <div style={styles.filterButtons}>
          {[
            { value: null, label: 'Все' },
            { value: 'basic', label: 'Базовый' },
            { value: 'advanced', label: 'Продвинутый' },
          ].map((filter) => (
            <motion.button
              key={filter.label}
              style={{
                ...styles.filterBtn,
                background: filters.difficulty === filter.value ? '#405BBC' : '#FFFFFF',
                color: filters.difficulty === filter.value ? '#FFFFFF' : '#140F41',
                borderColor: filters.difficulty === filter.value ? '#405BBC' : '#E8E3D5',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                filter.value === null
                  ? dispatch(resetFilters())
                  : dispatch(setFilter({ difficulty: filter.value }))
              }
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* КАРТОЧКИ */}
      <motion.div
        style={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {filteredModules.map((module) => {
          const progress = getModuleProgress(module.id);
          const isCompleted = progress === 100;
          const isStarted = progress > 0 && progress < 100;
          return (
            <motion.div
              key={module.id}
              style={styles.card}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{
                y: -8,
                boxShadow: '0 16px 40px rgba(64, 91, 188, 0.20)',
                borderColor: '#405BBC',
              }}
              onClick={() => navigate(`/module/${module.id}`)}
            >
              <div style={styles.cardHeader}>
                <div
                  style={{
                    ...styles.cardIcon,
                    background: isCompleted ? '#2E9E6B' : isStarted ? '#405BBC' : '#405BBC',
                  }}
                >
                  {icons[module.icon] || <BookOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />}
                </div>
                <span style={{
                  ...styles.difficultyBadge,
                  background: module.difficulty === 'basic' ? '#E8F7F0' : '#FFF4EC',
                  color: module.difficulty === 'basic' ? '#2E9E6B' : '#F88545',
                }}>
                  {difficultyLabels[module.difficulty]}
                </span>
              </div>

              <h3 style={styles.cardTitle}>{module.title}</h3>
              <p style={styles.cardDescription}>{module.description}</p>

              <div style={styles.cardProgress}>
                <div style={styles.cardProgressHeader}>
                  <span style={styles.cardCategory}>{module.category}</span>
                  <span style={{
                    ...styles.cardProgressText,
                    color: isCompleted ? '#2E9E6B' : '#405BBC',
                  }}>
                    {isCompleted ? 'Завершено' : isStarted ? `${progress}%` : 'Не начато'}
                  </span>
                </div>
                <div style={styles.cardProgressBar}>
                  <motion.div
                    style={{
                      ...styles.cardProgressFill,
                      background: isCompleted ? '#2E9E6B' : '#405BBC',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <div style={styles.cardAction}>
                <span style={styles.cardActionText}>
                  {isCompleted ? 'Пройти заново' : isStarted ? 'Продолжить' : 'Начать'}
                </span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRightOutlined style={{ color: '#405BBC', fontSize: 16 }} />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  hero: {
    background: '#FFFFFF',
    borderRadius: '20px',
    padding: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)',
  },
  heroLeft: {
    flex: 1,
    minWidth: '280px',
  },
  title: {
    fontSize: '36px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '15px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#5A5478',
    lineHeight: 1.5,
    marginBottom: '20px',
    maxWidth: '480px',
  },
  dashboardBtn: {
    background: '#F88545',
    color: '#FFFFFF',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    padding: '14px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 150ms ease',
  },
  heroStats: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
  },
  heroStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  heroStatValue: {
    fontSize: '24px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
  },
  heroStatLabel: {
    fontSize: '12px',
    color: '#8F8AA6',
    fontFamily: "'Comfortaa', sans-serif",
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  searchWrapper: {
    position: 'relative',
    flex: 1,
    minWidth: '240px',
    maxWidth: '400px',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#8F8AA6',
    fontSize: '16px',
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 42px',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '14px',
    color: '#140F41',
    background: '#FFFFFF',
    border: '1px solid #E8E3D5',
    borderRadius: '8px',
    outline: 'none',
    transition: 'all 150ms ease',
  },
  filterButtons: {
    display: 'flex',
    gap: '8px',
  },
  filterBtn: {
    padding: '10px 20px',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '14px',
    fontWeight: 600,
    borderRadius: '8px',
    border: '1px solid #E8E3D5',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
    gap: '20px',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)',
    cursor: 'pointer',
    transition: 'all 200ms ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    border: '1px solid transparent',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultyBadge: {
    fontSize: '12px',
    fontWeight: 600,
    padding: '4px 12px',
    borderRadius: '20px',
  },
  cardTitle: {
    fontSize: '20px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
    margin: 0,
  },
  cardDescription: {
    fontSize: '14px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#5A5478',
    lineHeight: 1.5,
    margin: 0,
    flex: 1,
  },
  cardProgress: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  cardProgressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategory: {
    fontSize: '12px',
    color: '#8F8AA6',
    fontFamily: "'Comfortaa', sans-serif",
  },
  cardProgressText: {
    fontSize: '13px',
    fontWeight: 600,
  },
  cardProgressBar: {
    width: '100%',
    height: '6px',
    background: '#F1EDE2',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  cardProgressFill: {
    height: '100%',
    borderRadius: '3px',
  },
  cardAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '4px',
  },
  cardActionText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#405BBC',
    fontFamily: "'Comfortaa', sans-serif",
  },
};