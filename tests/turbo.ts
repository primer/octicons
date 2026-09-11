import config from '../turbo.json' with {type: 'json'}

test.each(['@primer/octicons', '@primer/octicons-react', '@primer/octicons-react-symbols', '@primer/styled-octicons'])(
  'root tests wait for the %s build',
  name => {
    expect(config.tasks['//#test'].dependsOn).toContain(`${name}#build`)
  },
)

test('build caches retain both generated icon source directories', () => {
  expect(config.tasks.build.outputs).toEqual(expect.arrayContaining(['src/__generated__/**', 'src/generated/**']))
})
