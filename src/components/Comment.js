import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCommentAction } from '../actions/commentActions.js';
import { useCocktail } from '../context/CocktailsProvider.js';

export default function Comment(props) {
  const dispatch = useDispatch();
  const { logged } = useCocktail();

  function updated(id, name) {
    dispatch(updateCommentAction({ id: id, name: name }));
  }

  const [updateValue, setUpdateValue] = useState('');

  function handleChange(event) {
    const { value } = event.target;
    setUpdateValue(value);
  }

  function handleClick(event) {
    event.preventDefault();
    setUpdateValue('');
    updated(props.comment.id, updateValue);
  }

  return (
    <div className="full-comment">
      <div className="coms">
        <h2>{props.comment.user}</h2>
        <h2>{props.comment.name}</h2>
      </div>
      {logged.type === 'admin' ? (
        <div>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Update comment"
              onChange={handleChange}
              value={updateValue}
            />
            {updateValue.length > 0 ? (
              <button onClick={handleClick}>Update comment</button>
            ) : null}
          </div>
          <button onClick={props.deleted}>Delete</button>
        </div>
      ) : null}
    </div>
  );
}
