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
		<InfiniteScroll
      className='d-flex justify-content-around flex-wrap'
      dataLength={items.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={
        <div style={{ width: '100%' }} className='text-center mb-5'>
          <div className='spinner-border p-4' role='status'>
            <span className='sr-only'>Loading...</span>
          </div>
        </div>
      }
    >
      {items.map((i, idx) =>
        idx < props.max - props.display ?
          <IndexDetail {...props} onProfile={false} id={idx + 1 + props.display} key={idx} />
          :
          ''
      )}
    </InfiniteScroll>
	);
}