import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { centerApi, getErrorMessage } from '../services/centerApi.js';
import { AlertMessage, Loading } from '../components/Feedback.jsx';

export default function Dashboard() {
  const [centers, setCenters] = useState([]);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const load = async () => { setBusy(true); setError(''); try { setCenters(await centerApi.getAll()); } catch (e) { setError(getErrorMessage(e)); } finally { setBusy(false); } };
  useEffect(() => { load(); }, []);
  const openCount = centers.filter(c => c.open).length;
  return <>
    {error && <AlertMessage type="danger">{error}</AlertMessage>}
    <div className="welcome-banner"><div><span className="banner-kicker">YOUR PET CARE, ORGANIZED</span><h2>Every center. One simple workspace.</h2><p>Manage registrations, check center details, and keep information up to date.</p><Link className="btn btn-light banner-btn" to="/add"><i className="bi bi-plus-lg me-2" />Add a center</Link></div><div className="banner-illustration"><i className="bi bi-house-heart-fill" /><span className="bubble bubble-one"><i className="bi bi-heart-fill" /></span><span className="bubble bubble-two"><i className="bi bi-stars" /></span></div></div>
    <div className="section-heading"><div><h2>At a glance</h2><p>A quick overview of your registered centers</p></div><button className="btn btn-outline-secondary btn-sm" onClick={load}><i className="bi bi-arrow-clockwise me-1" /> Refresh</button></div>
    {busy ? <Loading label="Loading dashboard..." /> : <div className="row g-3 mb-4"><div className="col-sm-6 col-xl-4"><div className="metric-card"><div className="metric-icon lavender"><i className="bi bi-buildings" /></div><div><span>Total centers</span><strong>{centers.length}</strong><small>Registered in the system</small></div></div></div><div className="col-sm-6 col-xl-4"><div className="metric-card"><div className="metric-icon mint"><i className="bi bi-door-open" /></div><div><span>Currently open</span><strong>{openCount}</strong><small>Ready to welcome pets</small></div></div></div><div className="col-sm-6 col-xl-4"><div className="metric-card"><div className="metric-icon peach"><i className="bi bi-door-closed" /></div><div><span>Currently closed</span><strong>{centers.length - openCount}</strong><small>Not currently operating</small></div></div></div></div>}
    <div className="section-heading"><div><h2>Recently registered</h2><p>Latest centers returned by your backend</p></div><Link to="/centers" className="text-link">View all <i className="bi bi-arrow-up-right" /></Link></div>
    <div className="panel-card">{busy ? <Loading /> : centers.length === 0 ? <div className="empty-state"><i className="bi bi-shop-window" /><h3>No centers yet</h3><p>Register your first pet grooming center to get started.</p><Link to="/add" className="btn btn-primary">Add first center</Link></div> : <div className="table-responsive"><table className="table center-table mb-0"><thead><tr><th>Center</th><th>Location</th><th>Contact</th><th>Status</th><th /></tr></thead><tbody>{centers.slice(0, 5).map(c => <tr key={c.id}><td><div className="center-cell"><span className="center-icon"><i className="bi bi-shop" /></span><span><strong>{c.centerName}</strong><small>ID #{c.id}</small></span></div></td><td>{c.location}</td><td>{c.contact}</td><td><span className={`status-pill ${c.open ? 'is-open' : 'is-closed'}`}><span />{c.open ? 'Open' : 'Closed'}</span></td><td><Link className="icon-action" title="View details" to={`/find?id=${c.id}`}><i className="bi bi-arrow-up-right" /></Link></td></tr>)}</tbody></table></div>}</div>
  </>;
}
