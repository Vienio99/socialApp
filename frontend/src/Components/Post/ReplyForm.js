import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {replyPost} from "../../state/actions/posts";
import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = Yup.object().shape({
        text: Yup.string()
            .required('Text is required.')
            .min(5, 'Text must be at least 5 characters long.')
            .max(500, 'Text must not exceed 500 characters.'),
    }
);

function ReplyForm(props) {
    // eslint-disable-next-line react/prop-types
    const {post} = props;
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm({resolver: yupResolver(schema)});

    // Reply logic
    const submitForm = (data) => {
        dispatch(replyPost(data.text, post.id));
        console.log(data.text);
        // Clear form after submitting
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);


    return (
        <div className="flex flex-col w-3/4 ml-auto">
            <div className="flex justify-end">
                <div className="flex flex-col w-1/2 px-4 py-4 mb-4 bg-gray-200 shadow-md rounded-md">
                    <form onSubmit={handleSubmit(submitForm)}>
                        <div className="mb-4">
                            <input
                                className="w-full px-3 py-2 text-sm text-gray-700 border rounded shadow appearance-none"
                                id="text"
                                type="text" placeholder="Text"
                                {...register('text')}
                            />
                            {errors.text &&
                            <p className="px-3 mt-2 text-xs italic text-red-500">{errors.text.message}</p>}
                        </div>
                        <div className="flex items-center justify-end">
                            <button
                                className="px-4 py-2 text-sm text-yellow-900 bg-yellow-400 rounded hover:bg-yellow-300 hover:text-yellow-800 transition duration-300"
                                type="submit">
                                Reply
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReplyForm;

ReplyForm.propTypes = {
    post: PropTypes.object,
    id: PropTypes.number
};