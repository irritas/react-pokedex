import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import IndexDetail from '../IndexDetail/IndexDetail';

export default function IndexPage(props) {
	const [items, setItems] = useState(Array.from({ length: props.display }));
	const [hasMore, setHasMore] = useState(true);

	function fetchMore() {
    if (items.length >= props.max - props.display) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: props.display })));
    }, 500);
  }

	return (
		<>
			<InfiniteScroll
        dataLength={items.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h4>End of current list!</h4>}
      >
        {items.map((i, idx) =>
          idx < props.max - props.display ?
            <IndexDetail id={idx + 1 + props.display} getFullId={props.getFullId} key={i} />
            :
            ''
        )}
      </InfiniteScroll>
		</>
	);
}