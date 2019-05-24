const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mycargarage',{ useNewUrlParser: true })
	.then(()=>{
	console.log('mongoDB Connected...');	
	})
	.catch(err=>{
	console.log(err);
	})
const fastify = require('fastify')({

	logger:true
});

const routes = require('../routes');
routes.forEach((route, index) => {
	fastify.route(route)
   })


const swagger = require('./config/swagger')
fastify.register(require('fastify-swagger'), swagger.options)


fastify.get('/',async(request,reply)=>{

	return { hello:'world'}
});


const start = async()=>{

	try{

// 		await fastify.listen(3000)
// 

	await fastify.listen(3000);
	fastify.swagger()
	fastify.log.info(`listening on ${fastify.server.address().port}`);

	}
	catch(err){
	fastify.log.error(err)
	process.exit(1)
	}

}

start()
