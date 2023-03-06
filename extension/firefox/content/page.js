import { updateMeta } from './page/dom/seo.js';
import { savePdf, saveMarkdown, saveHtml } from './page/export.js';
import { main } from './page/dom/init.js';
import { recognizeWords } from './page/ocr/worker.js';

window.addEventListener('load', async () => {
  await main();
  document.getElementById('exportPdf').addEventListener('click', savePdf);
  document.getElementById('exportMd').addEventListener('click', saveMarkdown);
  document.getElementById('saveHtml').addEventListener('click', saveHtml);
  document.querySelector('[autofocus]').focus();
  document.querySelector('h1').addEventListener('keyup', updateMeta);

  console.time('all');
  for (const screenshot of document.querySelectorAll('.screenshot')) {
    console.time('r');
    console.debug(await recognizeWords(screenshot));
    console.timeEnd('r');
  }
  console.timeEnd('all');
});
