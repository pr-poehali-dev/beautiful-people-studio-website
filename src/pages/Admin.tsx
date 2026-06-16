import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const LOGO = 'https://cdn.poehali.dev/projects/63c104c1-e97a-4e0f-bd69-7f7c0038aeec/bucket/f6ff109a-5ca0-4a8f-a5c9-03907212d06f.jpg';

type Status = 'Запланирована' | 'Подтверждена' | 'Завершена' | 'Отменена';

interface Appt {
  id: number;
  client: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: Status;
}

interface Client {
  id: number;
  name: string;
  phone: string;
  visits: number;
  lastVisit: string;
  note: string;
}

interface Reminder {
  id: number;
  text: string;
  date: string;
  done: boolean;
}

const initAppts: Appt[] = [
  { id: 1, client: 'Ольга Петрова', phone: '+7 978 100-11-22', service: 'SMAS-лифтинг Doublo', date: '2026-06-16', time: '11:00', status: 'Подтверждена' },
  { id: 2, client: 'Мария Иванова', phone: '+7 978 200-33-44', service: 'Биоревитализация', date: '2026-06-16', time: '13:30', status: 'Запланирована' },
  { id: 3, client: 'Елена Смирнова', phone: '+7 978 300-55-66', service: 'Ботулинотерапия', date: '2026-06-16', time: '16:00', status: 'Запланирована' },
  { id: 4, client: 'Анна Кузнецова', phone: '+7 978 400-77-88', service: 'Фотоомоложение M22', date: '2026-06-17', time: '10:30', status: 'Подтверждена' },
];

const initClients: Client[] = [
  { id: 1, name: 'Ольга Петрова', phone: '+7 978 100-11-22', visits: 12, lastVisit: '2026-05-20', note: 'Чувствительная кожа, аллергия на лидокаин' },
  { id: 2, name: 'Мария Иванова', phone: '+7 978 200-33-44', visits: 5, lastVisit: '2026-06-01', note: 'Курс биоревитализации, 2 из 4' },
  { id: 3, name: 'Елена Смирнова', phone: '+7 978 300-55-66', visits: 23, lastVisit: '2026-06-10', note: 'VIP, постоянный клиент' },
];

const initReminders: Reminder[] = [
  { id: 1, text: 'Позвонить Ольге — подтвердить SMAS-лифтинг', date: '2026-06-16', done: false },
  { id: 2, text: 'Заказать препараты для биоревитализации', date: '2026-06-18', done: false },
  { id: 3, text: 'Отправить Марии напоминание о визите', date: '2026-06-16', done: true },
];

const statusColor: Record<Status, string> = {
  'Запланирована': 'bg-amber-100 text-amber-700',
  'Подтверждена': 'bg-emerald-100 text-emerald-700',
  'Завершена': 'bg-slate-200 text-slate-600',
  'Отменена': 'bg-rose-100 text-rose-700',
};

