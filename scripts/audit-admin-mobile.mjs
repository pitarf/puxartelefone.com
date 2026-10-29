import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { SignJWT } from 'jose';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(process.cwd(), 'audit-screenshots');

const VIEWPORTS = [
  { name: 'mobile-small', width: 360, height: 740 },
  { name: 'mobile-standard', width: 390, height: 844 },
  { name: 'desktop', width: 1280, height: 800 }
];

const ADMIN_ROUTES = [
  { name: 'admin-dashboard', path: '/admin' },
  { name: 'admin-usuarios', path: '/admin/usuarios' },
  { name: 'admin-vendas', path: '/admin/vendas' },
  { name: 'admin-custos', path: '/admin/custos' },
  { name: 'admin-traffic', path: '/admin/traffic' },
  { name: 'admin-bloqueios', path: '/admin/bloqueios' },
  { name: 'admin-precos', path: '/admin/precos' },
  { name: 'admin-paginas', path: '/admin/paginas' },
  { name: 'admin-blog', path: '/admin/blog' },
  { name: 'admin-configuracoes', path: '/admin/configuracoes' },
  { name: 'admin-logs', path: '/admin/logs' },
];

async function generateAdminToken() {
  const secretKey = "d37e7428e3b74153a39b61fc9fd0de45f729d79ccafa87b79c221";
  const encodedKey = new TextEncoder().encode(secretKey);
  const userId = 'bf19e719-9f50-4bbe-8c15-e230d7d9a347';
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  return await new SignJWT({ userId, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

async function runAudit() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const token = await generateAdminToken();
  console.log(`Iniciando Auditoria com Auth Real em: ${BASE_URL}`);
  console.log(`Token gerado para o admin.`);
  console.log(`Salvando prints em: ${OUTPUT_DIR}\n`);

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`Testando Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: vp.width < 768 
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });

    // Injeta cookies de autenticação e verificação de admin
    await context.addCookies([
      { name: 'session', value: token, domain: 'localhost', path: '/' },
      { name: 'admin_verified', value: 'true', domain: 'localhost', path: '/' }
    ]);

    const page = await context.newPage();

    for (const route of ADMIN_ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      const screenshotName = `${vp.name}_${route.name}.png`;
      const screenshotPath = path.join(OUTPUT_DIR, screenshotName);

      try {
        process.stdout.write(`Acessando ${route.path}... `);
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
        
        const currentUrl = page.url();
        const wasRedirected = !currentUrl.includes(route.path);

        // Avaliação de Overflow Horizontal
        const overflowDetails = await page.evaluate(() => {
          const docWidth = document.documentElement.clientWidth;
          const scrollWidth = document.documentElement.scrollWidth;
          const bodyScrollWidth = document.body.scrollWidth;

          const overflowingElements = [];
          const all = document.querySelectorAll('*');
          for (let el of all) {
            const rect = el.getBoundingClientRect();
            if (rect.right > docWidth + 1) {
              overflowingElements.push({
                tag: el.tagName.toLowerCase(),
                className: (el.className && typeof el.className === 'string') ? el.className.slice(0, 100) : '',
                id: el.id || '',
                right: Math.round(rect.right),
                excess: Math.round(rect.right - docWidth)
              });
            }
          }

          return {
            clientWidth: docWidth,
            scrollWidth: Math.max(scrollWidth, bodyScrollWidth),
            hasHorizontalScroll: Math.max(scrollWidth, bodyScrollWidth) > docWidth,
            overflowingElements: overflowingElements.slice(0, 5)
          };
        });

        // Aguarda estabilização de fontes e render
        await page.waitForTimeout(800);
        await page.screenshot({ path: screenshotPath, fullPage: true });

        const record = {
          route: route.path,
          viewport: vp.name,
          status: response?.status() || 0,
          currentUrl,
          wasRedirected,
          hasOverflow: overflowDetails.hasHorizontalScroll,
          overflowExcess: overflowDetails.scrollWidth - overflowDetails.clientWidth,
          overflowElements: overflowDetails.overflowingElements,
          screenshot: screenshotName
        };

        results.push(record);

        if (wasRedirected) {
          console.log(`[REDIRECIONADO para ${currentUrl}]`);
        } else if (overflowDetails.hasHorizontalScroll) {
          console.log(`[OVERFLOW] +${record.overflowExcess}px`);
        } else {
          console.log(`[OK - Autenticado]`);
        }

      } catch (err) {
        console.log(`[ERRO] ${err.message}`);
        results.push({
          route: route.path,
          viewport: vp.name,
          error: err.message
        });
      }
    }

    await context.close();
  }

  await browser.close();

  const reportPath = path.join(OUTPUT_DIR, 'audit_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nAuditoria concluida! Relatório gerado em: ${reportPath}`);
}

runAudit().catch(console.error);
