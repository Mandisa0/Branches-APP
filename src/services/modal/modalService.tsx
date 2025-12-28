import { Modal } from 'bootstrap';

export function showModal(title: string): void {
  const modalEl = document.getElementById('modal') as HTMLElement | null;
  if (!modalEl) return;

  const titleEl = modalEl.querySelector('.modal-title');
  if (titleEl) {
    titleEl.textContent = title;
  }

  const modal = Modal.getOrCreateInstance(modalEl);
  modal.show();
}


export function hideModal(): void {
  const modalEl = document.getElementById('modal') as HTMLElement | null;
  if (!modalEl) return;

  const modal = Modal.getOrCreateInstance(modalEl);
  modal.hide();
}