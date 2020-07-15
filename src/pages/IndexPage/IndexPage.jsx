import React, { useState } from 'react';
import IndexDetail from '../../components/IndexDetail/IndexDetail'

export default function IndexPage(props) {
	const [range, setRange] = useState([1, 12]);

	const items = [];
	for (let i = range[0]; i <= range[1]; i++) {
		items.push(<IndexDetail id={i} getFullId={props.getFullId} key={i} />)
	}

	return (
		<div>
			{items}
		</div>
	);
}