const Admin = () => {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState(false);
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [tab, setTab] = useState<'dash' | 'appts' | 'clients' | 'reminders'>('dash');

  const [appts, setAppts] = useState(initAppts);
  const [clients, setClients] = useState(initClients);
  const [reminders, setReminders] = useState(initReminders);
  const [showAppt, setShowAppt] = useState(false);
  const [showClient, setShowClient] = useState(false);
  const [newAppt, setNewAppt] = useState({ client: '', phone: '', service: '', date: '', time: '' });
  const [newClient, setNewClient] = useState({ name: '', phone: '', note: '' });
  const [newRem, setNewRem] = useState('');

  if (!authed) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-6">
        <div className="bg-card rounded-2xl border border-border shadow-xl p-8 w-full max-w-sm">
          <img src={LOGO} alt="СКЛ" className="w-16 h-16 rounded-full object-cover mx-auto mb-4" />
          <h1 className="font-display text-3xl text-center mb-1">CRM Студии</h1>
          <p className="text-center text-muted-foreground text-sm mb-6">Вход для администратора</p>
          <input value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Логин (admin)" className="w-full border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold mb-4" />
          <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Пароль (любой)" className="w-full border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold mb-6" />
          <Button onClick={() => setAuthed(true)} className="w-full bg-primary hover:bg-gold text-primary-foreground rounded-md h-12 mb-3">Войти</Button>
          <button onClick={() => navigate('/')} className="w-full text-sm text-muted-foreground hover:text-gold transition-colors">← На сайт</button>
        </div>
      </div>
    );
  }

  const today = '2026-06-16';
  const todayAppts = appts.filter((a) => a.date === today);
  const activeReminders = reminders.filter((r) => !r.done);

  const navItems = [
    { id: 'dash', label: 'Сводка', icon: 'LayoutDashboard' },
    { id: 'appts', label: 'Записи', icon: 'CalendarDays' },
    { id: 'clients', label: 'Клиенты', icon: 'Users' },
    { id: 'reminders', label: 'Напоминания', icon: 'Bell' },
  ] as const;

  const addAppt = () => {
    if (!newAppt.client || !newAppt.date) return;
    setAppts([...appts, { id: Date.now(), ...newAppt, status: 'Запланирована' }]);
    setNewAppt({ client: '', phone: '', service: '', date: '', time: '' });
    setShowAppt(false);
  };
  const addClient = () => {
    if (!newClient.name) return;
    setClients([...clients, { id: Date.now(), ...newClient, visits: 0, lastVisit: '—' }]);
    setNewClient({ name: '', phone: '', note: '' });
    setShowClient(false);
  };
  const cycleStatus = (id: number) => {
    const order: Status[] = ['Запланирована', 'Подтверждена', 'Завершена', 'Отменена'];
    setAppts(appts.map((a) => a.id === id ? { ...a, status: order[(order.indexOf(a.status) + 1) % order.length] } : a));
  };
  const addRem = () => {
    if (!newRem) return;
    setReminders([...reminders, { id: Date.now(), text: newRem, date: today, done: false }]);
    setNewRem('');
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-foreground text-cream p-6 shrink-0">
        <div className="flex items-center gap-3 mb-10">
          <img src={LOGO} alt="СКЛ" className="w-10 h-10 rounded-full object-cover" />
          <div className="font-display text-xl">СКЛ · CRM</div>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((n) => (
            <button key={n.id} onClick={() => setTab(n.id)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${tab === n.id ? 'bg-gold text-primary-foreground' : 'text-cream/70 hover:bg-cream/10'}`}>
              <Icon name={n.icon} size={18} /> {n.label}
            </button>
          ))}
        </nav>
        <button onClick={() => navigate('/')} className="mt-auto flex items-center gap-3 px-4 py-3 text-sm text-cream/60 hover:text-gold transition-colors">
          <Icon name="LogOut" size={18} /> На сайт
        </button>
      </aside>

      {/* MOBILE TOP NAV */}
      <div className="md:hidden fixed top-0 inset-x-0 z-20 bg-foreground text-cream flex overflow-x-auto">
        {navItems.map((n) => (
          <button key={n.id} onClick={() => setTab(n.id)} className={`flex-1 flex flex-col items-center gap-1 py-3 text-[11px] ${tab === n.id ? 'text-gold' : 'text-cream/60'}`}>
            <Icon name={n.icon} size={18} /> {n.label}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <main className="flex-1 p-5 md:p-8 pt-20 md:pt-8 overflow-x-hidden">
        {tab === 'dash' && (
          <div className="animate-fade-in">
            <h1 className="font-display text-4xl mb-1">Добрый день, Лариса Леонидовна</h1>
            <p className="text-muted-foreground mb-8">Сегодня {todayAppts.length} записей · {activeReminders.length} активных напоминаний</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
              {[
                { icon: 'CalendarCheck', value: todayAppts.length, label: 'Записей сегодня' },
                { icon: 'Users', value: clients.length, label: 'Всего клиентов' },
                { icon: 'TrendingUp', value: '124 000 ₽', label: 'Выручка за неделю' },
                { icon: 'Bell', value: activeReminders.length, label: 'Напоминаний' },
              ].map((c) => (
                <div key={c.label} className="bg-card rounded-xl border border-border p-6">
                  <div className="w-11 h-11 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-3"><Icon name={c.icon} size={20} /></div>
                  <div className="font-display text-3xl">{c.value}</div>
                  <div className="text-sm text-muted-foreground">{c.label}</div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display text-2xl mb-4">Расписание на сегодня</h3>
                <div className="space-y-3">
                  {todayAppts.map((a) => (
                    <div key={a.id} className="flex items-center gap-4 py-2 border-b border-border last:border-0">
                      <span className="font-semibold text-gold w-14">{a.time}</span>
                      <div className="flex-1"><div className="font-medium">{a.client}</div><div className="text-xs text-muted-foreground">{a.service}</div></div>
                      <span className={`text-xs px-3 py-1 rounded-full ${statusColor[a.status]}`}>{a.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-display text-2xl mb-4">Напоминания</h3>
                <div className="space-y-3">
                  {activeReminders.map((r) => (
                    <div key={r.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                      <Icon name="Bell" size={16} className="text-gold mt-0.5" />
                      <div className="flex-1 text-sm">{r.text}<div className="text-xs text-muted-foreground">{r.date}</div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'appts' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-4xl">Записи клиентов</h1>
              <Button onClick={() => setShowAppt(true)} className="bg-primary hover:bg-gold text-primary-foreground rounded-md"><Icon name="Plus" size={18} className="mr-1" /> Новая запись</Button>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_auto_auto] gap-4 px-6 py-3 text-xs uppercase tracking-wide text-muted-foreground border-b border-border">
                <span>Клиент</span><span>Услуга</span><span>Дата / время</span><span>Статус</span><span></span>
              </div>
              {appts.map((a) => (
                <div key={a.id} className="grid md:grid-cols-[1fr_1fr_1fr_auto_auto] gap-2 md:gap-4 px-6 py-4 border-b border-border last:border-0 md:items-center">
                  <div><div className="font-medium">{a.client}</div><div className="text-xs text-muted-foreground">{a.phone}</div></div>
                  <div className="text-sm">{a.service}</div>
                  <div className="text-sm">{a.date} · {a.time}</div>
                  <button onClick={() => cycleStatus(a.id)} className={`text-xs px-3 py-1 rounded-full w-fit ${statusColor[a.status]}`}>{a.status}</button>
                  <button onClick={() => setAppts(appts.filter((x) => x.id !== a.id))} className="text-muted-foreground hover:text-rose-500 w-fit"><Icon name="Trash2" size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'clients' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-4xl">База клиентов</h1>
              <Button onClick={() => setShowClient(true)} className="bg-primary hover:bg-gold text-primary-foreground rounded-md"><Icon name="UserPlus" size={18} className="mr-1" /> Добавить клиента</Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {clients.map((c) => (
                <div key={c.id} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center font-display text-xl">{c.name[0]}</div>
                    <div><div className="font-medium">{c.name}</div><div className="text-xs text-muted-foreground">{c.phone}</div></div>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Визитов: <span className="text-foreground font-medium">{c.visits}</span></span>
                    <span className="text-muted-foreground">{c.lastVisit}</span>
                  </div>
                  <p className="text-xs text-muted-foreground bg-secondary rounded-lg p-3">{c.note || 'Заметок нет'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'reminders' && (
          <div className="animate-fade-in max-w-2xl">
            <h1 className="font-display text-4xl mb-6">Напоминания</h1>
            <div className="flex gap-3 mb-6">
              <input value={newRem} onChange={(e) => setNewRem(e.target.value)} placeholder="Новое напоминание..." className="flex-1 border border-border rounded-md h-12 px-4 bg-card outline-none focus:border-gold" />
              <Button onClick={addRem} className="bg-primary hover:bg-gold text-primary-foreground rounded-md px-6">Добавить</Button>
            </div>
            <div className="space-y-3">
              {reminders.map((r) => (
                <div key={r.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                  <button onClick={() => setReminders(reminders.map((x) => x.id === r.id ? { ...x, done: !x.done } : x))} className={`w-6 h-6 rounded-full border flex items-center justify-center ${r.done ? 'bg-gold border-gold text-primary-foreground' : 'border-border'}`}>
                    {r.done && <Icon name="Check" size={14} />}
                  </button>
                  <div className="flex-1"><div className={r.done ? 'line-through text-muted-foreground' : ''}>{r.text}</div><div className="text-xs text-muted-foreground">{r.date}</div></div>
                  <button onClick={() => setReminders(reminders.filter((x) => x.id !== r.id))} className="text-muted-foreground hover:text-rose-500"><Icon name="Trash2" size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: NEW APPT */}
      {showAppt && (
        <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowAppt(false)}>
          <div className="bg-cream rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-3xl mb-5">Новая запись</h3>
            <div className="space-y-3">
              <input value={newAppt.client} onChange={(e) => setNewAppt({ ...newAppt, client: e.target.value })} placeholder="Имя клиента" className="w-full border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold" />
              <input value={newAppt.phone} onChange={(e) => setNewAppt({ ...newAppt, phone: e.target.value })} placeholder="Телефон" className="w-full border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold" />
              <input value={newAppt.service} onChange={(e) => setNewAppt({ ...newAppt, service: e.target.value })} placeholder="Услуга" className="w-full border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold" />
              <div className="flex gap-3">
                <input value={newAppt.date} onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })} type="date" className="flex-1 border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold" />
                <input value={newAppt.time} onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })} type="time" className="flex-1 border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={addAppt} className="flex-1 bg-primary hover:bg-gold text-primary-foreground rounded-md h-12">Сохранить</Button>
              <Button onClick={() => setShowAppt(false)} variant="outline" className="rounded-md h-12">Отмена</Button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW CLIENT */}
      {showClient && (
        <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowClient(false)}>
          <div className="bg-cream rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-3xl mb-5">Новый клиент</h3>
            <div className="space-y-3">
              <input value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} placeholder="Имя клиента" className="w-full border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold" />
              <input value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} placeholder="Телефон" className="w-full border border-border rounded-md h-12 px-4 bg-background outline-none focus:border-gold" />
              <textarea value={newClient.note} onChange={(e) => setNewClient({ ...newClient, note: e.target.value })} placeholder="Заметка (аллергии, особенности)" rows={3} className="w-full border border-border rounded-md px-4 py-3 bg-background outline-none focus:border-gold resize-none" />
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={addClient} className="flex-1 bg-primary hover:bg-gold text-primary-foreground rounded-md h-12">Сохранить</Button>
              <Button onClick={() => setShowClient(false)} variant="outline" className="rounded-md h-12">Отмена</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
