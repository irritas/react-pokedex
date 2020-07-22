import React, { useState, useEffect, useRef } from 'react';
import listService from '../../utils/listService';

export default function CollectButton(props) {
  const [collected, setCollected] = useState(true);
  const [list, setList] = useState({ users: [] });
  const mounted = useRef(null);
  
  useEffect(() => {
    mounted.current = true;
    if (props.user) getList();
    return () => mounted.current = false;
  }, []);
  
  useEffect(() => {
    mounted.current = true;
    if (props.user) setCollected(list.users.includes(props.user._id));
    return () => mounted.current = false;
  }, [list]);

  async function getList() {
    const list = await listService.show(props.id);
    if (mounted.current) setList(list ? list : { users: [] });
  };

  async function handleClick(addOrRemove) {
    setList(await listService.update(addOrRemove, props.id));
    if (props.onProfile) props.setInvis();
  };

  return (
    <div className='theme'>
      {props.user ? 
        collected ? 
          <>
            <button style={{ backgroundColor: 'crimson', textShadow: '1px 1px black' }} onClick={() => {
              handleClick('/remove');
            }}>Remove from Collection</button>
          </>
          :
          <>
            <button style={{ backgroundColor: 'limegreen', textShadow: '1px 1px black' }} onClick={() => {
              handleClick('/add');
            }}>Add to Collection</button>
          </>
        :
        ''
      }
    </div>
  );
}