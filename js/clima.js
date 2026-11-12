document.addEventListener('DOMContentLoaded', () => {
 const status = document.querySelector('#weather-status');
 const result = document.querySelector('#weather-result');
 const button = document.querySelector('#atualizar-clima');
 if (!status || !result || !button) return;
 const loadWeather = async () => {
  button.disabled = true;
  status.textContent = 'Consultando a previsão do tempo...';
  result.replaceChildren();
  try {
   const url = 'https://api.open-meteo.com/v1/forecast?latitude=-23.65&longitude=-46.62&current=temperature_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=1';
   const response = await fetch(url);
   if (!response.ok) throw new Error('Não foi possível consultar');
   const data = await response.json();
   if (!data.current || !data.daily || !data.daily.temperature_2m_max?.length) throw new Error('Dados indisponíveis');
   const values = [
    `Agora: ${data.current.temperature_2m} °C`,
    `Máxima: ${data.daily.temperature_2m_max[0]} °C`,
    `Mínima: ${data.daily.temperature_2m_min[0]} °C`,
    `Chance de chuva: ${data.daily.precipitation_probability_max?.[0] ?? 'Não disponível'}%`
   ];
   values.forEach(value => {
    const p = document.createElement('p');
    p.textContent = value;
    result.append(p);
   });
   const rain = data.daily.precipitation_probability_max?.[0] ?? 0;
   const tip = document.createElement('p');
   tip.textContent = rain >= 50 ? 'Dica: leve capa de chuva e confira as condições antes de sair.' :
    data.current.temperature_2m >= 28 ? 'Dica: use protetor solar e boné e leve água.' :
    data.current.temperature_2m <= 17 ? 'Dica: leve um agasalho para o passeio.' :
    'Dica: aproveite o tempo firme para percorrer as trilhas com calma.';
   result.append(tip);
   status.textContent = 'Previsão atualizada para o zoológico.';
  } catch {
   status.textContent = 'A previsão do tempo não está disponível no momento. Você ainda pode consultar as demais informações da página.';
  } finally {
   button.disabled = false;
  }
 };
 button.addEventListener('click', loadWeather);
 loadWeather();
});
