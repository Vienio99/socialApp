import React from "react";
import {useEffect, useState} from 'react';
import axios from 'axios';

//TO-DO - handle improper tags f.e. without hash-tags etc.
//TO-DO - fix problem with controls classname
//TO-DO - display error message below input fields

function PostForm() {
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        axios.post('http://127.0.0.1:8000/api/v1/post/',
                    { author: 1, text: text, tags: [] },
                    {  }).then(response => {console.log(response);});
    };

    return (
    <div className="card social-card col2 padding-20" data-social="item">
        <form className="simform no-margin" autoComplete="off" data-social="status" onSubmit={e => handleSubmit(e)}>
            <div className="status-form-inner">
                <ol className="questions">
                    <li className="current">
                        <span>
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          <label htmlFor="status-q1">What's on your mind?</label>
                        </span>
                        <input id="status-q1" name="q1" onChange={e => setText(e.target.value)} value={text} type="text"/>
                        <span>
                            <label htmlFor="tags">Tags</label>
                        </span>
                        <input id="tags" name="tags" onChange={e => setTags(e.target.value)} value={tags} type="text"/>
                    </li>
                </ol>
                {/*/questions*/}
                <button aria-label="" type="submit">Send answers</button>
                <div className="controls">
                    <button aria-label="" className="next"/>
                    <div className="progress"/>
                    <span className="number">
                        <span className="number-current"/>
                                <span className="number-total"/>
                        </span>
                    <span className="error-message"/>
                </div>
            </div>
            {/*simform-inner*/}
            <span className="final-message"/>
        </form>
        {/*simform*/}
    </div>
    );
}

export default PostForm;

