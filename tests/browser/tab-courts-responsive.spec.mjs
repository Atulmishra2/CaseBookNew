import { test, expect } from 'playwright/test';

const mobileViewports = [
  { name: 'Realme 9 Pro+ Primary (412x915)', width: 412, height: 915 },
  { name: 'Realme 9 Pro+ Small Scale (392x872)', width: 392, height: 872 },
  { name: 'Realme 9 Pro+ Landscape (915x412)', width: 915, height: 412 },
];

test.describe('Courts Master (#courts) Realme 9 Pro+ Responsive Audit', () => {
  test.beforeEach(async ({ page }) => {
    test.setTimeout(60000);
    await page.goto('/index.html', { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
      if (typeof window.createAdminSession === 'function') {
        window.createAdminSession('admin', false);
      }
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.showTab === 'function', null, { timeout: 15000 });
    await page.locator('#appSkeletonOverlay').waitFor({ state: 'detached', timeout: 15000 }).catch(() => {});
    await page.waitForSelector('.tab.active', { timeout: 10000 }).catch(() => {});
  });

  for (const vp of mobileViewports) {
    test(`Audit Courts Master Viewport, Touch Targets & Dock Clearance on ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      await page.evaluate(async () => {
        if (typeof window.showTab === 'function') {
          await window.showTab('courts');
        }
        window.courts = Array.from({ length: 12 }, (_, i) => `Sample Court ${i + 1}`);
        window.courtsList = window.courts.map((name, i) => ({
          court_name: name,
          short_code: `C-${i + 1}`,
          civil_title: name,
          cadre: 'District Judge',
          status: 'ACTIVE',
          sort_order: i + 1,
        }));
        if (typeof window.renderCourtsTable === 'function') {
          window.renderCourtsTable();
        }
      });

      await page.waitForTimeout(500);

      const audit = await page.evaluate((vpInfo) => {
        const vpWidth = vpInfo.width;
        const isPortrait = vpInfo.height > vpInfo.width;
        const courtsTab = document.querySelector('#courts');
        const rootClientWidth = document.documentElement.clientWidth;
        const rootScrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;

        const containerPaddingBottom = courtsTab
          ? parseFloat(window.getComputedStyle(courtsTab).paddingBottom)
          : 0;

        const inputs = Array.from(
          document.querySelectorAll('#courts input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), #courts select, #courts textarea')
        ).filter((el) => window.getComputedStyle(el).display !== 'none' && el.offsetParent !== null);
        const inputFontSizes = inputs.map((inp) => parseFloat(window.getComputedStyle(inp).fontSize));

        const actionButtons = Array.from(
          document.querySelectorAll('#courts .court-refresh-btn, #courts .court-btn-primary, #courts .court-page-btn, #courts .zen-icon-btn')
        ).filter((el) => el.offsetParent !== null);
        const buttonHeights = actionButtons.map((b) => b.getBoundingClientRect().height);
        const buttonWidths = actionButtons.map((b) => b.getBoundingClientRect().width);

        // Verify modal viewport anchoring (not trapped by .tab.active contain: layout)
        const overflows = [];
        const allElements = courtsTab ? courtsTab.querySelectorAll('*') : [];
        allElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          if (
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            rect.width > 0 &&
            rect.height > 0 &&
            el.offsetParent !== null &&
            rect.right > vpWidth + 1.5
          ) {
            overflows.push({
              tag: el.tagName,
              className: el.className,
              id: el.id,
              right: rect.right,
            });
          }
        });

        return {
          isPortrait,
          rootClientWidth,
          rootScrollWidth,
          bodyScrollWidth,
          containerPaddingBottom,
          inputFontSizes,
          buttonHeights,
          buttonWidths,
          overflows,
        };
      }, vp);

      // Open #addCourtModal and wait for 180ms courtModalPop animation to settle
      await page.evaluate(() => {
        if (typeof window.openAddCourtModal === 'function') window.openAddCourtModal();
      });
      await page.waitForTimeout(250);
      const modalAudit = await page.evaluate(() => {
        const modal = document.querySelector('#addCourtModal');
        const modalRect = modal ? modal.getBoundingClientRect() : null;
        const modalCard = modal ? modal.querySelector('.court-modal-card') : null;
        const cardRect = modalCard ? modalCard.getBoundingClientRect() : null;
        const modalDropdownHeights = Array.from(
          document.querySelectorAll('#addCourtModal .custom-dropdown-trigger')
        ).map((el) => el.getBoundingClientRect().height);
        if (typeof window.closeAddCourtModal === 'function') window.closeAddCourtModal();
        return {
          modalTop: modalRect ? Math.round(modalRect.top) : null,
          cardTop: cardRect ? Math.round(cardRect.top) : null,
          modalDropdownHeights,
        };
      });

      expect(audit.rootScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.bodyScrollWidth).toBeLessThanOrEqual(vp.width + 1);
      expect(audit.overflows).toEqual([]);
      if (audit.isPortrait) {
        expect(audit.containerPaddingBottom).toBeGreaterThanOrEqual(88);
      }
      expect(modalAudit.modalTop).toBe(0);
      expect(modalAudit.cardTop).toBeGreaterThanOrEqual(0);
      audit.inputFontSizes.forEach((fs) => expect(fs).toBeGreaterThanOrEqual(16));
      audit.buttonHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));
      audit.buttonWidths.forEach((w) => expect(w).toBeGreaterThanOrEqual(43.5));
      modalAudit.modalDropdownHeights.forEach((h) => expect(h).toBeGreaterThanOrEqual(43.5));
    });
  }

  test('Verify Desktop Viewport (1280x800) Baseline 0% Regression on Courts Master', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(async () => {
      if (typeof window.showTab === 'function') {
        await window.showTab('courts');
      }
    });

    await page.waitForTimeout(500);

    const desktopCheck = await page.evaluate(() => {
      const courtsTab = document.querySelector('#courts');
      const smartDock = document.querySelector('.cb-smart-dock');
      const sidebar = document.querySelector('.sidebar, .sidenav');
      return {
        tabVisible: !!courtsTab && window.getComputedStyle(courtsTab).display !== 'none',
        smartDockDisplay: smartDock ? window.getComputedStyle(smartDock).display : 'none',
        sidebarVisible: sidebar ? window.getComputedStyle(sidebar).display !== 'none' : false,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });

    expect(desktopCheck.tabVisible).toBe(true);
    expect(desktopCheck.smartDockDisplay).toBe('none');
    expect(desktopCheck.sidebarVisible).toBe(true);
    expect(desktopCheck.scrollWidth).toBeLessThanOrEqual(desktopCheck.clientWidth + 1);
  });
});
