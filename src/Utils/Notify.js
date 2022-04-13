import { HubConnection, HubConnectionBuilder, HttpTransportType, LogLevel } from "@microsoft/signalr";
import React, { useEffect, useState, createContext, useContext } from "react";
import { Loading, ModalComponent } from "../components/Commons";
import { AuthStore } from "../Stores/AuthStore";

import { useNavigate } from 'react-router-dom';
import StoreContext from '../Stores';


export const SignalrContext = createContext();

export const Notify = ({ children }) => {
    const navigate = useNavigate();
    const { MeetingProfileStore } = useContext(StoreContext);

    const [connection, setConnection] = useState(null);
    const [inputText, setInputText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notifyData, setNotifyData] = useState({
        id: '',
        notificationType: 0,
        sendAt: '',
        text: '',
    });


    useEffect(() => {
        connectHub();
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on("ReceiveMessage", (data) => {
                        // console.log('receive messate', data)
                        setModalVisible(true);
                        setNotifyData(data);
                    });
                })
                .catch((error) => {
                    setNotifyData({});
                    console.log('EERROR', error)
                });
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
            .withUrl(`http://om-api-test.hiweb.ir/hubs/notifications`, hubConnectionOptions)
            .configureLogging(LogLevel.Debug)
            .withAutomaticReconnect()
            .build();

        setConnection(connect);
    }

    const sendMessage = async () => {
        if (connection) await connection.send("SendMessage", inputText);
        setInputText("");
    };

    const handleNotifyType = () => {
        switch (notifyData.notificationType) {
            case 1:
                //meeting
                setLoading(true);
                MeetingProfileStore.setMettingId(notifyData.id);
                MeetingProfileStore.getMeetingDetails(notifyData.id).then(() => {
                    navigate('/form/info');
                    setLoading(false);
                });
                break;

            case 2:
                //survey
                MeetingProfileStore.setSurveyId(notifyData.id);
                navigate('/form/info/survey/SurveyQuestion');
                break;

            case 3:
                //election
                MeetingProfileStore.setSurveyId(notifyData.id);
                navigate('/form/info/election/SurveyQuestion');
                break;

            default:
                break;
        }
    };

    return (
        <SignalrContext.Provider value={{ connection, setConnection, sendMessage }}>


            {children}

            <ModalComponent
                alert
                okTitle={`برو به ${notifyData.notificationType === 1 ? 'مجمع' : notifyData.notificationType === 2 ? 'نظرسنجی' : 'انتخابات'}`}
                okOnclick={handleNotifyType}
                cancelOnclick={() => setModalVisible(false)}
                content={`${notifyData.text}`}
                cancelTitle={"بیخیال"}
                modalVisible={modalVisible}
                onRequestClose={() => setModalVisible(false)} />

            {loading ? <Loading /> : null}
        </SignalrContext.Provider>
    );
};
