const album = require('./album.json');
const genre = require('./category.json');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    for (let genres of genre) {
        await prisma.genre.create({
            data: genres,
        });
    }

}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally( () => {
    prisma.$disconnect()
})