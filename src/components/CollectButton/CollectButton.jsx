import React, { useState, useEffect } from 'react';

export default function CollectButton(props) {
  const [collected, setCollected] = useState(true);
  
  useEffect(() => {
    if (props.profile) setCollected(props.profile.list.includes(parseInt(props.id)));
  }, [props.profile]);

  return (
    props.user ?
      collected ? 
        <div>
          <button onClick={() => {
            props.updateProfile('remove', props.id);
            props.handleClick();
          }}>-</button>
        </div>
        :
        <div>
          <button onClick={() => {
            props.updateProfile('add', props.id);
            props.handleClick();
          }}>+</button>
        </div>
      :
      ''
  );
}