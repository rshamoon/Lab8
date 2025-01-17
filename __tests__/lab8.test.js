describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5501'); //CHANGE THIS BACK TO 5500 LATER 
    await page.waitForTimeout(500);
  });

  //test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  //test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    
    await page.click('journal-entry');
    expect(page.url().includes('/#entry1')).toBe(true);

  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    //await page.$$('h1');
    const header = await page.$eval('body > header > h1', el => el.textContent);
    expect(header).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    let allContent = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    data = await entries[0].getProperty('entry');
    plainValue = await data.jsonValue();
    if (plainValue.title != 'You like jazz?') { allContent = false; }
    if (plainValue.date != '4/25/2021') { allContent = false; }
    if (plainValue.content != "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.") { allContent = false; }
    if (plainValue.image.src != 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455'){ allContent = false; }
    if (plainValue.image.alt != 'bee with sunglasses'){ allContent = false; }
    expect(allContent).toBe(true);
    
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const className = await page.$eval('body', el => el.className);
    expect(className).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('img');
    expect(page.url().includes('/#settings')).toBe(true);
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const header = await page.$eval('body > header > h1', el => el.textContent);
    expect(header).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const className = await page.$eval('body', el => el.className);
    expect(className).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url().includes('/#entry1')).toBe(true);
  });

  it('Test11: Clicking the back button, new URL should be /', async() => {
    // define and implement test11: Clicking the back button once should bring the user back to the home page
      await page.goBack();
      expect(page.url().includes('/')).toBe(true);
  });

  it('Test12: On Home Page, the heading should be "Journal Entries"', async() => {
  // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
    const header = await page.$eval('body > header > h1', el => el.textContent);
    expect(header).toBe('Journal Entries');
  });

  it('Test13: On the home page, the body element should not have any class attributes', async() => {
  // define and implement test13: On the home page the <body> element should not have any class attribute 
    const className = await page.$eval('body', el => el.className);
    expect(className).toBe('');
  });

  it('Test14: On the Second Entry, URL should include /#entry2', async() => {
  // define and implement test14: Verify the url is correct when clicking on the second entry
    await page.$$eval('journal-entry', (entries) => {
      entries[1].click();
    });
    expect(page.url().includes('/#entry2')).toBe(true);  
  });

  it('Test15: On the Second Entry, Title should be Entry 2', async() => {
  // define and implement test15: Verify the title is current when clicking on the second entry
    const header = await page.$eval('body > header > h1', el => el.textContent);
    expect(header).toBe('Entry 2');
  });
    
  it('Test16: On second Entry page - checking <entry-page> contents', async() => {
  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  /*
     implement test16: Clicking on the second journal entry should contain the following contents: 
        { 
          title: 'Run, Forrest! Run',
          date: '4/26/2021',
          content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
          image: {
            src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
            alt: 'forrest running'
        }
       }
    */
    let entry2Content = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    data = await entries[1].getProperty('entry');
    plainValue = await data.jsonValue();
    if (plainValue.title != 'Run, Forrest! Run!') { entry2Content = false; }
    if (plainValue.date != '4/26/2021') { entry2Content = false; }
    if (plainValue.content != "Mama always said life was like a box of chocolates. You never know what you're gonna get.") { entry2Content = false; }
    if (plainValue.image.src != 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg'){ entry2Content = false; }
    if (plainValue.image.alt != 'forrest running'){ entry2Content = false; }
    expect(entry2Content).toBe(true);
    
  });

  it('Test17: Clicking on the back and then forward button, the URL should contain /#entry2', async() => {
  // create your own test 17: Verify the forward button works properly after hitting the back button once.
    await page.goBack();
    await page.goForward();
    expect(page.url().includes('/#entry2')).toBe(true);
  });
  
  it('Test18: On the Ninth Entry, URL should include /#entry9', async() => {
  // create your own test 18: Verify the url is correct when clicking on the ninth entry
    await page.goBack();
    await page.$$eval('journal-entry', (entries) => {
      entries[8].click();
    });
    expect(page.url().includes('/#entry9')).toBe(true); 
  });
  
  it('Test19: On the Ninth Entry, Title should be Entry 9', async() => {
  // create your own test 19: Verify the title is current when clicking on the ninth entry
    const header = await page.$eval('body > header > h1', el => el.textContent);
    expect(header).toBe('Entry 9');
  
  });

  it('Test20: On Ninth Entry page - checking <entry-page> contents', async() => {
  // create your own test 20: Verify the entry page contents is correct when clicking on the ninth entry
  /*
     implement test16: Clicking on the ninth journal entry should contain the following contents: 
      { 
          title: 'Keep moving forward',
          date: '5/3/2021',
          content: "Everyone will tell you to let it go and move on, but don't! Instead, let it fester and boil inside of you! Take these feelings and lock them away. Let them fuel your actions. Let hate be your ally, and you will be capable of wonderful, horrid things. Heed my words, Goob: don't let it go.",
          image: {
            src: 'https://i.pinimg.com/originals/7b/13/82/7b13822ce506f9d3fcb7707c0f6e72c3.png',
            alt: "mr. steak you're my only friend"
          },
      }
  */
    let entry9Content = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    data = await entries[8].getProperty('entry');
    plainValue = await data.jsonValue();
    if (plainValue.title != 'Keep moving forward') { entry9Content = false; }
    if (plainValue.date != '5/3/2021') { entry9Content = false; }
    if (plainValue.content != "Everyone will tell you to let it go and move on, but don't! Instead, let it fester and boil inside of you! Take these feelings and lock them away. Let them fuel your actions. Let hate be your ally, and you will be capable of wonderful, horrid things. Heed my words, Goob: don't let it go.") { entry9Content = false; }
    if (plainValue.image.src != 'https://i.pinimg.com/originals/7b/13/82/7b13822ce506f9d3fcb7707c0f6e72c3.png'){ entry9Content = false; }
    if (plainValue.image.alt != "mr. steak you're my only friend") { entry9Content = false; } 
    expect(entry9Content).toBe(true);
  });
});
