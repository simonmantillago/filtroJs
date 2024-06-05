import { LitElement, css, html } from 'lit';

export class ApiDataList extends LitElement {
    static styles = css`
        .container { font-family: Arial, sans-serif; }
        .list-item { cursor: pointer; padding: 10px; border: 1px solid #ccc; margin: 5px 0; }
        .list-item:hover { background-color: #f0f0f0; }
        .details { margin-top: 10px; }
        button { margin-top: 10px; padding: 10px; }
    `;

    constructor() {
        super();
        this.data = [];
        this.details = null;
    }
    
    render() {
        return html`
            <div class="container">
                <button @click="${this.fetchData}">Actualizar Datos</button>
                <div id="list-container">
                    ${this.renderList()}
                </div>
                <div id="details-container" class="details">
                    ${this.renderDetailsCheck()}
                </div>
            </div>
        `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
    }

    async fetchData() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            this.data = await response.json();
            this.requestUpdate();
        } catch (error) {
            console.error('Error al obtener los datos:', error.message);
        }
    }

    renderList() {
        return this.data.map(item => html`
            <div class="list-item" @click="${() => this.showDetails(item)}">
                ${item.name}
            </div>
        `);
    }

    showDetails(item) {
        this.details = item;
        this.requestUpdate();
    }

    renderDetailsCheck() {
        if (!this.details) {
            return html``;
        }
        return html`
            <h3>${this.details.name}</h3>
            <p>Email: ${this.details.email}</p>
            <p>Phone: ${this.details.phone}</p>
            <p>Website: ${this.details.website}</p>
            <p>Company: ${this.details.company.name}</p>
            <p>Address: ${this.details.address.street}, ${this.details.address.city}</p>
        `;
    }

}

customElements.define('api-data-list', ApiDataList);
