import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import IndexDetail from '../../components/IndexDetail/IndexDetail';

export default function IndexPage(props) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (props.profile) setList(props.profile.list.sort());
  }, [props.profile]);

	return (
    props.user ?
      list.length ?
        <div>
          {list.map(id => {
            return (
              <div>
                <IndexDetail {...props} id={id} key={props.max + id} />
              </div>
            );
          })}
        </div>
        :
        <div>
          <h1>No Pokemon Collected Yet!</h1>
        </div>
      :
      <Redirect to='/login' />
	);
}