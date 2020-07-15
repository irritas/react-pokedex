import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import IndexDetail from '../IndexDetail/IndexDetail';

export default function IndexPage(props) {
	const [items, setItems] = useState(Array.from({ length: props.offset }));
	const [hasMore, setHasMore] = useState(true);

	function fetchMore() {
    if (items.length >= props.max - props.offset) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: props.offset })));
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
          idx < props.max - props.offset ?
            <IndexDetail id={idx + 1 + props.offset} getFullId={props.getFullId} key={i} />
            :
            ''
        )}
      </InfiniteScroll>
		</>
	);
}