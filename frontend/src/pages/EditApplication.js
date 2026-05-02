import { useState, useEffect } from 'react';
import axios from 'axios';

function EditApplication() {
  const id = window.location.pathname.split('/')[2];
  const token = localStorage.getItem('access');

  const [form, setForm] = useState({
    company_name: '',
    job_role: '',
    job_url: '',
    status: 'Applied',
    date_applied: '',
    follow_up_date: '',
    notes: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

useEffect(() => {
    fetchApplication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchApplication = async () => {
    try {
      const response = await axios.get(`https://jobtracker-production-5259.up.railway.app/api/applications/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`https://jobtracker-production-5259.up.railway.app/api/applications/${id}/`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Application updated successfully!');
      setError('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setSuccess('');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await axios.delete(`https://jobtracker-production-5259.up.railway.app/api/applications/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        window.location.href = '/dashboard';
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Edit Application</h3>
        <a href="/dashboard" className="btn btn-outline-secondary">
          Back to Dashboard
        </a>
      </div>

      <div className="card p-4 shadow-sm">
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            className="form-control"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Role</label>
          <input
            type="text"
            className="form-control"
            name="job_role"
            value={form.job_role}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job URL</label>
          <input
            type="text"
            className="form-control"
            name="job_url"
            value={form.job_url}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date Applied</label>
          <input
            type="date"
            className="form-control"
            name="date_applied"
            value={form.date_applied}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Follow Up Date</label>
          <input
            type="date"
            className="form-control"
            name="follow_up_date"
            value={form.follow_up_date || ''}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            name="notes"
            rows="3"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-2">
          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
          <button
            className="btn btn-danger w-100"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditApplication;