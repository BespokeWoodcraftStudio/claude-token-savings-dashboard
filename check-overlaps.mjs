#!/usr/bin/env node
/*
 * check-overlaps.mjs — text-overlap + clipping detector for the HTML/CSS
 * dashboard (the DOM analogue of the project's SVG check-svg-overlaps.mjs).
 *
 * The savings dashboard is laid out with HTML + CSS + Chart.js, not SVG, so the
 * "no text may overlap or clip" rule from CLAUDE.md ("Visual & Diagram Output")
 * is enforced against DOM boxes instead of SVG <text>:
 *
 *   (a) TEXT-ON-TEXT — any two visible, text-bearing LEAF elements whose
 *       bounding boxes intersect by more than `clearancePx`. A "leaf" here is an
 *       element that holds a non-empty direct text node and has no child element
 *       that itself contains text — i.e. the smallest thing that actually paints
 *       glyphs. (Catching parent containers would just flag every wrapper around
 *       its own children.)
 *
 *   (b) CLIPPING — any visible element whose content is cut off:
 *       scrollWidth > clientWidth + 1 (horizontal overflow inside the box), OR
 *       the element's right edge runs past the document / viewport width (it
 *       spills off-canvas). Elements that are deliberately scrollable
 *       (overflow-x: auto | scroll) are exempt — overflow there is by design.
 *
 * Hidden elements are skipped: display:none, visibility:hidden, opacity 0, or
 * zero-size boxes never paint, so they can't collide.
 *
 * Usage:
 *   1. Serve the project folder:  (cd projects/savings-dashboard && python3 -m http.server 8765)
 *   2. Run:  node check-overlaps.mjs http://localhost:8765/index.html
 *      Optional second arg: clearance in pixels (default 1).
 *   3. Exits 0 with "OK — 0 overlaps, 0 clipping" if clean; exits 1 with a
 *      numbered report otherwise.
 *
 * Requires: Playwright (npx playwright install chromium once). Resolves a local
 * install if present, otherwise falls back to the global one (`npm root -g`), so
 * this works in a markdown/KB repo that has no local node_modules.
 */
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  try {
    const groot = execFileSync('npm', ['root', '-g'], { encoding: 'utf8' }).trim();
    ({ chromium } = require(groot + '/playwright'));
  } catch (e) {
    console.error('Playwright not found locally or globally. Install it once:\n  npm i -g playwright && npx playwright install chromium');
    process.exit(2);
  }
}

