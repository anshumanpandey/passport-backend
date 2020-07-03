import express from 'express';
import * as bodyParser from 'body-parser';
import sequelize from './utils/DB';
import { userRoutes } from './routes/user.route';
import { ApiError } from './utils/ApiError';
var morgan = require('morgan')

const app = express();

app.use(morgan("tiny"))
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));

app.use(userRoutes)

app.use((err:any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.code).json({
            statusCode: err.code,
            message: err.message
        });
        return
    } else {
        console.log(err)
        res.status(500).json({
            statusCode: 500,
            message: "UNKWON ERROR"
        });
        return
    }
});

const bootstrap = () => {
    return sequelize.authenticate()
}

export {
    app,
    bootstrap
};