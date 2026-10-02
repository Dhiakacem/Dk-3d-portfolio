import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const target = process.argv[2] || 'http://127.0.0.1:4173/';
const executablePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browser = await chromium.launch({ executablePath, headless: true, args: ['--no-sandbox'] });
const results = [];
try {
  for (const [label, viewport, isMobile] of [
    ['mobile', { width: 390, height: 844 }, true],
    ['desktop', { width: 1280, height: 800 }, false],
  ]) {
    const context = await browser.newContext({ viewport, isMobile, hasTouch: isMobile, acceptDownloads: true, reducedMotion: isMobile ? 'reduce' : 'no-preference' });
    let simulatedEmailStatus = 200;
    const mockedEmailRequests = [];
    await context.route('https://api.emailjs.com/api/v1.0/email/send', async route => {
      mockedEmailRequests.push(route.request().postDataJSON());
      await new Promise(resolve => setTimeout(resolve, 250));
      await route.fulfill({ status: simulatedEmailStatus, contentType: 'text/plain', body: simulatedEmailStatus === 200 ? 'OK' : 'Test failure' });
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && new URL(r.url()).host === new URL(target).host) errors.push(`${r.status()} ${r.url()}`); });
    await page.goto(target, { waitUntil: 'networkidle' });
    assert.match(await page.locator('h1').innerText(), /Dhia Kacem/);
    const before = await page.evaluate(() => performance.getEntriesByType('resource').map(r => r.name));
    assert.ok(!before.some(url => /\.(glb|gltf)|OrbitControls/.test(url)), `${label}: model loaded before interaction`);
    assert.ok(!before.some(url => /earth-|computer-|imset-|QcMedProject-/.test(url)), `${label}: below-fold media loaded early`);
    if (isMobile) await page.screenshot({ path: join(tmpdir(), 'dhiakacem-mobile-hero.png') });
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.locator('#about').waitFor();
    assert.match(await page.locator('#about').locator('..').innerText(), /PostgreSQL/);
    assert.match(await page.locator('#experience').locator('..').innerText(), /IMSET/);
    const imsetLogo = page.locator('img[alt^="IMSET"]');
    await imsetLogo.scrollIntoViewIfNeeded();
    assert.ok(await imsetLogo.evaluate(img => img.complete && img.naturalWidth > 0));
    if (isMobile) {
      await page.waitForTimeout(900);
      await page.screenshot({ path: join(tmpdir(), 'dhiakacem-imset.png') });
    }
    const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    assert.ok(dimensions.scroll <= dimensions.client + 1, `${label} horizontal overflow: ${JSON.stringify(dimensions)}`);
    if (isMobile) {
      await page.getByRole('button', { name: /toggle menu/i }).click();
      assert.equal(await page.getByRole('button', { name: /toggle menu/i }).getAttribute('aria-expanded'), 'true');
      await page.getByRole('group', { name: 'Language' }).getByRole('button', { name: 'FR' }).click();
      assert.equal(await page.locator('html').getAttribute('lang'), 'fr');
      assert.match(await page.locator('#experience').locator('..').innerText(), /Formateur Java/);
      assert.equal(await page.getByRole('button', { name: /fermer le menu/i }).getAttribute('aria-expanded'), 'false');
      await page.getByRole('button', { name: 'À propos' }).waitFor({ state: 'hidden' });
      const themeBefore = await page.locator('html').getAttribute('class');
      await page.getByRole('button', { name: /mode/ }).click();
      assert.notEqual(await page.locator('html').getAttribute('class'), themeBefore);
      await page.getByRole('button', { name: /mode/ }).click();
      assert.equal(await page.locator('html').getAttribute('class'), themeBefore);
      await page.screenshot({ path: join(tmpdir(), 'dhiakacem-mobile.png') });
    } else {
      await page.getByRole('group', { name: 'Language' }).getByRole('button', { name: 'FR', exact: true }).click();
      assert.match(await page.locator('#experience').locator('..').innerText(), /Formateur Java/);
      await page.getByRole('group', { name: 'Langue' }).getByRole('button', { name: 'EN', exact: true }).click();
      await page.getByRole('button', { name: 'Explore in 3D' }).click();
      await page.locator('[data-scene="computer"] canvas').waitFor({ timeout: 15000 });
      await page.screenshot({ path: join(tmpdir(), 'dhiakacem-desktop.png') });
      const tech = page.locator('#technologies').locator('..').locator('li');
      assert.equal(await tech.count(), 18);
      const rows = await tech.evaluateAll(items => [...new Set(items.map(item => Math.round(item.getBoundingClientRect().top)))]);
      assert.equal(rows.length, 3);
      await tech.first().scrollIntoViewIfNeeded();
      await page.waitForFunction(() => {
        const images = [...document.querySelector('#technologies').parentElement.querySelectorAll('img')];
        return images.length === 18 && images.every(img => img.complete && img.naturalWidth > 0);
      }, { timeout: 10000 });
      const threeIcon = tech.filter({ hasText: 'Three JS' }).locator('img');
      if ((await page.locator('html').getAttribute('class') || '').includes('dark')) {
        await page.getByRole('button', { name: 'Switch to light mode' }).click();
      }
      assert.doesNotMatch(await threeIcon.evaluate(img => getComputedStyle(img).filter), /invert\(1\)/);
      await page.screenshot({ path: join(tmpdir(), 'dhiakacem-tech-light.png') });
      await page.getByRole('button', { name: 'Switch to dark mode' }).click();
      assert.match(await threeIcon.evaluate(img => getComputedStyle(img).filter), /invert\(1\)/);
      await page.waitForTimeout(1200);
      await page.screenshot({ path: join(tmpdir(), 'dhiakacem-tech-dark.png'), animations: 'disabled' });
      const slider = page.locator('#projects .snap-x');
      await slider.scrollIntoViewIfNeeded();
      const sliderBefore = await slider.evaluate(el => el.scrollLeft);
      await page.getByRole('button', { name: 'Scroll next projects' }).click();
      await page.waitForTimeout(600);
      assert.ok(await slider.evaluate(el => el.scrollLeft) > sliderBefore);
    }
    const projectCards = page.locator('#projects .snap-x > div');
    assert.equal(await projectCards.count(), 8);
    const projectNames = await projectCards.locator('h3').allTextContents();
    assert.match(projectNames[0], /Abronubes/i);
    assert.match(projectNames[1], /Abronubes/i);
    assert.match(projectNames[2], /Archivefy/i);
    assert.match(projectNames[3], /QUNDIS/i);
    for (const [index, assetName] of [[2, 'archivefy-mobile'], [3, 'qundis-mobile'], [5, 'qcmed-app']]) {
      const card = projectCards.nth(index);
      await card.scrollIntoViewIfNeeded();
      const projectImage = card.locator('img').first();
      await projectImage.evaluate(img => img.decode());
      assert.match(await projectImage.getAttribute('src'), new RegExp(assetName));
    }
    assert.match(await projectCards.nth(2).innerText(), /kotlin/i);
    assert.match(await projectCards.nth(2).innerText(), /postgresql/i);
    assert.match(await projectCards.nth(3).innerText(), /jetpack-compose/i);
    assert.match(await projectCards.nth(3).innerText(), /sqlite/i);
    if (isMobile) {
      assert.ok(await page.locator('#projects .snap-x').evaluate(el => el.scrollWidth > el.clientWidth));
      await page.screenshot({ path: join(tmpdir(), 'dhiakacem-projects-mobile.png'), animations: 'disabled' });
    } else {
      await page.screenshot({ path: join(tmpdir(), 'dhiakacem-projects-desktop.png'), animations: 'disabled' });
    }
    const contactForm = page.locator('#contact').locator('xpath=following::form[1]');
    await contactForm.scrollIntoViewIfNeeded();
    assert.equal(await contactForm.evaluate(form => form.checkValidity()), false, `${label}: empty contact form should be invalid`);
    const fillContactForm = async () => {
      await contactForm.getByLabel(/name|nom/i).fill('Portfolio smoke test');
      await contactForm.getByLabel(/email/i).fill('smoke-test@example.com');
      await contactForm.getByLabel(/message|message/i).fill('Automated form check. Email endpoint is mocked; this message will not be sent.');
    };
    await fillContactForm();
    const contactSubmit = contactForm.locator('button[type="submit"]');
    await contactSubmit.click();
    assert.equal(await contactSubmit.isDisabled(), true, `${label}: submit button should lock while sending`);
    await page.getByRole('status').filter({ hasText: /Thank you|Merci/ }).waitFor();
    assert.equal(await contactSubmit.isDisabled(), false);
    assert.equal(mockedEmailRequests.length, 1);
    assert.ok(mockedEmailRequests[0].service_id && mockedEmailRequests[0].template_id && mockedEmailRequests[0].user_id);
    assert.equal(mockedEmailRequests[0].template_params.name, 'Portfolio smoke test');
    assert.equal(mockedEmailRequests[0].template_params.email, 'smoke-test@example.com');
    assert.match(mockedEmailRequests[0].template_params.message, /will not be sent/);
    assert.equal(await contactForm.getByLabel(/name|nom/i).inputValue(), '', `${label}: success should reset form`);
    simulatedEmailStatus = 500;
    await fillContactForm();
    await contactSubmit.click();
    const contactToast = page.getByRole('alert').filter({ hasText: /Message not sent|Message non envoyé/ });
    await contactToast.waitFor();
    assert.equal(mockedEmailRequests.length, 2);
    if (isMobile) await page.screenshot({ path: join(tmpdir(), 'dhiakacem-contact-toast-mobile.png'), animations: 'disabled' });
    assert.ok(await contactToast.getByRole('button', { name: /dismiss notification|fermer la notification/i }).isVisible());
    await contactToast.getByRole('button', { name: /dismiss notification|fermer la notification/i }).click();
    await contactToast.waitFor({ state: 'detached' });
    assert.equal(await page.getByRole('alert').count(), 0);
    const cvSection = page.locator('[aria-label="Download CV"], [aria-label="Télécharger le CV"]');
    await cvSection.scrollIntoViewIfNeeded();
    for (const [lang, filename] of [[isMobile ? 'Anglais' : 'English', 'DHIA_KACEM_EN.pdf'], ['Français', 'KACEM_DHIA_FR.pdf']]) {
      await cvSection.getByRole('button', { name: lang }).click();
      const download = page.waitForEvent('download');
      await page.getByRole('link', { name: /Download|Télécharger/ }).click();
      assert.equal((await download).suggestedFilename(), filename);
    }
    for (const lang of ['EN', 'FR']) {
      const pdf = await context.request.get(new URL(`/cv/CV_DhiaKacem_${lang}.pdf`, target).toString());
      assert.equal(pdf.status(), 200);
      assert.match(pdf.headers()['content-type'], /application\/pdf/);
    }
    const broken = await page.locator('img').evaluateAll(imgs => imgs.filter(img => img.complete && img.naturalWidth === 0).map(img => img.src));
    assert.deepEqual(broken, []);
    if (!isMobile) {
      await page.locator('[data-scene="earth"]').scrollIntoViewIfNeeded();
      await page.locator('[data-scene="earth"] canvas').waitFor({ timeout: 15000 });
    }
    assert.deepEqual(errors, []);
    results.push({ label, ...dimensions, requestCount: before.length, canvasCount: await page.locator('canvas').count() });
    const linkedPage = await context.newPage();
    await linkedPage.goto(new URL('/#experience', target).toString());
    await linkedPage.locator('#experience').waitFor();
    await linkedPage.waitForFunction(() => window.scrollY > 100);
    await linkedPage.close();
    await context.close();
  }
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
