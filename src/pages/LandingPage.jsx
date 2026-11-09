import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  UserOutlined,
  RobotOutlined,
  MessageOutlined,
  CheckCircleFilled,
  LockOutlined,
  WarningOutlined,
  ArrowRightOutlined,
  HomeOutlined,
} from '@ant-design/icons';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const HeroVisual = () => {
  return (
    <div style={styles.heroVisual}>
      <motion.div
        style={styles.mockTeacher}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div style={styles.mockHeader}>
          <span style={styles.mockDot} />
          <span style={styles.mockDot} />
          <span style={styles.mockDot} />
        </div>
        <div style={styles.mockContent}>
          <div style={styles.mockRow}>
            <div>
              <div style={styles.mockLabel}>8Б</div>
              <div style={styles.mockValue}>24 ученика</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={styles.mockLabel}>Средний прогресс</div>
              <div style={styles.mockValue}>78%</div>
            </div>
          </div>
          <div style={styles.mockDivider} />
          <div style={styles.mockRow}>
            <div>
              <div style={styles.mockLabel}>Иванов Максим</div>
              <div style={styles.mockProgress}>92%</div>
            </div>
            <div>
              <div style={styles.mockLabel}>Петров Артём</div>
              <div style={styles.mockProgressWarning}>40% ⚠</div>
            </div>
          </div>
          <div style={styles.mockAI}>
            <RobotOutlined style={{ color: '#F88545', marginRight: 8 }} />
            AI-генерация задания
          </div>
        </div>
      </motion.div>

      <motion.div
        style={styles.mockStudent}
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div style={styles.mockHeader}>
          <span style={styles.mockDot} />
          <span style={styles.mockDot} />
          <span style={styles.mockDot} />
        </div>
        <div style={styles.mockContent}>
          <div style={styles.mockRow}>
            <div>
              <div style={styles.mockLabel}>Уровень</div>
              <div style={styles.mockValue}>12</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={styles.mockLabel}>XP</div>
              <div style={styles.mockValue}>2450</div>
            </div>
          </div>
          <div style={styles.mockMessage}>
            <WarningOutlined style={{ color: '#F88545', marginRight: 8 }} />
            Ваш аккаунт будет заблокирован. Подтвердите данные...
          </div>
          <div style={styles.mockButtons}>
            <div style={styles.mockBtnDanger}>Это фишинг</div>
            <div style={styles.mockBtnSafe}>Безопасно</div>
          </div>
          <div style={styles.mockCorrect}>
            <CheckCircleFilled style={{ color: '#2E9E6B', marginRight: 8 }} />
            Верно! +50 XP
          </div>
        </div>
      </motion.div>

      <motion.div
        style={styles.mockParent}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div style={styles.mockHeader}>
          <span style={styles.mockDot} />
          <span style={styles.mockDot} />
          <span style={styles.mockDot} />
        </div>
        <div style={styles.mockContent}>
          <div style={styles.mockLabel}>Прогресс ребёнка</div>
          <div style={styles.mockValue}>82%</div>
          <div style={styles.mockDivider} />
          <div style={styles.mockRow}>
            <div>
              <div style={styles.mockLabel}>Сильные стороны</div>
              <div style={styles.mockSmallText}>Фишинг · Пароли</div>
            </div>
          </div>
          <div style={styles.mockAI}>
            <RobotOutlined style={{ color: '#405BBC', marginRight: 8 }} />
            AI-отчёт для родителя
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <motion.div
            style={styles.heroText}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <h1 style={styles.heroTitle}>
              Безопасность в цифровом мире начинается в школе.
            </h1>
            <p style={styles.heroSubtitle}>
              THE FIREWALL — платформа для обучения подростков информационной безопасности,
              которая объединяет учеников, учителей и родителей в одной системе.
            </p>
            <div style={styles.heroCTA}>
              <motion.button
                style={styles.btnPrimary}
                onClick={() => navigate('/register')}
                whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(64, 91, 188, 0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                Подключить школу
                <ArrowRightOutlined style={{ marginLeft: 8 }} />
              </motion.button>
              <motion.button
                style={styles.btnSecondary}
                onClick={() => navigate('/catalog')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Посмотреть платформу
              </motion.button>
            </div>
            <p style={styles.heroNote}>
              Для школ и образовательных учреждений · Ежемесячная подписка
            </p>
          </motion.div>
          <HeroVisual />
        </div>
      </section>

      <SectionWrapper variant={fadeUp}>
        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Одна платформа. Для всей школы.</h2>
            <div style={styles.rolesGrid}>
              {[
                { icon: <TeamOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#405BBC', title: 'Учитель', text: 'Создает, назначает и анализирует. AI помогает создавать задания, учитель назначает их классу и видит результаты каждого ученика.' },
                { icon: <UserOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#F88545', title: 'Ученик', text: 'Учится через реальные ситуации. Интерактивные тренажеры и задания помогают не просто запоминать правила, а распознавать цифровые угрозы.' },
                { icon: <HomeOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />, bg: '#130361', title: 'Родитель', text: 'Понимает прогресс своего ребенка. Результаты обучения, связь с учителем и персональные AI-рекомендации помогают продолжать разговор дома.' },
              ].map((role, i) => (
                <motion.div
                  key={role.title}
                  style={styles.roleCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -8, boxShadow: '0 16px 40px rgba(20, 15, 65, 0.10)' }}
                >
                  <div style={{ ...styles.roleIconBlue, background: role.bg }}>
                    {role.icon}
                  </div>
                  <h3 style={styles.roleTitle}>{role.title}</h3>
                  <p style={styles.roleText}>{role.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeIn}>
        <section style={styles.sectionCream}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>
              Подростки уже живут в цифровом мире. А умеют ли они в нем безопасно жить?
            </h2>
            <div style={styles.situationsGrid}>
              {['Сообщение от незнакомца', 'Подозрительная ссылка', 'Фальшивый аккаунт', 'Утечка пароля', 'Сомнительный файл', 'Манипуляция в соцсетях'].map((text, i) => (
                <motion.div
                  key={text}
                  style={styles.situationCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ scale: 1.04, borderColor: '#405BBC' }}
                >
                  {text}
                </motion.div>
              ))}
            </div>
            <p style={styles.sectionNote}>
              Цифровая безопасность должна стать таким же естественным навыком,
              как правила дорожного движения.
            </p>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={slideLeft}>
        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Не рассказываем об угрозах. Учим их распознавать.</h2>
            <div style={styles.practiceWrapper}>
              <motion.div
                style={styles.practicePreview}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(20, 15, 65, 0.12)' }}
              >
                <div style={styles.practiceHeader}>
                  <span style={styles.mockDot} />
                  <span style={styles.mockDot} />
                  <span style={styles.mockDot} />
                </div>
                <div style={styles.practiceMessage}>
                  <WarningOutlined style={{ color: '#F88545', marginRight: 8 }} />
                  <div>
                    <div style={styles.practiceMessageTitle}>Вам пришло новое сообщение</div>
                    <div style={styles.practiceMessageText}>
                      «Ваш аккаунт будет заблокирован. Подтвердите данные по ссылке...»
                    </div>
                  </div>
                </div>
                <div style={styles.practiceQuestion}>Это фишинг?</div>
                <div style={styles.practiceButtons}>
                  <div style={styles.mockBtnDanger}>Да, это фишинг</div>
                  <div style={styles.mockBtnSafe}>Нет, сообщение безопасно</div>
                </div>
                <div style={styles.practiceResult}>
                  <CheckCircleFilled style={{ color: '#2E9E6B', marginRight: 8 }} />
                  Верно! +50 XP
                </div>
              </motion.div>
              <motion.div
                style={styles.scenariosList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              >
                {[
                  { icon: <LockOutlined style={{ color: '#405BBC', fontSize: 20 }} />, text: 'Фишинг' },
                  { icon: <MessageOutlined style={{ color: '#F88545', fontSize: 20 }} />, text: 'Социальная инженерия' },
                  { icon: <SafetyCertificateOutlined style={{ color: '#405BBC', fontSize: 20 }} />, text: 'Безопасные пароли' },
                  { icon: <LockOutlined style={{ color: '#130361', fontSize: 20 }} />, text: 'Защита аккаунтов' },
                  { icon: <HomeOutlined style={{ color: '#F88545', fontSize: 20 }} />, text: 'Цифровая приватность' },
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    style={styles.scenarioItem}
                    variants={fadeUp}
                    whileHover={{ x: 8, borderColor: '#405BBC' }}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={slideRight}>
        <section style={styles.sectionCream}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Учителю не нужно создавать всё вручную.</h2>
            <p style={styles.sectionSubtitle}>
              AI помогает подготовить задание за несколько секунд — с учетом возраста, темы и уровня сложности.
            </p>
            <div style={styles.aiWrapper}>
              <motion.div
                style={styles.aiCard}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div style={styles.aiHeader}>
                  <RobotOutlined style={{ color: '#F88545', fontSize: 24 }} />
                  <span style={styles.aiHeaderTitle}>Создать задание</span>
                </div>
                <div style={styles.aiFields}>
                  <div style={styles.aiField}>
                    <span style={styles.aiFieldLabel}>Тема</span>
                    <span style={styles.aiFieldValue}>Фишинг</span>
                  </div>
                  <div style={styles.aiField}>
                    <span style={styles.aiFieldLabel}>Возраст</span>
                    <span style={styles.aiFieldValue}>13–14 лет</span>
                  </div>
                  <div style={styles.aiField}>
                    <span style={styles.aiFieldLabel}>Сложность</span>
                    <span style={styles.aiFieldValue}>Средняя</span>
                  </div>
                </div>
                <motion.button
                  style={styles.aiGenerateBtn}
                  whileHover={{ scale: 1.03, backgroundColor: '#F96E2A' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Сгенерировать →
                </motion.button>
              </motion.div>
              <motion.div
                style={styles.aiResultCard}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div style={styles.aiResultHeader}>
                  <CheckCircleFilled style={{ color: '#2E9E6B', marginRight: 8 }} />
                  Новое задание готово
                </div>
                <div style={styles.aiResultContent}>
                  {['ситуация', 'варианты ответа', 'объяснение', 'уровень сложности', 'XP'].map((item, i) => (
                    <motion.div
                      key={item}
                      style={styles.aiResultItem}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeUp}>
        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Учитель видит не просто оценки. Он видит, где нужна помощь.</h2>
            <div style={styles.analyticsWrapper}>
              <motion.div
                style={styles.analyticsCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div style={styles.analyticsHeader}>
                  <div>
                    <div style={styles.analyticsClass}>8Б</div>
                    <div style={styles.analyticsSub}>24 ученика</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={styles.analyticsLabel}>Средний прогресс</div>
                    <div style={styles.analyticsValue}>78%</div>
                  </div>
                </div>
                <div style={styles.analyticsDivider} />
                <div style={styles.analyticsStudent}>
                  <span>Иванов Максим</span>
                  <span style={styles.analyticsGood}>92%</span>
                </div>
                <div style={styles.analyticsStudent}>
                  <span>Сидорова Алиса</span>
                  <span style={styles.analyticsGood}>75%</span>
                </div>
                <div style={styles.analyticsStudent}>
                  <span>Петров Артём</span>
                  <span style={styles.analyticsWarning}>40% ⚠️</span>
                </div>
                <div style={styles.analyticsStudent}>
                  <span>Ким Елена</span>
                  <span style={styles.analyticsGood}>85%</span>
                </div>
                <div style={styles.analyticsStudent}>
                  <span>Титов Егор</span>
                  <span style={styles.analyticsWarning}>30% ⚠️</span>
                </div>
              </motion.div>
              <motion.div
                style={styles.analyticsSide}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div style={styles.analyticsAlert}>
                  <WarningOutlined style={{ color: '#F88545', fontSize: 24 }} />
                  <div>
                    <div style={styles.analyticsAlertTitle}>Требуют внимания</div>
                    <div style={styles.analyticsAlertValue}>5 учеников</div>
                  </div>
                </div>
                <div style={styles.analyticsTopics}>
                  <div style={styles.analyticsTopicTitle}>Сложные темы</div>
                  <div style={styles.analyticsTopic}>Социальная инженерия</div>
                  <div style={styles.analyticsTopic}>Приватность</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeUp}>
        <section style={styles.sectionCream}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Каждый ученик движется своим маршрутом.</h2>
            <div style={styles.levelsGrid}>
              {[
                { age: '12–13 лет', title: 'Основы цифровой безопасности' },
                { age: '14–15 лет', title: 'Фишинг, социальная инженерия, приватность' },
                { age: '16–17 лет', title: 'Web security, уязвимости, продвинутые сценарии' },
              ].map((level, i) => (
                <motion.div
                  key={level.age}
                  style={styles.levelCard}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ y: -8, boxShadow: '0 16px 40px rgba(20, 15, 65, 0.10)' }}
                >
                  <div style={styles.levelAge}>{level.age}</div>
                  <div style={styles.levelTitle}>{level.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={slideLeft}>
        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Родитель видит больше, чем просто оценку.</h2>
            <div style={styles.parentWrapper}>
              <motion.div
                style={styles.parentCard}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(20, 15, 65, 0.12)' }}
              >
                <div style={styles.parentHeader}>
                  <div style={styles.parentAvatar}>
                    <UserOutlined style={{ fontSize: 28, color: '#FFFFFF' }} />
                  </div>
                  <div>
                    <div style={styles.parentName}>Прогресс ребёнка</div>
                    <div style={styles.parentSub}>82%</div>
                  </div>
                </div>
                <div style={styles.analyticsDivider} />
                <div style={styles.parentStat}>
                  <span>Пройдено</span>
                  <span style={styles.parentStatValue}>24 задания</span>
                </div>
                <div style={styles.parentStat}>
                  <span>Сильные стороны</span>
                  <span style={styles.parentStatGood}>Фишинг · Пароли · Приватность</span>
                </div>
                <div style={styles.parentStat}>
                  <span>Зона внимания</span>
                  <span style={styles.parentStatWarning}>Социальная инженерия</span>
                </div>
                <motion.button
                  style={styles.parentReportBtn}
                  whileHover={{ scale: 1.03, backgroundColor: '#344B9E' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Посмотреть AI-отчёт
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={slideRight}>
        <section style={styles.sectionCream}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>AI превращает результаты обучения в понятные рекомендации.</h2>
            <div style={styles.reportWrapper}>
              <motion.div
                style={styles.reportCard}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(20, 15, 65, 0.12)' }}
              >
                <div style={styles.reportHeader}>
                  <RobotOutlined style={{ color: '#405BBC', fontSize: 28 }} />
                  <span style={styles.reportTitle}>Отчёт за месяц</span>
                </div>
                <div style={styles.reportSection}>
                  <div style={styles.reportSectionTitle}>Что уже хорошо получается</div>
                  <p style={styles.reportText}>
                    Ребенок уверенно распознает фишинговые сообщения и понимает основные принципы защиты аккаунтов.
                  </p>
                </div>
                <div style={styles.reportSection}>
                  <div style={styles.reportSectionTitle}>На что стоит обратить внимание</div>
                  <p style={styles.reportText}>
                    В заданиях на социальную инженерию ребенок чаще доверяет сообщениям с высоким эмоциональным давлением.
                  </p>
                </div>
                <div style={styles.reportSection}>
                  <div style={styles.reportSectionTitle}>О чем можно поговорить дома</div>
                  <p style={styles.reportText}>
                    Обсудите, почему срочные сообщения и просьбы о конфиденциальной информации могут быть признаком манипуляции.
                  </p>
                </div>
                <div style={styles.reportRecommendation}>
                  <ThunderboltOutlined style={{ color: '#F88545', marginRight: 8 }} />
                  Пройти повторный тренажер по социальной инженерии
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeUp}>
        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Школа и родители говорят на одном языке.</h2>
            <div style={styles.chatWrapper}>
              <motion.div
                style={styles.chatParent}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div style={styles.chatAvatarParent}>Р</div>
                <div style={styles.chatBubble}>
                  Здравствуйте! Подскажите, пожалуйста, над чем нам лучше поработать дома?
                </div>
              </motion.div>
              <motion.div
                style={styles.chatTeacher}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div style={styles.chatBubbleTeacher}>
                  Добрый день! Сейчас больше всего внимания стоит уделить социальной инженерии. Я также добавил несколько дополнительных заданий.
                </div>
                <div style={styles.chatAvatarTeacher}>У</div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeIn}>
        <section style={styles.sectionCream}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Единая экосистема</h2>
            <div style={styles.ecosystemWrapper}>
              <div style={styles.ecosystemCenter}>
                <ThunderboltOutlined style={{ color: '#F88545', fontSize: 36 }} />
                <div style={styles.ecosystemTitle}>THE FIREWALL</div>
              </div>
              <div style={styles.ecosystemGrid}>
                {[
                  { icon: <HomeOutlined style={{ color: '#405BBC', fontSize: 28 }} />, title: 'Школа', text: 'управляет системой' },
                  { icon: <TeamOutlined style={{ color: '#405BBC', fontSize: 28 }} />, title: 'Учитель', text: 'создает и анализирует' },
                  { icon: <UserOutlined style={{ color: '#F88545', fontSize: 28 }} />, title: 'Ученик', text: 'учится и практикуется' },
                  { icon: <HomeOutlined style={{ color: '#130361', fontSize: 28 }} />, title: 'Родитель', text: 'понимает и поддерживает' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    style={styles.ecosystemCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                  >
                    {item.icon}
                    <div style={styles.ecosystemCardTitle}>{item.title}</div>
                    <div style={styles.ecosystemCardText}>{item.text}</div>
                  </motion.div>
                ))}
              </div>
              <div style={styles.ecosystemTags}>
                {['AI', 'задания', 'тренажеры', 'аналитика', 'отчеты', 'коммуникация'].map((tag) => (
                  <motion.span
                    key={tag}
                    style={styles.ecosystemTag}
                    whileHover={{ scale: 1.1 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeUp}>
        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Что получает школа?</h2>
            <div style={styles.benefitsGrid}>
              {[
                { icon: <CheckCircleFilled style={{ color: '#405BBC', fontSize: 24 }} />, title: 'Готовая система обучения', text: 'Не нужно создавать собственную инфраструктуру.' },
                { icon: <CheckCircleFilled style={{ color: '#F88545', fontSize: 24 }} />, title: 'AI-инструменты для учителей', text: 'Меньше времени на подготовку заданий.' },
                { icon: <CheckCircleFilled style={{ color: '#405BBC', fontSize: 24 }} />, title: 'Практическое обучение', text: 'Реальные навыки, а не только теория.' },
                { icon: <CheckCircleFilled style={{ color: '#130361', fontSize: 24 }} />, title: 'Аналитика', text: 'Понятный прогресс классов и отдельных учеников.' },
                { icon: <CheckCircleFilled style={{ color: '#F88545', fontSize: 24 }} />, title: 'Вовлечение родителей', text: 'Родители становятся частью образовательного процесса.' },
                { icon: <CheckCircleFilled style={{ color: '#405BBC', fontSize: 24 }} />, title: 'Постоянное развитие', text: 'Платформа регулярно обновляется и расширяется.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  style={styles.benefitCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -6, borderColor: '#405BBC' }}
                >
                  {item.icon}
                  <div style={styles.benefitTitle}>{item.title}</div>
                  <div style={styles.benefitText}>{item.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeUp}>
        <section style={styles.sectionCream}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Всё необходимое — в одной подписке.</h2>
            <div style={styles.subscriptionWrapper}>
              <motion.div
                style={styles.subscriptionCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: '0 24px 56px rgba(20, 15, 65, 0.15)' }}
              >
                {['аккаунты учеников', 'аккаунты учителей', 'аккаунты родителей', 'интерактивные тренажеры', 'AI-генерация заданий', 'аналитика', 'родительские отчеты', 'коммуникация', 'обновления платформы'].map((item) => (
                  <div key={item} style={styles.subscriptionItem}>✓ {item}</div>
                ))}
                <motion.button
                  style={styles.btnPrimary}
                  onClick={() => navigate('/register')}
                  whileHover={{ scale: 1.03, boxShadow: '0 12px 32px rgba(64, 91, 188, 0.35)' }}
                  whileTap={{ scale: 0.97 }}
                >
                  Подключить школу
                  <ArrowRightOutlined style={{ marginLeft: 8 }} />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeUp}>
        <section style={styles.sectionLight}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Частые вопросы</h2>
            <div style={styles.faqWrapper}>
              {[
                { q: 'Для какого возраста подходит THE FIREWALL?', a: 'Платформа рассчитана на подростков 12–17 лет. Задания автоматически адаптируются под возраст и уровень подготовки.' },
                { q: 'Как школа подключается к платформе?', a: 'Школа оформляет подписку и получает доступ к кабинету администратора, где можно создавать классы и приглашать учителей.' },
                { q: 'Нужно ли учителям самим создавать задания?', a: 'Нет. AI генерирует задания автоматически. Учитель может использовать готовые или корректировать их под свой класс.' },
                { q: 'Как родители получают доступ?', a: 'Родители получают приглашение по email и создают свой аккаунт, где видят прогресс ребёнка и AI-отчёты.' },
                { q: 'Что именно видит родитель?', a: 'Прогресс, сильные стороны, зоны внимания, персональные рекомендации и возможность написать учителю.' },
                { q: 'Как работает AI?', a: 'AI создает уникальные задания и анализирует результаты, формируя понятные отчёты для учителей и родителей.' },
                { q: 'Можно ли использовать платформу для нескольких классов?', a: 'Да. Подписка позволяет подключать любое количество классов и учеников в рамках выбранного тарифа.' },
                { q: 'Что входит в подписку?', a: 'Все функции: аккаунты, тренажеры, AI-генерация, аналитика, отчёты, коммуникация и обновления.' },
              ].map((item, i) => (
                <motion.details
                  key={item.q}
                  style={styles.faqItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <summary style={styles.faqQuestion}>{item.q}</summary>
                  <p style={styles.faqAnswer}>{item.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper variant={fadeIn}>
        <section style={styles.finalCTA}>
          <div style={styles.container}>
            <motion.h2
              style={styles.finalTitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Готовы сделать цифровую безопасность частью образования?
            </motion.h2>
            <motion.p
              style={styles.finalSubtitle}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Подключите THE FIREWALL и дайте ученикам навыки, которые пригодятся им каждый день — в школе, дома и в цифровом мире.
            </motion.p>
            <div style={styles.finalButtons}>
              <motion.button
                style={styles.btnAccent}
                onClick={() => navigate('/register')}
                whileHover={{ scale: 1.05, boxShadow: '0 16px 40px rgba(248, 133, 69, 0.40)' }}
                whileTap={{ scale: 0.97 }}
              >
                Подключить школу
              </motion.button>
              <motion.button
                style={styles.btnDark}
                onClick={() => navigate('/login')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Запросить демонстрацию
              </motion.button>
            </div>
            <div style={styles.finalNetwork}>
              {['Учителя', 'Ученики', 'Родители', 'AI'].map((node, i) => (
                <>
                  {i > 0 && <span key={`line-${i}`} style={styles.networkLine} />}
                  <motion.span
                    key={node}
                    style={styles.networkNode}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  >
                    {node}
                  </motion.span>
                </>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>
    </div>
  );
}

const SectionWrapper = ({ children, variant }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variant}
    >
      {children}
    </motion.div>
  );
};

const styles = {
  page: {
    background: '#FFF9EC',
    minHeight: '100vh',
  },
  hero: {
    padding: '64px 24px',
  },
  heroInner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1.2fr',
    gap: '64px',
    alignItems: 'center',
  },
  heroText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: '48px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    lineHeight: 1.2,
    marginBottom: '24px',
    fontWeight: 400,
  },
  heroSubtitle: {
    fontSize: '18px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#140F41',
    lineHeight: 1.6,
    marginBottom: '32px',
    maxWidth: '480px',
  },
  heroCTA: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  btnPrimary: {
    background: '#405BBC',
    color: '#FFFFFF',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    padding: '16px 32px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 150ms ease',
  },
  btnSecondary: {
    background: 'transparent',
    color: '#405BBC',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    padding: '16px 32px',
    borderRadius: '8px',
    border: '1px solid #405BBC',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  heroNote: {
    fontSize: '13px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#8F8AA6',
  },
  heroVisual: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mockTeacher: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 24px rgba(20, 15, 65, 0.08)',
    width: '85%',
    alignSelf: 'flex-start',
  },
  mockStudent: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 24px rgba(20, 15, 65, 0.08)',
    width: '75%',
    alignSelf: 'flex-end',
  },
  mockParent: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 24px rgba(20, 15, 65, 0.08)',
    width: '70%',
    alignSelf: 'flex-start',
  },
  mockHeader: {
    display: 'flex',
    gap: '6px',
    marginBottom: '16px',
  },
  mockDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#E8E3D5',
  },
  mockContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  mockRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mockLabel: {
    fontSize: '12px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#8F8AA6',
  },
  mockValue: {
    fontSize: '22px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
  },
  mockDivider: {
    height: '1px',
    background: '#F1EDE2',
    margin: '8px 0',
  },
  mockProgress: {
    fontSize: '14px',
    color: '#2E9E6B',
    fontWeight: 600,
  },
  mockProgressWarning: {
    fontSize: '14px',
    color: '#F88545',
    fontWeight: 600,
  },
  mockSmallText: {
    fontSize: '13px',
    color: '#5A5478',
  },
  mockAI: {
    background: '#F0F3FC',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#405BBC',
    display: 'flex',
    alignItems: 'center',
  },
  mockMessage: {
    background: '#FFF4EC',
    borderRadius: '8px',
    padding: '12px',
    fontSize: '13px',
    color: '#140F41',
    display: 'flex',
    alignItems: 'center',
  },
  mockButtons: {
    display: 'flex',
    gap: '8px',
  },
  mockBtnDanger: {
    background: '#F88545',
    color: '#FFFFFF',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 600,
  },
  mockBtnSafe: {
    background: '#F0F3FC',
    color: '#405BBC',
    borderRadius: '8px',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: 600,
  },
  mockCorrect: {
    fontSize: '13px',
    color: '#2E9E6B',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  },
  sectionLight: {
    padding: '80px 24px',
    background: '#FFFFFF',
  },
  sectionCream: {
    padding: '80px 24px',
    background: '#FFF9EC',
  },
  sectionTitle: {
    fontSize: '36px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    lineHeight: 1.25,
    marginBottom: '48px',
    textAlign: 'center',
    fontWeight: 400,
  },
  sectionSubtitle: {
    fontSize: '18px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#5A5478',
    textAlign: 'center',
    marginBottom: '48px',
    lineHeight: 1.6,
    maxWidth: '600px',
    margin: '0 auto 48px',
  },
  rolesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  roleCard: {
    background: '#FFFFFF',
    border: '1px solid #F1EDE2',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
    textAlign: 'center',
  },
  roleIconBlue: {
    width: 56,
    height: 56,
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
  },
  roleTitle: {
    fontSize: '22px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    marginBottom: '12px',
    fontWeight: 400,
  },
  roleText: {
    fontSize: '14px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#5A5478',
    lineHeight: 1.6,
  },
  situationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  situationCard: {
    background: '#FFFFFF',
    border: '1px solid #F1EDE2',
    borderRadius: '12px',
    padding: '20px',
    fontSize: '15px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#140F41',
    textAlign: 'center',
    boxShadow: '0 1px 2px rgba(20, 15, 65, 0.04)',
    cursor: 'pointer',
  },
  sectionNote: {
    fontSize: '16px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#5A5478',
    textAlign: 'center',
    lineHeight: 1.6,
  },
  practiceWrapper: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '48px',
    alignItems: 'center',
  },
  practicePreview: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 8px 24px rgba(20, 15, 65, 0.08)',
  },
  practiceHeader: {
    display: 'flex',
    gap: '6px',
    marginBottom: '20px',
  },
  practiceMessage: {
    background: '#FFF4EC',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'flex-start',
  },
  practiceMessageTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#140F41',
    marginBottom: '4px',
  },
  practiceMessageText: {
    fontSize: '13px',
    color: '#5A5478',
  },
  practiceQuestion: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#130361',
    marginBottom: '16px',
  },
  practiceButtons: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  },
  practiceResult: {
    fontSize: '14px',
    color: '#2E9E6B',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
  },
  scenariosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  scenarioItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    background: '#FFFFFF',
    border: '1px solid #F1EDE2',
    borderRadius: '12px',
    fontSize: '16px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#140F41',
    fontWeight: 500,
    cursor: 'pointer',
  },
  aiWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    alignItems: 'stretch',
  },
  aiCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  aiHeaderTitle: {
    fontSize: '18px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
  },
  aiFields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  aiField: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: '#FFF9EC',
    borderRadius: '8px',
  },
  aiFieldLabel: {
    fontSize: '14px',
    color: '#8F8AA6',
  },
  aiFieldValue: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#140F41',
  },
  aiGenerateBtn: {
    background: '#F88545',
    color: '#FFFFFF',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    padding: '14px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  aiResultCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #F1EDE2',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
  },
  aiResultHeader: {
    fontSize: '18px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  aiResultContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  aiResultItem: {
    padding: '10px 16px',
    background: '#F0F3FC',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#140F41',
  },
  analyticsWrapper: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '24px',
  },
  analyticsCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
  },
  analyticsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  analyticsClass: {
    fontSize: '24px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
  },
  analyticsSub: {
    fontSize: '13px',
    color: '#8F8AA6',
  },
  analyticsLabel: {
    fontSize: '13px',
    color: '#8F8AA6',
  },
  analyticsValue: {
    fontSize: '24px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
  },
  analyticsDivider: {
    height: '1px',
    background: '#F1EDE2',
    margin: '16px 0',
  },
  analyticsStudent: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    fontSize: '14px',
    color: '#140F41',
  },
  analyticsGood: {
    color: '#2E9E6B',
    fontWeight: 600,
  },
  analyticsWarning: {
    color: '#F88545',
    fontWeight: 600,
  },
  analyticsSide: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  analyticsAlert: {
    background: '#FFF4EC',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  analyticsAlertTitle: {
    fontSize: '13px',
    color: '#8F8AA6',
  },
  analyticsAlertValue: {
    fontSize: '20px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#F88545',
  },
  analyticsTopics: {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #F1EDE2',
  },
  analyticsTopicTitle: {
    fontSize: '13px',
    color: '#8F8AA6',
    marginBottom: '12px',
  },
  analyticsTopic: {
    fontSize: '14px',
    color: '#140F41',
    padding: '8px 0',
    borderBottom: '1px solid #F1EDE2',
  },
  levelsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  levelCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '32px',
    border: '1px solid #F1EDE2',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
  },
  levelAge: {
    fontSize: '20px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#F88545',
    marginBottom: '12px',
  },
  levelTitle: {
    fontSize: '15px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#140F41',
    lineHeight: 1.5,
  },
  parentWrapper: {
    maxWidth: '600px',
    margin: '0 auto',
  },
  parentCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 8px 24px rgba(20, 15, 65, 0.08)',
  },
  parentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  parentAvatar: {
    width: 48,
    height: 48,
    borderRadius: '12px',
    background: '#405BBC',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  parentName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#140F41',
  },
  parentSub: {
    fontSize: '28px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
  },
  parentStat: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    fontSize: '14px',
    color: '#8F8AA6',
  },
  parentStatValue: {
    color: '#140F41',
    fontWeight: 600,
  },
  parentStatGood: {
    color: '#2E9E6B',
    fontWeight: 600,
  },
  parentStatWarning: {
    color: '#F88545',
    fontWeight: 600,
  },
  parentReportBtn: {
    background: '#405BBC',
    color: '#FFFFFF',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '15px',
    fontWeight: 600,
    padding: '14px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    marginTop: '16px',
  },
  reportWrapper: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  reportCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 8px 24px rgba(20, 15, 65, 0.08)',
  },
  reportHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  reportTitle: {
    fontSize: '24px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
  },
  reportSection: {
    marginBottom: '20px',
  },
  reportSectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#130361',
    marginBottom: '8px',
  },
  reportText: {
    fontSize: '14px',
    color: '#5A5478',
    lineHeight: 1.6,
  },
  reportRecommendation: {
    background: '#FFF4EC',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#140F41',
    display: 'flex',
    alignItems: 'center',
  },
  chatWrapper: {
    maxWidth: '600px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  chatParent: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
  },
  chatTeacher: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    justifyContent: 'flex-end',
  },
  chatAvatarParent: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#F88545',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    flexShrink: 0,
  },
  chatAvatarTeacher: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#405BBC',
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    flexShrink: 0,
  },
  chatBubble: {
    background: '#FFFFFF',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    color: '#140F41',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
    maxWidth: '70%',
  },
  chatBubbleTeacher: {
    background: '#F0F3FC',
    borderRadius: '12px',
    padding: '16px',
    fontSize: '14px',
    color: '#140F41',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
    maxWidth: '70%',
  },
  ecosystemWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
  },
  ecosystemCenter: {
    textAlign: 'center',
  },
  ecosystemTitle: {
    fontSize: '28px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#130361',
    marginTop: '8px',
  },
  ecosystemGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    width: '100%',
  },
  ecosystemCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    border: '1px solid #F1EDE2',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
  },
  ecosystemCardTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#140F41',
    marginTop: '12px',
  },
  ecosystemCardText: {
    fontSize: '13px',
    color: '#8F8AA6',
    marginTop: '4px',
  },
  ecosystemTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ecosystemTag: {
    background: '#F0F3FC',
    color: '#405BBC',
    borderRadius: '20px',
    padding: '8px 16px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  benefitCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid #F1EDE2',
    boxShadow: '0 2px 4px rgba(20, 15, 65, 0.05)',
    cursor: 'pointer',
  },
  benefitTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#130361',
    marginTop: '12px',
    marginBottom: '8px',
  },
  benefitText: {
    fontSize: '14px',
    color: '#5A5478',
    lineHeight: 1.5,
  },
  subscriptionWrapper: {
    maxWidth: '500px',
    margin: '0 auto',
  },
  subscriptionCard: {
    background: '#FFFFFF',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 8px 24px rgba(20, 15, 65, 0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  subscriptionItem: {
    fontSize: '15px',
    color: '#140F41',
  },
  faqWrapper: {
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  faqItem: {
    background: '#FFFFFF',
    borderRadius: '12px',
    border: '1px solid #F1EDE2',
    padding: '16px 20px',
    cursor: 'pointer',
  },
  faqQuestion: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#130361',
    cursor: 'pointer',
  },
  faqAnswer: {
    fontSize: '14px',
    color: '#5A5478',
    lineHeight: 1.6,
    marginTop: '12px',
  },
  finalCTA: {
    background: '#130361',
    padding: '80px 24px',
    textAlign: 'center',
  },
  finalTitle: {
    fontSize: '36px',
    fontFamily: "'Scripter', 'Comfortaa', sans-serif",
    color: '#FFFFFF',
    lineHeight: 1.25,
    marginBottom: '16px',
    fontWeight: 400,
  },
  finalSubtitle: {
    fontSize: '16px',
    fontFamily: "'Comfortaa', sans-serif",
    color: '#DCE3F8',
    maxWidth: '600px',
    margin: '0 auto 32px',
    lineHeight: 1.6,
  },
  finalButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '48px',
  },
  btnAccent: {
    background: '#F88545',
    color: '#FFFFFF',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    padding: '16px 32px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  btnDark: {
    background: 'transparent',
    color: '#FFFFFF',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '16px',
    fontWeight: 600,
    padding: '16px 32px',
    borderRadius: '8px',
    border: '1px solid #FFFFFF',
    cursor: 'pointer',
    transition: 'all 150ms ease',
  },
  finalNetwork: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  networkNode: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 500,
  },
  networkLine: {
    width: '24px',
    height: '1px',
    background: '#F88545',
  },
};