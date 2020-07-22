import React, { useState, useEffect } from 'react';
import IndexDetail from '../../components/IndexDetail/IndexDetail';
import InfiniteIndex from '../../components/InfiniteIndex/InfiniteIndex';

export default function IndexPage(props) {
	const [items, setItems] = useState([]);
	const [infinite, setInfinite] = useState(false);

	useEffect(() => {
		let current = [...items];
		for (let i = 1; i <= props.display; i++) {
			current.push(<IndexDetail {...props} onProfile={false} id={i} key={i} />)
		}
		setItems(current);
	}, []);

	function handleClick() {
		setInfinite(true);
	};

	return (
		<div className='container-lg'>
			<h1 className='display-4 text-center py-4 py-lg-5 pokedex title'>All Pokemon</h1>
			<div className='d-flex justify-content-around flex-wrap'>
				{items}
				{infinite ?
					<InfiniteIndex {...props} />
					:
					''
				}
			</div>
			<div className='theme d-flex justify-content-center'>
				{infinite ?
					'' : <button className='pokedex trim bg-dark mb-5' onClick={handleClick}>Load More</button>	
				}
			</div>
		</div>
	);
}