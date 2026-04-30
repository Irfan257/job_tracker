import { useState } from 'react';
import axios from 'axios';

function AddApplication() {
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
  const token = localStorage.getItem('access');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/applications/', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Application added successfully!');
      setError('');
      setForm({
        company_name: '',
        job_role: '',
        job_url: '',
        status: 'Applied',
        date_applied: '',
        follow_up_date: '',
        notes: ''
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Add Application</h3>
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
            value={form.follow_up_date}
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

        <button
          className="btn btn-primary w-100"
          onClick={handleSubmit}
        >
          Add Application
        </button>
      </div>
    </div>
  );
}

export default AddApplication;