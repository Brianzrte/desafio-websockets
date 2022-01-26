const fs = require('fs');
class ChatApi {
    
    constructor() {
        this.nombre = './data/chat.json';
        this.chat = [];
        this.cargar();
    }

    cargar() {
        try {
          const cargar = async () => {
            if (!fs.existsSync(this.nombre)) {
              fs.writeFileSync(this.nombre, JSON.stringify([],null,2), 'utf8');
            } 
            const registros = await fs.promises.readFile(this.nombre, 'utf8')
            this.chat = JSON.parse(registros, null, 2);
          };
          cargar();
        } catch (error) {
          console.log(error.message);
          this.chat = [];
        }
    }

    save(obj) {
        if (!obj) {
            return false;
        }
        const nuevoRegistro = { ...obj };
        this.chat.push(nuevoRegistro);
        this.guardar();
        return nuevoRegistro;
    }

    getAll() {
        return this.chat;
    }

    guardar() {
        try {
          const guardar = async () => {
            await fs.promises.writeFile(this.nombre, JSON.stringify(this.chat,null,2), 'utf8')
          };
          guardar();
        } catch (error) {
          console.log(error.message);
        }
    }
}

module.exports = ChatApi;