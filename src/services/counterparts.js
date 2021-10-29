const db = require("typeorm");
const {Counterparts} = require("../models/entities/counterparts")


exports.getAll = async () => {
    const rep =  db.getManager().getRepository(Counterparts)
    const list = await rep.find({order: {id:"DESC"}})
    return list
}

exports.createItems = async (body) => {
    const rep =  db.getManager().getRepository(Counterparts)
    const createdItems = []
    for(const c of body.counterparts){
        createdItems.push(await rep.save({name:c.name, code:c.code}))
    }
    return {createdCounterparts: createdItems}
}

exports.updateItems = async (body) => {
    const rep =  db.getManager().getRepository(Counterparts)
    const updatedItems = []
    for(const {id, name, code} of body.counterparts){
        updatedItems.push(await rep.save({id, name, code}))
    }
    return {updatedCounterparts: updatedItems}
}

exports.deleteItem = async (body) => {
    const rep =  db.getManager().getRepository(Counterparts)
    const deletedItem = await rep.delete({id:body.id})
    return deletedItem
}

exports.exists = async (id) => {
    const rep =  db.getManager().getRepository(Counterparts)
    const result = await rep.findOne({where: {id}})
    return !!result // to bool
}

