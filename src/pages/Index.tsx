import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const DOCTOR_IMG = 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/b5f93af1-180e-4be0-adf7-6758837a4979.jpg';

const navLinks = [
  { label: 'О клинике', id: 'about' },
  { label: 'Услуги', id: 'procedures' },
  { label: 'Направления', id: 'directions' },
  { label: 'Врач', id: 'doctor' },
  { label: 'До/После', id: 'results' },
  { label: 'Цены', id: 'prices' },
  { label: 'Отзывы', id: 'reviews' },
  { label: 'Контакты', id: 'contacts' },
];

const heroStats = [
  { icon: 'GraduationCap', value: '15+ лет', label: 'практики' },
  { icon: 'Users', value: '3000+', label: 'довольных пациентов' },
  { icon: 'Award', value: 'Кандидат', label: 'медицинских наук' },
  { icon: 'Leaf', value: 'Авторские', label: 'протоколы омоложения' },
];

const philosophy = [
  { icon: 'Microscope', title: 'Диагностика', text: 'Сначала определяем истинные причины возрастных изменений и проблем кожи.' },
  { icon: 'Stethoscope', title: 'Медицинский подход', text: 'Каждая рекомендация основана на состоянии вашего организма.' },
  { icon: 'ClipboardList', title: 'Индивидуальный план', text: 'Никаких шаблонных схем. Только персональные решения для вашего результата.' },
  { icon: 'Cpu', title: 'Современное оборудование', text: 'Используем проверенные аппараты экспертного класса и сертифицированные препараты.' },
  { icon: 'ShieldCheck', title: 'Безопасность', text: 'Учитываем противопоказания, аллергии и анамнез для вашей безопасности.' },
  { icon: 'CheckCircle2', title: 'Контроль результата', text: 'Сопровождаем на всех этапах и контролируем динамику ваших изменений.' },
];

const directions = [
  'Морщины и тонкие линии', 'Потеря овала лица', 'Второй подбородок',
  'Пигментация и неровный тон', 'Купероз и сосуды', 'Акне и постакне',
  'Выпадение волос', 'Интимное омоложение', 'Коррекция губ и контуров лица',
];

const procedures = [
  { name: 'SMAS-лифтинг Doublo', price: 'от 12 000 ₽ – 60 000 ₽', text: 'Ультразвуковая подтяжка кожи без операции. Чёткий овал лица, лифтинг и уплотнение тканей.' },
  { name: 'RF-лифтинг Vivace Secret RF', price: 'от 14 000 ₽ – 33 000 ₽', text: 'Микроигольчатый RF-лифтинг для уплотнения кожи, сужения пор и стимуляции коллагена.' },
  { name: 'Фотоомоложение Lumenis M22', price: 'от 7 000 ₽ – 22 000 ₽', text: 'Устранение пигментации, сосудов, покраснений. Выравнивание тона и улучшение качества кожи.' },
  { name: 'Биоревитализация', price: 'от 8 000 ₽ – 34 000 ₽', text: 'Глубокое увлажнение, повышение упругости и тонуса кожи, сияние и здоровый вид.' },
  { name: 'Скульптурирование филлерами', price: 'от 10 500 ₽ – 45 000 ₽', text: 'Коррекция объёмов, скул, подбородка и контуров лица. Гармонизация и естественный результат.' },
  { name: 'Ботулинотерапия', price: 'от 1 500 ₽ – 54 000 ₽', text: 'Разглаживание мимических морщин, профилактика возрастных изменений, коррекция гипергидроза.' },
];

const cases = [
  { age: '45 лет', problem: 'потеря чёткости овала лица, снижение упругости кожи', proc: 'SMAS-лифтинг Doublo + биоревитализация', term: '3 месяца' },
  { age: '39 лет', problem: 'пигментация, неровный тон кожи', proc: 'фотоомоложение Lumenis M22 + мезотерапия', term: '1 месяц' },
  { age: '42 года', problem: 'морщины в области лба и глаз', proc: 'фотолинотерапия + биоревитализация', term: '14 дней' },
];

const doctorNumbers = [
  { icon: 'GraduationCap', value: '15+ лет', label: 'опыта' },
  { icon: 'Users', value: '3000+', label: 'довольных пациентов' },
  { icon: 'BookOpen', value: '100+', label: 'обучений и семинаров' },
  { icon: 'Trophy', value: '50+', label: 'конференций и конгрессов' },
];

