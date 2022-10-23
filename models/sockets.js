const TicketList = require('./ticket-list');

class Sockets {

    constructor(io) {
        // Este hace que se actualize todo los navegadores (Al instante)
        this.io = io;

        // Crear nuestra instancia

        // this.bandList = new BandList();

        this.ticketList = new TicketList();


        this.socketExports()
    }


    socketExports() {

        // On connection
        this.io.on('connection', (socket) => {

            console.log('Cliente conectado')

            // Emitir al cliente conectado, todas las bandas actuales.

            // Creando nuevos Tickets
            socket.on('solicitar-ticket', (data, callback) => {
                // this.ticketList.crearTicket()

                // Creando nuevos Tickets
                const nuevoTicket = this.ticketList.crearTicket()

                console.log("LLamando al collback: ", callback)

                callback(nuevoTicket)
            })


            // Asignando Tickets
            socket.on('siguiente-ticket-trabajar', ({ agente, escritorio }, callback) => {
                console.log(agente)

                // const { agente, escritorio } = agente

                // Asignando Ticket por cada Usuario
                const suTicket = this.ticketList.asignarTicket(agente, escritorio)
                callback(suTicket)

                this.io.emit('ticket-asignado', this.ticketList.ultimos13)


            })




        });

    }

}

module.exports = Sockets;