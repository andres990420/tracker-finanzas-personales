import EventEmitter  from "events"

class Mediator extends EventEmitter{}

export default new Mediator()

const mediator = new Mediator();

mediator.on('test',(data)=>{
    console.log(data)
    console.log("Prueba de evento")
})


mediator.emit('test', "hola mundo");

