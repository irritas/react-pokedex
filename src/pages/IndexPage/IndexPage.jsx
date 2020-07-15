import React, { useState, useEffect } from 'react';
import IndexDetail from '../../components/IndexDetail/IndexDetail';
import InfiniteIndex from '../../components/InfiniteIndex/InfiniteIndex';

export default function IndexPage(props) {
	const [initialRange, setInitialRange] = useState([1, 12]);
	const [items, setItems] = useState([]);
	const [infinite, setInfinite] = useState(false);

	useEffect(() => {
		let current = [...items];
		for (let i = initialRange[0]; i <= initialRange[1]; i++) {
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
				<InfiniteIndex {...props} offset={initialRange[1]} />
				:
				<button onClick={handleClick}>Load More</button>
			}
		</div>
	);
}