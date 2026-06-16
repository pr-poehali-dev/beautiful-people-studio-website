import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import BeforeAfter from '@/components/BeforeAfter';

const LOGO = 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/bucket/f6ff109a-5ca0-4a8f-a5c9-03907212d06f.jpg';
const DOCTOR_IMG = 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/b5f93af1-180e-4be0-adf7-6758837a4979.jpg';

const IMG = {
  morsh: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/f725ae11-e803-45d8-b941-313933007b58.jpg',
  oval: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/8ac0838b-b371-4105-8873-9798b878579a.jpg',
  skin: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/2ae91e58-a407-48bd-ae5b-5967268cc00a.jpg',
  smas: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/fec830c8-b6bd-4781-bb12-44e8d6c162e6.jpg',
  inj: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/eaacd0b5-3753-49e5-92bd-40e796a394f4.jpg',
  photo: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/ae622c83-170a-4c5f-a9fa-b81ae94bfdbb.jpg',
};

const navLinks = [
  { label: 'О клинике', id: 'about' },
  { label: 'Услуги', id: 'procedures' },
  { label: 'Направления', id: 'directions' },
  { label: 'Врач', id: 'doctor' },
  { label: 'Цены', id: 'prices' },
  { label: 'Результаты', id: 'results' },
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
  { t: 'Морщины и тонкие линии', img: IMG.morsh },
  { t: 'Потеря овала лица', img: IMG.oval },
  { t: 'Второй подбородок', img: IMG.skin },
  { t: 'Пигментация и неровный тон', img: IMG.morsh },
  { t: 'Купероз и сосуды', img: IMG.oval },
  { t: 'Акне и постакне', img: IMG.skin },
  { t: 'Выпадение волос', img: IMG.morsh },
  { t: 'Интимное омоложение', img: IMG.skin },
  { t: 'Коррекция губ и контуров лица', img: IMG.oval },
];

const procedures = [
  { name: 'SMAS-лифтинг Doublo', price: 'от 12 000 ₽ – 60 000 ₽', img: IMG.smas, text: 'Ультразвуковая подтяжка кожи без операции. Чёткий овал лица, лифтинг и уплотнение тканей.' },
  { name: 'RF-лифтинг Vivace Secret RF', price: 'от 14 000 ₽ – 33 000 ₽', img: IMG.inj, text: 'Микроигольчатый RF-лифтинг для уплотнения кожи, сужения пор и стимуляции коллагена.' },
  { name: 'Фотоомоложение Lumenis M22', price: 'от 7 000 ₽ – 22 000 ₽', img: IMG.photo, text: 'Устранение пигментации, сосудов, покраснений. Выравнивание тона и улучшение качества кожи.' },
  { name: 'Биоревитализация', price: 'от 8 000 ₽ – 34 000 ₽', img: IMG.inj, text: 'Глубокое увлажнение, повышение упругости и тонуса кожи, сияние и здоровый вид.' },
  { name: 'Скульптурирование филлерами', price: 'от 10 500 ₽ – 45 000 ₽', img: IMG.inj, text: 'Коррекция объёмов, скул, подбородка и контуров лица. Гармонизация и естественный результат.' },
  { name: 'Ботулинотерапия', price: 'от 1 500 ₽ – 54 000 ₽', img: IMG.smas, text: 'Разглаживание мимических морщин, профилактика возрастных изменений, коррекция гипергидроза.' },
];

const cases = [
  { age: '45 лет', before: IMG.morsh, after: IMG.oval, problem: 'потеря чёткости овала лица, снижение упругости кожи', proc: 'SMAS-лифтинг Doublo + биоревитализация', term: '3 месяца' },
  { age: '39 лет', before: IMG.oval, after: IMG.skin, problem: 'пигментация, неровный тон кожи', proc: 'фотоомоложение Lumenis M22 + мезотерапия', term: '1 месяц' },
  { age: '42 года', before: IMG.skin, after: IMG.morsh, problem: 'морщины в области лба и глаз', proc: 'ботулинотерапия + биоревитализация', term: '14 дней' },
];

