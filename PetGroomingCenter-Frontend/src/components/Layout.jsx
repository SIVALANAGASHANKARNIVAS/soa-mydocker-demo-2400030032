import { NavLink, Outlet, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Overview', icon: 'bi-grid-1x2' },
  { to: '/centers', label: 'All Centers', icon: 'bi-list-ul' },
  { to: '/add', label: 'Add Center', icon: 'bi-plus-circle' },
  { to: '/find', label: 'Find by ID', icon: 'bi-search' },
  { to: '/update', label: 'Update Center', icon: 'bi-pencil-square' },
  { to: '/delete', label: 'Delete Center', icon: 'bi-trash3' }
];

const pageTitles = {
  '/': ['Good day!', 'Here is your pet grooming center workspace.'],
  '/centers': ['All grooming centers', 'Browse every center currently registered in the system.'],
  '/add': ['Register a center', 'Add a grooming center using the details below.'],
  '/find': ['Find a center', 'Search for a center by its unique ID.'],
  '/update': ['Update a center', 'Edit an existing center using its ID.'],
  '/delete': ['Remove a center', 'Review the center ID carefully before deleting.']
};

export default function Layout() {
  const location = useLocation();
  const [title, subtitle] = pageTitles[location.pathname] || ['PawCare', 'Pet grooming center management'];
  return <div className="app-shell">
    <aside className="sidebar">
      <NavLink to="/" className="brand"><span className="brand-mark"><i className="bi bi-heart-pulse-fill" /></span><span><b>PawCare</b><small>GROOMING MANAGER</small></span></NavLink>
      <div className="nav-caption">WORKSPACE</div>
      <nav className="side-nav" aria-label="Main navigation">
        {links.map(link => <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({isActive}) => `side-link ${isActive ? 'active' : ''}`}><i className={`bi ${link.icon}`} /><span>{link.label}</span>{link.to === '/add' && <span className="nav-plus">+</span>}</NavLink>)}
      </nav>
      <div className="sidebar-bottom"><div className="paw-circle"><i className="bi bi-stars" /></div><strong>Happy pets, happy people.</strong><p>Keep every grooming center organized in one place.</p></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><div className="mobile-brand"><i className="bi bi-heart-pulse-fill" /> PawCare</div><div className="topbar-right"><span className="status-dot" /> Center management <span className="avatar">PC</span></div></header>
      <div className="page-wrap"><div className="page-heading"><div><div className="eyebrow">PAWCARE WORKSPACE</div><h1>{title}</h1><p>{subtitle}</p></div><div className="heading-paw"><i className="bi bi-heart-fill" /></div></div><Outlet /></div>
      <footer className="footer">Made for better pet care <i className="bi bi-heart-fill" /> <span>Pet Grooming Center Management</span></footer>
    </main>
  </div>;
}
