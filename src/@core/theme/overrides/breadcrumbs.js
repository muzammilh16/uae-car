const Breadcrumbs = () => {
  return {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& a': {
            textDecoration: 'none',
            color: theme.palette.primary.main
          }
        }),
        li: ({ theme }) => ({
          color: theme.palette.text.primary,
          '& .MuiTypography-root': {
            color: 'inherit'
          }
        })
      }
    }
  }
}

export default Breadcrumbs
