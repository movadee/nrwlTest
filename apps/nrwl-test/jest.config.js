module.exports = {
  name: 'nrwl-test',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/nrwl-test',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
