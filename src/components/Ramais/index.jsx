import React from 'react';
import Header from '../Header';
import './style.css';

const Ramais = () => {
    const ramais = [
        { office: 'Escritório 1', number: '22134' },
        { office: 'Escritório 2', number: '22135' },
        { office: 'Escritório 3', number: '22136' },
        { office: 'Escritório 4', number: '22137' },
        { office: 'Escritório 5', number: '22138' },
        { office: 'Escritório 6', number: '22139' },
        { office: 'Escritório 7', number: '22140' },
        { office: 'Escritório 8', number: '22141' },
        { office: 'Escritório 9', number: '22142' },
        { office: 'Escritório 1', number: '22134' },
        { office: 'Escritório 2', number: '22135' },
        { office: 'Escritório 3', number: '22136' },
        { office: 'Escritório 4', number: '22137' },
        { office: 'Escritório 5', number: '22138' },
        { office: 'Escritório 6', number: '22139' },
        { office: 'Escritório 7', number: '22140' },
        { office: 'Escritório 8', number: '22141' },
        { office: 'Escritório 9', number: '22142' },
        { office: 'Escritório 1', number: '22134' },
        { office: 'Escritório 2', number: '22135' },
        { office: 'Escritório 3', number: '22136' },
        { office: 'Escritório 4', number: '22137' },
        { office: 'Escritório 5', number: '22138' },
        { office: 'Escritório 6', number: '22139' },
        { office: 'Escritório 7', number: '22140' },
        { office: 'Escritório 8', number: '22141' },
        { office: 'Escritório 9', number: '22142' },
        { office: 'Escritório 1', number: '22134' },
        { office: 'Escritório 2', number: '22135' },
        { office: 'Escritório 3', number: '22136' },
        { office: 'Escritório 4', number: '22137' },
        { office: 'Escritório 5', number: '22138' },
        { office: 'Escritório 6', number: '22139' },
        { office: 'Escritório 7', number: '22140' },
        { office: 'Escritório 8', number: '22141' },
        { office: 'Escritório 9', number: '22142' },
    ];

    const copyToClipboard = (number) => {
        navigator.clipboard.writeText(number)
            .then(() => {

            })
            .catch(err => {
                console.error('Erro ao copiar o número: ', err);
            });
    };

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
                            <button onClick={() => copyToClipboard(ramal.number)} className="ramal-button">{ramal.number}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Ramais;
