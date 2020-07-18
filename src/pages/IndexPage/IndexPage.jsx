import React, { useState, useEffect } from 'react';
import IndexDetail from '../../components/IndexDetail/IndexDetail';
import InfiniteIndex from '../../components/InfiniteIndex/InfiniteIndex';

export default function IndexPage(props) {
	const [items, setItems] = useState([]);
	const [infinite, setInfinite] = useState(false);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded && props.profile) {
			let current = [...items];
			for (let i = 1; i <= props.display; i++) {
				current.push(<IndexDetail {...props} id={i} key={i} />)
			}
			setItems(current);
			setLoaded(true);
		}
	}, [props.profile]);

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