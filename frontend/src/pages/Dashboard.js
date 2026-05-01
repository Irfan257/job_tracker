import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const token = localStorage.getItem('access');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/applications/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/';
  };

  const getByStatus = (status) =>
    applications
      .filter(app => app.status === status)
      .filter(app =>
        app.company_name.toLowerCase().includes(search.toLowerCase()) ||
        app.job_role.toLowerCase().includes(search.toLowerCase())
      )
      .filter(app => filter === 'All' || app.status === filter);

  const getBadgeColor = (status) => {
    switch (status) {
      case 'Applied': return 'primary';
      case 'Interview': return 'warning';
      case 'Offer': return 'success';
      case 'Rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const filteredApplications = applications.filter(app =>
    app.company_name.toLowerCase().includes(search.toLowerCase()) ||
    app.job_role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Job Tracker</h2>
        <div>
          <a href="/add" className="btn btn-primary me-2">+ Add Application</a>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center p-3 bg-primary text-white">
            <h4>{applications.length}</h4>
            <p className="mb-0">Total Applied</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 bg-warning text-white">
            <h4>{applications.filter(a => a.status === 'Interview').length}</h4>
            <p className="mb-0">Interviews</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 bg-success text-white">
            <h4>{applications.filter(a => a.status === 'Offer').length}</h4>
            <p className="mb-0">Offers</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 bg-danger text-white">
            <h4>{applications.filter(a => a.status === 'Rejected').length}</h4>
            <p className="mb-0">Rejections</p>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Search by company or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="row">
        {['Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
          <div className="col-md-3" key={status}>
            <div className="card p-3">
              <h5 className="mb-3">
                <span className={`badge bg-${getBadgeColor(status)} me-2`}>
                  {getByStatus(status).length}
                </span>
                {status}
              </h5>
              {getByStatus(status).map(app => (
                <div
                  className="card mb-2 p-2 shadow-sm"
                  key={app.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => window.location.href = `/edit/${app.id}`}
                >
                  <strong>{app.company_name}</strong>
                  <small className="text-muted d-block">{app.job_role}</small>
                  <small className="text-muted">{app.date_applied}</small>
                  <span className={`badge bg-${getBadgeColor(app.status)} mt-1`}
                    style={{ width: 'fit-content' }}>
                    {app.status}
                  </span>
                </div>
              ))}
              {getByStatus(status).length === 0 && (
                <small className="text-muted">No applications</small>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;