const HttpStatus = require('http-status-codes')
const service = require('../services/counterparts')
const {validationResult} = require("express-validator");
const {validatorErrorHandling} = require("./common");

exports.getAll = async (req, res) => {
    const result = await service.getAll(req, res);
    res.status(HttpStatus.OK).json(result)
}

exports.createItems = async (req, res) => {
    if(validatorErrorHandling(req, res)) return;

     const result = await service.createItems(req.body);
     res.status(HttpStatus.CREATED).json(result)
}

exports.updateItems =  async (req, res) => {
    if(validatorErrorHandling(req, res)) return;

    const result = await service.updateItems(req.body);
    res.status(HttpStatus.ACCEPTED).json(result)
}

exports.deleteItem = async (req, res) => {
    if(validatorErrorHandling(req, res)) return;
    const result = await service.deleteItem({id: req.body.id});
    res.status(202).json(result)
}
