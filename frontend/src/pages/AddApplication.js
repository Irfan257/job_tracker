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
    if (!form.company_name || !form.job_role || !form.date_applied) {
      setError('Company name, job role and date applied are required.');
      return;
    }
    try {
      const data = {
        ...form,
        job_url: form.job_url || '',
        follow_up_date: form.follow_up_date || null,
        notes: form.notes || '',
      };
      await axios.post('https://jobtracker-production-5259.up.railway.app/api/applications/', data, {
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
          <label className="form-label">
            Company Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Job Role <span className="text-danger">*</span>
          </label>
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
          <label className="form-label">
            Date Applied <span className="text-danger">*</span>
          </label>
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