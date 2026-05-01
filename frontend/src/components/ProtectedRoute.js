function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access');

  if (!token) {
    window.location.href = '/';
    return null;
  }

  return children;
}

export default ProtectedRoute;