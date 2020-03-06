module.exports = {
  siteMetadata: {
    title: 'Octicons',
    shortName: 'Octicons',
    description: "Your project. GitHub's icons.",
    imageUrl: 'https://user-images.githubusercontent.com/10384315/53922681-2f6d3100-402a-11e9-9719-5d1811c8110a.png'
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
