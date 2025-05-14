import { use, useState } from "react";
import "./App.css";
import Users from "./components/Users";
const userPromise = fetch("http://localhost:3000/users").then((res) => res.json());
function App() {
	const initialUsers = use(userPromise);
	const [users, setUsers] = useState(initialUsers);
	const handleAddUser = (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const newUser = { name, email };
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(newUser),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("data after creating the user in the database", data);
				if (data.insertedId) {
					newUser._id = data.insertedId;
					const newUsersAfterAdding = [...users, newUser];
					setUsers(newUsersAfterAdding);
					alert("user added successfully");
					e.target.reset();
				}
			});
	};
	return (
		<div className="p-20 min-h-screen">
			<div className="p-20  bg-base-200">
				<div className="hero">
					<div className="">
						<div className="card bg-base-100 w-[500px]  shrink-0 shadow-2xl">
							<form className="card-body" onSubmit={handleAddUser}>
								<label className="label">Name</label>
								<input type="text" name="name" className="input w-full" placeholder="Name" />
								<label className="label">Email</label>
								<input type="email" name="email" className="input w-full" placeholder="Email" />

								<button className="btn btn-neutral mt-4">Submit</button>
							</form>
						</div>
					</div>
				</div>
				<div className="p-14 bg-white mt-16 rounded-2xl max-w-[900px] mx-auto">
					<Users users={users} setUsers={setUsers}></Users>
				</div>
			</div>
		</div>
	);
}

export default App;