const doctorNumbers = [
  { icon: 'GraduationCap', value: '15+ лет', label: 'опыта' },
  { icon: 'Users', value: '3000+', label: 'довольных пациентов' },
  { icon: 'BookOpen', value: '100+', label: 'обучений и семинаров' },
  { icon: 'Trophy', value: '50+', label: 'конференций и конгрессов' },
];

const priceCategories = ['Лицо', 'Инъекции', 'Аппаратная косметология', 'Уходы', 'Капельницы', 'Интимное омоложение'];
const priceData: Record<string, { name: string; price: string }[]> = {
  'Лицо': [{ name: 'Чистка лица комбинированная', price: '4 500 ₽' }, { name: 'Пилинг срединный', price: '6 000 ₽' }, { name: 'Карбоновый пилинг', price: '5 500 ₽' }],
  'Инъекции': [{ name: 'Ботулинотерапия (1 ед.)', price: '350 ₽' }, { name: 'Биоревитализация', price: 'от 8 000 ₽' }, { name: 'Контурная пластика губ', price: 'от 18 000 ₽' }],
  'Аппаратная косметология': [{ name: 'SMAS-лифтинг Doublo', price: 'от 12 000 ₽' }, { name: 'RF-лифтинг Vivace', price: 'от 14 000 ₽' }, { name: 'Фотоомоложение M22', price: 'от 7 000 ₽' }],
  'Уходы': [{ name: 'Уход увлажняющий', price: '5 000 ₽' }, { name: 'Anti-Age уход', price: '7 500 ₽' }, { name: 'Лифтинг-уход', price: '6 500 ₽' }],
  'Капельницы': [{ name: 'Детокс-капельница', price: '6 000 ₽' }, { name: 'Витаминный коктейль', price: '5 000 ₽' }, { name: 'NAD+ омоложение', price: 'от 12 000 ₽' }],
  'Интимное омоложение': [{ name: 'Лазерное омоложение', price: 'от 15 000 ₽' }, { name: 'Биоревитализация', price: 'от 12 000 ₽' }, { name: 'Контурная пластика', price: 'от 20 000 ₽' }],
};

const reviews = [
  { name: 'Ольга, 47 лет', problem: 'Овал лица', text: 'Лариса Леонидовна составила персональный план. Результат естественный — никто не догадался о процедурах, только отмечают, что выгляжу отдохнувшей.' },
  { name: 'Мария, 38 лет', problem: 'Пигментация', text: 'После курса фотоомоложения тон кожи выровнялся полностью. Очень внимательный подход и подробные рекомендации по уходу.' },
  { name: 'Елена, 52 года', problem: 'Возрастные изменения', text: 'Наблюдаюсь уже два года. Всегда честно говорят, что нужно, а что нет. Доверяю на 100%, результат превзошёл ожидания.' },
];

