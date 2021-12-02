import React, {useEffect, useState} from "react";
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
            .min(5, 'Tags have to be at least 5 characters long.')
            .max(100, 'Tags must not exceed 100 characters.')
            .matches(/^(?:#)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:(?!))){0,28}(?:[A-Za-z0-9_]))?)((?: #)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?))*$/, 'Proper format for tags is f.e. #hiking')
    }
);

function EditPostForm(props) {
    // eslint-disable-next-line react/prop-types
    const {handleCancel, handleEdit, text, tags} = props;
    console.log(text);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm({
        // eslint-disable-next-line react/prop-types
        defaultValues: {text: text, tags: tags.map(tag => (tag.name)).join(' ')},
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <form onSubmit={handleSubmit(handleEdit)}>
            <textarea
                className="w-full px-3 py-2 leading-tight text-gray-700 border-2 border-gray-100 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                rows="3"
                name="text"
                placeholder="Text"
                {...register('text')}
            />
            {errors.text &&
            <p className="px-3 mt-1 mb-1 text-xs italic text-red-500">{errors.text.message}</p>}
            <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border-2 border-gray-100 rounded shadow appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                name="tags"
                type="tags"
                placeholder="#tags"
                {...register('tags')}
            />
            {errors.tags &&
            <p className="px-3 mt-1 mt-2 mb-1 text-xs italic text-red-500">{errors.tags.message}</p>}
            <div className="flex items-center justify-end space-x-2">
                <button
                    className="px-4 py-1 mt-1 mb-1 text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300"
                    type="submit"
                >
                    Edit
                </button>
                <button
                    className="px-4 py-1 mt-1 mb-1 bg-gray-300 rounded text-grey-700 hover:bg-gray-200 hover:text-gray-600 transition duration-300"
                    type="button"
                    onClick={e => handleCancel(e)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default EditPostForm;