const priceCategories = ['Лицо', 'Инъекции', 'Аппаратная косметология', 'Уходы', 'Капельницы', 'Интимное омоложение'];

const priceData: Record<string, { name: string; price: string }[]> = {
  'Лицо': [
    { name: 'Чистка лица комбинированная', price: '4 500 ₽' },
    { name: 'Пилинг срединный', price: '6 000 ₽' },
    { name: 'Карбоновый пилинг', price: '5 500 ₽' },
  ],
  'Инъекции': [
    { name: 'Ботулинотерапия (1 ед.)', price: '350 ₽' },
    { name: 'Биоревитализация', price: 'от 8 000 ₽' },
    { name: 'Контурная пластика губ', price: 'от 18 000 ₽' },
  ],
  'Аппаратная косметология': [
    { name: 'SMAS-лифтинг Doublo', price: 'от 12 000 ₽' },
    { name: 'RF-лифтинг Vivace', price: 'от 14 000 ₽' },
    { name: 'Фотоомоложение M22', price: 'от 7 000 ₽' },
  ],
  'Уходы': [
    { name: 'Уход увлажняющий', price: '5 000 ₽' },
    { name: 'Anti-Age уход', price: '7 500 ₽' },
    { name: 'Лифтинг-уход', price: '6 500 ₽' },
  ],
  'Капельницы': [
    { name: 'Детокс-капельница', price: '6 000 ₽' },
    { name: 'Витаминный коктейль', price: '5 000 ₽' },
    { name: 'NAD+ омоложение', price: 'от 12 000 ₽' },
  ],
  'Интимное омоложение': [
    { name: 'Лазерное омоложение', price: 'от 15 000 ₽' },
    { name: 'Биоревитализация', price: 'от 12 000 ₽' },
    { name: 'Контурная пластика', price: 'от 20 000 ₽' },
  ],
};

const reviews = [
  { name: 'Ольга, 47 лет', problem: 'Овал лица', text: 'Лариса Леонидовна составила персональный план. Результат естественный — никто не догадался о процедурах, только отмечают, что выгляжу отдохнувшей.' },
  { name: 'Мария, 38 лет', problem: 'Пигментация', text: 'После курса фотоомоложения тон кожи выровнялся полностью. Очень внимательный подход и подробные рекомендации по уходу.' },
  { name: 'Елена, 52 года', problem: 'Возрастные изменения', text: 'Наблюдаюсь уже два года. Всегда честно говорят, что нужно, а что нет. Доверяю на 100%, результат превзошёл ожидания.' },
];

