import * as schedule from 'node-schedule';
import * as casual from 'casual';

import api from '../http-comon';
import Config from '../constants';

const BASE_URL = `${Config.serverURL}/transaction`;

const job = schedule.scheduleJob('* * * * *', function () {
    // Create a mock transaction
    const transaction = {
        value: casual.integer(1, 1000),
        sender: casual.full_name,
        receiver: casual.full_name
    }
    // Generate transaction properties
    // and send them to the transaction service
    api.post(`${BASE_URL}/create`, transaction)
        .then(function (response) {
            console.log("Transaction stored");
            // For every successfully stored transaction, update the 
            // confirmed property 10 seconds after the transaction was stored
            setTimeout(() => {
                api.put(`${BASE_URL}/update`, {
                    id: response.data.id,
                    // value: response.data.value,
                    // sender: response.data.sender,
                    // receiver: response.data.receiver,
                    confirmed: true
                }).then(function (response) {
                    console.log("Transaction confirmed");
                }).catch(function (error) {
                    console.log(error);
                })
            }, 10000);
        }).catch(function (error) {
            console.log(error);
        });
});

export default job;
