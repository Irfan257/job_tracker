import { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.username || !form.password || !form.password2) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.password2) {
      setError('Passwords do not match.');
      return;
    }
    try {
      await axios.post('https://jobtracker-production-5259.up.railway.app/api/register/', {
        username: form.username,
        email: form.email,
        password: form.password
      });
      setSuccess('Account created! You can now login.');
      setError('');
      setForm({ username: '', email: '', password: '', password2: '' });
    } catch (err) {
      setError('Username already exists or something went wrong.');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-4">Create Account</h3>
            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                value={form.password2}
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={handleRegister}
            >
              Register
            </button>

            <p className="text-center mt-3">
              Already have an account? <a href="/">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;