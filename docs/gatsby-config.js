module.exports = {
  siteMetadata: {
    title: 'Octicons',
    shortName: 'Octicons',
    description: "Your project. GitHub's icons.",
    imageUrl: '#'
  },
  pathPrefix: '/octicons',
  plugins: [
    {
      resolve: '@primer/gatsby-theme-doctocat',
      options: {
        repoRootPath: '..'
      }
    }
  ]
}
