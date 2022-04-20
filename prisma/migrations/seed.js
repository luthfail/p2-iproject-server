const album = require('./album.json');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    for (let albums of album) {
        await prisma.album.create({
            data: albums,
        });
    }

}

main().catch(e => {
    console.log(e)
    process.exit(1)
}).finally( () => {
    prisma.$disconnect()
})