class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                
                .footer {
                    background: #1f2937;
                    color: white;
                    padding: 3rem 1rem;
                }
                
                .footer-container {
                    max-width: 1280px;
                    margin: 0 auto;
                }
                
                .footer-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
                
                .footer-section h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    color: #f3f4f6;
                }
                
                .footer-links {
                    list-style: none;
                }
                
                .footer-links li {
                    margin-bottom: 0.5rem;
                }
                
                .footer-links a {
                    color: #d1d5db;
                    text-decoration: none;
                    transition: color 0.2s;
                }
                
                .footer-links a:hover {
                    color: #3B82F6;
                }
                
                .contact-info {
                    color: #d1d5db;
                }
                
                .contact-info p {
                    margin-bottom: 0.5rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .social-links {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .social-link {
                    color: #d1d5db;
                    transition: color 0.2s;
                }
                
                .social-link:hover {
                    color: #3B82F6;
                }
                
                .payment-methods {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }
                
                .payment-method {
                    background: white;
                    color: #1f2937;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    font-weight: 500;
                }
                
                .footer-bottom {
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid #374151;
                    text-align: center;
                    color: #9ca3af;
                    font-size: 0.875rem;
                }
                
                @media (min-width: 768px) {
                    .footer-grid {
                        grid-template-columns: repeat(4, 1fr);
                    }
                }
            </style>
            
            <footer class="footer" id="contato">
                <div class="footer-container">
                    <div class="footer-grid">
                        <div class="footer-section">
                            <h3>EduCart 📚</h3>
                            <p class="contact-info">Sua loja completa de materiais escolares com os melhores preços e qualidade garantida.</p>
                            <div class="social-links">
                                <a href="#" class="social-link">
                                    <i data-feather="facebook" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i data-feather="instagram" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i data-feather="twitter" class="w-5 h-5"></i>
                                </a>
                                <a href="#" class="social-link">
                                    <i data-feather="youtube" class="w-5 h-5"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Links Rápidos</h3>
                            <ul class="footer-links">
                                <li><a href="index.html">Início</a></li>
                                <li><a href="catalogo.html">Catálogo</a></li>
                                <li><a href="catalogo.html?promocao=true">Promoções</a></li>
                                <li><a href="carrinho.html">Carrinho</a></li>
                                <li><a href="login.html">Minha Conta</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Categorias</h3>
                            <ul class="footer-links">
                                <li><a href="catalogo.html?categoria=mochilas">Mochilas</a></li>
                                <li><a href="catalogo.html?categoria=cadernos">Cadernos</a></li>
                                <li><a href="catalogo.html?categoria=estojos">Estojos</a></li>
                                <li><a href="catalogo.html?categoria=escrita">Material de Escrita</a></li>
                                <li><a href="catalogo.html?categoria=tecnologia">Tecnologia</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h3>Contato</h3>
                            <div class="contact-info">
                                <p><i data-feather="mail" class="w-4 h-4"></i> contato@educart.com.br</p>
                                <p><i data-feather="phone" class="w-4 h-4"></i> (11) 99999-9999</p>
                                <p><i data-feather="map-pin" class="w-4 h-4"></i> São Paulo, SP</p>
                            </div>
                            <h4 class="mt-4 mb-2">Formas de Pagamento</h4>
                            <div class="payment-methods">
                                <span class="payment-method">PIX</span>
                                <span class="payment-method">Cartão</span>
                                <span class="payment-method">Boleto</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>© 2024 EduCart - Materiais Escolares Inteligentes. Todos os direitos reservados.</p>
                        <p class="mt-2">CNPJ: 12.345.678/0001-99 | Inscrição Estadual: 123.456.789.123</p>
                    </div>
                </div>
            </footer>
        `;
        
        // Inicializar feather icons
        setTimeout(() => {
            if (window.feather) {
                window.feather.replace();
            }
        }, 100);
    }
}

customElements.define('custom-footer', CustomFooter);