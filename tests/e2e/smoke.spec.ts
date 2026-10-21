import { expect, test, type Page } from '@playwright/test';

const title = (page: Page) => page.locator('[data-slot="window-title"]');
const windows = (page: Page) => page.locator('section[data-app]');
const hello = (page: Page) => page.locator('[data-slot="hello"]');

test('home renders the h1 with Javier', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1').first()).toContainText('Javier');
});

test.describe('desktop 1440×900', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('opens Projects automatically and the dock switches the window', async ({ page }) => {
    await page.goto('/');
    await expect(windows(page)).toHaveCount(1);
    await expect(title(page)).toHaveText('Projects');
    await page.getByRole('button', { name: 'Open About' }).click();
    await expect(windows(page)).toHaveCount(1);
    await expect(title(page)).toHaveText('About Me');
  });

  test('language switch translates the intro and persists after reload', async ({ page }) => {
    await page.goto('/');
    await expect(hello(page)).toHaveText("Hello, I'm");
    await page.getByRole('button', { name: 'Switch language' }).click();
    await expect(hello(page)).toHaveText('Hola, soy');
    await expect(page.locator('html')).toHaveAttribute('lang', 'es');
    await page.reload();
    await expect(hello(page)).toHaveText('Hola, soy');
    await expect(page.getByRole('button', { name: 'Switch language' })).toHaveText('EN');
  });

  test('wallpaper button cycles data-wallpaper and persists after reload', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-wallpaper', 'light');
    await page.getByRole('button', { name: 'Change wallpaper' }).click();
    await expect(html).toHaveAttribute('data-wallpaper', 'peach');
    await expect(page.getByRole('status')).toHaveText('Wallpaper changed.');
    await page.getByRole('button', { name: 'Change wallpaper' }).click();
    await expect(html).toHaveAttribute('data-wallpaper', 'night');
    await page.reload();
    await expect(html).toHaveAttribute('data-wallpaper', 'night');
  });

  test('keyboard: Escape closes the window, 4 opens Terminal, 1 opens Projects', async ({ page }) => {
    await page.goto('/');
    await expect(title(page)).toHaveText('Projects');
    await page.locator('body').click({ position: { x: 5, y: 600 } });
    await page.keyboard.press('Escape');
    await expect(windows(page)).toHaveCount(0);
    await page.keyboard.press('4');
    await expect(title(page)).toHaveText('Terminal');
    await page.locator('body').click({ position: { x: 5, y: 600 } });
    await page.keyboard.press('1');
    await expect(title(page)).toHaveText('Projects');
  });

  test('traffic lights minimize and maximize; back returns to the previous app', async ({ page }) => {
    await page.goto('/');
    const win = windows(page);
    await page.getByRole('button', { name: 'Open Contact' }).click();
    await expect(title(page)).toHaveText('Say Hello');
    await win.getByRole('button', { name: 'Back' }).click();
    await expect(title(page)).toHaveText('Projects');
    await win.getByRole('button', { name: 'Maximize window' }).click();
    await expect(win).toHaveAttribute('data-state', 'maximized');
    await win.getByRole('button', { name: 'Minimize window' }).click();
    await expect(win).toBeHidden();
    await page.getByRole('button', { name: 'Open Projects' }).click();
    await expect(win).toBeVisible();
  });

  test('dragging the toolbar moves the window', async ({ page }) => {
    await page.goto('/');
    const win = windows(page);
    await expect(win).toBeVisible();
    const pos = () => win.evaluate((el) => [parseFloat(el.style.left), parseFloat(el.style.top)]);
    const [left, top] = await pos();
    const box = await win.locator('header').boundingBox();
    if (!box) throw new Error('no toolbar geometry');
    await page.mouse.move(box.x + box.width / 2, box.y + 26);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 - 120, box.y + 66, { steps: 5 });
    await page.mouse.up();
    expect(await pos()).toEqual([left! - 120, top! + 40]);
  });

  test('the window re-fits when the viewport shrinks from 1440×900 to 900×700', async ({ page }) => {
    await page.goto('/');
    const win = windows(page);
    await expect(win).toBeVisible();
    await page.setViewportSize({ width: 900, height: 700 });
    await expect
      .poll(async () => {
        const b = await win.boundingBox();
        return b ? b.x >= 0 && b.x + b.width <= 900 && b.y + b.height <= 700 : false;
      })
      .toBe(true);
  });

  test('opening a project from a scrolled list starts the detail at the top', async ({ page }) => {
    await page.goto('/');
    const panel = windows(page).locator('[data-slot="window-panel"]');
    await expect(panel).toBeVisible();
    await panel.evaluate((el) => (el.scrollTop = 450));
    await panel.getByRole('button', { name: /PokeCats/ }).click();
    await expect(panel.getByRole('button', { name: '← All projects' })).toBeVisible();
    expect(await panel.evaluate((el) => el.scrollTop)).toBe(0);
  });

  test('search filters the project list', async ({ page }) => {
    await page.goto('/');
    const win = windows(page);
    await win.locator('header').getByRole('button', { name: 'Search projects' }).click();
    await win.getByRole('searchbox', { name: 'Search projects' }).fill('comic');
    const results = win.locator('[data-slot="window-panel"]').getByRole('button');
    await expect(results).toHaveCount(1);
    await expect(results.first()).toContainText('Comic Nest');
  });

  test('copying the email in Contact shows the toast', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/');
    await page.getByRole('button', { name: 'Open Contact' }).click();
    await windows(page)
      .getByRole('button', { name: /Copy email/ })
      .click();
    await expect(page.getByRole('status')).toHaveText('Email copied');
  });

  test('the dock indicator turns off when the window is minimized', async ({ page }) => {
    await page.goto('/');
    const dockItem = page.getByRole('button', { name: 'Open Projects' });
    await expect(dockItem).toHaveAttribute('data-open', '');
    await windows(page).getByRole('button', { name: 'Minimize window' }).click();
    await expect(dockItem).not.toHaveAttribute('data-open');
    await expect(dockItem.locator('i')).toHaveCSS('opacity', '0');
  });

  test('native print (no explicit target) keeps the active window', async ({ page }) => {
    await page.goto('/');
    await expect(windows(page)).toBeVisible();
    await page.emulateMedia({ media: 'print' });
    await expect(windows(page)).toBeVisible();
  });
});

test.describe('small phone 320×640', () => {
  test.use({ viewport: { width: 320, height: 640 }, hasTouch: true });

  test('the whole dock fits on screen', async ({ page }) => {
    await page.goto('/');
    const box = await page.getByRole('navigation', { name: 'App dock' }).boundingBox();
    if (!box) throw new Error('no dock geometry');
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(320);
  });
});

test.describe('mobile 390×844', () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test('a window hides the intro and closing it brings it back', async ({ page }) => {
    await page.goto('/');
    const intro = page.getByRole('region', { name: 'Introduction' });
    await expect(windows(page)).toHaveCount(0);
    await expect(intro).toHaveCSS('opacity', '1');
    await page.getByRole('button', { name: 'Open About' }).click();
    await expect(title(page)).toHaveText('About Me');
    await expect(intro).toHaveCSS('opacity', '0');
    await windows(page).getByRole('button', { name: 'Close window' }).click();
    await expect(windows(page)).toHaveCount(0);
    await expect(intro).toHaveCSS('opacity', '1');
  });
});
