import fs from 'fs';
import allure from 'allure-commandline';
import video from 'wdio-video-reporter';


// Príprava pre screenshoty

const passedDirectory = 'screenshots/passed';
const failedDirectory = 'screenshots/failed';

function createIfNotExists(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function deleteFiles(dir) {
    fs.rm(dir, { recursive: true }, err => {
        if (err) console.log(err);
    });
}

// Príprava pre Allure

const allureTmpDirectory = './.tmp/allure';
const allureReportDirectory = './reports/allure';

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
        lesson_11: ['./test/specs/examples/lesson-11/**/*.e2e.js'],
        finished: ['./test/specs/finished/**/*.e2e.js'],
        unfinished: ['./test/specs/unfinished/**/*.e2e.js'],
        order: ['./test/specs/order.e2e.js'],

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
        // [video, {
        //     outputDir: allureTmpDirectory,
        //     saveAllVideos: true,        // If true, also saves videos for successful test cases
        //     videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
        // }],
        ['allure', {
            outputDir: allureTmpDirectory,
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
            addConsoleLogs: true,
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

        deleteFiles('screenshots');

        // Remove previous tmp files

        // fs.rm(allureTmpDirectory, { recursive: true }, err => {
        //     if (err) console.log(err);
        // });

        fs.rmdir(allureTmpDirectory, { recursive: true }, err => {
            if (err) console.log(err);
        });
    },

    onComplete: async (exitCode, config, capabilities, results) => {

        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', '--clean', allureTmpDirectory, '--output', allureReportDirectory]);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 5000);
            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) return reject(reportError);
                console.log('Allure report successfully generated');
                resolve()
            });
        });    
    },

    afterTest: async (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`${test.parent}__${test.title}.png`).replace(/ /g, '_');
        if (passed === true) {
            createIfNotExists(passedDirectory);
            await browser.saveScreenshot(`${passedDirectory}/${screenshotName}`);
        } else {
            createIfNotExists(failedDirectory);
            await browser.saveScreenshot(`${failedDirectory}/${screenshotName}`);
        }
    },
}