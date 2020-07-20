import React, { useState, useEffect } from 'react';
import listService from '../../utils/listService';

export default function CollectButton(props) {
  const [collected, setCollected] = useState(false);
  const [list, setList] = useState({ users: [] });
  
  useEffect(() => {
    if (props.user) getList();
  }, []);
  
  useEffect(() => {
    setCollected(list.users.includes(props.user._id));
  }, [list]);

  async function getList() {
    const list = await listService.show(props.id);
    setList(list ? list : { users: [] });
  };

  async function handleClick(addOrRemove) {
    setList(await listService.update(addOrRemove, props.id));
  };

  return (
    props.user ? 
      collected ? 
        <div>
          <button onClick={() => {
            handleClick('/remove');
          }}>-</button>
        </div>
        :
        <div>
          <button onClick={() => {
            handleClick('/add');
          }}>+</button>
        </div>
      :
      ''
  );
}