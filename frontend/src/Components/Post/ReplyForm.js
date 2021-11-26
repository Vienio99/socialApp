import React, {useState} from "react";
import PropTypes from "prop-types";
import {replyPost} from "../../state/actions/posts";
import {useDispatch} from "react-redux";

function ReplyForm(props) {
    // eslint-disable-next-line react/prop-types
    const { post } = props;
    const [replyText, setReplyText] = useState('');

        const dispatch = useDispatch();

        // Reply logic
    const handleReply = (e) => {
        e.preventDefault();
        dispatch(replyPost(replyText, post.id));
        console.log(replyText);
        // Clear form after submitting
        setReplyText('');
    };
    return (
        <div className="flex flex-col w-3/4 ml-auto">
            <div className="flex justify-end">
                <div className="flex flex-col w-1/2 px-4 py-4 mb-4 bg-gray-200 shadow-md rounded-md">
                    <form onSubmit={e => handleReply(e)}>
                        <div className="mb-4">
                            <input
                                className="w-full px-3 py-2 text-sm text-gray-700 border rounded shadow appearance-none"
                                id="text"
                                type="text" placeholder="Text"
                                onChange={e => setReplyText(e.target.value)}
                                value={replyText}
                            />
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