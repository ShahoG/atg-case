import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});

test('has title', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Choose bet types' })).toBeVisible();
});

test('Select bet type, select game & show details', async ({ page }) => {

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
          ],  
        },
      ],
    }
    await route.fulfill({ json });
  });


  await page.locator('#dropdown').selectOption('V75');

  await page.getByText('V75_2024-08-17_16_5_TEST').click();

  
  await page.getByText('Denco Galliano').click();
  
  await expect(page.getByText('PureBallast')).toBeVisible();
  await expect(page.getByText('FATHER')).toBeVisible();
  await expect(page.getByText('Shaho')).toBeVisible();


});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
