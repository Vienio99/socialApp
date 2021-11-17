import React, {useState} from "react";
import axiosInstance from '../../axios';
import {addPost} from "../../state/actions/posts";

//TO-DO - handle improper tags f.e. without hash-tags etc.
//TO-DO - display error message below input fields
//TO-DO - move prepareTags logic to backend

function PostForm() {
    // Maybe move it to redux?
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const tidyTags = prepareTags();
        addPost(text, tidyTags);
        // Clear form after submitting
        setText('');
        setTags('');
    };

    function prepareTags() {
        const tidyTags = tags.split(' ');
        return tidyTags.map(tag => {
            if (!tag.startsWith('#')) {
                tag = '#' + tag;
            }
            return {'name': tag};
        });
    }

    return (
        // Card
        <div className="flex flex-col">
            <div className="flex justify-center">
                <div className="flex flex-col w-1/2 px-6 py-6 mb-4 bg-gray-300 shadow-md rounded-md">
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="text">
                                Text
                            </label>
                            <input className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none"
                                   id="text"
                                   type="text" placeholder="Text"
                                   onChange={e => setText(e.target.value)}
                                   value={text}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="tags">
                                Tags
                            </label>
                            <input
                                className="w-full px-3 py-2 text-gray-700 border rounded shadow appearance-none border-red"
                                id="tags" type="tags" placeholder="#tags"
                                onChange={e => setTags(e.target.value)}
                                value={tags}
                            />
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300"
                                type="submit">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PostForm;