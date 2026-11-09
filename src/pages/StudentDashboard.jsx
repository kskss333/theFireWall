import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  ThunderboltOutlined,
  TrophyOutlined,
  StarFilled,
  UserOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
  FireOutlined,
  BookOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

const studentData = {
  name: 'Максим Иванов',
  className: '8Б',
  teacher: 'Елена Викторовна',
  overallProgress: 78,
  xp: 2450,
  daysActive: 24,
  completedModules: 6,
  totalModules: 8,
  rank: 4,
  totalStudents: 24,
  strengths: [
    { topic: 'Фишинг', score: 92 },
    { topic: 'Безопасные пароли', score: 88 },
    { topic: 'Приватность', score: 85 },
  ],
  growthAreas: [
    { topic: 'Социальная инженерия', score: 65 },
    { topic: 'Защита аккаунтов', score: 70 },
  ],
  classRank: [
    { topic: 'Фишинг', position: 2, total: 24 },
    { topic: 'Пароли', position: 5, total: 24 },
    { topic: 'Приватность', position: 3, total: 24 },
    { topic: 'Социальная инженерия', position: 14, total: 24 },
    { topic: 'Защита аккаунтов', position: 11, total: 24 },
  ],
  activeTasks: [
    { title: 'Тренажёр: Фишинг v2', dueDate: 'До пятницы', xp: 50, status: 'in_progress' },
    { title: 'Тест: Социальная инженерия', dueDate: 'До понедельника', xp: 100, status: 'not_started' },
    { title: 'Практика: Права доступа', dueDate: 'До среды', xp: 75, status: 'in_progress' },
  ],
  achievements: [
    { title: 'Первая победа', desc: 'Пройди первый тренажёр', icon: <TrophyOutlined />, earned: true },
    { title: 'Защитник', desc: 'Набери 1000 XP', icon: <ThunderboltOutlined />, earned: true },
    { title: 'Эксперт фишинга', desc: '10 правильных ответов подряд', icon: <CheckCircleFilled />, earned: true },
    { title: 'Непрерывная серия', desc: '7 дней обучения подряд', icon: <FireOutlined />, earned: false },
    { title: 'Мастер приватности', desc: 'Пройди все темы приватности', icon: <StarFilled />, earned: false },
  ],
  recommendations: [
    { title: 'Повтори социальную инженерию', reason: 'Сейчас это твоя зона роста', xp: 50 },
    { title: 'Пройди продвинутый фишинг', reason: 'Ты отлично справляешься с базовым', xp: 100 },
    { title: 'Изучи защиту аккаунтов', reason: 'Поможет улучшить позицию в классе', xp: 75 },
  ],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function StudentDashboard() {
  const { user } = useSelector((state) => state.auth);
  const displayName = user?.username || studentData.name;

  return (
    <motion.div
      style={styles.page}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ГЕРОЙ */}
      <motion.section variants={itemVariants} style={styles.hero}>
        <div style={styles.heroLeft}>
          <motion.div
            style={styles.heroAvatar}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <UserOutlined style={{ fontSize: 32, color: '#FFFFFF' }} />
          </motion.div>
          <div>
            <h1 style={styles.heroTitle}>Привет, {displayName}!</h1>
            <p style={styles.heroSubtitle}>
              {studentData.className} · Учитель: {studentData.teacher}
            </p>
          </div>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.heroStatValue}>{studentData.overallProgress}%</div>
          <div style={styles.heroStatLabel}>Общий прогресс</div>
          <div style={styles.heroProgressBar}>
            <motion.div
              style={styles.heroProgressFill}
              initial={{ width: 0 }}
              animate={{ width: `${studentData.overallProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.section>

      {/* СТАТИСТИКА */}
      <motion.section variants={itemVariants} style={styles.statsGrid}>
        {[
          { icon: <ThunderboltOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#F88545', value: `${studentData.xp} XP`, label: 'Заработано' },
          { icon: <BookOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#405BBC', value: `${studentData.completedModules}/${studentData.totalModules}`, label: 'Модулей пройдено' },
          { icon: <TrophyOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#130361', value: `${studentData.rank} из ${studentData.totalStudents}`, label: 'Место в классе' },
          { icon: <FireOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#405BBC', value: studentData.daysActive, label: 'Дней обучения' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            style={styles.statCard}
            whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(64, 91, 188, 0.20)' }}
          >
            <motion.div
              style={{ ...styles.statIcon, background: stat.bg }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              {stat.icon}
            </motion.div>
            <div style={styles.statValue}>{stat.value}</div>
            <div style={styles.statLabel}>{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* СИЛЬНЫЕ СТОРОНЫ И ЗОНЫ РОСТА */}
      <motion.section variants={itemVariants} style={styles.splitGrid}>
        <motion.div
          style={styles.card}
          whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(46, 158, 107, 0.15)' }}
        >
          <h3 style={styles.cardTitleGreen}>💪 Сильные стороны</h3>
          {studentData.strengths.map((item, i) => (
            <motion.div
              key={item.topic}
              style={styles.listRow}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              <span style={styles.listTopic}>{item.topic}</span>
              <span style={styles.listScoreGood}>{item.score}%</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          style={styles.card}
          whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(248, 133, 69, 0.15)' }}
        >
          <h3 style={styles.cardTitleOrange}>🌱 Зоны роста</h3>
          {studentData.growthAreas.map((item, i) => (
            <motion.div
              key={item.topic}
              style={styles.listRow}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            >
              <span style={styles.listTopic}>{item.topic}</span>
              <span style={styles.listScoreWarning}>{item.score}%</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* МЕСТО СРЕДИ ОДНОКЛАССНИКОВ */}
      <motion.section variants={itemVariants} style={styles.card}>
        <h3 style={styles.cardTitleBlue}>🏆 Место среди одноклассников</h3>
        {studentData.classRank.map((item, i) => {
          const isGood = item.position <= 5;
          return (
            <motion.div
              key={item.topic}
              style={styles.rankRow}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
              whileHover={{ x: 6, backgroundColor: '#F9F7FF' }}
            >
              <span style={styles.rankTopic}>{item.topic}</span>
              <span style={{
                ...styles.rankValue,
                color: isGood ? '#2E9E6B' : '#F88545',
              }}>
                {item.position} место из {item.total}
              </span>
              {isGood ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.08, type: 'spring' }}
                >
                  <RiseOutlined style={{ color: '#2E9E6B' }} />
                </motion.div>
              ) : (
                <FallOutlined style={{ color: '#F88545' }} />
              )}
            </motion.div>
          );
        })}
      </motion.section>

      {/* АКТИВНЫЕ ЗАДАНИЯ */}
      <motion.section variants={itemVariants} style={styles.card}>
        <h3 style={styles.cardTitleBlue}>📝 Активные задания</h3>
        {studentData.activeTasks.map((task, i) => (
          <motion.div
            key={task.title}
            style={styles.taskRow}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.08 }}
            whileHover={{ x: 6, backgroundColor: '#F9F7FF' }}
          >
            <div>
              <div style={styles.taskTitle}>{task.title}</div>
              <div style={styles.taskDate}>
                <ClockCircleOutlined style={{ marginRight: 6, color: '#405BBC' }} />
                {task.dueDate}
              </div>
            </div>
            <div style={styles.taskRight}>
              <span style={styles.taskXP}>+{task.xp} XP</span>
              {task.status === 'in_progress' ? (
                <span style={styles.badgeProgress}>В процессе</span>
              ) : (
                <span style={styles.badgeNew}>Новое</span>
              )}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* ДОСТИЖЕНИЯ */}
      <motion.section variants={itemVariants} style={styles.card}>
        <h3 style={styles.cardTitleBlue}>⭐ Достижения</h3>
        <motion.div
          style={styles.achievementsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {studentData.achievements.map((ach) => (
            <motion.div
              key={ach.title}
              style={{
                ...styles.achievementCard,
                opacity: ach.earned ? 1 : 0.45,
                borderColor: ach.earned ? '#405BBC' : '#E8E3D5',
              }}
              variants={itemVariants}
              whileHover={ach.earned ? { scale: 1.05, y: -4 } : {}}
            >
              <div style={{
                ...styles.achievementIcon,
                color: ach.earned ? '#F88545' : '#8F8AA6',
              }}>
                {ach.icon}
              </div>
              <div style={styles.achievementTitle}>{ach.title}</div>
              <div style={styles.achievementDesc}>{ach.desc}</div>
              {ach.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  <CheckCircleFilled style={{ color: '#2E9E6B', marginTop: 8 }} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* РЕКОМЕНДАЦИИ */}
      <motion.section variants={itemVariants} style={styles.card}>
        <h3 style={styles.cardTitleBlue}>💡 Рекомендации</h3>
        {studentData.recommendations.map((rec, i) => (
          <motion.div
            key={rec.title}
            style={styles.recommendationRow}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            whileHover={{ x: 6, backgroundColor: '#F9F7FF' }}
          >
            <div style={{ flex: 1 }}>
              <div style={styles.recommendationTitle}>{rec.title}</div>
              <div style={styles.recommendationReason}>{rec.reason}</div>
            </div>
            <span style={styles.taskXP}>+{rec.xp} XP</span>
            <motion.div whileHover={{ x: 4 }}>
              <ArrowRightOutlined style={{ color: '#405BBC' }} />
            </motion.div>
          </motion.div>
        ))}
      </motion.section>
    </motion.div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
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
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  heroAvatar: {
    width: 56,
    height: 56,
    borderRadius: '16px',
    background: '#405BBC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  heroTitle: {
    fontSize: '26px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
  },
  heroSubtitle: {
    fontSize: '14px',
    color: '#8F8AA6',
    fontFamily: "'Comfortaa', sans-serif",
  },
  heroRight: {
    textAlign: 'center',
    minWidth: '200px',
  },
  heroStatValue: {
    fontSize: '32px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#405BBC',
  },
  heroStatLabel: {
    fontSize: '13px',
    color: '#8F8AA6',
    marginBottom: '12px',
  },
  heroProgressBar: {
    width: '200px',
    height: '8px',
    background: '#F1EDE2',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  heroProgressFill: {
    height: '100%',
    background: '#405BBC',
    borderRadius: '4px',
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
  splitGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)',
    transition: 'all 200ms ease',
  },
  cardTitleGreen: {
    fontSize: '20px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#2E9E6B',
    marginBottom: '16px',
    fontWeight: 400,
  },
  cardTitleOrange: {
    fontSize: '20px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#F88545',
    marginBottom: '16px',
    fontWeight: 400,
  },
  cardTitleBlue: {
    fontSize: '20px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#405BBC',
    marginBottom: '16px',
    fontWeight: 400,
  },
  listRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #F1EDE2',
  },
  listTopic: {
    fontSize: '14px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#140F41',
  },
  listScoreGood: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#2E9E6B',
  },
  listScoreWarning: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#F88545',
  },
  rankRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderBottom: '1px solid #F1EDE2',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  rankTopic: {
    fontSize: '14px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#140F41',
    flex: 1,
  },
  rankValue: {
    fontSize: '13px',
    fontWeight: 600,
  },
  taskRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 12px',
    borderBottom: '1px solid #F1EDE2',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  taskTitle: {
    fontSize: '15px',
    fontFamily: "'Comfortaa', sans-serif",
    fontWeight: 600,
    color: '#140F41',
    marginBottom: '4px',
  },
  taskDate: {
    fontSize: '13px',
    color: '#8F8AA6',
    display: 'flex',
    alignItems: 'center',
  },
  taskRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  taskXP: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#405BBC',
  },
  badgeProgress: {
    background: '#E8F7F0',
    color: '#2E9E6B',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 600,
  },
  badgeNew: {
    background: '#FFF4EC',
    color: '#F88545',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 600,
  },
  achievementsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '12px',
  },
  achievementCard: {
    background: '#F9F7FF',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid #E8E3D5',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  achievementIcon: {
    fontSize: '24px',
    marginBottom: '8px',
  },
  achievementTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#140F41',
    marginBottom: '4px',
  },
  achievementDesc: {
    fontSize: '11px',
    color: '#8F8AA6',
    lineHeight: 1.4,
  },
  recommendationRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    padding: '12px',
    borderBottom: '1px solid #F1EDE2',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  recommendationTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#140F41',
    marginBottom: '4px',
    fontFamily: "'Comfortaa', sans-serif",
  },
  recommendationReason: {
    fontSize: '12px',
    color: '#8F8AA6',
  },
};