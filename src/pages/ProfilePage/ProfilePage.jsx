import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import IndexDetail from '../../components/IndexDetail/IndexDetail';

export default function IndexPage(props) {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [list, setList] = useState(props.getList());

  useEffect(() => {
    setList(props.getList());
  }, [props]);

  function fetchMore() {
    if (items.length >= list.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: props.display })));
    }, 500);
  }

	return (
    list.length ?
      <div>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<h4>End of current list!</h4>}
        >
          {items.map((i, idx) =>
            idx < list.length ?
              <IndexDetail {...props} id={idx + 1} key={idx} />
              :
              ''
          )}
        </InfiniteScroll>
      </div>
      :
      <div>
        <h1>No Pokemon Collected Yet!</h1>
      </div>
	);
}