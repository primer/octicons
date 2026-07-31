declare module 'eslint-plugin-github' {
  const github: {
    getFlatConfigs(): {
      browser: any
      internal: any
      react: any
      recommended: any
      typescript: any[]
    }
  }

  export default github
}
