const listaProductos  = require('../../data/productos');
const  generadorID  = require('../../util/util');
const nextID = new generadorID();
class ProductosApi {

    constructor(){
       this.productos = [];
       this.cargar();
    }

    cargar() {
        try {
          const cargar = async () => {
            this.productos = await listaProductos;
          };
          cargar();
        } catch (error) {
          console.log(error.message);
          this.productos = [];
        }
    }

    save(obj){
        if (!obj) {
            return false;
        }
        const nuevoRegistro = { ...obj, id : nextID.getNextId() };
        this.productos.push(nuevoRegistro);
        return nuevoRegistro;
    }

    getAll(){
        return this.productos;
    }

    getById(id){
        if(!id) return false;
        const producto = this.productos.find(producto => producto.id == id);
        if (producto) {
            return producto;
        } else {
            return false;
        }
    }

    update(id, obj){
        if (!id || !obj) {
            return false;
        }
        const producto = this.productos.find(producto => producto.id == id);
        if (producto) {
            const index = this.productos.indexOf(producto);
            this.productos[index] = { ...producto, ...obj };
            return this.productos[index];
        } else {
            return false;
        }
    }

    delete(id){
        if(!id) return false;
        const producto = this.productos.find(producto => producto.id == id);
        if (producto) {
            const index = this.productos.indexOf(producto);
            this.productos.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }
}

module.exports = ProductosApi;