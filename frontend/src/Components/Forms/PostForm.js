import React, {useEffect, useState} from "react";
import {addPost} from "../../state/actions/posts";
import {useDispatch} from "react-redux";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
        text: Yup.string()
            .required('Text is required.')
            .min(5, 'Text must be at least 5 characters long.')
            .max(500, 'Text must not exceed 500 characters.'),
        tags: Yup.string()
            .required('Tags are required.')
            // There is 1, 17 but it counts as 20 characters? not sure why
            // but it should count 20 because there is validation with same amount in Django when it comes to single tag
            // Same with minimum - 1 counts as 3 (in Django there is 3 minimum)
            // TO-DO: there should be maximum of 20 tags validation (in Django there is)
            .matches(/^(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:(?!))){0,17}(?:[A-Za-z0-9_]))?)((?: #)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,17}(?:[A-Za-z0-9_]))?))*$/, 'Proper format for tags is f.e. #hiking. Tag have to be at least 3 characters and maximum 20 characters long.')
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
        const tidyTags = prepareTags(data.tags);
        dispatch(addPost(data.text.trim(), tidyTags));
    };

    function prepareTags(tags) {
        // Trim of any whitespaces and separate words
        const tidyTags = tags.trim().split(/[ ]+/);
        return tidyTags.map(tag => {
            return {'name': tag};
        });
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                <div className="flex flex-col w-1/2 px-6 py-6 mb-4 bg-gray-300 shadow-md rounded-md">
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="mb-4">
                            <label className="block mb-2 font-bold text-gray-700 form-textarea text-md"
                                   htmlFor="text">
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