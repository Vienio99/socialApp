import React, {useEffect, useState} from "react";
import {addPost} from "../../state/actions/posts";
import {useDispatch} from "react-redux";

//TO-DO - display error message below input fields
//TO-DO - move prepareTags logic to backend

function PostForm() {
    const [isValid, setIsValid] = useState(false);
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const tidyTags = prepareTags();
        console.log(tidyTags);
        dispatch(addPost(text, tidyTags));

        // Clear form after submitting
        setText('');
        setTags('');
    };

    function prepareTags() {
        // Trim of any whitespaces and separate words
        const tidyTags = tags.trim().split(/[ ]+/);
        return tidyTags.map(tag => {
            if (!tag.startsWith('#')) {
                tag = '#' + tag.trim();
                return {'name': tag};
            } else if (tag.startsWith('#') && tag !== '#') {
                return tag;
            }
        });
    }

    useEffect( () => {
        setIsValid(
            !!text && !!tags && !/^\s*$/.test(text) && !/^\s*$/.test(tags)
        );
        console.log('ok');
        }, [text, tags]);


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
                            <input className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                   id="text"
                                   type="text"
                                   placeholder="Text"
                                   onChange={e => setText(e.target.value)}
                                   value={text}
                            />
                            <p className="px-3 mt-2 text-xs italic text-red-500">Please fill out this field.</p>
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="tags">
                                Tags
                            </label>
                            <input
                                className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                id="tags"
                                type="tags"
                                placeholder="#tags"
                                onChange={e => setTags(e.target.value)}
                                value={tags}
                            />
                            <p className="px-3 mt-2 text-xs italic text-red-500">Please fill out this field.</p>
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300 disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-700"
                                type="submit"
                                disabled={!isValid}
                            >
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