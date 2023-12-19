import {ReportAggregator} from 'wdio-html-nice-reporter';

const reportsDirectory = './reports/html-reports/';

export const config = {
    // automationProtocol: 'devtools',
    runner: 'local',
    specs: [
        './test/specs/*.e2e.js'
    ],
    exclude: [
        // './test/specs/examples/**/*.js'
    ],
    suites: {
        exercise: ['./test/specs/exercise.e2e.js'],
        homework: ['./test/specs/homework/*.e2e.js'],
        lesson_01: ['./test/specs/examples/lesson-01/**/*.e2e.js'],
        lesson_02: ['./test/specs/examples/lesson-02/**/*.e2e.js'],
        lesson_03: ['./test/specs/examples/lesson-03/**/*.e2e.js'],
        lesson_04: ['./test/specs/examples/lesson-04/**/*.e2e.js'],
        lesson_05: ['./test/specs/examples/lesson-05/**/*.e2e.js'],
        lesson_07: ['./test/specs/examples/lesson-07/**/*.e2e.js'],
        lesson_08: ['./test/specs/examples/lesson-08/**/*.e2e.js'],
        lesson_09: ['./test/specs/examples/lesson-09/**/*.e2e.js'],
        lesson_10: ['./test/specs/examples/lesson-10/**/*.e2e.js'],
        lesson_11: ['./test/specs/examples/lesson-11/**/*.e2e.js']
    },
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                '--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]
        },
        "moz:firefoxOptions": {
            // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
            args: [
                // '-headless'
            ]
        }
    }],
    logLevel: 'silent',
    bail: 0,
    baseUrl: 'https://team8-2022brno.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'chromedriver',
        'geckodriver'
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ["html-nice", {
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Automatizované Testování',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: true
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    /*
    Definice potřebných hooků
    */
    onPrepare: (config, capabilities) => {
        let reportAggregator = new ReportAggregator({
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Test Automation',
            browserName : capabilities.browserName,
            collapseTests: true,
        });
        reportAggregator.clean() ;
        global.reportAggregator = reportAggregator;
    },
    onComplete: async (exitCode, config, capabilities, results) => {
        await reportAggregator.createReport();
    },
    afterTest: async (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`./.tmp/${test.parent}__${test.title}.png`).replace(/ /g, '_');
        await browser.saveScreenshot(screenshotName);
    }
}