// Utility to clear authentication
export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
};

// Run this in browser console if needed:
// localStorage.clear()
