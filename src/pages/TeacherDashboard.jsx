import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  ThunderboltOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
  RiseOutlined,
  WarningOutlined,
  TrophyOutlined,
  RobotOutlined,
  CheckCircleFilled,
  SendOutlined,
  MoreOutlined,
  UserAddOutlined,
  DownOutlined,
} from '@ant-design/icons';

const ageGroups = [
  { value: '9-10', label: '9–10 лет', desc: 'Основы цифровой гигиены' },
  { value: '11-12', label: '11–12 лет', desc: 'Базовые угрозы и защита' },
  { value: '13-14', label: '13–14 лет', desc: 'Фишинг, пароли, приватность' },
  { value: '15-17', label: '15–17 лет', desc: 'Web security, уязвимости, продвинутые сценарии' },
];

const initialStudents = [
  { id: 1, name: 'Иванов Максим', progress: 92, trainers: 8, totalTrainers: 10, xp: 1250, lastActive: 'Сегодня, 14:32', avatar: 'ИМ' },
  { id: 2, name: 'Сидорова Алиса', progress: 75, trainers: 7, totalTrainers: 10, xp: 980, lastActive: 'Сегодня, 13:45', avatar: 'СА' },
  { id: 3, name: 'Ким Елена', progress: 85, trainers: 8, totalTrainers: 10, xp: 1100, lastActive: 'Сегодня, 11:02', avatar: 'КЕ' },
  { id: 4, name: 'Петров Артём', progress: 40, trainers: 4, totalTrainers: 10, xp: 520, lastActive: 'Вчера, 19:20', avatar: 'ПА' },
  { id: 5, name: 'Титов Егор', progress: 30, trainers: 3, totalTrainers: 10, xp: 410, lastActive: '15 мая, 21:15', avatar: 'ТЕ' },
  { id: 6, name: 'Павлова Дарья', progress: 38, trainers: 4, totalTrainers: 10, xp: 470, lastActive: 'Вчера, 16:40', avatar: 'ПД' },
];

const assignments = [
  { id: 1, title: 'Фишинг: продвинутый уровень', type: 'Тренажёр', assignedTo: 'Вся группа', dueDate: '20 мая', status: 'Активно', completed: 18, total: 24 },
  { id: 2, title: 'Парольная безопасность', type: 'Тренажёр', assignedTo: 'Вся группа', dueDate: '22 мая', status: 'Активно', completed: 15, total: 24 },
  { id: 3, title: 'Социальная инженерия', type: 'Тест', assignedTo: 'Вся группа', dueDate: '25 мая', status: 'Черновик', completed: 0, total: 24 },
  { id: 4, title: 'Права доступа: база', type: 'Тренажёр', assignedTo: 'Отстающие', dueDate: '18 мая', status: 'Завершено', completed: 24, total: 24 },
];

const recentActivities = [
  { id: 1, name: 'Иванов Максим', action: 'завершил тренажер', target: '«Фишинг»', time: 'Сегодня, 14:32', type: 'completed' },
  { id: 2, name: 'Ким Елена', action: 'начала тренажер', target: '«Парольная безопасность»', time: 'Сегодня, 13:45', type: 'started' },
  { id: 3, name: 'Сидорова Алиса', action: 'получила новый бейдж', target: '«Бдительный пользователь»', time: 'Сегодня, 12:10', type: 'badge' },
  { id: 4, name: 'Петров Артём', action: 'завершил тренажер', target: '«Соц. инженерия»', time: 'Вчера, 19:20', type: 'started' },
];

const parentMessages = [
  { id: 1, name: 'Елена Сидорова', preview: 'Здравствуйте! Подскажите, пожалуйста, как ...', time: '12:45', unread: true },
  { id: 2, name: 'Алексей Ким', preview: 'Спасибо за обратную связь по результатам ...', time: '10:32', unread: true },
  { id: 3, name: 'Ольга Павлова', preview: 'А можно ли добавить дополнительные ...', time: 'Вчера', unread: true },
];

