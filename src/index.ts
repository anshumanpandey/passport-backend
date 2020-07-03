import {app, bootstrap} from './app'
import {AddressInfo} from 'net'
import sequelize from './utils/DB';

bootstrap()
.then(() => sequelize.sync({ force: true }))
.then(() => {
    const server = app.listen(5000, '0.0.0.0', () => {
        const {port, address} = server.address() as AddressInfo;
        console.log('Server listening on:','http://' + address + ':'+port);
    });
})