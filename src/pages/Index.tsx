import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import BeforeAfter from '@/components/BeforeAfter';

const LOGO = 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/bucket/f6ff109a-5ca0-4a8f-a5c9-03907212d06f.jpg';

const PHOTOS = {
  hero1: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/bucket/463ee772-51e0-483c-8d25-4bd969b01cdd.jpg',
  hero2: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/bucket/6d0dd182-b414-404c-81d3-2652d88d2021.jpg',
  hero3: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/bucket/5b97fc98-a2d2-4076-8254-5e25888e9755.jpg',
  hero4: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/bucket/0e841e1b-b516-4d08-a0da-20b770af80e0.jpg',
  skull: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/bucket/649b3ed8-9982-4689-9a4b-ebde6d6d8ca1.jpg',
  morsh: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/400bb14e-6320-40b6-ba81-3852fd14a39a.jpg',
  oval: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/87f0a053-e545-4491-ac8b-a0d0be27be04.jpg',
  skin: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/7ab3445f-4246-4baf-95e3-e957fbdbd06d.jpg',
  pigment: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/b4afee88-bc60-402a-ba22-16621062cfbd.jpg',
  couperose: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/0d4ce58b-22df-480b-8a11-7483a316d0dd.jpg',
  acne: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/84bd4430-45a7-4a71-bae3-48bd7b87c416.jpg',
  hair: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/3775f7eb-e385-46e2-9ab8-a04554da5fc1.jpg',
  lips: 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/files/cc47ca9b-548a-4e39-b254-b1eb47328b55.jpg',
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

const philosophy = [
  { icon: 'Microscope', title: 'Диагностика', text: 'Сначала определяем истинные причины возрастных изменений и проблем кожи.' },
  { icon: 'Stethoscope', title: 'Медицинский подход', text: 'Каждая рекомендация основана на состоянии вашего организма.' },
  { icon: 'ClipboardList', title: 'Индивидуальный план', text: 'Никаких шаблонных схем. Только персональные решения для вашего результата.' },
  { icon: 'Cpu', title: 'Современное оборудование', text: 'Используем проверенные аппараты экспертного класса и сертифицированные препараты.' },
  { icon: 'ShieldCheck', title: 'Безопасность', text: 'Учитываем противопоказания, аллергии и анамнез для вашей безопасности.' },
  { icon: 'CheckCircle2', title: 'Контроль результата', text: 'Сопровождаем на всех этапах и контролируем динамику ваших изменений.' },
];

const directions = [
  { t: 'Морщины и возрастные изменения', img: PHOTOS.morsh },
  { t: 'Потеря овала лица', img: PHOTOS.oval },
  { t: 'Акне', img: PHOTOS.acne },
  { t: 'Постуре фигуры', img: PHOTOS.skin },
  { t: 'Пигментация', img: PHOTOS.pigment },
  { t: 'Купероз и сосуды', img: PHOTOS.couperose },
  { t: 'Отёчность и мешки', img: PHOTOS.morsh },
  { t: 'Выпадение волос', img: PHOTOS.hair },
  { t: 'Коррекция губ и контуров', img: PHOTOS.lips },
  { t: 'Интимное здоровье', img: PHOTOS.skin },
];

const procedures = [
  { name: 'SMAS-лифтинг Doublo', price: 'от 12 000 ₽ – 60 000 ₽', img: PHOTOS.smas, text: 'Ультразвуковая подтяжка кожи без операции. Чёткий овал лица, лифтинг и уплотнение тканей.' },
  { name: 'RF-лифтинг Vivace Secret RF', price: 'от 14 000 ₽ – 33 000 ₽', img: PHOTOS.inj, text: 'Микроигольчатый RF-лифтинг для уплотнения кожи, сужения пор и стимуляции коллагена.' },
  { name: 'Фотоомоложение Lumenis M22', price: 'от 7 000 ₽ – 22 000 ₽', img: PHOTOS.photo, text: 'Устранение пигментации, сосудов, покраснений. Выравнивание тона и улучшение качества кожи.' },
  { name: 'Биоревитализация', price: 'от 8 000 ₽ – 34 000 ₽', img: PHOTOS.inj, text: 'Глубокое увлажнение, повышение упругости и тонуса кожи, сияние и здоровый вид.' },
  { name: 'Скульптурирование филлерами', price: 'от 10 500 ₽ – 45 000 ₽', img: PHOTOS.inj, text: 'Коррекция объёмов, скул, подбородка и контуров лица. Гармонизация и естественный результат.' },
  { name: 'Ботулинотерапия', price: 'от 1 500 ₽ – 54 000 ₽', img: PHOTOS.smas, text: 'Разглаживание мимических морщин, профилактика возрастных изменений, коррекция гипергидроза.' },
];

const cases = [
  { age: '45 лет', before: PHOTOS.morsh, after: PHOTOS.oval, problem: 'потеря чёткости овала лица, снижение упругости кожи', proc: 'SMAS-лифтинг Doublo + биоревитализация', term: '3 месяца' },
  { age: '39 лет', before: PHOTOS.pigment, after: PHOTOS.skin, problem: 'пигментация, неровный тон кожи', proc: 'фотоомоложение Lumenis M22 + мезотерапия', term: '1 месяц' },
  { age: '42 года', before: PHOTOS.couperose, after: PHOTOS.morsh, problem: 'морщины в области лба и глаз', proc: 'ботулинотерапия + биоревитализация', term: '14 дней' },
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
          <div className="flex items-center justify-between mb-6">
            <Logo />
            <button onClick={() => setMenuOpen(false)} className="w-11 h-11 flex items-center justify-center"><Icon name="X" size={28} /></button>
          </div>
          <Button onClick={() => scrollTo('booking')} className="w-full bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 mb-6">
            <Icon name="Calendar" size={18} className="mr-2" /> Записаться на консультацию
          </Button>
          <nav className="flex flex-col gap-4 text-xl font-display">
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left hover:text-gold transition-colors border-b border-border pb-4">{l.label}</button>
            ))}
          </nav>
          <div className="mt-auto space-y-1">
            <a href="tel:+79789049640" className="block font-semibold text-lg text-gold">+7 978 904-96-40</a>
            <p className="text-sm text-muted-foreground">Севастополь, пр. Античный, 4, оф. 28</p>
          </div>
        </div>
      )}

      {/* HERO — по скриншоту 1:1 */}
      <section id="about" className="pt-20 bg-cream overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 py-10 lg:py-0">
          <div className="grid lg:grid-cols-[1fr_1fr] min-h-[88vh] gap-0">
            {/* LEFT */}
            <div className="flex flex-col justify-center py-10 lg:pr-12">
              <p className="text-xs tracking-[0.25em] uppercase text-gold mb-5">Косметология экспертного уровня</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5">
                Красота начинается<br />не с процедуры.<br />
                <span className="text-gold">Красота начинается<br />с диагноза.</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-md mb-4">
                Врач-косметолог, дерматолог, геронтолог, кандидат медицинских наук. Лариса Воловик подберёт персональную стратегию омоложения и здорового долголетия именно для вас.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button onClick={() => scrollTo('booking')} className="bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 px-7">Записаться на консультацию</Button>
                <Button variant="outline" onClick={() => scrollTo('doctor')} className="rounded-md h-12 px-7 border-foreground/20 gap-2">
                  <Icon name="Play" size={16} /> Смотреть видео
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-5 max-w-lg border-t border-border pt-6">
                {[
                  { icon: 'Award', v: 'Кандидат медицинских наук' },
                  { icon: 'TrendingUp', v: '15+ лет в эстетической медицине' },
                  { icon: 'Target', v: 'Индивидуальный подход и честные рекомендации' },
                ].map((s) => (
                  <div key={s.v} className="flex flex-col gap-2">
                    <Icon name={s.icon} size={24} className="text-gold" />
                    <div className="text-xs text-muted-foreground leading-tight">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* RIGHT: photo grid like screenshot */}
            <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-3 py-6 h-[88vh]">
              <div className="row-span-2 rounded-xl overflow-hidden">
                <img src={PHOTOS.hero1} alt="Лариса Воловик" className="w-full h-full object-cover object-top" />
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={PHOTOS.hero2} alt="Врач с препаратами" className="w-full h-full object-cover object-top" />
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src={PHOTOS.hero3} alt="В клинике" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            {/* Mobile single photo */}
            <div className="lg:hidden rounded-xl overflow-hidden mb-4 h-72">
              <img src={PHOTOS.hero1} alt="Лариса Воловик" className="w-full h-full object-cover object-top" />
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

      {/* DOCTOR */}
      <section id="doctor" className="py-24 bg-foreground text-cream relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-[0.7fr_1.3fr] gap-12 items-center">
          <div className="relative">
            <img src={PHOTOS.skull} alt="Лариса Леонидовна Воловик" className="rounded-2xl object-cover w-full shadow-2xl" />
            <div className="absolute bottom-4 left-4 bg-cream/95 rounded-lg px-4 py-2 text-sm text-foreground font-semibold">Доктор, которому доверяют лицо</div>
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">06 — Ваш врач</p>
            <h2 className="font-display text-4xl md:text-5xl mb-1">Воловик</h2>
            <h2 className="font-display text-4xl md:text-5xl mb-4">Лариса Леонидовна</h2>
            <div className="grid sm:grid-cols-2 gap-2 mb-6">
              {['Кандидат медицинских наук', 'Врач-косметолог', 'Дерматолог', 'Геронтолог', 'Anti-Age expert', 'Спикер профессиональных конференций'].map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-cream/80"><Icon name="ChevronRight" size={14} className="text-gold" />{c}</div>
              ))}
            </div>
            <div className="bg-cream/5 border border-cream/10 rounded-xl p-6 max-w-lg mb-8">
              <Icon name="Quote" size={26} className="text-gold mb-2" />
              <p className="text-cream/90 italic">Моя задача не изменить вас. Моя задача — сохранить вашу индивидуальность и сделать лучшую версию себя.</p>
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
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => scrollTo('booking')} className="bg-gold hover:bg-primary text-primary-foreground rounded-md h-12 px-8">Записаться на консультацию</Button>
              <Button variant="outline" className="rounded-md h-12 px-6 border-cream/20 text-cream hover:bg-cream/10 gap-2">
                <Icon name="Play" size={16} /> Видеообращение врача
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH STEPS */}
      <section className="py-20 bg-background">
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-12">Наш подход — ваша уверенность</h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: 'MessageSquare', t: 'Консультация', s: 'Подробный разговор и осмотр' },
              { icon: 'FlaskConical', t: 'Анализы', s: 'Диагностика прямо в клинике' },
              { icon: 'Search', t: 'Диагностика', s: 'Оценка состояния кожи, здоровья и образа жизни' },
              { icon: 'FileText', t: 'Персональный план', s: 'Стратегия омоложения именно для вас' },
              { icon: 'Syringe', t: 'Процедуры', s: 'Только то, что нужно и будет эффективно' },
              { icon: 'BarChart2', t: 'Контроль результата', s: 'Мы рядом не разовая встреча' },
            ].map((s, i, arr) => (
              <div key={s.t} className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-2 max-w-[120px] text-center">
                  <div className="w-16 h-16 rounded-full border-2 border-gold/30 flex items-center justify-center text-gold"><Icon name={s.icon} size={24} /></div>
                  <div className="font-semibold text-sm">{s.t}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{s.s}</div>
                </div>
                {i < arr.length - 1 && <Icon name="ArrowRight" size={20} className="text-gold/40 shrink-0 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTIONS */}
      <section id="directions" className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6">
          <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">03 — Направления косметологии</p>
          <h2 className="font-display text-4xl md:text-5xl mb-3">Что вас беспокоит?</h2>
          <p className="text-muted-foreground mb-10">Выберите направление, чтобы узнать о решениях</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {directions.map((d) => (
              <button key={d.t} onClick={() => scrollTo('booking')} className="group relative overflow-hidden rounded-xl aspect-[3/4] text-left">
                <img src={d.img} alt={d.t} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <p className="text-white font-medium text-sm leading-tight">{d.t}</p>
                </div>
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
                <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-2xl mb-2">{p.name}</h3>
                  <div className="w-10 h-px bg-gold mb-2" />
                  <p className="text-gold font-semibold mb-3">{p.price}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{p.text}</p>
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

      {/* RESULTS / BEFORE-AFTER — компактный, с тремя карточками рядом */}
      <section id="results" className="py-24 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10 items-start">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-gold mb-3">05 — Результаты наших пациентов</p>
              <h2 className="font-display text-4xl md:text-5xl mb-5">Естественные изменения без эффекта «переколотого лица»</h2>
              <p className="text-muted-foreground mb-6">Потяните ползунок на фото — сравните результат. Мы работаем с причиной возрастных изменений и добиваемся натурального результата.</p>
              <div className="flex gap-3 mb-4">
                <button onClick={() => setActiveCase((activeCase + cases.length - 1) % cases.length)} className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors"><Icon name="ArrowLeft" size={18} /></button>
                <button onClick={() => setActiveCase((activeCase + 1) % cases.length)} className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors"><Icon name="ArrowRight" size={18} /></button>
              </div>
              <p className="text-xs text-muted-foreground">* Результаты индивидуальны и могут отличаться</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {cases.map((c, i) => (
                <div key={i} onClick={() => setActiveCase(i)} className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${activeCase === i ? 'border-gold shadow-lg' : 'border-transparent'}`}>
                  <BeforeAfter before={c.before} after={c.after} />
                  <div className="bg-card p-3">
                    <p className="text-gold font-semibold text-sm">{c.age}</p>
                    <p className="text-xs text-muted-foreground mt-1">{c.problem}</p>
                    <p className="text-xs mt-1"><span className="text-muted-foreground">Срок:</span> {c.term}</p>
                  </div>
                </div>
              ))}
            </div>
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
          <p>© 2026 Студия Красивых Людей. Разработано в{' '}
            <a href="https://мастерскаягорбунова.рф" target="_blank" rel="noreferrer" className="underline hover:text-gold transition-colors">Мастерской Горбунова</a>.
          </p>
        </div>
      </footer>

      {/* STICKY CTA + SCROLL TOP */}
      <button onClick={() => scrollTo('booking')} className="fixed bottom-6 right-6 z-30 bg-gold hover:bg-primary text-primary-foreground rounded-full h-14 px-7 shadow-xl flex items-center gap-2 transition-colors font-medium">
        <Icon name="Calendar" size={18} /> <span className="hidden sm:inline">Записаться</span>
      </button>
      {scrolled && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-24 right-6 z-30 w-12 h-12 rounded-full bg-cream border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-gold hover:text-primary-foreground transition-colors animate-fade-in">
          <Icon name="ChevronUp" size={22} />
        </button>
      )}
    </div>
  );
};

export default Index;
