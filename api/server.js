const restify = require('restify');
const errors = require('restify-errors');

const servidor = restify.createServer({
    name: 'padaria',
    version: '1.0.0'
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

servidor.listen(8001, function() {
    console.log("%s executando em %s", servidor.name, servidor, servidor.url);
});

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'usbw',
        database: 'padaria'
    }
})

// Tabela Clientes

// Busca todos os clientes
servidor.get('/clientes', (req, res, next) => {
    knex('clientes').then((dados) =>{
        res.send( dados )
    }, next);
});

// Adiciona cliente
servidor.post('/cliente/add', (req, res, next) => {
    console.log( "Log: " + JSON.stringify(req.body) );
    knex('clientes')
        .insert( req.body )
        .then((dados) =>{
            console.log('dados', dados)
            res.send( dados )
        }, next);
});

// Busca cliente pelo id
servidor.get('/cliente/:id', (req, res, next) => {
    const id = req.params.id;
    knex('clientes')
        .where( 'id', id)
        .first()
        .then((dados) =>{
            if(!dados){
                return res.send(new errors.BadRequestError('Este produto não foi encontrado.'))
            }
            res.send( dados )
    }, next);
});

// Atualiza cliente pelo id
servidor.put('/cliente/update/:id', (req, res, next) => {
    const id = req.params.id;
    knex('clientes')
        .where('id', id)
        .update (req.body)
        .then((dados) =>{
            if(!dados){
                return res.send(new errors.BadRequestError('Este produto não foi encontrado.'))
            }
            res.send( dados )
        }, next);
});

// Deleta cliente pelo id
servidor.del('/cliente/delete/:id', (req, res, next) => {
    const id = req.params.id;
    knex('clientes')
        .where('id', id)
        .delete()
        .then((dados) =>{
            if(!dados){
                return res.send(new errors.BadRequestError('Este produto não foi encontrado.'))
            }
            res.send( dados )
        }, next);
});

/* ----------------------------------- */

// Tabela Produtos

// Busca todos os produtos
servidor.get('/produtos', (req, res, next) => {
    knex('produtos').then((dados) =>{
        res.send( dados )
    }, next);
});

// Adiciona produto
servidor.post('/produto/add', (req, res, next) => {
    console.log( "Log: " + JSON.stringify(req.body) );
    knex('produtos')
        .insert( req.body )
        .then((dados) =>{
            console.log('dados', dados)
            res.send( dados )
        }, next);
});

// Busca produto pelo id
servidor.get('/produto/:id', (req, res, next) => {
    const id = req.params.id;
    knex('produtos')
        .where( 'id', id)
        .first()
        .then((dados) =>{
            if(!dados){
                return res.send(new errors.BadRequestError('Este produto não foi encontrado.'))
            }
            res.send( dados )
    }, next);
});

// Atualiza produto pelo id
servidor.put('/produto/update/:id', (req, res, next) => {
    const id = req.params.id;
    knex('produtos')
        .where('id', id)
        .update (req.body)
        .then((dados) =>{
            if(!dados){
                return res.send(new errors.BadRequestError('Este produto não foi encontrado.'))
            }
            res.send( dados )
        }, next);
});

// Deleta produto pelo id
servidor.del('/produto/delete/:id', (req, res, next) => {
    const id = req.params.id;
    knex('produtos')
        .where('id', id)
        .delete()
        .then((dados) =>{
            if(!dados){
                return res.send(new errors.BadRequestError('Este produto não foi encontrado.'))
            }
            res.send( dados )
        }, next);
});