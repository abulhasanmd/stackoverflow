import React, { useEffect } from 'react';
import { StacksEditor } from '@stackoverflow/stacks-editor';
import '@stackoverflow/stacks-editor/dist/styles.css';
import '@stackoverflow/stacks-icons';
import '@stackoverflow/stacks/dist/css/stacks.css';

import './PostQuestion.css';

export default function PostQuestion() {
	useEffect(() => {
		if (!document.querySelector('#editor-container').hasChildNodes()) {
			new StacksEditor(
				document.querySelector('#editor-container'),
				'*Your* **question** goes here',
				{},
			);
		}
	}, []);
	return (
		<div className="post-question-container">
			<div className="s-page-title">
				<h1 className="s-page-title--header">Ask a public question</h1>
			</div>
			<div className="question-box">
				<div>
					<div className="bg-white bar-sm bs-md p16 ba bc-black-100">
						<div className="d-flex gs4 gsy fd-column">
							<div className="flex--item">
								<label
									className="d-block s-label"
									htmlFor="title"
								>
									Title
									<p className="s-description mt2">
										Be specific and imagine you’re asking a
										question to another person
									</p>
								</label>
							</div>
							<div className="d-flex ps-relative">
								<input
									className="s-input"
									id="title"
									type="text"
									placeholder="Enter your input here"
								/>
							</div>
						</div>
						<br />
						<div className="d-flex gs4 gsy fd-column">
							<div className="flex--item">
								<label
									className="d-block s-label"
									htmlFor="body"
								>
									Body
									<p className="s-description mt2">
										Include all the information someone
										would need to answer your question
									</p>
								</label>
							</div>
							<div className="">
								<div
									id="editor-container"
									className="mt0 mb16"
								></div>
							</div>
						</div>
						<br />
						<div className="d-flex gs4 gsy fd-column">
							<div className="flex--item">
								<label
									className="d-block s-label"
									htmlFor="tags"
								>
									Tags
									<p className="s-description mt2">
										Be specific and imagine you’re asking a
										question to another person
									</p>
								</label>
							</div>
							<div className="d-flex ps-relative">
								<input
									className="s-input"
									id="tags"
									type="text"
									placeholder="Enter your input here"
								/>
							</div>
						</div>
						<br />
						<button
							className="s-btn s-btn__primary s-btn__filled"
							type="button"
						>
							Post Your Question
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
