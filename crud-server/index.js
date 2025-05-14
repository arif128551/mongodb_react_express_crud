var express = require("express");
var cors = require("cors");
var app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// crud userName: crudUser pass:FfDsFMBgnW9lcEAs

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
	"mongodb+srv://crudUser:FfDsFMBgnW9lcEAs@cluster0.x7tmnab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

async function run() {
	try {
		await client.connect();

		const database = client.db("usersdb");
		const usersCollection = database.collection("users");

		app.get("/users", async (req, res) => {
			const cursor = usersCollection.find();
			const result = await cursor.toArray();
			res.send(result);
		});

		app.post("/users", async function (req, res) {
			const newUser = req.body;
			const result = await usersCollection.insertOne(newUser);
			res.send(result);
		});

		app.delete("/users/:id", async (req, res) => {
			const id = req.params.id;
			const query = {
				_id: new ObjectId(id),
			};
			const result = await usersCollection.deleteOne(query);
			res.send(result);
		});

		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		// await client.close();
	}
}
run().catch(console.dir);

app.get("/", function (req, res, next) {
	res.send("Hello world");
});

app.listen(port, function () {
	console.log("CORS-enabled web server listening on port ", port);
});
