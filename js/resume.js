/* ============================================================
   RESUME DOWNLOAD HANDLER
   Cross-Environment PDF Delivery & Download Button Feedback
   ============================================================ */

import { $ } from './utils.js';
import { RESUME_FILENAME, RESUME_PDF_PATH } from './config.js';

export function initResume() {
  const resumeBtn = $('#resumeBtn');
  if (!resumeBtn) return;

  let resumeBusy = false;

  async function downloadPdf() {
    try {
      const response = await fetch(RESUME_PDF_PATH);
      if (!response.ok) throw new Error('File not found');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = RESUME_FILENAME;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      return true;
    } catch (e) {
      // Direct link fallback
      const a = document.createElement('a');
      a.href = RESUME_PDF_PATH;
      a.download = RESUME_FILENAME;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
      return true;
    }
  }

  resumeBtn.addEventListener('click', async () => {
    if (resumeBusy) return;
    resumeBusy = true;
    resumeBtn.dataset.state = 'busy';

    try {
      const hasClaude = typeof window.claude !== 'undefined' && typeof window.claude.use === 'function';
      const downloads = hasClaude ? await window.claude.use('downloads') : null;

      if (downloads) {
        const response = await fetch(RESUME_PDF_PATH);
        const blob = await response.blob();
        await downloads.save({ filename: RESUME_FILENAME, data: blob });
        resumeBtn.dataset.state = 'done';
      } else {
        await downloadPdf();
        resumeBtn.dataset.state = '';
      }
    } catch (err) {
      if (err && err.code === 'declined') {
        resumeBtn.dataset.state = '';
      } else {
        await downloadPdf();
        resumeBtn.dataset.state = 'err';
      }
    } finally {
      resumeBusy = false;
      setTimeout(() => {
        resumeBtn.dataset.state = '';
      }, 2200);
    }
  });
}
