import React, { useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import { StacksEditor } from '@stackoverflow/stacks-editor';
import { Formik } from 'formik';
import '@stackoverflow/stacks-editor/dist/styles.css';
import '@stackoverflow/stacks-editor/dist/stacks-editor/editor';
import '@stackoverflow/stacks-editor/dist/shared/prosemirror-plugins/image-upload';
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
	const top100Films = [
		{ title: 'The Shawshank Redemption', year: 1994 },
		{ title: 'The Godfather', year: 1972 },
		{ title: 'The Godfather: Part II', year: 1974 },
		{ title: 'The Dark Knight', year: 2008 },
		{ title: '12 Angry Men', year: 1957 },
		{ title: "Schindler's List", year: 1993 },
		{ title: 'Pulp Fiction', year: 1994 },
	];
	return (
		<div className="post-question-container">
			<div className="s-page-title">
				<h1 className="s-page-title--header">Ask a public question</h1>
			</div>
			<div className="question-box">
				<div>
					<Formik
						initialValues={{ title: '', body: '', tags: [] }}
						validate={(values) => {
							const errors = {};
							if (!values.title) {
								errors.title = 'Required';
							}
							return errors;
						}}
						onSubmit={() => {}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
						}) => (
							<form
								onSubmit={handleSubmit}
								className="bg-white bar-sm bs-md p16 ba bc-black-100"
							>
								<div className="d-flex gs4 gsy fd-column">
									<div className="flex--item">
										<label
											className="d-block s-label"
											htmlFor="title"
										>
											Title
											<p className="s-description mt2">
												Be specific and imagine you’re
												asking a question to another
												person
											</p>
										</label>
									</div>
									<div className="d-flex ps-relative">
										<input
											className="s-input"
											id="title"
											name="title"
											value={values.title}
											onChange={handleChange}
											onBlur={handleBlur}
											type="text"
											placeholder="Enter your input here"
										/>
									</div>
									<span className="error-message">
										{errors.title &&
											touched.title &&
											errors.title}
									</span>
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
												Include all the information
												someone would need to answer
												your question
											</p>
										</label>
									</div>
									<div className="">
										<div
											id="editor-container"
											className="mt0 mb16"
										></div>
									</div>
									<span className="error-message">
										{errors.body &&
											touched.body &&
											errors.body}
									</span>
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
												Be specific and imagine you’re
												asking a question to another
												person
											</p>
										</label>
									</div>
									<div className="d-flex ps-relative">
										<Autocomplete
											fullWidth
											multiple
											// value={values.tags}
											// onChange={handleChange}
											// onBlur={handleBlur}
											size="small"
											id="tags-standard"
											options={top100Films}
											getOptionLabel={(option) =>
												option.title
											}
											renderInput={(params) => (
												<TextField
													{...params}
													variant="outlined"
													placeholder="Tags"
												/>
											)}
										/>
									</div>
									<span className="error-message">
										{errors.tags &&
											touched.tags &&
											errors.tags}
									</span>
								</div>
								<br />
								<button
									className="s-btn s-btn__primary s-btn__filled"
									type="submit"
								>
									Post Your Question
								</button>
							</form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
