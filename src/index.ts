// import './pre-start'; // Must be the first import
// import logger from 'jet-logger';
// import server from './server';

import { BootstrapApp } from "./configs/bootstrapApp/bootstrapApp";


// // Constants
// const serverStartMsg = 'Express server started on port: ',
//         port = (process.env.PORT || 3000);

// // Start server
// server.listen(port, () => {
//     logger.info(serverStartMsg + port);
// });

const app = new BootstrapApp();
app.startApp();