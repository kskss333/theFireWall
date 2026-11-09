import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  UserOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  CheckCircleFilled,
  BookOutlined,
} from '@ant-design/icons';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const roleMap = {
  student: { label: 'Ученик', color: '#405BBC', bg: '#F0F3FC' },
  teacher: { label: 'Учитель', color: '#2E9E6B', bg: '#E8F7F0' },
  admin: { label: 'Администратор', color: '#F88545', bg: '#FFF4EC' },
};

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const { items: progressItems } = useSelector((state) => state.progress);

  const completedCount = progressItems.filter((p) => p.status === 'completed').length;
  const role = roleMap[user?.role] || roleMap.student;

  return (
    <motion.div
      style={styles.page}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        style={styles.card}
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(64, 91, 188, 0.12)' }}
      >
        {/* ШАПКА ПРОФИЛЯ */}
        <div style={styles.header}>
          <motion.div
            style={styles.avatar}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <UserOutlined style={{ fontSize: 48, color: '#FFFFFF' }} />
          </motion.div>
          <div style={styles.headerInfo}>
            <h2 style={styles.name}>{user?.username || 'Ученик'}</h2>
            <span style={{
              ...styles.roleBadge,
              background: role.bg,
              color: role.color,
            }}>
              {role.label}
            </span>
          </div>
        </div>

        <div style={styles.divider} />

        {/* СТАТИСТИКА */}
        <div style={styles.statsGrid}>
          <motion.div
            style={styles.statCard}
            whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(46, 158, 107, 0.15)' }}
          >
            <div style={styles.statIconGreen}>
              <CheckCircleFilled style={{ fontSize: 24, color: '#FFFFFF' }} />
            </div>
            <div style={styles.statValue}>{completedCount}</div>
            <div style={styles.statLabel}>Пройдено</div>
          </motion.div>
          <motion.div
            style={styles.statCard}
            whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(64, 91, 188, 0.15)' }}
          >
            <div style={styles.statIconBlue}>
              <BookOutlined style={{ fontSize: 24, color: '#FFFFFF' }} />
            </div>
            <div style={styles.statValue}>{progressItems.length}</div>
            <div style={styles.statLabel}>Начато</div>
          </motion.div>
          <motion.div
            style={styles.statCard}
            whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(248, 133, 69, 0.15)' }}
          >
            <div style={styles.statIconOrange}>
              <ThunderboltOutlined style={{ fontSize: 24, color: '#FFFFFF' }} />
            </div>
            <div style={styles.statValue}>
              {progressItems.reduce((sum, p) => sum + (p.score || 0), 0)}
            </div>
            <div style={styles.statLabel}>XP</div>
          </motion.div>
        </div>

        <div style={styles.divider} />

        {/* ДАННЫЕ */}
        <div style={styles.infoList}>
          <div style={styles.infoRow}>
            <MailOutlined style={styles.infoIcon} />
            <div>
              <div style={styles.infoLabel}>Email</div>
              <div style={styles.infoValue}>{user?.email || '—'}</div>
            </div>
          </div>
          <div style={styles.infoRow}>
            <SafetyCertificateOutlined style={styles.infoIcon} />
            <div>
              <div style={styles.infoLabel}>Роль</div>
              <div style={styles.infoValue}>{role.label}</div>
            </div>
          </div>
          <div style={styles.infoRow}>
            <ThunderboltOutlined style={styles.infoIcon} />
            <div>
              <div style={styles.infoLabel}>ID</div>
              <div style={styles.infoValue}>{user?.id || '—'}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '100vh',
    padding: '24px',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(20, 15, 65, 0.08)',
    width: '100%',
    maxWidth: '560px',
    transition: 'all 200ms ease',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '16px',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: '20px',
    background: '#405BBC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  name: {
    fontSize: '24px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    fontWeight: 400,
    margin: 0,
  },
  roleBadge: {
    fontSize: '12px',
    fontWeight: 600,
    padding: '4px 12px',
    borderRadius: '20px',
    display: 'inline-block',
    width: 'fit-content',
  },
  divider: {
    height: '1px',
    background: '#F1EDE2',
    margin: '24px 0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },
  statCard: {
    background: '#F9F7FF',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 200ms ease',
  },
  statIconGreen: {
    width: 40,
    height: 40,
    borderRadius: '10px',
    background: '#2E9E6B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
  },
  statIconBlue: {
    width: 40,
    height: 40,
    borderRadius: '10px',
    background: '#405BBC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
  },
  statIconOrange: {
    width: 40,
    height: 40,
    borderRadius: '10px',
    background: '#F88545',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
  },
  statValue: {
    fontSize: '20px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#140F41',
  },
  statLabel: {
    fontSize: '11px',
    color: '#8F8AA6',
    fontFamily: "'Comfortaa', sans-serif",
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  infoIcon: {
    fontSize: '18px',
    color: '#405BBC',
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: '11px',
    color: '#8F8AA6',
    fontFamily: "'Comfortaa', sans-serif",
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#140F41',
    fontFamily: "'Comfortaa', sans-serif",
  },
};