export default function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);
  const [selectedTab, setSelectedTab] = useState('Обзор');
  const [students, setStudents] = useState(initialStudents);
  const [showAI, setShowAI] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    age: '13-14',
    difficulty: 'basic',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStudents((prev) =>
        prev.map((s) => ({
          ...s,
          xp: s.xp + Math.floor(Math.random() * 20),
          progress: Math.min(100, s.progress + Math.floor(Math.random() * 2)),
        }))
      );
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const averageProgress = Math.round(
    students.reduce((sum, s) => sum + s.progress, 0) / students.length
  );

  const fallingStudents = students.filter((s) => s.progress < 50).length;

  const generateAI = () => {
    setAiGenerated(true);
    setTimeout(() => {
      setAiGenerated(false);
      setShowAI(false);
      setShowCreateTask(false);
    }, 2000);
  };

  return (
    <div style={styles.page}>
      {/* ВЕРХНЯЯ ПАНЕЛЬ */}
      <motion.div style={styles.topBar} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={styles.topLeft}>
          <div style={styles.groupSelector}>
            <span style={styles.groupName}>Группа 8Б</span>
            <DownOutlined style={{ fontSize: 12, color: '#8F8AA6' }} />
          </div>
          <span style={styles.groupBadge}>24 ученика</span>
        </div>
        <div style={styles.topRight}>
          <span style={styles.period}><CalendarOutlined style={{ marginRight: 6 }} />16 мая 2025</span>
          <motion.button style={styles.createBtn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreateGroup(true)}>
            <PlusOutlined style={{ marginRight: 6 }} />Создать группу
          </motion.button>
          <motion.button style={styles.createBtn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreateTask(true)}>
            <PlusOutlined style={{ marginRight: 6 }} />Создать задание
          </motion.button>
          <BellOutlined style={styles.topIcon} />
          <QuestionCircleOutlined style={styles.topIcon} />
        </div>
      </motion.div>

      {/* ВНУТРЕННЯЯ НАВИГАЦИЯ */}
      <motion.div style={styles.tabs} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
        {['Обзор', 'Учащиеся', 'Задания', 'Результаты', 'Настройки группы'].map((tab) => (
          <button
            key={tab}
            style={{
              ...styles.tabBtn,
              color: selectedTab === tab ? '#405BBC' : '#8F8AA6',
              borderBottom: selectedTab === tab ? '2px solid #405BBC' : '2px solid transparent',
            }}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* КОНТЕНТ ПО ВКЛАДКАМ */}
      <AnimatePresence mode="wait">
        {selectedTab === 'Обзор' && <OverviewTab key="overview" students={students} averageProgress={averageProgress} fallingStudents={fallingStudents} setSelectedTab={setSelectedTab} />}
        {selectedTab === 'Учащиеся' && <StudentsTab key="students" students={students} />}
        {selectedTab === 'Задания' && <AssignmentsTab key="assignments" assignments={assignments} />}
        {selectedTab === 'Результаты' && <ResultsTab key="results" students={students} />}
        {selectedTab === 'Настройки группы' && <SettingsTab key="settings" />}
      </AnimatePresence>

      {/* МОДАЛКА AI */}
      <AnimatePresence>
        {showAI && (
          <motion.div style={styles.modalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div style={styles.modal} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <div style={styles.modalHeader}>
                <RobotOutlined style={{ fontSize: 32, color: '#F88545' }} />
                <h2 style={styles.modalTitle}>Создать задание с AI</h2>
              </div>
              {!aiGenerated ? (
                <>
                  <div style={styles.aiFields}>
                    {[
                      { label: 'Тема', value: 'Фишинг' },
                      { label: 'Возраст', value: '13–14 лет' },
                      { label: 'Сложность', value: 'Средняя' },
                      { label: 'Формат', value: 'Интерактивный тренажер' },
                    ].map((field) => (
                      <div key={field.label} style={styles.aiField}>
                        <span style={styles.aiFieldLabel}>{field.label}</span>
                        <span style={styles.aiFieldValue}>{field.value}</span>
                      </div>
                    ))}
                  </div>
                  <motion.button style={styles.generateBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={generateAI}>
                    <RobotOutlined style={{ marginRight: 8 }} />Сгенерировать задание
                  </motion.button>
                </>
              ) : (
                <motion.div style={styles.generatedBlock} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <CheckCircleFilled style={{ fontSize: 48, color: '#2E9E6B' }} />
                  <h3 style={styles.generatedTitle}>Задание готово!</h3>
                  <p style={styles.generatedText}>Тренажер по теме «Фишинг» для возраста 13–14 лет. Сложность: Средняя.</p>
                </motion.div>
              )}
              <button style={styles.closeBtn} onClick={() => setShowAI(false)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* МОДАЛКА СОЗДАТЬ ЗАДАНИЕ */}
      <AnimatePresence>
        {showCreateTask && (
          <motion.div style={styles.modalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div style={styles.modal} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <div style={styles.modalHeader}>
                <PlusOutlined style={{ fontSize: 28, color: '#405BBC' }} />
                <h2 style={styles.modalTitle}>Новое задание</h2>
              </div>
              <div style={styles.createFields}>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Название</label>
                  <input style={styles.formInput} placeholder="Например: Фишинг: база" />
                </div>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Тип</label>
                  <select style={styles.formSelect}><option>Тренажёр</option><option>Тест</option><option>Практика</option></select>
                </div>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Срок</label>
                  <input style={styles.formInput} placeholder="До: 25 мая" />
                </div>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Для кого</label>
                  <select style={styles.formSelect}><option>Вся группа</option><option>Отстающие</option><option>Выбрать учеников</option></select>
                </div>
              </div>
              <div style={styles.modalActions}>
                <motion.button style={styles.aiBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { setShowCreateTask(false); setShowAI(true); }}>
                  <RobotOutlined style={{ marginRight: 8 }} />Создать с AI
                </motion.button>
                <motion.button style={styles.primaryBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowCreateTask(false)}>
                  Создать
                </motion.button>
              </div>
              <button style={styles.closeBtn} onClick={() => setShowCreateTask(false)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* МОДАЛКА СОЗДАТЬ ГРУППУ */}
      <AnimatePresence>
        {showCreateGroup && (
          <motion.div style={styles.modalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div style={styles.modal} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
              <div style={styles.modalHeader}>
                <PlusOutlined style={{ fontSize: 28, color: '#405BBC' }} />
                <h2 style={styles.modalTitle}>Создать группу</h2>
              </div>
              <div style={styles.createFields}>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Название группы</label>
                  <input style={styles.formInput} value={newGroup.name} onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} placeholder="Например: 9А" />
                </div>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Возрастная группа</label>
                  <select style={styles.formSelect} value={newGroup.age} onChange={(e) => setNewGroup({ ...newGroup, age: e.target.value })}>
                    {ageGroups.map((group) => <option key={group.value} value={group.value}>{group.label}</option>)}
                  </select>
                </div>
                <div style={styles.formField}>
                  <label style={styles.formLabel}>Уровень сложности</label>
                  <select style={styles.formSelect} value={newGroup.difficulty} onChange={(e) => setNewGroup({ ...newGroup, difficulty: e.target.value })}>
                    <option value="basic">Базовый</option>
                    <option value="middle">Средний</option>
                    <option value="advanced">Продвинутый</option>
                  </select>
                </div>
                {newGroup.age && (
                  <div style={styles.ageInfo}>
                    <ThunderboltOutlined style={{ color: '#F88545', marginRight: 8 }} />
                    {ageGroups.find((g) => g.value === newGroup.age)?.desc}
                  </div>
                )}
              </div>
              <motion.button style={styles.generateBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { setShowCreateGroup(false); setNewGroup({ name: '', age: '13-14', difficulty: 'basic' }); }}>
                Создать группу
              </motion.button>
              <button style={styles.closeBtn} onClick={() => setShowCreateGroup(false)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OverviewTab({ students, averageProgress, fallingStudents, setSelectedTab }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={styles.kpiGrid}>
        {[
          { icon: <TeamOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#405BBC', value: students.length, label: 'Всего учеников', link: 'Список учеников →', onClick: () => setSelectedTab('Учащиеся') },
          { icon: <RiseOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#2E9E6B', value: `${averageProgress}%`, label: 'Средний прогресс', link: '+5% за неделю ↑', onClick: () => setSelectedTab('Результаты') },
          { icon: <WarningOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#F88545', value: fallingStudents, label: 'Отстающих учеников', link: 'Нужна помощь', onClick: () => setSelectedTab('Учащиеся') },
          { icon: <TrophyOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#405BBC', value: 12, label: 'Заданий выполнено', link: 'На этой неделе', onClick: () => setSelectedTab('Задания') },
        ].map((card) => (
          <motion.div key={card.label} style={styles.kpiCard} whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(64, 91, 188, 0.20)' }} onClick={card.onClick}>
            <div style={{ ...styles.kpiIcon, background: card.bg }}>{card.icon}</div>
            <div style={styles.kpiValue}>{card.value}</div>
            <div style={styles.kpiLabel}>{card.label}</div>
            <span style={styles.kpiLink}>{card.link}</span>
          </motion.div>
        ))}
      </div>

      <div style={styles.mainGrid}>
        <div style={styles.tableCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Успеваемость учеников</h2>
            <div style={styles.cardActions}>
              <SearchOutlined style={styles.cardHeaderIcon} />
              <span style={styles.filterDropdown}>Все тренажёры ▾</span>
            </div>
          </div>
          <div style={styles.studentsList}>
            {students.map((student, index) => (
              <motion.div key={student.id} style={styles.studentRow} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }} whileHover={{ x: 6, backgroundColor: '#F9F7FF' }}>
                <div style={styles.studentInfo}>
                  <div style={{ ...styles.studentAvatar, background: student.progress < 50 ? '#FFF4EC' : '#F0F3FC', color: student.progress < 50 ? '#F88545' : '#405BBC' }}>{student.avatar}</div>
                  <div>
                    <div style={styles.studentName}>{student.name}</div>
                    <div style={styles.studentMeta}>{student.trainers} из {student.totalTrainers} тренажёров</div>
                  </div>
                </div>
                <div style={styles.progressSection}>
                  <div style={styles.progressValue}>{student.progress}%</div>
                  <div style={styles.progressBar}>
                    <motion.div style={{ ...styles.progressFill, background: student.progress < 50 ? '#F88545' : '#405BBC' }} initial={{ width: 0 }} animate={{ width: `${student.progress}%` }} transition={{ duration: 1, delay: index * 0.08 }} />
                  </div>
                </div>
                <div style={styles.xpValue}>{student.xp} XP</div>
                <div style={styles.lastActive}>{student.lastActive}</div>
                <MoreOutlined style={styles.moreIcon} />
              </motion.div>
            ))}
          </div>
          <button style={styles.showAllBtn} onClick={() => setSelectedTab('Учащиеся')}>Показать всех учеников ↓</button>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.sideCard}>
            <div style={styles.sideCardHeader}>
              <h3 style={styles.sideCardTitle}>Отстающие ученики</h3>
              <span style={styles.sideCardLink} onClick={() => setSelectedTab('Учащиеся')}>Смотреть всех →</span>
            </div>
            {students.filter((s) => s.progress < 50).slice(0, 5).map((student) => (
              <div key={student.id} style={styles.fallingRow}>
                <div style={{ ...styles.studentAvatar, background: '#FFF4EC', color: '#F88545' }}>{student.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={styles.studentName}>{student.name}</div>
                  <div style={styles.studentMeta}>{student.trainers} из {student.totalTrainers} тренажёров</div>
                </div>
                <div style={{ ...styles.progressValue, color: '#F88545' }}>{student.progress}%</div>
              </div>
            ))}
          </div>

          <div style={styles.sideCard}>
            <div style={styles.sideCardHeader}>
              <h3 style={styles.sideCardTitle}>Сообщения от родителей</h3>
              <span style={styles.sideCardLink}>Все сообщения →</span>
            </div>
            {parentMessages.map((msg) => (
              <div key={msg.id} style={styles.messageRow}>
                <div style={{ ...styles.studentAvatar, background: '#F0F3FC', color: '#405BBC' }}>{msg.name.split(' ')[0][0] + msg.name.split(' ')[1][0]}</div>
                <div style={{ flex: 1 }}>
                  <div style={styles.messageName}>{msg.name}</div>
                  <div style={styles.messagePreview}>{msg.preview}</div>
                </div>
                <div style={styles.messageRight}>
                  <span style={styles.messageTime}>{msg.time}</span>
                  {msg.unread && <span style={styles.messageDot} />}
                </div>
              </div>
            ))}
            <motion.button style={styles.writeBtn} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <SendOutlined style={{ marginRight: 8 }} />Написать родителям
            </motion.button>
          </div>
        </div>
      </div>

      <div style={styles.activityCard}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>Недавняя активность группы</h2>
          <span style={styles.sideCardLink}>Вся лента →</span>
        </div>
        <div style={styles.activityList}>
          {recentActivities.map((activity) => (
            <motion.div key={activity.id} style={styles.activityRow} whileHover={{ x: 6, backgroundColor: '#F9F7FF' }}>
              <span style={{ ...styles.activityDot, background: activity.type === 'completed' ? '#2E9E6B' : activity.type === 'started' ? '#F88545' : '#405BBC' }} />
              <span style={styles.activityName}>{activity.name}</span>
              <span style={styles.activityAction}>{activity.action}</span>
              <span style={styles.activityTarget}>{activity.target}</span>
              <span style={styles.activityTime}>{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StudentsTab({ students }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={styles.tabHeader}>
        <h2 style={styles.cardTitle}>Все учащиеся</h2>
        <motion.button style={styles.createBtn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <UserAddOutlined style={{ marginRight: 6 }} />Добавить ученика
        </motion.button>
      </div>
      <div style={styles.fullStudentsList}>
        {students.map((student, index) => (
          <motion.div key={student.id} style={styles.studentRow} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }} whileHover={{ x: 6, backgroundColor: '#F9F7FF' }}>
            <div style={styles.studentInfo}>
              <div style={{ ...styles.studentAvatar, background: student.progress < 50 ? '#FFF4EC' : '#F0F3FC', color: student.progress < 50 ? '#F88545' : '#405BBC' }}>{student.avatar}</div>
              <div>
                <div style={styles.studentName}>{student.name}</div>
                <div style={styles.studentMeta}>ID: {student.id}</div>
              </div>
            </div>
            <div style={styles.progressSection}>
              <div style={styles.progressValue}>{student.progress}%</div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, background: student.progress < 50 ? '#F88545' : '#405BBC', width: `${student.progress}%` }} />
              </div>
            </div>
            <div style={styles.xpValue}>{student.xp} XP</div>
            <div style={styles.lastActive}>{student.lastActive}</div>
            <MoreOutlined style={styles.moreIcon} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function AssignmentsTab({ assignments }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={styles.tabHeader}>
        <h2 style={styles.cardTitle}>Задания группы</h2>
      </div>
      <div style={styles.assignmentsList}>
        {assignments.map((assignment, index) => (
          <motion.div key={assignment.id} style={styles.assignmentCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }} whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(64, 91, 188, 0.15)' }}>
            <div style={styles.assignmentHeader}>
              <span style={{ ...styles.assignmentType, background: assignment.type === 'Тренажёр' ? '#F0F3FC' : '#FFF4EC', color: assignment.type === 'Тренажёр' ? '#405BBC' : '#F88545' }}>{assignment.type}</span>
              <span style={{ ...styles.assignmentStatus, background: assignment.status === 'Активно' ? '#E8F7F0' : assignment.status === 'Черновик' ? '#FFF4EC' : '#F1EDE2', color: assignment.status === 'Активно' ? '#2E9E6B' : assignment.status === 'Черновик' ? '#F88545' : '#8F8AA6' }}>{assignment.status}</span>
            </div>
            <h3 style={styles.assignmentTitle}>{assignment.title}</h3>
            <div style={styles.assignmentMeta}>
              <span>{assignment.assignedTo}</span>
              <span>До: {assignment.dueDate}</span>
              {assignment.status === 'Активно' && <span>{assignment.completed} из {assignment.total} выполнили</span>}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function ResultsTab({ students }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={styles.tabHeader}>
        <h2 style={styles.cardTitle}>Результаты группы</h2>
        <span style={styles.filterDropdown}>Последние 30 дней ▾</span>
      </div>
      <div style={styles.resultsGrid}>
        {students.map((student, index) => (
          <motion.div key={student.id} style={styles.resultCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.06 }} whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(64, 91, 188, 0.15)' }}>
            <div style={styles.resultHeader}>
              <div style={{ ...styles.studentAvatar, background: student.progress < 50 ? '#FFF4EC' : '#F0F3FC', color: student.progress < 50 ? '#F88545' : '#405BBC' }}>{student.avatar}</div>
              <span style={styles.resultScore}>{student.progress}%</span>
            </div>
            <h4 style={styles.resultName}>{student.name}</h4>
            <div style={styles.resultStats}>
              <span>{student.trainers} тренажёров</span>
              <span>{student.xp} XP</span>
            </div>
            <div style={styles.progressBar}>
              <div style={{ ...styles.progressFill, background: student.progress < 50 ? '#F88545' : '#405BBC', width: `${student.progress}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SettingsTab() {
  const [difficulty, setDifficulty] = useState('basic');
  const [age, setAge] = useState('13-14');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div style={styles.tabHeader}>
        <h2 style={styles.cardTitle}>Настройки группы</h2>
      </div>
      <div style={styles.settingsWrapper}>
        <div style={styles.settingsCard}>
          <h3 style={styles.settingsTitle}>Основная информация</h3>
          <div style={styles.createFields}>
            <div style={styles.formField}>
              <label style={styles.formLabel}>Название группы</label>
              <input style={styles.formInput} defaultValue="8Б" />
            </div>
            <div style={styles.formField}>
              <label style={styles.formLabel}>Возрастная группа</label>
              <select style={styles.formSelect} value={age} onChange={(e) => setAge(e.target.value)}>
                {ageGroups.map((group) => <option key={group.value} value={group.value}>{group.label}</option>)}
              </select>
            </div>
            <div style={styles.formField}>
              <label style={styles.formLabel}>Уровень сложности</label>
              <div style={styles.difficultyGrid}>
                {[
                  { value: 'basic', title: 'Базовый', desc: '8 базовых заданий' },
                  { value: 'middle', title: 'Средний', desc: 'Базовые + дополнительные' },
                  { value: 'advanced', title: 'Продвинутый', desc: 'Все задания + углублённые' },
                ].map((level) => (
                  <motion.div
                    key={level.value}
                    style={{ ...styles.difficultyCard, borderColor: difficulty === level.value ? '#405BBC' : '#E8E3D5', background: difficulty === level.value ? '#F0F3FC' : '#FFFFFF' }}
                    whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(64, 91, 188, 0.15)' }}
                    onClick={() => setDifficulty(level.value)}
                  >
                    <div style={{ ...styles.difficultyRadio, background: difficulty === level.value ? '#405BBC' : '#FFFFFF', borderColor: difficulty === level.value ? '#405BBC' : '#E8E3D5' }}>
                      {difficulty === level.value && <CheckCircleFilled style={{ fontSize: 14, color: '#FFFFFF' }} />}
                    </div>
                    <div>
                      <div style={styles.difficultyTitle}>{level.title}</div>
                      <div style={styles.difficultyDesc}>{level.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div style={styles.formField}>
              <label style={styles.formLabel}>Код приглашения</label>
              <input style={styles.formInput} defaultValue="8B2025" />
            </div>
          </div>
          <motion.button style={styles.generateBtn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>Сохранить изменения</motion.button>
        </div>
      </div>
    </motion.div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: '24px' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
  topLeft: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  groupSelector: { display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  groupName: { fontSize: '28px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361', fontWeight: 400 },
  groupBadge: { background: '#F0F3FC', color: '#405BBC', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', whiteSpace: 'nowrap' },
  topRight: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  period: { fontSize: '14px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif", display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' },
  createBtn: { background: '#405BBC', color: '#FFFFFF', fontFamily: "'Comfortaa', sans-serif", fontSize: '14px', fontWeight: 600, padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' },
  topIcon: { fontSize: '20px', color: '#405BBC', cursor: 'pointer' },
  tabs: { display: 'flex', gap: '24px', borderBottom: '1px solid #F1EDE2', paddingBottom: '8px', flexWrap: 'wrap' },
  tabBtn: { background: 'none', border: 'none', fontSize: '14px', fontFamily: "'Comfortaa', sans-serif", fontWeight: 600, padding: '8px 4px', cursor: 'pointer', transition: 'all 150ms ease', whiteSpace: 'nowrap' },

  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
  kpiCard: { background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)', cursor: 'pointer', transition: 'all 200ms ease' },
  kpiIcon: { width: 48, height: 48, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' },
  kpiValue: { fontSize: '32px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361' },
  kpiLabel: { fontSize: '14px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif", marginTop: '4px' },
  kpiLink: { fontSize: '13px', fontWeight: 600, color: '#405BBC', fontFamily: "'Comfortaa', sans-serif", marginTop: '12px', display: 'block' },

  mainGrid: { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '20px', alignItems: 'start' },
  tableCard: { background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)', minWidth: 0 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' },
  cardTitle: { fontSize: '20px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361', fontWeight: 400, margin: 0 },
  cardActions: { display: 'flex', alignItems: 'center', gap: '12px' },
  cardHeaderIcon: { fontSize: '18px', color: '#8F8AA6', cursor: 'pointer' },
  filterDropdown: { fontSize: '13px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif", cursor: 'pointer' },

  studentsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  studentRow: { display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 150ms ease', flexWrap: 'wrap' },
  studentInfo: { display: 'flex', alignItems: 'center', gap: '12px', flex: 2, minWidth: '200px' },
  studentAvatar: { width: 40, height: 40, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '13px', flexShrink: 0 },
  studentName: { fontSize: '14px', fontWeight: 600, color: '#140F41', fontFamily: "'Comfortaa', sans-serif" },
  studentMeta: { fontSize: '12px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif" },
  progressSection: { flex: 2, minWidth: '150px' },
  progressValue: { fontSize: '14px', fontWeight: 600, color: '#140F41', marginBottom: '4px' },
  progressBar: { width: '100%', height: '6px', background: '#F1EDE2', borderRadius: '3px', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: '3px' },
  xpValue: { fontSize: '13px', fontWeight: 600, color: '#F88545', flex: 1, textAlign: 'center', minWidth: '70px' },
  lastActive: { fontSize: '12px', color: '#8F8AA6', flex: 1.5, textAlign: 'center', minWidth: '120px' },
  moreIcon: { fontSize: '18px', color: '#8F8AA6', cursor: 'pointer' },
  showAllBtn: { background: 'none', border: 'none', fontSize: '14px', fontWeight: 600, color: '#405BBC', fontFamily: "'Comfortaa', sans-serif", cursor: 'pointer', marginTop: '16px', width: '100%', padding: '12px', borderRadius: '8px', transition: 'all 150ms ease' },

  rightColumn: { display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 },
  sideCard: { background: '#FFFFFF', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)' },
  sideCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  sideCardTitle: { fontSize: '16px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361', fontWeight: 400, margin: 0 },
  sideCardLink: { fontSize: '12px', color: '#405BBC', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' },
  fallingRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #F1EDE2' },
  messageRow: { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 0', borderBottom: '1px solid #F1EDE2' },
  messageName: { fontSize: '13px', fontWeight: 600, color: '#140F41', fontFamily: "'Comfortaa', sans-serif" },
  messagePreview: { fontSize: '12px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' },
  messageRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 },
  messageTime: { fontSize: '11px', color: '#8F8AA6' },
  messageDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#F88545' },
  writeBtn: { background: '#405BBC', color: '#FFFFFF', fontFamily: "'Comfortaa', sans-serif", fontSize: '14px', fontWeight: 600, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  activityCard: { background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)' },
  activityList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  activityRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', transition: 'all 150ms ease', flexWrap: 'wrap' },
  activityDot: { width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0 },
  activityName: { fontSize: '13px', fontWeight: 600, color: '#140F41', fontFamily: "'Comfortaa', sans-serif" },
  activityAction: { fontSize: '12px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif" },
  activityTarget: { fontSize: '12px', fontWeight: 600, color: '#405BBC', fontFamily: "'Comfortaa', sans-serif" },
  activityTime: { fontSize: '11px', color: '#8F8AA6', marginLeft: 'auto' },

  modalBackdrop: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(20, 15, 65, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' },
  modal: { background: '#FFFFFF', borderRadius: '32px', padding: '32px', maxWidth: '520px', width: '100%', boxShadow: '0 24px 60px rgba(20, 15, 65, 0.20)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' },
  modalTitle: { fontSize: '24px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361', fontWeight: 400, margin: 0 },
  aiFields: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' },
  aiField: { display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: '#FFF9EC', borderRadius: '8px', flexWrap: 'wrap', gap: '8px' },
  aiFieldLabel: { fontSize: '14px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif" },
  aiFieldValue: { fontSize: '14px', fontWeight: 600, color: '#140F41', fontFamily: "'Comfortaa', sans-serif" },
  generateBtn: { background: '#F88545', color: '#FFFFFF', fontFamily: "'Comfortaa', sans-serif", fontSize: '15px', fontWeight: 600, padding: '14px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  generatedBlock: { textAlign: 'center' },
  generatedTitle: { fontSize: '22px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361', fontWeight: 400, marginTop: '12px', marginBottom: '8px' },
  generatedText: { fontSize: '14px', color: '#5A5478', fontFamily: "'Comfortaa', sans-serif", marginBottom: '24px', lineHeight: 1.6 },
  closeBtn: { position: 'absolute', top: '16px', right: '16px', background: '#F1EDE2', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '14px', color: '#8F8AA6', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  tabHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' },
  fullStudentsList: { background: '#FFFFFF', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)', display: 'flex', flexDirection: 'column', gap: '8px' },
  assignmentsList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' },
  assignmentCard: { background: '#FFFFFF', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)', cursor: 'pointer', transition: 'all 200ms ease' },
  assignmentHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px' },
  assignmentType: { fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px' },
  assignmentStatus: { fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px' },
  assignmentTitle: { fontSize: '18px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361', fontWeight: 400, marginBottom: '12px' },
  assignmentMeta: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif", flexWrap: 'wrap', gap: '8px' },

  resultsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' },
  resultCard: { background: '#FFFFFF', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)', cursor: 'pointer', transition: 'all 200ms ease' },
  resultHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
  resultScore: { fontSize: '18px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361' },
  resultName: { fontSize: '14px', fontWeight: 600, color: '#140F41', fontFamily: "'Comfortaa', sans-serif", marginBottom: '8px' },
  resultStats: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif", marginBottom: '12px' },

  settingsWrapper: { display: 'flex', justifyContent: 'center' },
  settingsCard: { background: '#FFFFFF', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 12px rgba(20, 15, 65, 0.06)', width: '100%', maxWidth: '520px' },
  settingsTitle: { fontSize: '18px', fontFamily: "'Scripter', 'Comfortaa', sans-serif", color: '#130361', fontWeight: 400, marginBottom: '16px' },
  createFields: { display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' },
  formField: { display: 'flex', flexDirection: 'column', gap: '8px' },
  formLabel: { fontSize: '13px', fontWeight: 600, color: '#140F41', fontFamily: "'Comfortaa', sans-serif" },
  formInput: { padding: '12px 16px', fontFamily: "'Comfortaa', sans-serif", fontSize: '14px', color: '#140F41', background: '#FFFFFF', border: '1px solid #E8E3D5', borderRadius: '8px', outline: 'none', width: '100%' },
  formSelect: { padding: '12px 16px', fontFamily: "'Comfortaa', sans-serif", fontSize: '14px', color: '#140F41', background: '#FFFFFF', border: '1px solid #E8E3D5', borderRadius: '8px', outline: 'none', width: '100%' },
  modalActions: { display: 'flex', gap: '12px', flexWrap: 'wrap' },
  aiBtn: { background: '#F88545', color: '#FFFFFF', fontFamily: "'Comfortaa', sans-serif", fontSize: '14px', fontWeight: 600, padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  primaryBtn: { background: '#405BBC', color: '#FFFFFF', fontFamily: "'Comfortaa', sans-serif", fontSize: '14px', fontWeight: 600, padding: '12px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', flex: 1 },
  difficultyGrid: { display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' },
  difficultyCard: { display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '12px', border: '1px solid #E8E3D5', cursor: 'pointer', transition: 'all 200ms ease', width: '100%' },
  difficultyRadio: { width: 24, height: 24, borderRadius: '50%', border: '2px solid #E8E3D5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  difficultyTitle: { fontSize: '14px', fontWeight: 600, color: '#140F41', fontFamily: "'Comfortaa', sans-serif" },
  difficultyDesc: { fontSize: '12px', color: '#8F8AA6', fontFamily: "'Comfortaa', sans-serif" },
  ageInfo: { background: '#FFF9EC', borderRadius: '12px', padding: '16px', fontSize: '14px', color: '#140F41', fontFamily: "'Comfortaa', sans-serif", display: 'flex', alignItems: 'center' },
};