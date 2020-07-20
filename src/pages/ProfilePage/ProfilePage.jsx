import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import IndexDetail from '../../components/IndexDetail/IndexDetail';
import listService from '../../utils/listService';
import { set } from 'mongoose';

export default function ProfilePage(props) {
  const [lists, setLists] = useState([]);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (props.user) getLists();
  }, []);

  useEffect(() => {
    let length = lists.length;
    if (props.display <= lists.length) {
      length =  props.display;
      setHasMore(true);
    } else setHasMore(false);
    setItems(Array.from({ length: length }));
  }, [lists]);

  async function getLists() {
    const lists = await listService.index();
    setLists(lists ? lists : []);
  };

  function fetchMore() {
    if (items.length >= lists.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: props.display })));
    }, 500);
  }

	return (
    props.user ?
      <>
        <h1>My Collection</h1>
        {lists.length ?
          <div>
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
            >
              {items.map((i, idx) =>
                idx < lists.length ?
                  <IndexDetail {...props} id={lists[idx].pokemon} key={lists[idx].pokemon} />
                  :
                  ''
              )}
            </InfiniteScroll>
          </div>
          :
          <div>
            <h2>No Pokemon Collected Yet!</h2>
          </div>
        }
      </>
      :
      <Redirect to='/login' />
	);
}