const url = process.argv[2];
const clearancePx = Number(process.argv[3] ?? 1);
if (!url || !/^https?:\/\/localhost/.test(url)) {
  console.error('usage: node check-overlaps.mjs http://localhost:<port>/<page>.html [clearancePx]');
  console.error('       (serve the folder first, e.g. python3 -m http.server 8765)');
  process.exit(2);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto(url, { waitUntil: 'networkidle' });
// let Chart.js finish its entry animation before we measure boxes
await page.waitForTimeout(600);

const report = await page.evaluate((clearancePx) => {
  const out = { textOnText: [], clipping: [], scanned: { leaves: 0, elements: 0 } };

  const intersects = (a, b, tol) => !(
    a.right  < b.left   - tol ||
    a.left   > b.right  + tol ||
    a.bottom < b.top    - tol ||
    a.top    > b.bottom + tol
  );

  // overlap area > tol on BOTH axes => a real collision, not a 1px touch
  const overlapsBy = (a, b, tol) => {
    const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    return ox > tol && oy > tol;
  };

  const isHidden = (el) => {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return true;
    if (Number(s.opacity) === 0) return true;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return true;
    return false;
  };

  // Does this element hold its OWN visible text (a non-empty direct text node)?
  const hasOwnText = (el) =>
    Array.from(el.childNodes).some(
      (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0
    );

  // Does any DESCENDANT element carry text? (If so, this isn't a leaf — its
  // children are the ones painting glyphs.)
  const hasChildWithText = (el) =>
    Array.from(el.querySelectorAll('*')).some((c) => hasOwnText(c));

  const all = Array.from(document.body.querySelectorAll('*'));
  out.scanned.elements = all.length;

  // ---- collect leaf text elements (the smallest glyph-painting boxes) ----
  const leaves = [];
  for (const el of all) {
    const tag = el.tagName.toLowerCase();
    if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'canvas') continue;
    if (!hasOwnText(el)) continue;
    if (hasChildWithText(el)) continue; // a wrapper, not a leaf
    if (isHidden(el)) continue;
    leaves.push({
      el,
      rect: el.getBoundingClientRect(),
      text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 50),
    });
  }
  out.scanned.leaves = leaves.length;

  // ---- (a) TEXT-ON-TEXT ----
  for (let i = 0; i < leaves.length; i++) {
    for (let j = i + 1; j < leaves.length; j++) {
      const A = leaves[i], B = leaves[j];
      // skip ancestor/descendant pairs (shouldn't happen for leaves, but cheap)
      if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
      if (intersects(A.rect, B.rect, clearancePx) && overlapsBy(A.rect, B.rect, clearancePx)) {
        out.textOnText.push({
          a: A.text, b: B.text,
          ax: Math.round(A.rect.x), ay: Math.round(A.rect.y),
          bx: Math.round(B.rect.x), by: Math.round(B.rect.y),
        });
      }
    }
  }

  // ---- (b) CLIPPING ----
  const docW = Math.max(
    document.documentElement.clientWidth,
    document.documentElement.scrollWidth
  );
  const viewW = window.innerWidth;
  const limitW = Math.max(docW, viewW);

  for (const el of all) {
    const tag = el.tagName.toLowerCase();
    if (tag === 'script' || tag === 'style' || tag === 'html' || tag === 'body') continue;
    if (isHidden(el)) continue;
    const s = getComputedStyle(el);
    // intentionally-scrollable boxes own their overflow — not a defect
    const scrollable = /(auto|scroll)/.test(s.overflowX) || /(auto|scroll)/.test(s.overflow);
    // text-overflow:ellipsis is GRACEFUL truncation (the "…" is the design), not a
    // clip — a long label intentionally shortened still reads fine. Exempt it.
    const ellipsisTruncated = s.textOverflow === 'ellipsis' && /(hidden|clip)/.test(s.overflowX + ' ' + s.overflow);

    const r = el.getBoundingClientRect();
    const horizOverflow = !scrollable && !ellipsisTruncated && el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0;
    const offCanvas = r.right > limitW + 1 || r.left < -1;

    if (horizOverflow || offCanvas) {
      out.clipping.push({
        tag,
        cls: (el.getAttribute('class') || '').slice(0, 40),
        text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 50),
        reason: horizOverflow ? 'content wider than box (scrollWidth>clientWidth)' : 'extends past page/viewport width',
        scrollW: el.scrollWidth, clientW: el.clientWidth,
        right: Math.round(r.right), limit: Math.round(limitW),
      });
    }
  }

  return out;
}, clearancePx);

await browser.close();

const total = report.textOnText.length + report.clipping.length;
console.log(
  `Scanned ${report.scanned.elements} element(s), ${report.scanned.leaves} text leaf/leaves. Clearance: ${clearancePx}px. Viewport: 1280x1000.`
);

if (total === 0) {
  console.log('OK — 0 overlaps, 0 clipping.');
  process.exit(0);
}

console.log(`FAIL — ${report.textOnText.length} text-on-text overlap(s), ${report.clipping.length} clipping issue(s).`);
report.textOnText.forEach((o, i) => {
  console.log(`  [text ${i + 1}] "${o.a}" @ (${o.ax},${o.ay})  <->  "${o.b}" @ (${o.bx},${o.by})`);
});
report.clipping.forEach((o, i) => {
  console.log(`  [clip ${i + 1}] <${o.tag}${o.cls ? ` class="${o.cls}"` : ''}> — ${o.reason}`);
  console.log(`             text "${o.text}"  scrollW=${o.scrollW} clientW=${o.clientW} right=${o.right} limit=${o.limit}`);
});
process.exit(1);
