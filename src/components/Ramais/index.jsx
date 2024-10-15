import React, { useEffect } from 'react';
import Header from '../Header';
import ClipboardJS from 'clipboard';
import './style.css';

const Ramais = () => {
    const ramais = [
        { office: 'Escritório Itaboraí', number: '3130' },
        { office: 'Escritório Rio Bonito', number: '3140' },
        { office: 'Escritório Magé', number: '3150' },
        { office: 'Escritório Maricá', number: '3160' },
        { office: 'Escritório Tanguá', number: '3170' },
        { office: 'Escritório Barroco', number: '3182' },
        { office: 'Call Center', number: '3330' },
        { office: 'Estoque', number: '3500' },
        { office: 'Operacional', number: '3820' },
        { office: 'Engenharia', number: '3900' },
        { office: 'CGR', number: '3400' },
        { office: 'Aferição', number: '3730' },
        { office: 'Frota', number: '3850' },
        { office: 'Recepção Casa 207', number: '3011' },
        { office: 'Recepção Casa 178', number: '3013' },
        { office: 'Portaria Base 3', number: '8080' },
        { office: 'Diretoria Marcos', number: '3001' },
        { office: 'Diretoria Marcos', number: '3002' },
        { office: 'Diretoria Sandro ', number: '3005' },
        { office: 'RH', number: '3020' },
        { office: 'Logística', number: '3800' },
        { office: 'Administrativo', number: '3060' },
        { office: 'Corporativo', number: '3120' },
        { office: 'Jurídico', number: '3350' },
        { office: 'Desenvolvimento', number: '3430' },
        { office: 'Projetos', number: '3600' },
        { office: 'Comunicação', number: '3652' },
        { office: 'TIC', number: '3700' },
        { office: 'Helpdesk', number: '3450' },
        { office: 'Patrimônio', number: '3603' },
    ];

    useEffect(() => {
        new ClipboardJS('.ramal-button', {
            text: function (trigger) {
                return trigger.innerText;
            }
        });
    }, []);


    return (
        <div>
            <Header />
            <div className='main'>
                <h1 className='title-ramais'>Lista de Ramais</h1>
                <h2 className='subtitle-ramais'>Busque pelo ramal desejado.</h2>

                <div className="ramal-grid">
                    {ramais.map((ramal, index) => (
                        <div className="ramal-item" key={index}>
                            <span className="ramal-office">{ramal.office}</span>
                            <button className="ramal-button">{ramal.number}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ramais;
