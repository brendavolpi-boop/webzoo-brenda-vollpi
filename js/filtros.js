document.addEventListener('DOMContentLoaded', () => {
 const cards = [...document.querySelectorAll('.animal-detail')];
 const classe = document.querySelector('#filtro-classe');
 const alimentacao = document.querySelector('#filtro-alimentacao');
 const bioma = document.querySelector('#filtro-bioma');
 const status = document.querySelector('#resultado-filtro');
 const apply = () => {
  let visible = 0;
  cards.forEach(card => {
   const match = (!classe.value || card.dataset.classe === classe.value) &&
    (!alimentacao.value || card.dataset.alimentacao === alimentacao.value) &&
    (!bioma.value || card.dataset.biomas.split(',').includes(bioma.value));
   card.hidden = !match;
   if (match) visible++;
  });
  status.textContent = visible ? `${visible} animal(is) encontrado(s).` : 'Nenhum animal encontrado com esses filtros.';
 };
 [classe, alimentacao, bioma].forEach(select => select.addEventListener('change', apply));
 document.querySelector('#limpar-filtros').addEventListener('click', () => {
  [classe, alimentacao, bioma].forEach(select => select.value = '');
  apply();
 });
});
