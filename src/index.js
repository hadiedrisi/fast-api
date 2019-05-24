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



fastify.get('/',async(request,reply)=>{

	return { hello:'world'}
});


const start = async()=>{

	try{

	await fastify.listen(3000);
	fastify.log.info('server listening on ${fastify.server.address().port}');
	
	}
	catch(err){
	fastify.log.error(err)
	process.exit(1)
	}

}

start()
