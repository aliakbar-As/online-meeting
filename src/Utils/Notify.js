import { HubConnection, HubConnectionBuilder, HttpTransportType, LogLevel } from "@microsoft/signalr";

import { Button, Input, notification } from "antd";
import React, { useEffect, useState, createContext } from "react";
import { ModalComponent } from "../components/Commons";
import { AuthStore } from "../Stores/AuthStore";


export const SignalrContext = createContext();

export const Notify = ({ children }) => {
    const [connection, setConnection] = useState(null);
    const [inputText, setInputText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [messsage, setMessage] = useState('');


    useEffect(() => {
        connectHub();
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("ReceiveMessage", (message) => {
                        setModalVisible(true);
                        console.log('ressvei', message)
                        setMessage(message);
                    });
                })
                .catch((error) => console.log('EERROR', error));
        }
    }, [connection]);

    const connectHub = () => {
        let hubConnectionOptions = {
            transport: HttpTransportType.LongPolling,
            logging: LogLevel.Trace,
            accessTokenFactory: function () {
                return AuthStore.token;
            }
        };

        const connect = new HubConnectionBuilder()
            .withUrl("http://om-api-test.hiweb.ir/hubs/notifications", hubConnectionOptions)
            .configureLogging(LogLevel.Debug)
            .withAutomaticReconnect()
            .build();

        setConnection(connect);
    }

    const sendMessage = async () => {
        if (connection) await connection.send("SendMessage", inputText);
        setInputText("");
    };

    return (
        <SignalrContext.Provider value={{ connection, setConnection, sendMessage }}>
            

            {children}

            <ModalComponent
                alert
                okTitle={'برو به مجمع'}
                okOnclick={() => setModalVisible(false)}
                cancelOnclick={() => setModalVisible(false)}
                content={`${messsage}`}
                cancelTitle={"بیخیال"}
                modalVisible={modalVisible}
                onRequestClose={() => setModalVisible(false)} />
        </SignalrContext.Provider>
    );
};
