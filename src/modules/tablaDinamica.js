import { LitElement, css, html } from 'lit';

export class TablaDinamica extends LitElement {
    
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = /*html*/`
        <style>
          table {width: 100%; border-collapse: collapse;}
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          .input-row { display: flex; margin-bottom: 10px; }
          .input-row input { margin-right: 10px; }
          button { cursor: pointer; }
          .container{padding:40px;}
          .submit {
            position: relative;
            background-color: #007bff !important;
            border-radius: 5px;
            box-shadow: #012bff 0px 4px 0px 0px;
            padding: 15px;
            background-repeat: no-repeat;
            cursor: pointer;
            box-sizing: border-box;
            width: 154px;
            height: 49px;
            color: #fff;
            border: none;
            font-size: 20px;
            transition: all 0.3s ease-in-out;
            z-index: 1;
            
          }
        
          .submit::before {
            content: "";
            background-color: #018bff !important;
            width: 0;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            transition: width 700ms ease-in-out;
            display: inline-block;
          }
        
          .submit:hover::before {
            width: 100%;
          }
          .borrar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgb(20, 20, 20);
            border: none;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
            cursor: pointer;
            transition-duration: .3s;
            overflow: hidden;
            position: relative;
          }
          
          .svgIcon {
            width: 12px;
           
          }
          
          .svgIcon path {
            fill: white;
          }
          
          .borrar:hover {
            
            border-radius: 50px;
            transition-duration: .3s;
            background-color: rgb(255, 69, 69);
            align-items: center;
          }
          
          
        
        </style>
        <div class= "container">
        <div>
          <div class="input-row">
            <input type="text" id="name-input" placeholder="Nombre" >
            <input type="text" id="age-input" placeholder="Edad"  >
            <button id="add-row" class="submit">Agregar</button>
          </div>
          <table>
              <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Acciones</th>
              </tr>
            
            <tbody id="table-body"></tbody>
          </table>
          </div>
        </div>
      `;
    }
  
    connectedCallback() {
      this.shadowRoot.getElementById('add-row').addEventListener('click', () => this.addRow());
    }
  
    addRow() {
      const nameInput = this.shadowRoot.getElementById('name-input').value.trim();
      const ageInput = this.shadowRoot.getElementById('age-input').value.trim();
  
      if (nameInput && ageInput) {
        const tableBody = this.shadowRoot.getElementById('table-body');
        const row = document.createElement('tr');
  
        row.innerHTML = `
          <td>${nameInput}</td>
          <td>${ageInput}</td>
          <td><button class="borrar delete-row"><svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button></td>
        `;
  
        row.querySelector('.delete-row').addEventListener('click', () => this.deleteRow(row));
  
        tableBody.appendChild(row);
  
        this.shadowRoot.getElementById('name-input').value = '';
        this.shadowRoot.getElementById('age-input').value = '';
      }
    }
  
    deleteRow(row) {
      const tableBody = this.shadowRoot.getElementById('table-body');
      tableBody.removeChild(row);
    }
  }
  
  customElements.define('dynamic-table', TablaDinamica);
  