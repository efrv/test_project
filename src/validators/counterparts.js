const { check, body, validationResult, checkSchema} = require('express-validator');
const elemById = require('../services/counterparts')


function getBodySchema(itemsFields = ["name","code"]) {
  return  {
        counterparts:{
            exists: {
                checkNull: true,
                checkFalsy: true,
                errorMessage: '"counterparts" is required',
                bail:true
            },
            isArray: {
                options:{min: 1},
                errorMessage: '"counterparts" should be not empty array'
            },
            custom: {
                options: (list, {req, location, path}) => {
                    //console.log(list)
                    for (let idx in list) {
                        let currValue = list[idx]
                        let keysToDelete = Object.keys(currValue).filter(element => !itemsFields.includes(element))
                        for(let field of keysToDelete){
                            delete currValue[field]
                        }
                    }
                    //console.log(list)
                    return list
                },
            }
        }
    }
}

function getStrFieldSchema(wildcard, lengthOptions) {
    const schema = {}

    schema[wildcard] = {
        exists: {
            checkNull: true,
            checkFalsy: true,
            errorMessage: 'param is missed',
            bail: true
        },
        isString: {
            errorMessage: 'param should be "string"',
            bail: true
        },
        isLength: {
            options: lengthOptions,
            errorMessage: 'param length should be in' + JSON.stringify(lengthOptions)
        }
    }

    return schema
}

function getIdFieldSchema(wildcard) {
    const schema = {}

    schema[wildcard] = {
        exists: {
            checkNull: true,
            checkFalsy: true,
            errorMessage: 'param is missed',
            bail: true
        },
        isNumeric: {
            errorMessage: 'param should be "number"',
            bail: true
        },
        custom:{
            options: async value => {
                let exists = await elemById.exists(value)
                if(!exists){
                    return Promise.reject(new Error('element by "id" doesn\'t exists'))
                }
            }
        }

    }

    return schema
}

exports.createItems = [
        checkSchema(getBodySchema()),
        checkSchema(getStrFieldSchema('counterparts.*.name',{min:1, max:10})),
        checkSchema(getStrFieldSchema('counterparts.*.code',{min:1, max:10}))
]

exports.updateItems = [
    checkSchema(getBodySchema(["name","code","id"])),
    checkSchema(getIdFieldSchema('counterparts.*.id')),
    checkSchema(getStrFieldSchema('counterparts.*.name',{min:1, max:10})),
    checkSchema(getStrFieldSchema('counterparts.*.code',{min:1, max:10}))
]

exports.deleteItem = [
    checkSchema(getIdFieldSchema('id'))
]






