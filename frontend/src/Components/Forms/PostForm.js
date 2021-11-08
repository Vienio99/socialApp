import React, {useState} from "react";
import axios from 'axios';

//TO-DO - handle improper tags f.e. without hash-tags etc.
//TO-DO - fix problem with controls classname
//TO-DO - display error message below input fields
//TO-DO - move prepareTags logic to backend

function PostForm() {
    const [text, setText] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const tidyTags = prepareTags();
        axios.post('http://127.0.0.1:8000/api/v1/post/',
            {author: 1, text: text, tags: tidyTags})
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
            console.log(error);
        });
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
                <div className="bg-gray-300 rounded-md shadow-md w-1/2 px-6 py-6 mb-4 flex flex-col">
                    <form onSubmit={e => handleSubmit(e)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="text">
                                Text
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                                   id="text"
                                   type="text" placeholder="Text"
                                   onChange={e => setText(e.target.value)}
                                   value={text}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="tags">
                                Tags
                            </label>
                            <input
                                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700"
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