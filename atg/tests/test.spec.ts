import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test.describe('Happy path', () => {


  test.beforeEach(async ({ page }) => {
     // Mocks
   await page.route('https://www.atg.se/services/racinginfo/v1/api/products/V75', async route => {
    const json = {
      upcoming: [
        { 
          name: 'Strawberry', 
          id: "V75_2024-08-17_16_5_TEST",
        },
      ],
    }

    await route.fulfill({ json });
    });
    
    await page.route('https://www.atg.se/services/racinginfo/v1/api/games/V75_2024-08-17_16_5_TEST', async route => {
      const json = {
        id: "V75_2024-08-17_16_5_TEST",
        races: [
          {
            id: "2024-08-17_16_5_1",
            name: "PureBallast",
            number: 5,
            starts: [
              {
                id: "2024-08-14_5_5_1",
                number: 1,
                horse: {
                    id: 766806,
                    name: "Denco Galliano",
                    pedigree: {
                      father: {
                        name: "Shaho",
                      },
                    },
                    trainer: {
                      firstName: "Jonas",
                      lastName: "Lundgren",
                    },
                },
                driver: {
                  id: 549496, 
                  firstName: "Johan",
                  lastName: "Untersteiner",
                },
              },
              {
                id: "2024-08-14_5_5_2",
                number: 2,
                horse: {
                    id: 7668063,
                    name: "Crazy Little Mary",
                    pedigree: {
                      father: {
                        name: "Bhaho",
                      },
                    },
                    trainer: {
                      firstName: "Bonas",
                      lastName: "Lundgren",
                    },
                },
                driver: {
                  id: 5494946, 
                  firstName: "Bohan",
                  lastName: "Untersteiner",
                },
              },
            ],  
          },
        ],
      }
      await route.fulfill({ json });
    });
  });

  test('should show title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Choose bet types' })).toBeVisible();
  });

  test('should select bet type and show available games', async ({ page }) => {
    await page.locator('#dropdown').selectOption('V75');
    await expect(page.getByText('V75_2024-08-17_16_5_TEST')).toBeVisible();
  });

  test('should select bet type, select game & show details', async ({ page }) => {

    // Select bet type
    await page.locator('#dropdown').selectOption('V75');
    
    // Select game
    await page.getByText('V75_2024-08-17_16_5_TEST').click();
    
    // Click horse row name to show details
    await page.getByText('Denco Galliano').click();
    
    // Expect all details show correctly
    await expect(page.getByText('FATHER')).toBeVisible();
    await expect(page.getByText('Shaho')).toBeVisible();
  
    // Click again to hide details
    await page.getByText('Denco Galliano').click();
    await expect(page.getByText('FATHER')).not.toBeVisible();
    await expect(page.getByText('Shaho')).not.toBeVisible();
  });

  test('should select bet type, select game & show then hide details', async ({ page }) => {

    // Select bet type
    await page.locator('#dropdown').selectOption('V75');
    
    // Select game
    await page.getByText('V75_2024-08-17_16_5_TEST').click();
    
    // Click horse row name to show details
    await page.getByText('Denco Galliano').click();
  
    // Click again to hide details
    await page.getByText('Denco Galliano').click();
    await expect(page.getByText('FATHER')).not.toBeVisible();
    await expect(page.getByText('Shaho')).not.toBeVisible();
  });

  test('should select bet type, select game & show details, select another one and hide the previous details while showing the newly clicked', async ({ page }) => {

    // Select bet type
    await page.locator('#dropdown').selectOption('V75');
    
    // Select game
    await page.getByText('V75_2024-08-17_16_5_TEST').click();
    
    // Click horse row name to show details
    await page.getByText('Denco Galliano').click();

    await expect(page.getByText('FATHER')).toBeVisible();
    await expect(page.getByText('Shaho')).toBeVisible();
  
    // Click another one to hide the above details and show the new one
    await page.getByText('Crazy Little Mary').click();
    await expect(page.getByText('Shaho')).not.toBeVisible();

    await expect(page.getByText('FATHER')).toBeVisible();
    await expect(page.getByText('Bhaho')).toBeVisible();
  });
});



test.describe('Error tests', () => {

  test('No data for bet type', async ({ page }) => {

    // Mocks
    await page.route('https://www.atg.se/services/racinginfo/v1/api/products/V86', async route => {
      const json = {
        upcoming: [],
      }

      await route.fulfill({ json });
    });

    await page.locator('#dropdown').selectOption('V86');
    await expect(page.getByText('No data available for bet type')).toBeVisible();
  });

  test('No data for game type', async ({ page }) => {
    

    // Mocks
    await page.route('https://www.atg.se/services/racinginfo/v1/api/products/V86', async route => {
      const json = {
        upcoming: [
          { 
            name: 'Strawberry', 
            id: "V86_2024-08-17_16_5_TEST",
          },
        ],
      }

      await route.fulfill({ json });
    });

    await page.route('https://www.atg.se/services/racinginfo/v1/api/games/V86_2024-08-17_16_5_TEST', async route => {
      const json = {
        id: "V86_2024-08-17_16_5_TEST",
        races: [],
      };
      await route.fulfill({ json });
    });

    await page.locator('#dropdown').selectOption('V86');

    await expect(page.getByText('V86_2024-08-17_16_5_TEST')).toBeVisible();

    // Select game
    await page.getByText('V86_2024-08-17_16_5_TEST').click();

    await expect(page.getByText('No data available for game')).toBeVisible();
  });
});
