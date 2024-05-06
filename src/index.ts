"use strict"
/**
 * @author Arpit Nakarani
 * @description Server and REST API config
 */
import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';  
import http from 'http';
import cors from 'cors'
import { mongooseConnection} from './database'
import * as packageInfo from '../package.json'
import { router } from './Routes'
 
const app = express();

// var options = {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }
app.use(cors())
app.use(mongooseConnection)
app.use(bodyParser.json({ limit: '200mb' }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))

const bad_gateway = (req, res) => { return res.status(502).json({ status: 502, message: "SMS Backend API Bad Gateway" }) }


app.use(router)
app.use('*', bad_gateway);

let server = new http.Server(app);
export default server;
