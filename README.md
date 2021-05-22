# Lab8_Starter

## Lab Group
- Ryan Shamoon
- Brian Tran 
- Asya Balas

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
    - A

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
   - No, we would not use a unit test. This is because the "message" feaiture is not a small individual component, but instead a complex operation that consists of smaller components. The "message" feature involves many different parts of the code interacting, which is not what unit tests are for.
3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
    - Yes, as the "max message length" feature doesn't consist of a lot of other parts, but rather is an individual component that needs to be tested before applying it to the rest of the "messaging" feature. The feature can be measured easily and does not interfere is a seperate component from other aspects of the message, making it good to unit test.
4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
    - If "headless" is true, the it will run tests without opening the browser UI. This is different than when "headless" is false, which causes the Chromium browser to open.
5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

