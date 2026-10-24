import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { centerApi, getErrorMessage } from '../services/centerApi.js';
import { AlertMessage, Loading } from '../components/Feedback.jsx';

export default function CentersPage() {
  const [centers, setCenters] = useState([]); const [busy, setBusy] = useState(true); const [error, setError] = useState(''); const [search, setSearch] = useState(''); const [status, setStatus] = useState('all');
  const load = async () => { setBusy(true); setError(''); try { setCenters(await centerApi.getAll()); } catch (e) { setError(getErrorMessage(e)); } finally { setBusy(false); } };
  useEffect(() => { load(); }, []);
  const filtered = useMemo(() => centers.filter(c => { const matches = `${c.id} ${c.centerName} ${c.location} ${c.contact}`.toLowerCase().includes(search.toLowerCase()); return matches && (status === 'all' || (status === 'open' ? c.open : !c.open)); }), [centers, search, status]);
  return <>
    <AlertMessage type="danger">{error}</AlertMessage>
    <div className="section-heading page-section-heading"><div><h2>Center directory</h2><p>{centers.length} center{centers.length === 1 ? '' : 's'} registered</p></div><Link to="/add" className="btn btn-primary"><i className="bi bi-plus-lg me-2" />Add center</Link></div>
    <div className="panel-card"><div className="table-toolbar"><div className="search-box"><i className="bi bi-search" /><input aria-label="Search centers" placeholder="Search name, location, contact or ID..." value={search} onChange={e => setSearch(e.target.value)} /></div><select className="form-select status-filter" aria-label="Filter by status" value={status} onChange={e => setStatus(e.target.value)}><option value="all">All statuses</option><option value="open">Open</option><option value="closed">Closed</option></select><button className="btn btn-outline-secondary" onClick={load} aria-label="Refresh list"><i className="bi bi-arrow-clockwise" /></button></div>
      {busy ? <Loading label="Loading centers..." /> : filtered.length === 0 ? <div className="empty-state"><i className="bi bi-search" /><h3>{centers.length ? 'No matching centers' : 'No centers registered'}</h3><p>{centers.length ? 'Try changing your search or status filter.' : 'Add a center to see it listed here.'}</p>{centers.length === 0 && <Link to="/add" className="btn btn-primary">Add center</Link>}</div> : <div className="table-responsive"><table className="table center-table mb-0"><thead><tr><th>Center details</th><th>Location</th><th>Contact</th><th>Services</th><th>Status</th><th>Actions</th></tr></thead><tbody>{filtered.map(c => <tr key={c.id}><td><div className="center-cell"><span className="center-icon"><i className="bi bi-shop" /></span><span><strong>{c.centerName}</strong><small>ID #{c.id}</small></span></div></td><td><i className="bi bi-geo-alt me-1 muted-icon" />{c.location}</td><td>{c.contact}</td><td><span className="service-count">{c.servicecount}</span></td><td><span className={`status-pill ${c.open ? 'is-open' : 'is-closed'}`}><span />{c.open ? 'Open' : 'Closed'}</span></td><td><div className="action-group"><Link to={`/find?id=${c.id}`} title="View" className="icon-action"><i className="bi bi-eye" /></Link><Link to={`/update?id=${c.id}`} title="Update" className="icon-action"><i className="bi bi-pencil" /></Link><Link to={`/delete?id=${c.id}`} title="Delete" className="icon-action danger-action"><i className="bi bi-trash3" /></Link></div></td></tr>)}</tbody></table></div>}
      {!busy && filtered.length > 0 && <div className="table-footer">Showing {filtered.length} of {centers.length} centers</div>}
    </div>
  </>;
}
