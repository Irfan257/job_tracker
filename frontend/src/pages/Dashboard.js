import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [applications, setApplications] = useState([]);
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
    applications.filter(app => app.status === status);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Job Tracker</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
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
            <h4>{getByStatus('Interview').length}</h4>
            <p className="mb-0">Interviews</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 bg-success text-white">
            <h4>{getByStatus('Offer').length}</h4>
            <p className="mb-0">Offers</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center p-3 bg-danger text-white">
            <h4>{getByStatus('Rejected').length}</h4>
            <p className="mb-0">Rejections</p>
          </div>
        </div>
      </div>

      <div className="row">
        {['Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
          <div className="col-md-3" key={status}>
            <div className="card p-3">
              <h5 className="mb-3">{status}</h5>
              {getByStatus(status).map(app => (
                <div className="card mb-2 p-2 shadow-sm" key={app.id}>
                  <strong>{app.company_name}</strong>
                  <small className="text-muted d-block">{app.job_role}</small>
                  <small className="text-muted">{app.date_applied}</small>
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