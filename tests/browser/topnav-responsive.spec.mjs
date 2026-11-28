import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915, tag: '412' },
  { name: 'Realme 9 Pro+ Compact (392x872)', width: 392, height: 872, tag: '392' },
];

test.describe('Top Navigation Bar (#casebookTopHeader) Responsive & Visual Parity', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(90000);
    await page.goto('/index.html', { waitUntil: 'load' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 20000 });

    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
      window.allCaseRecords = Array.from({ length: 12 }, (_, idx) => ({
        caseNo: `CS/${100 + idx}/2026`,
        caseName: `Party ${idx + 1} vs State`,
        nextHearing: '',
        caseType: 'civil',
      }));
      if (typeof window.updateTopnavUndatedCount === 'function') {
        window.updateTopnavUndatedCount();
      }
    });

    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(async () => {
      await page.evaluate(() => document.getElementById('appSkeletonOverlay')?.remove());
    });
  });

  for (const vp of mobileViewports) {
    test(`Mobile TopNav unified ghost buttons, 44px targets & search expand at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(300);

      const metrics = await page.evaluate(() => {
        const hamburger = document.querySelector('#sidebarToggleBtn')?.getBoundingClientRect();
        const searchBtn = document.querySelector('#searchTriggerBtn');
        const searchRect = searchBtn?.getBoundingClientRect();
        const installBtn = document.querySelector('#desktopInstallBtn')?.getBoundingClientRect();
        const logoutBtn = document.querySelector('#adminLogoutBtn')?.getBoundingClientRect();
        const undatedBtn = document.querySelector('#topnavUndatedBtn');
        const undatedRect = undatedBtn?.getBoundingClientRect();

        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hamburgerW: hamburger?.width ?? 0,
          hamburgerH: hamburger?.height ?? 0,
          searchW: searchRect?.width ?? 0,
          searchH: searchRect?.height ?? 0,
          searchBg: searchBtn ? getComputedStyle(searchBtn).backgroundColor : '',
          installW: installBtn?.width ?? 0,
          installH: installBtn?.height ?? 0,
          logoutW: logoutBtn?.width ?? 0,
          logoutH: logoutBtn?.height ?? 0,
          undatedW: undatedRect?.width ?? 0,
          undatedH: undatedRect?.height ?? 0,
          undatedRadius: undatedBtn ? getComputedStyle(undatedBtn).borderRadius : '',
        };
      });

      expect(metrics.scrollWidth).toBe(metrics.clientWidth);
      expect(metrics.hamburgerW).toBeGreaterThanOrEqual(44);
      expect(metrics.hamburgerH).toBeGreaterThanOrEqual(44);
      expect(metrics.searchW).toBeGreaterThanOrEqual(44);
      expect(metrics.searchH).toBeGreaterThanOrEqual(44);
      expect(metrics.installW).toBeGreaterThanOrEqual(44);
      expect(metrics.installH).toBeGreaterThanOrEqual(44);
      expect(metrics.logoutW).toBeGreaterThanOrEqual(44);
      expect(metrics.logoutH).toBeGreaterThanOrEqual(44);
      expect(metrics.undatedW).toBeGreaterThanOrEqual(44);

      await page.locator('#casebookTopHeader').screenshot({
        path: `C:/Users/Lenovo/.gemini/antigravity/brain/022ed7a7-1964-443a-a03d-6a262c8f23cb/scratch/topnav-${vp.tag}.png`,
      });

      // Verify search expands cleanly inside 56px navbar
      await page.locator('#searchTriggerBtn').click();
      await expect(page.locator('#searchContainer')).toHaveClass(/expanded/);
      const expandedScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(expandedScrollWidth).toBe(vp.width);
    });
  }

  test('Desktop (1280x800) zero regression check', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.waitForTimeout(300);

    const desktopCheck = await page.evaluate(() => {
      const undatedLabel = document.querySelector('#topnavUndatedBtn .undated-btn-label');
      const searchBtn = document.querySelector('#searchTriggerBtn');
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        undatedLabelVisible: undatedLabel ? getComputedStyle(undatedLabel).display !== 'none' : false,
        searchWidth: searchBtn?.getBoundingClientRect().width ?? 0,
      };
    });

    expect(desktopCheck.scrollWidth).toBe(desktopCheck.clientWidth);
    expect(desktopCheck.undatedLabelVisible).toBe(true);
    expect(desktopCheck.searchWidth).toBe(36);
  });
});
