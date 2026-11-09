import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProgress } from '@/features/progress/progressSlice';
import { fetchModules } from '@/features/catalog/catalogSlice';
import {
  ThunderboltOutlined,
  StarFilled,
  CheckCircleFilled,
  FireOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProgressPage() {
  const dispatch = useDispatch();
  const { items: progressItems, status } = useSelector((state) => state.progress);
  const { modules } = useSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(fetchProgress());
    dispatch(fetchModules());
  }, [dispatch]);

  const completedCount = progressItems.filter((p) => p.status === 'completed').length;
  const inProgressCount = progressItems.filter((p) => p.status === 'in_progress').length;
  const totalXP = progressItems.reduce((sum, p) => sum + (p.score || 0), 0);
  const overallPercent = modules.length > 0
    ? Math.round((completedCount / modules.length) * 100)
    : 0;

  return (
    <motion.div
      style={styles.page}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ЗАГОЛОВОК */}
      <motion.div variants={itemVariants} style={styles.header}>
        <h1 style={styles.title}>Мой прогресс</h1>
        <p style={styles.subtitle}>Смотри, как ты растёшь. Каждый модуль — шаг вперёд.</p>
      </motion.div>

      {/* ОБЩАЯ СТАТИСТИКА */}
      <motion.div variants={itemVariants} style={styles.statsGrid}>
        {[
          { icon: <CheckCircleFilled style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#2E9E6B', value: completedCount, label: 'Пройдено модулей' },
          { icon: <FireOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#F88545', value: inProgressCount, label: 'В процессе' },
          { icon: <ThunderboltOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#405BBC', value: totalXP, label: 'Всего XP' },
          { icon: <StarFilled style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#130361', value: `${overallPercent}%`, label: 'Общий прогресс' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            style={styles.statCard}
            whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(64, 91, 188, 0.20)' }}
          >
            <div style={{ ...styles.statIcon, background: stat.bg }}>{stat.icon}</div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ОБЩИЙ ПРОГРЕСС-БАР */}
      <motion.div variants={itemVariants} style={styles.progressCard}>
        <div style={styles.progressHeader}>
          <span style={styles.progressTitle}>Общий прогресс</span>
          <span style={styles.progressValue}>{overallPercent}%</span>
        </div>
        <div style={styles.progressBar}>
          <motion.div
            style={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${overallPercent}%` }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </div>
      </motion.div>

      {/* ДЕТАЛИЗАЦИЯ ПО МОДУЛЯМ */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <h2 style={styles.sectionTitle}>Детализация по модулям</h2>
        <div style={styles.modulesGrid}>
          {modules.map((module, index) => {
            const progress = progressItems.find((p) => p.module_id === module.id);
            const percent = progress?.score || 0;
            const isCompleted = progress?.status === 'completed';
            const isStarted = progress && !isCompleted;
            return (
              <motion.div
                key={module.id}
                style={styles.moduleCard}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(64, 91, 188, 0.20)' }}
              >
                <div style={styles.moduleHeader}>
                  <span style={styles.moduleIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span style={{
                    ...styles.moduleStatus,
                    background: isCompleted ? '#E8F7F0' : isStarted ? '#FFF4EC' : '#F1EDE2',
                    color: isCompleted ? '#2E9E6B' : isStarted ? '#F88545' : '#8F8AA6',
                  }}>
                    {isCompleted ? 'Пройден' : isStarted ? 'В процессе' : 'Не начат'}
                  </span>
                </div>
                <h3 style={styles.moduleTitle}>{module.title}</h3>
                <div style={styles.moduleProgressBar}>
                  <motion.div
                    style={{
                      ...styles.moduleProgressFill,
                      background: isCompleted ? '#2E9E6B' : '#405BBC',
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.05 }}
                  />
                </div>
                <div style={styles.moduleFooter}>
                  <span style={styles.modulePercent}>{percent}%</span>
                  <ArrowRightOutlined style={{ color: '#405BBC' }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    marginBottom: '8px',
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
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
  },
  statCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
  },
  statValue: {
    fontSize: '24px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#140F41',
  },
  statLabel: {
    fontSize: '12px',
    color: '#8F8AA6',
    marginTop: '4px',
  },
  progressCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  progressTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#140F41',
    fontFamily: "'Comfortaa', sans-serif",
  },
  progressValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#405BBC',
  },
  progressBar: {
    width: '100%',
    height: '10px',
    background: '#F1EDE2',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#405BBC',
    borderRadius: '5px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
    marginBottom: '16px',
  },
  modulesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  moduleCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  moduleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  moduleIndex: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#8F8AA6',
    fontFamily: "'Comfortaa', sans-serif",
  },
  moduleStatus: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '4px 10px',
    borderRadius: '20px',
  },
  moduleTitle: {
    fontSize: '18px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
    marginBottom: '12px',
  },
  moduleProgressBar: {
    width: '100%',
    height: '6px',
    background: '#F1EDE2',
    borderRadius: '3px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  moduleProgressFill: {
    height: '100%',
    borderRadius: '3px',
  },
  moduleFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modulePercent: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#405BBC',
  },
};