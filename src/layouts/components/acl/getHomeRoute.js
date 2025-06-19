const getHomeRoute = (role, currentPath) => {
  // If user is already on a valid path, don't redirect
  if (currentPath && currentPath !== '/') return currentPath;

  if (role === 'client') return '/acl';
  return '/carInsurance';
};

export default getHomeRoute;
