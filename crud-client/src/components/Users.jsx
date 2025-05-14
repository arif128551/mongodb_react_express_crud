import React from "react";

const Users = ({ users, setUsers }) => {
	const handleUserDelete = (userId) => {
		fetch(`http://localhost:3000/users/${userId}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.deletedCount) {
					const remainingUsers = users.filter((user) => user._id !== userId);
					setUsers(remainingUsers);
					alert("Delete user successfully");
				}
			});
	};
	return (
		<div className="overflow-x-auto">
			<table className="table">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={user._id}>
							<th>{index + 1}</th>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>
								<button className="badge badge-primary mr-2 cursor-pointer">Edit</button>
								<button className="badge badge-primary mr-2 cursor-pointer">See Details</button>
								<button onClick={() => handleUserDelete(user._id)} className="badge badge-secondary cursor-pointer">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Users;
