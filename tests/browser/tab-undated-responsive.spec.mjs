import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915, tag: '412' },
  { name: 'Realme 9 Pro+ Compact (392x872)', width: 392, height: 872, tag: '392' },
];

test.describe('Undated Cases (#undated) Mobile Overflow Menu & Responsive Audit', () => {
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
        plaintiff: `Party ${idx + 1}`,
        defendant: 'State',
        caseType: idx % 2 === 0 ? 'civil' : 'criminal',
        courtName: 'Court of Civil Judge (Senior Division), Court No. 1',
        nextHearing: '',
        hearingProcess: 'Awaiting Next Date Fixation',
        caseYear: '2026',
        filingDate: '2026-01-15',
        clientName: `Client ${idx + 1}`,
        clientNumber: '+91 98765 43210',
        totalFee: '40000',
        stage: 'Arguments',
        courtNo: '1',
      }));
    });

    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(async () => {
      await page.evaluate(() => document.getElementById('appSkeletonOverlay')?.remove());
    });
  });

  for (const vp of mobileViewports) {
    test(`Mobile header clean layout, 44px menu button & menu actions at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('undated');
        }
      });
      await page.locator('#undatedMobileMenuBtn').waitFor({ state: 'visible', timeout: 10000 });
      await page.waitForTimeout(300);

      const metrics = await page.evaluate(() => {
        const titleEl = document.querySelector('#undatedMainTitle');
        const subEl = document.querySelector('#undatedHeaderSubline');
        const badgeEl = document.querySelector('#undatedTotalBadge');
        const menuBtn = document.querySelector('#undatedMobileMenuBtn');
        const refreshEl = document.querySelector('#undatedRefreshBtn');
        const toggleEl = document.querySelector('#undatedViewToggle');
        const chipsRow = document.querySelector('#undated .undated-chips-row');
        const chipsList = document.querySelector('#undated .undated-chips-row .category-chips');

        const titleRect = titleEl?.getBoundingClientRect();
        const subRect = subEl?.getBoundingClientRect();
        const badgeRect = badgeEl?.getBoundingClientRect();
        const btnRect = menuBtn?.getBoundingClientRect();
        const chipsRect = chipsList?.getBoundingClientRect();

        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          titleTruncated: titleEl ? titleEl.scrollWidth > titleEl.clientWidth + 1 : true,
          titleRight: titleRect?.right ?? 0,
          btnLeft: btnRect?.left ?? 0,
          subHeight: subRect?.height ?? 0,
          badgeHeight: badgeRect?.height ?? 0,
          btnW: btnRect?.width ?? 0,
          btnH: btnRect?.height ?? 0,
          refreshHidden: refreshEl ? getComputedStyle(refreshEl).display === 'none' : false,
          toggleHidden: toggleEl ? getComputedStyle(toggleEl).display === 'none' : false,
          chipsHeight: chipsRect?.height ?? 0,
          chipsScrollable: chipsRow ? chipsRow.scrollWidth > chipsRow.clientWidth : false,
        };
      });

      expect(metrics.scrollWidth).toBe(metrics.clientWidth);
      expect(metrics.titleTruncated).toBe(false);
      expect(metrics.titleRight).toBeLessThanOrEqual(metrics.btnLeft);
      expect(metrics.subHeight).toBeLessThanOrEqual(28);
      expect(metrics.badgeHeight).toBeLessThanOrEqual(22);
      expect(metrics.btnW).toBeGreaterThanOrEqual(44);
      expect(metrics.btnH).toBeGreaterThanOrEqual(44);
      expect(metrics.refreshHidden).toBe(true);
      expect(metrics.toggleHidden).toBe(true);
      expect(metrics.chipsHeight).toBeLessThanOrEqual(46);
      expect(metrics.chipsScrollable).toBe(true);

      const header = page.locator('#undated .board-head.undated-master-head');
      await header.screenshot({
        path: `C:/Users/Lenovo/.gemini/antigravity/brain/022ed7a7-1964-443a-a03d-6a262c8f23cb/scratch/undated-menu-header-${vp.tag}.png`,
      });

      // Open overflow menu and switch to Cards view
      await page.locator('#undatedMobileMenuBtn').click();
      await expect(page.locator('#undatedMobileMenu')).toHaveClass(/open/);
      await page.locator('#undatedMobileMenuCards').click();
      await expect(page.locator('#undatedMobileMenu')).not.toHaveClass(/open/);
      await expect(page.locator('#undatedCardsViewContainer')).not.toHaveClass(/hidden/);
      await page.locator('#undatedCardsViewContainer .undated-card-item').first().screenshot({
        path: `C:/Users/Lenovo/.gemini/antigravity/brain/022ed7a7-1964-443a-a03d-6a262c8f23cb/scratch/undated-card-${vp.tag}.png`,
      });
      await page.locator('#undated .foot.undated-foot').screenshot({
        path: `C:/Users/Lenovo/.gemini/antigravity/brain/022ed7a7-1964-443a-a03d-6a262c8f23cb/scratch/undated-foot-${vp.tag}.png`,
      });
      const footHeight = await page.locator('#undated .foot.undated-foot').evaluate((el) => el.getBoundingClientRect().height);
      expect(footHeight).toBeLessThanOrEqual(40);
    });
  }

  test('Desktop (1280x800) zero regression check', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(async () => {
      if (typeof window.showTab === 'function') {
        await window.showTab('undated');
      }
    });
    await page.locator('#undatedRefreshBtn').waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(300);

    const desktopCheck = await page.evaluate(() => {
      const suffix = document.querySelector('#undated .undated-title-suffix');
      const backBtn = document.querySelector('#undatedBackToAllBtn');
      const refreshSpan = document.querySelector('#undatedRefreshBtn span');
      const mobileMenuWrap = document.querySelector('#undatedMobileMenuWrap');
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        suffixVisible: suffix ? getComputedStyle(suffix).display !== 'none' : false,
        backBtnVisible: backBtn ? getComputedStyle(backBtn).display !== 'none' : false,
        refreshTextVisible: refreshSpan ? getComputedStyle(refreshSpan).display !== 'none' : false,
        mobileMenuHidden: mobileMenuWrap ? getComputedStyle(mobileMenuWrap).display === 'none' : false,
      };
    });

    expect(desktopCheck.scrollWidth).toBe(desktopCheck.clientWidth);
    expect(desktopCheck.suffixVisible).toBe(true);
    expect(desktopCheck.backBtnVisible).toBe(true);
    expect(desktopCheck.refreshTextVisible).toBe(true);
    expect(desktopCheck.mobileMenuHidden).toBe(true);
  });
});
