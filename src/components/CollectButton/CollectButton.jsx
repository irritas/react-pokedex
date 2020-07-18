import React, { useState, useEffect } from 'react';

export default function CollectButton(props) {
  const [collected, setCollected] = useState();
  const [list, setList] = useState(props.getList());
  
  useEffect(() => {
    if (list)
      if (list.includes(props.id)) setCollected(true);
    else setCollected(false);
  }, [list]);

  useEffect(() => {
    setList(props.getList());
  }, [props]);

  return (
    props.user ?
      collected ? 
        <div>
          <button onClick={() => props.updateProfile('remove', props.id)}>-</button>
        </div>
        :
        <div>
          <button onClick={() => props.updateProfile('add', props.id)}>+</button>
        </div>
      :
      ''
  );
}