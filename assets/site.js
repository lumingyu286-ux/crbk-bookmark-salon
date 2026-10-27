const searchInput = document.querySelector('#site-search');
const filterButtons = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.site-card')];
const countLabel = document.querySelector('#result-count');
const emptyState = document.querySelector('#empty-state');
const resetButton = document.querySelector('#reset-search');
let activeFilter = 'all';

function updateDirectory() {
  const query = searchInput.value.trim().toLocaleLowerCase('zh-CN');
  let visibleCount = 0;
  for (const card of cards) {
    const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = !query || `${card.textContent} ${card.dataset.search}`.toLocaleLowerCase('zh-CN').includes(query);
    card.hidden = !(matchesFilter && matchesSearch);
    if (!card.hidden) visibleCount += 1;
  }
  countLabel.textContent = `显示 ${visibleCount} 个网站`;
  emptyState.hidden = visibleCount !== 0;
}

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    for (const item of filterButtons) {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    }
    updateDirectory();
  });
}

searchInput.addEventListener('input', updateDirectory);
resetButton.addEventListener('click', () => {
  searchInput.value = '';
  filterButtons[0].click();
  searchInput.focus();
});
updateDirectory();

