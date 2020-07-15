import React, { useState, useEffect } from 'react';
import IndexDetail from '../../components/IndexDetail/IndexDetail';
import InfiniteIndex from '../../components/InfiniteIndex/InfiniteIndex';

export default function IndexPage(props) {
	const [items, setItems] = useState([]);
	const [infinite, setInfinite] = useState(false);

	useEffect(() => {
		let current = [...items];
		for (let i = 1; i <= props.display; i++) {
			current.push(<IndexDetail id={i} getFullId={props.getFullId} key={i} />)
		}
		setItems(current);
	}, []);

	function handleClick() {
		setInfinite(true);
	};

	return (
		<div>
			{items}
			{infinite ?
				<InfiniteIndex {...props} />
				:
				<button onClick={handleClick}>Load More</button>
			}
		</div>
	);
}