import React from 'react';
import './style.css';
import Header from '../Header';

const About = () => {

    return (
        <div>
            <Header />
            <div class="main-about">
                <section class="intro">
                    <div class="content-about">
                        <p>
                            A Leste é um provedor de internet que está presente no mercado há mais de 19 anos, oferecendo o que há de <strong class="destaque-texto">melhor em acesso à Internet.</strong>
                        </p>
                        <p>
                            Fundada em 2004, nossa empresa surgiu com o objetivo claro de fornecer acesso à internet de qualidade em região leste fluminense do Rio de Janeiro.
                        </p>
                        <p>
                            Hoje, continuamos motivados pelo mesmo sentimento que nos impulsionou desde o início: investir constantemente em qualidade, seja na tecnologia, na estrutura ou na capacidade de nossa equipe.
                        </p>
                    </div>
                    <div class="image">
                        <img src="/images/7S4A6024.jpg" alt="Escritório da empresa" />
                    </div>
                </section>
                <section class="valores">
                    <h2>Nossos valores</h2>
                    <p>
                        Atendemos uma das principais necessidades básicas do mundo atual com <strong class="destaque-texto">inovação, empatia e sempre da melhor maneira.</strong> Quando se fala<br/>em <strong class="destaque-texto">eficiência, força e proximidade</strong> vamos sempre para a mesma direção: <strong class="destaque-texto2">LESTE</strong>
                    </p>
                    <img src="/images/grids_empresa.png" alt="Escritório da empresa" />
                </section>
            </div>
        </div>
    );
};

export default About;