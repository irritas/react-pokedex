import React from 'react';

export default function DetailPage(props) {
	const id = props.match.params.id;
	return (
		id > props.max ?
		<div>
			Not Available Yet
		</div>
		:
		<div>
			id: {id}
		</div>
	);
}