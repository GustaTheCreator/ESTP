import React from 'react';
import './Style/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} GBank. Todos os direitos reservados.</p>
        <ul className="footer-links">
          <li><a href="/privacy" className="footer-link">Política de Privacidade</a></li>
          <li><a href="/terms" className="footer-link">Termos de Uso</a></li>
          <li><a href="/contact" className="footer-link">Fale Conosco</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
