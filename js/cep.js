async function buscarCep(cep, statusElement, button, onSuccess) {
 const digits = cep.replace(/\D/g, '');
 if (!/^\d{8}$/.test(digits)) {
  statusElement.textContent = 'Digite um CEP com 8 números.';
  return;
 }
 button.disabled = true;
 statusElement.textContent = 'Buscando endereço...';
 try {
  const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
  if (!response.ok) throw new Error('Falha na consulta');
  const data = await response.json();
  if (data.erro) {
   statusElement.textContent = 'Não encontramos esse CEP. Confira os números e tente novamente.';
   return;
  }
  if (!data.logradouro && !data.localidade) {
   statusElement.textContent = 'Não encontramos informações para esse CEP.';
   return;
  }
  onSuccess(data);
  statusElement.textContent = `Endereço encontrado: ${data.logradouro || 'logradouro não informado'}, ${data.bairro || 'bairro não informado'} — ${data.localidade}/${data.uf}.`;
 } catch {
  statusElement.textContent = 'Não foi possível consultar o CEP agora. Tente novamente em instantes.';
 } finally {
  button.disabled = false;
 }
}
document.addEventListener('DOMContentLoaded', () => {
 const visitForm = document.querySelector('#consulta-cep');
 if (visitForm) {
  const input = document.querySelector('#cep-visita');
  const status = document.querySelector('#status-cep-visita');
  const button = visitForm.querySelector('button');
  input.addEventListener('input', () => {
   const digits = input.value.replace(/\D/g, '').slice(0, 8);
   input.value = digits.length > 5 ? `${digits.slice(0,5)}-${digits.slice(5)}` : digits;
  });
  visitForm.addEventListener('submit', event => {
   event.preventDefault();
   buscarCep(input.value, status, button, () => {});
  });
 }
 const cepField = document.querySelector('#cep');
 if (cepField) {
  cepField.addEventListener('input', () => {
   const digits = cepField.value.replace(/\D/g, '').slice(0,8);
   cepField.value = digits.length > 5 ? `${digits.slice(0,5)}-${digits.slice(5)}` : digits;
  });
  cepField.addEventListener('blur', () => {
   if (cepField.value.replace(/\D/g,'').length !== 8) return;
   const status = document.querySelector('#erro-cep');
   const button = document.querySelector('#form-participacao button[type=submit]');
   buscarCep(cepField.value, status, button, data => {
    document.querySelector('#rua').value = data.logradouro || '';
    document.querySelector('#bairro').value = data.bairro || '';
    document.querySelector('#cidade').value = data.localidade || '';
    document.querySelector('#estado').value = data.uf || '';
   });
  });
 }
});
