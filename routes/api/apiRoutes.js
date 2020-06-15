const knexConfig = require('../../knexfile')['development'];
const knex = require('knex')(knexConfig);

const getData = (target) => {
    let query = knex(target).select();
    return query.then((data) => {
        return data;
    });
};

const getProfile = (id) => {
    let query = knex('users').select().where({ id: id });
    return query.then((data) => {
        return data;
    });
};

const getReviews = (id) => {
    let query = knex('reviews').select().where({ user_id: id });
    return query.then((data) => {
        return data;
    });
};

module.exports = (express) => {
    const router = express.Router();

    // TODO, only staff authentication can call it
    router.get('/stock', async(req, res) => {
        let data = await getData('stock');
        res.send(data);
    });

    router.get('/profile', async(req, res) => {
        if (req.user == undefined) {
            res.send('You are not logged in');
        } else if (req.user.id) {
            let data = await getReviews(req.user.id);
            console.log(data);
            res.reder('', {
                variblae: JSON.stringify(data),
            });
        }
    });

    return router;
};