import { LitElement, css, html } from 'lit';

export class ImcCalculator extends LitElement {
  static styles = css`
  .container{
    display:flex;
    flex-direction:column;
    width:100vw ;
    height:100vh;
    gap:20px;
    align-items:center;
  }
  .form-container{
    display:flex;
    flex-direction:column;
    gap:20px;
  }
  .imc-img{
    display:flex;
    flex-direction:column;
    align-items:center
  }
  .
  `;

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <div class="container">
        <h2>Calculadora de IMC</h2>
        <form class="form-container" @submit=${this.calcularImc}>
          <input type="number" name="peso" class="peso" placeholder="Ingrese su peso en kg" required>
          <input type="number" name="altura" class="altura" placeholder="Ingrese su altura en metros" required>
          <button type="submit" class="submit">Calcular IMC</button>
        </form>
        <div class="imc-img"></div>
      </div>
    `;
  }

  calcularImc(event) {
    event.preventDefault();
    
    const container = this.shadowRoot.querySelector(".form-container");
    const formData = new FormData(container);
    const peso = parseFloat(formData.get('peso'));
    const altura = parseFloat(formData.get('altura'));
    
    
    const imcResult = peso / (altura ** 2);
    const imgDiv = this.shadowRoot.querySelector('.imc-img');

    let imgSrc = '';
    if (imcResult < 18.5) {
      imgSrc = '../../public/images/imc-bajo.png';
    } else if (imcResult >= 18.5 && imcResult <= 24.9) {
      imgSrc = '../../public/images/imc-normal.png';
    } else if (imcResult >= 25 && imcResult <= 29.9) {
      imgSrc = '../../public/images/imc-sobrepeso.png';
    } else if (imcResult >= 30&& imcResult <= 39.9) {
      imgSrc = '../../public/images/imc-obeso.png';
    } else if (imcResult >= 40) {
        imgSrc = '../../public/images/imc-obesoXtreme.png';
      }

    imgDiv.innerHTML =  `<h4 style="text-align:center;">IMC = ${imcResult}</h4> <img src="${imgSrc}" alt="${imgSrc}" >`
  }
}

customElements.define('imc-calculator', ImcCalculator);
