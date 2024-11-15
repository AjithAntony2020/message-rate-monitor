import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

const LiveUpdates = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('http://localhost:5161/liveupdate/') // URL of your SignalR Hub
            .build();

        connection.start()
            .then(() => {
                console.log('Connected to SignalR');
            })
            .catch(err => console.error('Connection failed: ', err));

        connection.on('ReceiveMessage', (message) => {
            setMessage(message);
        });

        // Cleanup on unmount
        return () => {
            connection.stop();
        };
    }, []);

    return (
        <div>
            <h2>Live Update: </h2>
            <p>{message}</p>
        </div>
    );
};

export default LiveUpdates;

