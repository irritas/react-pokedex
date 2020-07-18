import React, { useState, useEffect } from 'react';
import IndexDetail from '../../components/IndexDetail/IndexDetail';

export default function IndexPage(props) {
	const [items, setItems] = useState([]);

	useEffect(() => {
    let current = [...items];
		for (let i = 1; i <= props.display; i++) {
			current.push(<IndexDetail id={i} getFullId={props.getFullId} key={i} />)
		}
    setItems(current);
    console.log(props.profile)
	}, []);

	return (
		<div>
			{items}
		</div>
	);
}