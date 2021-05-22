/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';

 describe('using pushHistory to add', () => {

    test('no pages', () => {
        let testResult = history.length;
        let actualResult = 1;
        expect(testResult).toBe(actualResult);
    });

    test('settings', () => {
        let myHistory = pushToHistory("settings", null);
        let testResult = myHistory.state.page;
        let actualResult = 'settings';
        expect(testResult).toBe(actualResult);
    });
    test('entry4', () => {
        let myHistory = pushToHistory("entry", 4);
        let testResult = myHistory.state.page;
        let actualResult = 'entry4';
        expect(testResult).toBe(actualResult);
    });

    test('home', () => {
        let myHistory = pushToHistory("home", null);
        let testResult = myHistory.state.page;
        expect(testResult).toBeUndefined();
    });

    test('3 pages', () => {
        let testResult = history.length;
        let actualResult = 4;
        expect(testResult).toBe(actualResult);
    });
});


