const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductosService {

    constructor() {
        this.productos = [];
        this.generate();
    }

    generate() {
        const limit = 100;

        for (let index = 0; index < limit; index++) {
            this.productos.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            })
        }
    }

    async create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }

        this.productos.push(newProduct);
        return newProduct;
    }

    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.productos);
            }, 1000);
        });

        // return this.productos;
    }

    async findOne(id) {
        // const name = this.getTotal(); // ! Este es un error forzado
        // return this.productos.find(item => item.id === id);
        const producto = this.productos.find(item => item.id === id);

        if (!producto) {
            throw boom.notFound('product not found');
        }

        if (producto.isBlock) {
            throw boom.conflict('product is block');
        }

        return producto;
    }

    async update(id, changes) {
        const index = this.productos.findIndex(item => item.id === id);

        if (index === -1) {
            // throw new Error('product not found');
            throw boom.notFound('product not found');
        }

        const producto = this.productos[index];
        this.productos[index] = {
            ...producto,
            ...changes
        };
        return this.productos[index];
    }

    async deleted(id) {
        const index = this.productos.findIndex(item => item.id === id);

        if (index === -1) {
            // throw new Error('product not found');
            throw boom.notFound('product not found');
        }

        this.productos.splice(index, 1);
        return { message: "deleted success!", id: id }
    }
}

module.exports = ProductosService;