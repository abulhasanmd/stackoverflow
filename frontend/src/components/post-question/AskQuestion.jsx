/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { connect } from 'react-redux';
import { TextField } from '@mui/material';
import { StacksEditor } from '@stackoverflow/stacks-editor';
import { Formik } from 'formik';
import '@stackoverflow/stacks-editor/dist/styles.css';
import '@stackoverflow/stacks-editor/dist/stacks-editor/editor';
import '@stackoverflow/stacks-editor/dist/shared/prosemirror-plugins/image-upload';

import './AskQuestion.css';
import { KAFKA_MIDDLEWARE_URL } from '../../config/configBackend';

const AskQuestion = ({ auth }) => {
	const [tags, setTags] = useState([]);
	useEffect(() => {
		if (!document.querySelector('#editor-container').hasChildNodes()) {
			new StacksEditor(
				document.querySelector('#editor-container'),
				'*Your* **question** goes here',
				{
					imageUpload: {
						handler: async (file) => {
							const req = await fetch(
								`${KAFKA_MIDDLEWARE_URL}misc/get-signed-url`,
								{
									method: 'GET',
									mode: 'cors',
									cache: 'no-cache',
									credentials: 'same-origin',
									headers: {
										'Content-Type': 'application/json',
									},
									redirect: 'follow',
									referrerPolicy: 'no-referrer',
								},
							);
							const resp = await req.json();
							console.log(resp);
							await fetch(resp.data, {
								method: 'PUT',
								body: file,
							});
							return resp.data.split('?')[0];
						},
					},
				},
			);
		}
	}, []);

	useEffect(() => {
		(async () => {
			const req = await fetch(
				`${KAFKA_MIDDLEWARE_URL}tag/get-tags-short`,
				{
					method: 'GET',
					mode: 'cors',
					cache: 'no-cache',
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json',
					},
					redirect: 'follow',
					referrerPolicy: 'no-referrer',
				},
			);
			const resp = await req.json();
			setTags(resp.data);
		})();
	}, []);

	return (
		<div className="post-question-container">
			<div className="s-page-title">
				<h1 className="s-page-title--header">Ask a public question</h1>
			</div>
			<div className="question-box">
				<div>
					{}
					<Formik
						initialValues={{
							title: '',
							body: '',
							tags: [],
						}}
						validate={(values) => {
							const errors = {};
							if (!values.title) {
								errors.title = 'Required';
							}
							return errors;
						}}
						onSubmit={async (values) => {
							console.log(values);
							console.log(
								document
									.querySelector('#editor-container')
									.querySelector('.js-editor')
									.innerHTML.toString(),
							);
							const req = await fetch(
								`${KAFKA_MIDDLEWARE_URL}questions/post-question`,
								{
									method: 'POST',
									mode: 'cors',
									cache: 'no-cache',
									credentials: 'same-origin',
									headers: {
										'Content-Type': 'application/json',
									},
									redirect: 'follow',
									referrerPolicy: 'no-referrer',
									body: JSON.stringify({
										title: values.title,
										descr: document
											.querySelector('#editor-container')
											.querySelector('.js-editor')
											.innerHTML.toString(),
										reviewStatus: document
											.querySelector('#editor-container')
											.querySelector('.js-editor')
											.innerHTML.toString()
											.includes('<img')
											? 'pending'
											: 'approved',
										tags: values.tags,
										createdBy: {
											_id: auth.user && auth.user._id,
											imageUrl: 'j',
										},
									}),
								},
							);
							const resp = await req.json();
							window.location.href = `/questions/${resp.data.data._id}`;
						}}
					>
						{({
							values,
							errors,
							touched,
							handleChange,
							handleBlur,
							handleSubmit,
							setFieldValue,
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
											id="tags"
											name="tags"
											value={values.tags}
											// onChange={handleChange}
											// onBlur={handleBlur}
											size="small"
											isOptionEqualToValue={(
												option,
												value,
											) => option.name === value.name}
											options={tags || []}
											getOptionLabel={(option) =>
												option.name
											}
											onChange={(e, value) =>
												setFieldValue('tags', value)
											}
											renderInput={(params) => (
												<TextField
													name="tags"
													{...params}
													size="medium"
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
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(AskQuestion);
