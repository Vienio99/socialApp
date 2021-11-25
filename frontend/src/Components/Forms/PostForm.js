import React, {useEffect, useState} from "react";
import {addPost} from "../../state/actions/posts";
import {useDispatch} from "react-redux";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// .matches(/^(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:(?!))){0,28}(?:[A-Za-z0-9_]))?)((?: #)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?))*$/)

//TO-DO - display error message below input fields
//TO-DO - move prepareTags logic to backend
//TO-DO  - is double exclamation mark ok practice?

const schema = Yup.object().shape({
        text: Yup.string()
            .required('A text is required.')
            .min(5, 'Text must be at least 5 characters long.')
            .max(500, 'Text must not exceed 500 characters.'),
        tags: Yup.string()
            .required('Tags are required.')
            .min(5, 'Tags must be at least 5 characters long.')
            .max(100, 'Tags must not exceed 100 characters.')
            .matches(/^(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:(?!))){0,28}(?:[A-Za-z0-9_]))?)((?: #)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?))*/, 'Proper format for tags is f.e. #hiking')
    }
);

function PostForm() {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm({resolver: yupResolver(schema)});


    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const submitForm = (data) => {
        console.log(data);

        // Maybe add trim to tags?
        // dispatch(addPost(data.text, data.tags));
    };


    return (
        // Card
        <div className="flex flex-col">
            <div className="flex justify-center">
                <div className="flex flex-col w-1/2 px-6 py-6 mb-4 bg-gray-300 shadow-md rounded-md">
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="text">
                                Text
                            </label>
                            <textarea
                                className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                rows="3"
                                name="text"
                                placeholder="Text"
                                {...register('text')}
                            />
                            {errors.text &&
                            <p className="px-3 mt-2 text-xs italic text-red-500">{errors.text.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 font-bold text-gray-700 text-md" htmlFor="tags">
                                Tags
                            </label>
                            <input
                                className="w-full px-3 py-2 leading-tight text-gray-700 bg-gray-100 border-2 border-gray-100 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                                name="tags"
                                type="tags"
                                placeholder="#tags"
                                {...register('tags')}
                            />
                            {errors.tags &&
                            <p className="px-3 mt-2 text-xs italic text-red-500">{errors.tags.message}</p>}
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                className="px-4 py-2 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300 disabled:opacity-50 disabled:bg-gray-200 disabled:text-gray-700"
                                type="submit"
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


// Old function but put it here, may be helpful in the future
// function prepareTags() {
//     // Trim of any whitespaces and separate words
//     const tidyTags = tags.trim().split(/[ ]+/);
//     return tidyTags.map(tag => {
//         if (!tag.startsWith('#')) {
//             tag = '#' + tag.trim();
//             return {'name': tag};
//         } else if (tag.startsWith('#') && tag !== '#') {
//             tag = tag.trim();
//             return {'name': tag};
//         }
//     });
// }