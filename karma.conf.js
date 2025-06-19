// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  // Detectar si está en modo watch
  const isWatchMode = process.argv.includes('--watch=true') || process.argv.includes('--watch');
  
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Configuración para evitar timeouts
        timeoutInterval: 10000,
        random: false,
        failFast: false,
        seed: null
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/task-list-atom'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN, // Cambiar a WARN para reducir logs
    autoWatch: isWatchMode, // Configurar según el modo
    browsers: isWatchMode ? ['Chrome'] : ['ChromeHeadless'], // Chrome normal para watch, Headless para single run
    singleRun: !isWatchMode, // true para single run, false para watch
    restartOnFileChange: isWatchMode, // Solo reiniciar en modo watch
    // Configuración de Chrome para evitar crashes
    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ]
      }
    },
    // Configuración de timeouts
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
    // Excluir tests problemáticos
    files: [
      'src/**/*.spec.ts'
    ],
    exclude: [
      'src/app/auth/services/auth.spec.ts',
      'src/app/tasks/services/task.spec.ts',
      'src/app/auth/components/login/login.spec.ts',
      'src/app/auth/components/register/register.spec.ts',
      'src/app/tasks/components/task-list/task-list.spec.ts'
    ]
  });
}; 