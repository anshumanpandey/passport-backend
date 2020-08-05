import express from 'express';
import { join } from "path"
import * as bodyParser from 'body-parser';
import sequelize from './utils/DB';
import { routes } from './routes';
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
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
}));

app.use("/feedback",express.static(join(__dirname, '..', 'feedback-form', 'build')));
app.use("/passport",express.static(join(__dirname, '..', 'uploads')));
app.use(express.static(join(__dirname, '../templates')));

app.use('/api',routes)

app.use((err:any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.code).json({
            statusCode: err.code,
            message: err.message
        });
        return
    } else if (err.name === 'UnauthorizedError') {
        console.log(err)
        res.status(401).send({
            statusCode: 401,
            message: "Unauthorized"
        });
      }
    else {
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