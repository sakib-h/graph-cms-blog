import React, { useState, useEffect, useRef } from "react";
import { submitComment } from "../services";
const CommentsForm = ({ slug }) => {
	const [error, setError] = useState(false);
	const [localStorage, setLocalStorage] = useState(null);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const commentElement = useRef();
	const nameElement = useRef();
	const emailElement = useRef();
	const storeDataElement = useRef();

	useEffect(() => {
		nameElement.current.value = window.localStorage.getItem("name");
		emailElement.current.value = window.localStorage.getItem("email");
	}, []);

	const handleCommentSubmission = (e) => {
		const comment = commentElement.current.value;
		const name = nameElement.current.value;
		const email = emailElement.current.value;
		const storeData = storeDataElement.current.checked;
		// setError(false);

		if (!comment || !name || !email) {
			setError(true);
			return;
		}

		const commentObj = {
			name,
			email,
			comment,
			slug,
		};
		if (storeData) {
			window.localStorage.setItem("name", name);
			window.localStorage.setItem("email", email);
		} else {
			window.localStorage.removeItem("name", name);
			window.localStorage.removeItem("email", email);
		}

		submitComment(commentObj).then((res) => {
			setShowSuccessMessage(true);
			setTimeout(() => {
				setShowSuccessMessage(false);
			}, 3000);
		});
		e.preventDefault;
	};
	return (
		<div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
			<h3 className="text-xl mb-8 font-semibold border-b pb-4">
				Leave a Reply
			</h3>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<textarea
					ref={commentElement}
					className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 placeholder-gray-500"
					placeholder="Comment"
					name="comment"
				/>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<input
					type="text"
					name="name"
					id="name"
					ref={nameElement}
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 placeholder-gray-500"
					placeholder="Name"
				/>

				<input
					type="email"
					name="email"
					id="email"
					ref={emailElement}
					className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 placeholder-gray-500"
					placeholder="Email"
				/>
			</div>
			<div className="grid grid-cols-1 gap-4 mb-4">
				<div>
					<input
						ref={storeDataElement}
						type="checkbox"
						id="storeData"
						name="storeData"
						value="true"
					/>
					<label
						htmlFor="storeData"
						className="text-gray-500 cursor-pointer ml-2">
						Save Name & E-mail for next Time
					</label>
				</div>
			</div>
			{error && (
				<p className="text-xs text-red-500">All fields are Required</p>
			)}
			<div className="mt-8">
				<button
					className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg text-white rounded-full px-8 py-3 cursor-pointer"
					type="button"
					onClick={handleCommentSubmission}>
					Post Comment
				</button>
				{showSuccessMessage && (
					<span className="text-xl float-right font-semibold mt-3 text-green-500">
						Comment Submitted for review
					</span>
				)}
			</div>
		</div>
	);
};

export default CommentsForm;
