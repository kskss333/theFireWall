import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  TrophyOutlined,
  RobotOutlined,
  MessageOutlined,
  CheckCircleFilled,
  ThunderboltOutlined,
  ArrowRightOutlined,
  HeartOutlined,
  BookOutlined,
} from '@ant-design/icons';

const childData = {
  name: 'Максим Иванов',
  className: '8Б',
  teacher: 'Анна Петрова',
  overallProgress: 78,
  completedModules: 6,
  totalModules: 8,
  xp: 2450,
  strengths: [
    { topic: 'Фишинг', score: 92 },
    { topic: 'Безопасные пароли', score: 88 },
    { topic: 'Приватность', score: 85 },
  ],
  growthAreas: [
    { topic: 'Социальная инженерия', score: 65 },
    { topic: 'Защита аккаунтов', score: 70 },
  ],
  recentActivity: [
    { id: 1, action: 'завершил тренажер', target: '«Фишинг»', time: 'Сегодня, 14:32', type: 'completed' },
    { id: 2, action: 'получил бейдж', target: '«Бдительный пользователь»', time: 'Сегодня, 12:10', type: 'badge' },
    { id: 3, action: 'начал модуль', target: '«Парольная безопасность»', time: 'Вчера, 18:45', type: 'started' },
  ],
  aiReport: {
    goodAt: 'Ребенок уверенно распознает фишинговые сообщения и понимает основные принципы защиты аккаунтов.',
    attention: 'В заданиях на социальную инженерию ребенок чаще доверяет сообщениям с высоким эмоциональным давлением.',
    talkAbout: 'Обсудите, почему срочные сообщения и просьбы о конфиденциальной информации могут быть признаком манипуляции.',
    recommendation: 'Пройти повторный тренажер по социальной инженерии',
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ParentDashboard() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
            <HeartOutlined style={{ fontSize: 32, color: '#FFFFFF' }} />
          </motion.div>
          <div>
            <h1 style={styles.heroTitle}>Здравствуйте, {user?.username || 'родитель'}!</h1>
            <p style={styles.heroSubtitle}>
              Вы следите за прогрессом: <strong>{childData.name}</strong> · {childData.className}
            </p>
          </div>
        </div>
        <div style={styles.heroRight}>
          <div style={styles.heroStatValue}>{childData.overallProgress}%</div>
          <div style={styles.heroStatLabel}>Прогресс ребёнка</div>
          <div style={styles.heroProgressBar}>
            <motion.div
              style={styles.heroProgressFill}
              initial={{ width: 0 }}
              animate={{ width: `${childData.overallProgress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
            />
          </div>
        </div>
      </motion.section>

      {/* СТАТИСТИКА */}
      <motion.section variants={itemVariants} style={styles.statsGrid}>
        {[
          { icon: <CheckCircleFilled style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#2E9E6B', value: childData.completedModules, label: 'Модулей пройдено' },
          { icon: <BookOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#405BBC', value: `${childData.completedModules}/${childData.totalModules}`, label: 'Всего модулей' },
          { icon: <ThunderboltOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#F88545', value: childData.xp, label: 'Заработано XP' },
          { icon: <TrophyOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#130361', value: childData.teacher, label: 'Учитель' },
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
      </motion.section>

      {/* СИЛЬНЫЕ СТОРОНЫ И ЗОНЫ РОСТА */}
      <motion.section variants={itemVariants} style={styles.splitGrid}>
        <motion.div
          style={styles.card}
          whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(46, 158, 107, 0.15)' }}
        >
          <h3 style={styles.cardTitleGreen}>💪 Сильные стороны</h3>
          {childData.strengths.map((item, i) => (
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
          <h3 style={styles.cardTitleOrange}>🌱 Зоны внимания</h3>
          {childData.growthAreas.map((item, i) => (
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

      {/* AI-ОТЧЁТ */}
      <motion.section variants={itemVariants} style={styles.aiReportCard}>
        <div style={styles.aiReportHeader}>
          <RobotOutlined style={{ fontSize: 32, color: '#405BBC' }} />
          <h2 style={styles.aiReportTitle}>AI-отчёт для вас</h2>
        </div>

        <div style={styles.reportSection}>
          <div style={styles.reportSectionTitle}>✅ Что уже хорошо получается</div>
          <p style={styles.reportText}>{childData.aiReport.goodAt}</p>
        </div>

        <div style={styles.reportSection}>
          <div style={styles.reportSectionTitle}>⚠️ На что стоит обратить внимание</div>
          <p style={styles.reportText}>{childData.aiReport.attention}</p>
        </div>

        <div style={styles.reportSection}>
          <div style={styles.reportSectionTitle}>💬 О чем можно поговорить дома</div>
          <p style={styles.reportText}>{childData.aiReport.talkAbout}</p>
        </div>

        <div style={styles.recommendation}>
          <ThunderboltOutlined style={{ color: '#F88545', marginRight: 8 }} />
          {childData.aiReport.recommendation}
        </div>
      </motion.section>

      {/* АКТИВНОСТЬ РЕБЁНКА */}
      <motion.section variants={itemVariants} style={styles.card}>
        <h3 style={styles.cardTitleBlue}>📊 Активность ребёнка</h3>
        {childData.recentActivity.map((activity, i) => (
          <motion.div
            key={activity.id}
            style={styles.activityRow}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
            whileHover={{ x: 6, backgroundColor: '#F9F7FF' }}
          >
            <span
              style={{
                ...styles.activityDot,
                background: activity.type === 'completed' ? '#2E9E6B' : activity.type === 'started' ? '#F88545' : '#405BBC',
              }}
            />
            <span style={styles.activityName}>{childData.name}</span>
            <span style={styles.activityAction}>{activity.action}</span>
            <span style={styles.activityTarget}>{activity.target}</span>
            <span style={styles.activityTime}>{activity.time}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* СВЯЗЬ С УЧИТЕЛЕМ */}
      <motion.section variants={itemVariants} style={styles.contactCard}>
        <div style={styles.contactLeft}>
          <MessageOutlined style={{ fontSize: 32, color: '#FFFFFF' }} />
          <div>
            <div style={styles.contactTitle}>Связь с учителем</div>
            <div style={styles.contactSubtitle}>{childData.teacher} · готова ответить на ваши вопросы</div>
          </div>
        </div>
        <motion.button
          style={styles.contactBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/messages')}
        >
          Написать учителю
          <ArrowRightOutlined style={{ marginLeft: 8 }} />
        </motion.button>
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
    flexShrink: 0,
  },
  heroTitle: {
    fontSize: '26px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
    marginBottom: '4px',
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
    fontSize: '20px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#140F41',
  },
  statLabel: {
    fontSize: '12px',
    color: '#8F8AA6',
    marginTop: '4px',
    fontFamily: "'Comfortaa', sans-serif",
  },
  splitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
  aiReportCard: {
    background: 'linear-gradient(135deg, #F0F3FC 0%, #FFFFFF 100%)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 12px rgba(64, 91, 188, 0.08)',
    border: '1px solid #DCE3F8',
  },
  aiReportHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  aiReportTitle: {
    fontSize: '24px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
    margin: 0,
  },
  reportSection: {
    marginBottom: '20px',
  },
  reportSectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#130361',
    marginBottom: '8px',
    fontFamily: "'Comfortaa', sans-serif",
  },
  reportText: {
    fontSize: '14px',
    color: '#5A5478',
    lineHeight: 1.6,
    fontFamily: "'Comfortaa', sans-serif",
  },
  recommendation: {
    background: '#FFF4EC',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#140F41',
    display: 'flex',
    alignItems: 'center',
    fontFamily: "'Comfortaa', sans-serif",
  },
  activityRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 150ms ease',
    flexWrap: 'wrap',
  },
  activityDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  activityName: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#140F41',
    fontFamily: "'Comfortaa', sans-serif",
  },
  activityAction: {
    fontSize: '12px',
    color: '#8F8AA6',
    fontFamily: "'Comfortaa', sans-serif",
  },
  activityTarget: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#405BBC',
    fontFamily: "'Comfortaa', sans-serif",
  },
  activityTime: {
    fontSize: '11px',
    color: '#8F8AA6',
    marginLeft: 'auto',
  },
  contactCard: {
    background: '#405BBC',
    borderRadius: '16px',
    padding: '28px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
    boxShadow: '0 8px 24px rgba(64, 91, 188, 0.25)',
  },
  contactLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  contactTitle: {
    fontSize: '18px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#FFFFFF',
    fontWeight: 400,
    marginBottom: '4px',
  },
  contactSubtitle: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.75)',
    fontFamily: "'Comfortaa', sans-serif",
  },
  contactBtn: {
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
    whiteSpace: 'nowrap',
  },
};