const Logo = ({ dark = false }: { dark?: boolean }) => (
  <div className="flex items-center gap-3">
    <img src={LOGO} alt="СКЛ" className="w-11 h-11 rounded-full object-cover bg-white" />
    <div className="leading-tight">
      <div className={`font-display text-2xl font-semibold tracking-wide ${dark ? 'text-cream' : ''}`}>СКЛ</div>
      <div className={`text-[10px] tracking-[0.2em] uppercase ${dark ? 'text-cream/50' : 'text-muted-foreground'}`}>Студия Красивых Людей</div>
    </div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const [activeCase, setActiveCase] = useState(0);
  const [activeCat, setActiveCat] = useState(priceCategories[0]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${scrolled ? 'bg-cream/95 backdrop-blur shadow-sm' : 'bg-cream/80'}`}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-6 h-20 flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden xl:flex items-center gap-6 text-sm">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-foreground/80 hover:text-gold transition-colors">{l.label}</button>
            ))}
          </nav>
          <div className="hidden lg:flex flex-col items-end leading-tight mr-1">
            <a href="tel:+79789049640" className="font-semibold text-foreground hover:text-gold transition-colors">+7 978 904-96-40</a>
            <span className="text-xs text-muted-foreground">Ежедневно с 10:00 до 20:00</span>
          </div>
          <Button onClick={() => scrollTo('booking')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md px-5 hidden md:flex">Записаться</Button>
          <button onClick={() => setMenuOpen(true)} className="xl:hidden w-11 h-11 flex items-center justify-center text-foreground" aria-label="Меню">
            <Icon name="Menu" size={26} />
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-cream flex flex-col p-6 animate-fade-in xl:hidden">
          <div className="flex items-center justify-between mb-10">
            <Logo />
            <button onClick={() => setMenuOpen(false)} className="w-11 h-11 flex items-center justify-center"><Icon name="X" size={28} /></button>
          </div>
          <nav className="flex flex-col gap-5 text-2xl font-display">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left hover:text-gold transition-colors">{l.label}</button>
            ))}
          </nav>
          <div className="mt-auto space-y-4">
            <a href="tel:+79789049640" className="block font-semibold text-lg text-gold">+7 978 904-96-40</a>
            <Button onClick={() => scrollTo('booking')} className="w-full bg-primary hover:bg-gold text-primary-foreground rounded-md h-12">Записаться на консультацию</Button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section id="about" className="pt-20 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center min-h-[90vh] py-10">
          <div className="animate-fade-in">
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-6">Косметология экспертного уровня</p>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
              Красота начинается<br />не с процедуры.<br />
              <span className="text-gold">Красота начинается<br />с диагностики.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-8">Персональная стратегия омоложения на основе диагностики, анализа состояния кожи и медицинского подхода.</p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button onClick={() => scrollTo('booking')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 px-7">Записаться на консультацию</Button>
              <Button variant="outline" onClick={() => scrollTo('doctor')} className="rounded-md h-12 px-7 border-foreground/20"><Icon name="Play" size={16} className="mr-2" /> Смотреть видео</Button>
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
          </div>
          <div className="relative">
            <img src={DOCTOR_IMG} alt="Лариса Леонидовна Воловик" className="w-full rounded-2xl object-cover shadow-xl" />
            <div className="absolute bottom-6 right-6 bg-cream/95 backdrop-blur rounded-xl p-5 max-w-[230px] shadow-lg border border-border">
              <p className="font-display text-xl font-semibold mb-3">Лариса Леонидовна Воловик</p>
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
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">02 — Почему пациенты выбирают СКЛ</p>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Мы лечим причину,<br />а не маскируем последствия</h2>
            <p className="text-muted-foreground">Комплексный медицинский подход для вашей красоты и здоровья</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophy.map((p) => (
              <div key={p.title} className="bg-card rounded-xl p-8 border border-border hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-5 text-gold"><Icon name={p.icon} size={28} /></div>
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
              <button key={d.t} onClick={() => scrollTo('booking')} className="group relative overflow-hidden bg-card rounded-xl border border-border text-left hover:border-gold hover:shadow-lg transition-all flex">
                <div className="p-6 flex flex-col justify-between flex-1">
                  <span className="font-display text-2xl text-gold/70">0{i + 1}</span>
                  <div>
                    <p className="font-medium text-lg mt-2 mb-4">{d.t}</p>
                    <span className="w-9 h-9 rounded-full border border-gold/50 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-colors"><Icon name="ArrowRight" size={16} /></span>
                  </div>
                </div>
                <img src={d.img} alt={d.t} className="w-28 sm:w-32 object-cover group-hover:scale-105 transition-transform duration-500" />
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
              <div key={p.name} className="bg-card rounded-xl border border-border hover:shadow-lg transition-shadow flex flex-col overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-52 object-cover" />
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-2xl mb-3">{p.name}</h3>
                  <div className="w-10 h-px bg-gold mb-3" />
                  <p className="text-gold font-semibold mb-4">{p.price}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{p.text}</p>
                  <Button variant="outline" onClick={() => scrollTo('booking')} className="rounded-md border-gold/40 text-foreground hover:bg-gold hover:text-primary-foreground w-fit">Подробнее</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button onClick={() => scrollTo('prices')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 px-8">Посмотреть все услуги <Icon name="ArrowRight" size={16} className="ml-2" /></Button>
          </div>
        </div>
      </section>

      {/* RESULTS / BEFORE-AFTER */}
      <section id="results" className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[1fr_1.4fr] gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">05 — Результаты наших пациентов</p>
            <h2 className="font-display text-4xl md:text-5xl mb-5">Естественные изменения без эффекта «переколотого лица»</h2>
            <p className="text-muted-foreground mb-8">Мы работаем с причиной возрастных изменений и добиваемся натурального результата. Потяните ползунок, чтобы увидеть результат.</p>
            <div className="flex gap-3">
              <button onClick={() => setActiveCase((activeCase + cases.length - 1) % cases.length)} className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors"><Icon name="ArrowLeft" size={18} /></button>
              <button onClick={() => setActiveCase((activeCase + 1) % cases.length)} className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors"><Icon name="ArrowRight" size={18} /></button>
            </div>
            <p className="mt-8 text-xs text-muted-foreground">* Результаты индивидуальны и могут отличаться</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-6 shadow-lg">
            <BeforeAfter before={cases[activeCase].before} after={cases[activeCase].after} />
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
          <img src={DOCTOR_IMG} alt="Лариса Леонидовна Воловик" className="rounded-2xl object-cover w-full shadow-2xl" />
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">06 — Ваш врач</p>
            <h2 className="font-display text-4xl md:text-5xl mb-3">Ваш врач на каждом этапе лечения</h2>
            <p className="font-display text-3xl text-gold mb-4">Лариса Леонидовна Воловик</p>
            <p className="text-cream/80 mb-2">Кандидат медицинских наук</p>
            <p className="text-cream/80 mb-6">Врач-косметолог | Дерматолог | Геронтолог | Anti-Age эксперт</p>
            <p className="text-cream/70 max-w-lg mb-8 leading-relaxed">Более 15 лет помогаю пациентам сохранять естественную красоту и продлевать молодость с помощью современных научных методов и передовых технологий.</p>
            <div className="bg-cream/5 border border-cream/10 rounded-xl p-6 max-w-lg mb-8">
              <Icon name="Quote" size={26} className="text-gold mb-2" />
              <p className="text-cream/90 italic">Я не просто выполняю процедуры. Я анализирую причины изменений и создаю индивидуальный план, который даёт естественный и стойкий результат.</p>
              <p className="font-hand text-2xl text-gold mt-3">Л. Л. Воловик</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
              {doctorNumbers.map((n) => (
                <div key={n.label}>
                  <Icon name={n.icon} size={26} className="text-gold mb-2" />
                  <div className="font-display text-3xl">{n.value}</div>
                  <div className="text-xs text-cream/60">{n.label}</div>
                </div>
              ))}
            </div>
            <Button onClick={() => scrollTo('booking')} className="bg-gold hover:bg-primary text-primary-foreground rounded-md h-12 px-8">Записаться на консультацию</Button>
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
              <button key={c} onClick={() => setActiveCat(c)} className={`px-5 py-2.5 rounded-full text-sm transition-colors ${activeCat === c ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground hover:bg-gold/20'}`}>{c}</button>
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
            <Button onClick={() => scrollTo('booking')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 px-8">Получить персональный план лечения</Button>
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
                <div className="flex gap-1 text-gold mb-3">{[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={16} />)}</div>
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
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">09 — Как записаться</p>
          <h2 className="font-display text-4xl md:text-5xl mb-4">Запишитесь на консультацию</h2>
          <p className="text-muted-foreground mb-10">Заполните форму или напишите в Direct — отвечаем быстро.</p>
          <div className="grid sm:grid-cols-3 gap-5 mb-10 text-left">
            <a href="tel:+79789049640" className="bg-card rounded-xl border border-border p-6 hover:border-gold transition-colors flex items-center gap-3">
              <Icon name="Phone" size={22} className="text-gold" /><div><div className="text-xs text-muted-foreground">Телефон</div><div className="font-medium">+7 978 904-96-40</div></div>
            </a>
            <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-3">
              <Icon name="MessageCircle" size={22} className="text-gold" /><div><div className="text-xs text-muted-foreground">Direct</div><div className="font-medium">Отвечаем быстро</div></div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-3">
              <Icon name="MapPin" size={22} className="text-gold" /><div><div className="text-xs text-muted-foreground">Адрес</div><div className="font-medium text-sm">Севастополь, пр. Античный, 4, оф. 28</div></div>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-lg text-left grid sm:grid-cols-2 gap-5">
            <input placeholder="Ваше имя" className="border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold transition-colors" />
            <input placeholder="Телефон" className="border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold transition-colors" />
            <select className="border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold transition-colors sm:col-span-2 text-muted-foreground">
              <option>Выберите направление</option>
              {directions.map((d) => <option key={d.t}>{d.t}</option>)}
            </select>
            <textarea placeholder="Комментарий (необязательно)" rows={3} className="border border-border rounded-md px-4 py-3 bg-background outline-none focus:border-gold transition-colors sm:col-span-2 resize-none" />
            <Button className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 sm:col-span-2">Записаться на консультацию</Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contacts" className="bg-foreground text-cream py-16">
        <div className="max-w-[1400px] mx-auto px-6 grid md:grid-cols-3 gap-10">
          <div>
            <div className="mb-5"><Logo dark /></div>
            <p className="text-sm text-cream/60 max-w-xs">Косметология экспертного уровня. Естественная красота на основе медицинского подхода.</p>
          </div>
          <div>
            <p className="font-display text-2xl mb-4">Контакты</p>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-center gap-3"><Icon name="Phone" size={16} className="text-gold" /> +7 978 904-96-40</li>
              <li className="flex items-center gap-3"><Icon name="Clock" size={16} className="text-gold" /> Ежедневно с 10:00 до 20:00</li>
              <li className="flex items-center gap-3"><Icon name="MapPin" size={16} className="text-gold" /> Севастополь, пр. Античный, д. 4, оф. 28</li>
            </ul>
          </div>
          <div>
            <p className="font-display text-2xl mb-4">Навигация</p>
            <div className="grid grid-cols-2 gap-2 text-sm text-cream/70">
              {navLinks.map((l) => (<button key={l.id} onClick={() => scrollTo(l.id)} className="text-left hover:text-gold transition-colors">{l.label}</button>))}
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 mt-12 pt-6 border-t border-cream/10 flex flex-col items-center gap-3 text-xs text-cream/50">
          <button onClick={() => navigate('/admin')} className="flex items-center gap-2 px-4 py-2 rounded-full border border-cream/20 hover:border-gold hover:text-gold transition-colors">
            <Icon name="Lock" size={14} /> Вход в админку
          </button>
          <a href="https://мастерскаягорбунова.рф" target="_blank" rel="noreferrer" className="hover:text-gold transition-colors">мастерскаягорбунова.рф</a>
          <p>© 2026 Студия Красивых Людей. Разработано в Мастерской Горбунова.</p>
        </div>
      </footer>

      {/* STICKY CTA + SCROLL TOP */}
      <button onClick={() => scrollTo('booking')} className="fixed bottom-6 right-6 z-30 bg-gold hover:bg-primary text-primary-foreground rounded-full h-14 px-7 shadow-xl flex items-center gap-2 transition-colors font-medium">
        <Icon name="Calendar" size={18} /> <span className="hidden sm:inline">Записаться</span>
      </button>
      {scrolled && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-24 right-6 z-30 w-12 h-12 rounded-full bg-cream border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-gold hover:text-primary-foreground transition-colors animate-fade-in" aria-label="Наверх">
          <Icon name="ChevronUp" size={22} />
        </button>
      )}
    </div>
  );
};

export default Index;
