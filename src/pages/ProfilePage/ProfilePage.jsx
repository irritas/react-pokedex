import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import IndexDetail from '../../components/IndexDetail/IndexDetail';
import listService from '../../utils/listService';

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
      <div className='container-lg'>
        <h1 className='display-4 text-center py-4 py-lg-5 pokedex title'>My Collection</h1>
        {lists.length ?
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
              idx < lists.length ?
                <IndexDetail {...props} onProfile={true} id={lists[idx].pokemon} key={lists[idx].pokemon} />
                :
                ''
            )}
          </InfiniteScroll>
          :
          <div className='text-center m-5 pt-5'>
            <h1 className='display-6 pokedex mt-sm-5'>No Pokemon Collected Yet!</h1>
          </div>
        }
      </div>
      :
      <Redirect to='/login' />
	);
}