import React from "react";
import Header from "../components/Header";
import { useLoaderData } from "react-router";

const Profile = () => {
	const user = useLoaderData();
	const handleUpdateUser = (e) => {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const updatedUser = { name, email };
		fetch(`http://localhost:3000/users/${user._id}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(updatedUser),
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);
				if (result.modifiedCount) {
					alert("updated successfully");
				}
			});
	};
	return (
		<div className="container mx-auto">
			<Header></Header>
			<div className="p-20 min-h-screen">
				<div className="p-20  bg-base-200">
					<div className="card bg-base-100 w-[500px]  shrink-0 shadow-2xl mx-auto">
						<form className="card-body" onSubmit={handleUpdateUser}>
							<label className="label">Name</label>
							<input type="text" name="name" className="input w-full" placeholder="Name" defaultValue={user.name} />
							<label className="label">Email</label>
							<input type="email" name="email" className="input w-full" placeholder="Email" defaultValue={user.email} />

							<button className="btn btn-neutral mt-4">Update User</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
