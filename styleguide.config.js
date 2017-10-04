module.exports = {
  title: 'Be Informed',
  compilerConfig: {
    objectAssign: 'Object.assign',
    transforms: {
      modules: false
    }
  },
  components: 'src/**/modules/**/*.js',
  ignore: ['**/redux/**', '**/_util.js', '**/*.stories.js', '**/*Container.js'],
  webpackConfig: require('./webpack.config.js')('styleguide'),
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md'
    },
    {
      name: 'UI Components',
      sections: [
        {
          name: 'Be Informed',
          components: 'src/beinformed/modules/**/*.js'
        },
        {
          name: 'Project',
          components: 'src/project/modules/**/*.js'
        }
      ]
    }
  ],
  skipComponentsWithoutExample: false
};