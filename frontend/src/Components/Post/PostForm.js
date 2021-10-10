import React from "react";
import {useEffect, useState} from 'react';
import axios from 'axios';

//TO-DO - handle improper tags f.e. without hash-tags etc.

function PostForm() {
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');

    console.log(text);
    return (
    <div className="card social-card col2 padding-20" data-social="item">
        <form className="simform no-margin" autoComplete="off" data-social="status">
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
                <button aria-label="" className="submit" type="submit">Send answers</button>
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