const Index = () => {
  const [activeCase, setActiveCase] = useState(0);
  const [activeCat, setActiveCat] = useState(priceCategories[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowQuiz(true), 28000);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => { clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const quizQuestions = [
    { q: 'Что вас беспокоит больше всего?', opts: ['Морщины', 'Овал лица', 'Пигментация', 'Качество кожи'] },
    { q: 'Ваш возраст?', opts: ['до 30', '30–40', '40–50', '50+'] },
    { q: 'Делали ли вы процедуры раньше?', opts: ['Да, регулярно', 'Пару раз', 'Нет, впервые'] },
    { q: 'Какой результат хотите?', opts: ['Лёгкое освежение', 'Заметное омоложение', 'Глубокая коррекция'] },
    { q: 'Когда планируете начать?', opts: ['На этой неделе', 'В этом месяце', 'Пока выбираю'] },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur shadow-sm' : 'bg-cream/80'}`}>
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-gold flex items-center justify-center text-gold">
              <Icon name="Flower2" size={22} />
            </div>
            <div className="leading-tight">
              <div className="font-display text-2xl font-semibold tracking-wide">СКЛ</div>
              <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Студия Красивых Людей</div>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-foreground/80 hover:text-gold transition-colors">
                {l.label}
              </button>
            ))}
          </nav>
          <Button onClick={() => scrollTo('booking')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md px-5 hidden md:flex">
            Записаться на консультацию
          </Button>
        </div>
      </header>

      {/* HERO */}
      <section id="about" className="pt-20 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center min-h-[90vh] py-10">
          <div className="animate-fade-in">
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-6">Косметология экспертного уровня</p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
              Красота начинается<br />не с процедуры.<br />
              <span className="text-gold">Красота начинается<br />с диагностики.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-8">
              Персональная стратегия омоложения на основе диагностики, анализа состояния кожи и медицинского подхода.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button onClick={() => scrollTo('booking')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 px-7">
                Записаться на консультацию
              </Button>
              <Button variant="outline" className="rounded-md h-12 px-7 border-foreground/20">
                <Icon name="Play" size={16} className="mr-2" /> Смотреть видео
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-xl">
              {heroStats.map((s) => (
                <div key={s.label} className="flex flex-col gap-2">
                  <Icon name={s.icon} size={26} className="text-gold" />
                  <div className="font-semibold text-sm">{s.value}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Мы не меняем лица.<br />Мы помогаем сохранить вашу естественную красоту и уверенность.
            </p>
          </div>
          <div className="relative">
            <img src={DOCTOR_IMG} alt="Лариса Леонидовна Вороник" className="w-full rounded-2xl object-cover shadow-xl" />
            <div className="absolute bottom-6 right-6 bg-cream/95 backdrop-blur rounded-xl p-5 max-w-[230px] shadow-lg border border-border">
              <p className="font-display text-xl font-semibold mb-3">Лариса Леонидовна Вороник</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {['Кандидат медицинских наук', 'Врач-косметолог', 'Дерматолог', 'Геронтолог', 'Anti-Age эксперт'].map((i) => (
                  <li key={i} className="flex items-center gap-2"><Icon name="ChevronRight" size={12} className="text-gold" />{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">Почему пациенты выбирают СКЛ</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Мы лечим причину,<br />а не маскируем последствия</h2>
            <p className="text-muted-foreground">Комплексный медицинский подход для вашей красоты и здоровья</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophy.map((p) => (
              <div key={p.title} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-5 text-gold">
                  <Icon name={p.icon} size={28} />
                </div>
                <h3 className="font-display text-2xl mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section id="directions" className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">03 — Направления косметологии</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 max-w-2xl">Какая задача беспокоит вас сегодня?</h2>
          <p className="text-muted-foreground mb-12 max-w-md">Выберите направление и получите персональные рекомендации врача.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {directions.map((d, i) => (
              <button key={d} onClick={() => scrollTo('booking')} className="group bg-card rounded-xl p-7 border border-border text-left hover:border-gold hover:shadow-lg transition-all">
                <span className="font-display text-2xl text-gold/70">0{i + 1}</span>
                <p className="font-medium text-lg mt-2 mb-4 min-h-[3.5rem]">{d}</p>
                <span className="w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-colors">
                  <Icon name="ArrowRight" size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROCEDURES */}
      <section id="procedures" className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">04 — Популярные процедуры</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4 max-w-2xl">Самые востребованные процедуры клиники</h2>
          <p className="text-muted-foreground mb-12 max-w-lg">Подбираем эффективные и безопасные методики для естественного омоложения и здоровья кожи.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {procedures.map((p) => (
              <div key={p.name} className="bg-card rounded-xl p-7 border border-border hover:shadow-lg transition-shadow flex flex-col">
                <h3 className="font-display text-2xl mb-3">{p.name}</h3>
                <div className="w-10 h-px bg-gold mb-3" />
                <p className="text-gold font-semibold mb-4">{p.price}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{p.text}</p>
                <Button variant="outline" onClick={() => scrollTo('booking')} className="rounded-md border-gold/40 text-foreground hover:bg-gold hover:text-primary-foreground w-fit">
                  Подробнее
                </Button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => scrollTo('prices')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 px-8">
              Посмотреть все услуги <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* RESULTS / BEFORE-AFTER */}
      <section id="results" className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">05 — Результаты наших пациентов</p>
            <h2 className="font-display text-4xl md:text-5xl mb-5">Естественные изменения без эффекта «переколотого лица»</h2>
            <p className="text-muted-foreground mb-8">Мы работаем с причиной возрастных изменений и добиваемся натурального результата.</p>
            <div className="flex gap-3">
              <button onClick={() => setActiveCase((activeCase + cases.length - 1) % cases.length)} className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors">
                <Icon name="ArrowLeft" size={18} />
              </button>
              <button onClick={() => setActiveCase((activeCase + 1) % cases.length)} className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors">
                <Icon name="ArrowRight" size={18} />
              </button>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">* Результаты индивидуальны и могут отличаться</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-muted flex">
              <div className="w-1/2 relative">
                <img src={DOCTOR_IMG} alt="до" className="w-full h-full object-cover grayscale" />
                <span className="absolute top-3 left-3 bg-foreground/70 text-white text-xs px-3 py-1 rounded">ДО</span>
              </div>
              <div className="w-1/2 relative">
                <img src={DOCTOR_IMG} alt="после" className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-gold text-primary-foreground text-xs px-3 py-1 rounded">ПОСЛЕ</span>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gold">
                <Icon name="ChevronsLeftRight" size={18} />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-gold font-semibold text-lg">{cases[activeCase].age}</p>
              <p className="text-sm"><span className="text-muted-foreground">Проблема:</span> {cases[activeCase].problem}</p>
              <p className="text-sm"><span className="text-muted-foreground">Процедуры:</span> {cases[activeCase].proc}</p>
              <p className="text-sm"><span className="text-muted-foreground">Срок результата:</span> {cases[activeCase].term}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section id="doctor" className="py-24 bg-foreground text-cream relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-center">
          <img src={DOCTOR_IMG} alt="Лариса Леонидовна Вороник" className="rounded-2xl object-cover w-full shadow-2xl" />
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">06 — Ваш врач</p>
            <h2 className="font-display text-4xl md:text-5xl mb-3">Ваш врач на каждом этапе лечения</h2>
            <p className="font-display text-3xl text-gold mb-4">Лариса Леонидовна Вороник</p>
            <p className="text-cream/80 mb-2">Кандидат медицинских наук</p>
            <p className="text-cream/80 mb-6">Врач-косметолог | Дерматолог | Геронтолог | Anti-Age эксперт</p>
            <p className="text-cream/70 max-w-lg mb-10 leading-relaxed">
              Более 15 лет помогаю пациентам сохранять естественную красоту и продлевать молодость с помощью современных научных методов и передовых технологий.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {doctorNumbers.map((n) => (
                <div key={n.label}>
                  <Icon name={n.icon} size={26} className="text-gold mb-2" />
                  <div className="font-display text-3xl">{n.value}</div>
                  <div className="text-xs text-cream/60">{n.label}</div>
                </div>
              ))}
            </div>
            <Button onClick={() => scrollTo('booking')} className="bg-gold hover:bg-primary text-primary-foreground rounded-md h-12 px-8">
              Записаться на консультацию
            </Button>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 bg-background">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">07 — Стоимость процедур</p>
          <h2 className="font-display text-4xl md:text-5xl mb-10 max-w-2xl">Прозрачные цены на услуги клиники</h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {priceCategories.map((c) => (
              <button key={c} onClick={() => setActiveCat(c)} className={`px-5 py-2.5 rounded-full text-sm transition-colors ${activeCat === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-gold/20'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {priceData[activeCat].map((p) => (
              <div key={p.name} className="bg-card rounded-xl p-7 border border-border flex flex-col justify-between gap-4 hover:shadow-lg transition-shadow">
                <p className="font-medium text-lg">{p.name}</p>
                <p className="text-gold font-semibold text-xl">{p.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button onClick={() => scrollTo('booking')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 px-8">
              Получить персональный план лечения
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">08 — Отзывы пациентов</p>
          <h2 className="font-display text-4xl md:text-5xl mb-12 max-w-2xl">Нам доверяют свою красоту</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-card rounded-xl p-8 border border-border flex flex-col">
                <Icon name="Quote" size={32} className="text-gold/40 mb-4" />
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{r.text}</p>
                <div className="flex gap-1 text-gold mb-3">
                  {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={16} />)}
                </div>
                <p className="font-medium">{r.name}</p>
                <p className="text-xs text-gold">{r.problem}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-24 bg-background">
        <div className="max-w-[1000px] mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">09 — Онлайн-запись</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Запишитесь на консультацию</h2>
          <p className="text-muted-foreground mb-10">Заполните форму — администратор перезвонит и подберёт удобное время.</p>
          <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-lg text-left grid sm:grid-cols-2 gap-5">
            <input placeholder="Ваше имя" className="border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold transition-colors" />
            <input placeholder="Телефон" className="border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold transition-colors" />
            <select className="border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold transition-colors sm:col-span-2 text-muted-foreground">
              <option>Выберите направление</option>
              {directions.map((d) => <option key={d}>{d}</option>)}
            </select>
            <textarea placeholder="Комментарий (необязательно)" rows={3} className="border border-border rounded-md px-4 py-3 bg-background outline-none focus:border-gold transition-colors sm:col-span-2 resize-none" />
            <Button className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 sm:col-span-2">
              Записаться на консультацию
            </Button>
          </div>
        </div>
      </section>

      {/* CONTACTS / FOOTER */}
      <footer id="contacts" className="bg-foreground text-cream py-16">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full border-2 border-gold flex items-center justify-center text-gold">
                <Icon name="Flower2" size={22} />
              </div>
              <div>
                <div className="font-display text-2xl">СКЛ</div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-cream/50">Студия Красивых Людей</div>
              </div>
            </div>
            <p className="text-sm text-cream/60 max-w-xs">Косметология экспертного уровня. Естественная красота на основе медицинского подхода.</p>
          </div>
          <div>
            <p className="font-display text-2xl mb-4">Контакты</p>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-center gap-3"><Icon name="Phone" size={16} className="text-gold" /> +7 (812) 425-35-35</li>
              <li className="flex items-center gap-3"><Icon name="Clock" size={16} className="text-gold" /> Ежедневно с 10:00 до 20:00</li>
              <li className="flex items-center gap-3"><Icon name="MapPin" size={16} className="text-gold" /> Санкт-Петербург</li>
            </ul>
          </div>
          <div>
            <p className="font-display text-2xl mb-4">Навигация</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-cream/70">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left hover:text-gold transition-colors">{l.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 mt-12 pt-6 border-t border-cream/10 text-xs text-cream/40">
          © 2026 Студия Красивых Людей. Все права защищены.
        </div>
      </footer>

      {/* STICKY CTA */}
      <button onClick={() => scrollTo('booking')} className="fixed bottom-6 right-6 z-40 bg-gold hover:bg-primary text-primary-foreground rounded-full h-14 px-7 shadow-xl flex items-center gap-2 transition-colors font-medium">
        <Icon name="CalendarheartIcon" fallback="Calendar" size={18} /> Записаться
      </button>

      {/* QUIZ POPUP */}
      {showQuiz && (
        <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-cream rounded-2xl max-w-lg w-full p-8 relative shadow-2xl">
            <button onClick={() => setShowQuiz(false)} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground">
              <Icon name="X" size={22} />
            </button>
            {quizStep < quizQuestions.length ? (
              <>
                <p className="text-xs tracking-[0.2em] uppercase text-gold mb-2">Шаг {quizStep + 1} из {quizQuestions.length + 1}</p>
                <div className="w-full h-1 bg-secondary rounded-full mb-6">
                  <div className="h-1 bg-gold rounded-full transition-all" style={{ width: `${((quizStep + 1) / (quizQuestions.length + 1)) * 100}%` }} />
                </div>
                <h3 className="font-display text-3xl mb-6">{quizQuestions[quizStep].q}</h3>
                <div className="grid gap-3">
                  {quizQuestions[quizStep].opts.map((o) => (
                    <button key={o} onClick={() => setQuizStep(quizStep + 1)} className="border border-border rounded-md h-12 px-4 text-left hover:border-gold hover:bg-gold/10 transition-colors">
                      {o}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center mx-auto mb-5">
                  <Icon name="Sparkles" size={30} />
                </div>
                <h3 className="font-display text-3xl mb-3">Ваш план готов на 80%!</h3>
                <p className="text-muted-foreground mb-6">Оставьте телефон — врач завершит персональный план и проведёт бесплатную консультацию со скидкой 10%.</p>
                <input placeholder="Ваш телефон" className="w-full border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold mb-4" />
                <Button className="w-full bg-primary hover:bg-gold text-primary-foreground rounded-md h-12">
                  Получить персональный план
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
