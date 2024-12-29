import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Home.css';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <body>
        <Navbar />
        <main>
            <p>No GBank, acreditamos que os serviços bancários devem ser simples, transparentes e adaptados às suas necessidades. Fundado com o objetivo de oferecer uma abordagem moderna às finanças, combinamos tecnologia de ponta com um compromisso genuíno de cuidar de cada cliente.</p>
            <p>A nossa missão é capacitar pessoas e empresas a atingirem os seus objetivos financeiros com confiança. Seja a planear o futuro, comprar a casa dos seus sonhos ou gerir as finanças do dia a dia, o GBank está ao seu lado em cada passo.</p>
            
            <h2>Por que escolher o GBank?</h2>
            <ul>
                <li><strong>Inovação no Centro de Tudo</strong>: Utilizamos tecnologia para oferecer experiências bancárias digitais intuitivas, desde apps práticas até ferramentas financeiras inteligentes.</li>
                <li><strong>Confiança e Transparência</strong>: Priorizamos clareza em todas as nossas comunicações, garantindo que compreenda plenamente as suas opções financeiras.</li>
                <li><strong>Foco no Cliente</strong>: As suas necessidades estão em primeiro lugar. A nossa equipa especializada está dedicada a oferecer um serviço rápido, eficiente e atencioso.</li>
            </ul>
            
            <p>O GBank não é apenas um banco; é o seu parceiro na construção de um futuro financeiro seguro. Junte-se a nós e descubra como a simplicidade e a inovação podem fazer a diferença.</p>
            
            <h2>GBank – Onde os seus objetivos se tornam realidade.</h2>
        </main>
        <Footer />
    </body>
    
  );
}

export default Home;
