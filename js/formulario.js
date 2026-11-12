document.addEventListener('DOMContentLoaded', () => {
 const form = document.querySelector('#form-participacao');
 if (!form) return;
 const fields = {
  nome: { input: document.querySelector('#nome'), error: document.querySelector('#erro-nome') },
  email: { input: document.querySelector('#email'), error: document.querySelector('#erro-email') },
  cep: { input: document.querySelector('#cep'), error: document.querySelector('#erro-cep') },
  assunto: { input: document.querySelector('#assunto'), error: document.querySelector('#erro-assunto') },
  mensagem: { input: document.querySelector('#mensagem'), error: document.querySelector('#erro-mensagem') },
  aceite: { input: document.querySelector('#aceite'), error: document.querySelector('#erro-aceite') }
 };
 const showError = (field, message) => {
  field.error.textContent = message;
  field.input.setAttribute('aria-invalid', message ? 'true' : 'false');
 };
 Object.values(fields).forEach(({input,error}) => {
  input.addEventListener('input', () => { if (error.textContent) showError({input,error}, ''); });
  input.addEventListener('change', () => { if (error.textContent) showError({input,error}, ''); });
 });
 const message = document.querySelector('#mensagem');
 const counter = document.querySelector('#contador');
 message.addEventListener('input', () => counter.textContent = `${message.value.length} caracteres`);
 form.addEventListener('submit', event => {
  event.preventDefault();
  const name = fields.nome.input.value.trim();
  const email = fields.email.input.value.trim();
  const cep = fields.cep.input.value.replace(/\D/g,'');
  const text = fields.mensagem.input.value.trim();
  const errors = {
   nome: !name ? 'Preencha este campo.' : name.split(/\s+/).length < 2 ? 'Informe o nome completo.' : '',
   email: !email ? 'Preencha este campo.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Informe um e-mail válido, como nome@exemplo.com.' : '',
   cep: !/^\d{8}$/.test(cep) ? 'Digite um CEP com 8 números.' : '',
   assunto: !fields.assunto.input.value ? 'Selecione um assunto.' : '',
   mensagem: text.length < 10 ? 'Escreva uma mensagem com pelo menos 10 caracteres.' : '',
   aceite: !fields.aceite.input.checked ? 'É necessário aceitar para continuar.' : ''
  };
  let firstInvalid = null;
  Object.keys(fields).forEach(key => {
   showError(fields[key], errors[key]);
   if (errors[key] && !firstInvalid) firstInvalid = fields[key].input;
  });
  const output = document.querySelector('#resultado-formulario');
  if (firstInvalid) {
   output.textContent = 'Revise os campos indicados antes de enviar.';
   firstInvalid.focus();
   return;
  }
  output.textContent = `Cadastro recebido! Obrigado por participar do WebZoo, ${name}. Este formulário é demonstrativo: nenhum dado foi enviado ou armazenado.`;
  form.reset();
  counter.textContent = '0 caracteres';
  Object.values(fields).forEach(field => showError(field, ''));
 });
});
