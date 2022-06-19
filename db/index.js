const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/react-testing1');
const { UUID, UUIDV4, STRING } = Sequelize;

const User = conn.define('user', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING(20),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
});

const Phone = conn.define('phone', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING(30)
    }
});

Phone.belongsTo(User);

const syncAndSeed = async() => {
    await conn.sync({ force: true });

    const [tom, adam, alexfraiha] = await Promise.all([
        User.create({name: 'tom'}),
        User.create({name: 'adam'}),
        User.create({name: 'alexfraiha'}),
    ])

    const phones = await Promise.all([
        Phone.create({userId: tom.id, name: 'iphone'}),
        Phone.create({userId: adam.id, name: 'pixel'}),
        Phone.create({userId: alexfraiha.id, name: 'android'}),
        Phone.create({userId: alexfraiha.id, name: 'iphone'}),
    ])
};

module.exports = {
    syncAndSeed, User, Phone
}