import React, { useState, useEffect } from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css'
import './Main.css'

import DevForm from './components/dev-form';
import DevItem from './components/dev-item';

function App() {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('devs');

            setDevs(response.data.devs);
        }

        loadDevs();
    }, []);

    async function handleAddDev(data) {
        const response = await api.post('devs', data);
        const { data:newDev } = response;
        let hasNewDev = true;

        for (let _dev in devs) {
            if (devs[_dev].github_username === newDev.github_username) {
                hasNewDev = false;
            }
        }
        
        if (hasNewDev) {
            setDevs([...devs, newDev]);
        }
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>

            <main>
                <ul>
                    { devs.map(dev => (<DevItem key={dev._id} dev={dev} />)) }
                </ul>
            </main>
        </div>
    );
}

export default App;